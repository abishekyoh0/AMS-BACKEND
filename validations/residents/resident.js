import Joi from "joi";

export const residentSchemaValidation = Joi.object({
  user_id: Joi.string().required(),
  flat_id: Joi.string().required(),
  resident_type: Joi.string().valid("Owner", "Tenant").required(),
  id_proof: Joi.string().max(200).allow(""),
  address_proof: Joi.string().max(200).allow(""),
  emergency_contact: Joi.string().max(15).allow(""),
  move_in_date: Joi.date().required(),
  move_out_date: Joi.date().optional()
});
