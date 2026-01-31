import Joi from "joi";
import ApiError from "../../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    const messages = error.details.map((d) => d.message);
    return next(new ApiError(400, "Validation error", messages));
  }

  next();
};

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
    adminSecret: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export {
  validate,
  registerSchema,
  loginSchema,
};
