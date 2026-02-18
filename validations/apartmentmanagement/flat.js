import Joi from "joi";

export const flatValidation = Joi.object({
  block_id: Joi.string().required(),
  floor_id: Joi.string().required(),
  flat_number: Joi.string().max(10).required(),
  owner_id: Joi.string().allow(null, ""),
  tenant_id: Joi.string().allow(null, ""),
  status: Joi.string().valid("Occupied", "Vacant")
});
