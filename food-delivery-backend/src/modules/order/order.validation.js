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


const placeOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),

  deliveryAddress: Joi.string().min(5).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
});


const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(
      "ORDER_RECEIVED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED"
    )
    .required(),
});

export {
  validate,
  placeOrderSchema,
  updateOrderStatusSchema,
};
