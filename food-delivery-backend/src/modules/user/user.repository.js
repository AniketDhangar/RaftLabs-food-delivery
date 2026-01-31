import User from "./user.model.js";

const findByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

const findById = async (id) => {
  return User.findById(id);
};

const createUser = async (data) => {
  return User.create(data);
};

const updateById = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const deactivateUser = async (id) => {
  return User.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

export default {
  findByEmail,
  findById,
  createUser,
  updateById,
  deactivateUser,
};
