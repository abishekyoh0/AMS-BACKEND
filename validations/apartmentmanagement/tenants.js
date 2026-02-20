import Joi from "joi";

export const tenantValidation = Joi.object({
  owner_id: Joi.string().hex().length(24).required(),

  user_id: Joi.string().hex().length(24).required(),

  flat_id: Joi.string().hex().length(24).required(),

  agreement_doc: Joi.string().allow("").optional(),

  start_date: Joi.date().required(),

  end_date: Joi.date().greater(Joi.ref("start_date")).required(),

  status: Joi.string()
    .valid("Active", "Expired")
    .optional()
});
