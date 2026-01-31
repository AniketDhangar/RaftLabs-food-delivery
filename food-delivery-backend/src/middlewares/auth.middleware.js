import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import userRepository from "../modules/user/user.repository.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token missing");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log("DECODED JWT:", decoded);


    const user = await userRepository.findById(decoded.userId);

    if (!user || !user.isActive) {
      throw new ApiError(401, "User not authorized");
    }

    req.user = {
      id: user._id,
      role: user.role,
    };
    console.log("AUTH MIDDLEWARE REQ.USER:", req.user);

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
