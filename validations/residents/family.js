import Joi from "joi";

export const familySchemaValidation = Joi.object({
  resident_id: Joi.string().required().messages({
    "any.required": "Resident ID is required"
  }),
  name: Joi.string().max(100).required().messages({
    "string.max": "Name must be at most 100 characters",
    "any.required": "Name is required"
  }),
  relation: Joi.string().valid("Spouse", "Child", "Parent").required().messages({
    "any.only": "Relation must be one of Spouse, Child, Parent",
    "any.required": "Relation is required"
  }),
  mobile: Joi.string().max(15).allow(null, "").messages({
    "string.max": "Mobile number must be at most 15 characters"
  }),
  status: Joi.string().valid("Active", "Inactive").default("Active")
});
