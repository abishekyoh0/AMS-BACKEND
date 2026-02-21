import Joi from "joi";

export const invoiceValidation = Joi.object({
  resident_id: Joi.string().required(),
  flat_id: Joi.string().required(),
 bill_id: Joi.string().optional(),
  billing_month: Joi.string().required(),
  bill_amount: Joi.number().required(),
  extra_charges: Joi.number().optional(),
  total_amount: Joi.number().required(),
  payment_method: Joi.string().required()
});