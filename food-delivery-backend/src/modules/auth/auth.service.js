import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ApiError from "../../utils/ApiError.js";
import userRepository from "../user/user.repository.js";




const registerUser = async ({ name, email, password,adminSecret  }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  
  let role = "USER";

  if (
    adminSecret &&
    adminSecret === process.env.ADMIN_REGISTRATION_SECRET
  ) {
    role = "ADMIN";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};


const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.isActive) {
    throw new ApiError(403, "User account is disabled");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = jwt.sign(
    { userId: user._id.toString()
      , role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
  );

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export default {
  registerUser,
  loginUser,
};
