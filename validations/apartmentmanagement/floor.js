import Joi from "joi";

export const floorValidation = Joi.object({
  block_id: Joi.string().required().messages({
    "any.required": "Block ID is required"
  }),

  floor_number: Joi.number().integer().min(0).max(200).required()
});
