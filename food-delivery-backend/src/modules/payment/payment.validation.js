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

const createPaymentSchema = Joi.object({
  orderId: Joi.string().required(),
  method: Joi.string().valid("COD", "UPI", "CARD").required(),
});

const updatePaymentStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "SUCCESS", "FAILED")
    .required(),
});

export {
  validate,
  createPaymentSchema,
  updatePaymentStatusSchema,
};
