import Joi from "joi";

export const parkingSlotValidation = Joi.object({
  block_id: Joi.string().required(),
  slot_number: Joi.string().required(),
  status: Joi.string().valid("Available", "Occupied"),
  assigned_to: Joi.string().allow(null),
});

export const assignSlotValidation = Joi.object({
  resident_id: Joi.string().required(),
  slot_id: Joi.string().required(),
});