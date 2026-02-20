import Joi from "joi";

export const addVisitorValidation = Joi.object({
  visitor_name: Joi.string().required(),
  phone: Joi.string().required(),
  purpose: Joi.string().allow(""),
  vehicle_number: Joi.string().allow(""),
  approval_required: Joi.boolean(),
});

export const approvalValidation = Joi.object({
  approval_status: Joi.string()
    .valid("Approved", "Rejected")
    .required(),
});