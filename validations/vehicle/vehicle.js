import Joi from "joi";

export const vehicleValidation = Joi.object({
  resident_id: Joi.string().required(),
  vehicle_number: Joi.string().required(),
  vehicle_type: Joi.string().valid("Car", "Bike", "Other").required(),
  model: Joi.string().allow(""),
  color: Joi.string().allow(""),
});

export const entryValidation = Joi.object({
  vehicle_id: Joi.string().required(),
});