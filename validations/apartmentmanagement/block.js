import Joi from "joi";

export const blockSchemaValidation = Joi.object({
  block_name: Joi.string()
    .alphanum()
    .uppercase()
    .min(1)
    .max(10)
    .required()
    .messages({
      "string.empty": "Block name is required",
      "string.alphanum": "Only letters and numbers allowed",
      "any.required": "Block name is required"
    }),

  description: Joi.string()
    .max(200)
    .allow("")
});
