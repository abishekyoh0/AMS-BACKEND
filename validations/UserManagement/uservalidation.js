import Joi from "joi";

export const createUserValidation = Joi.object({
    role_id: Joi.string().required(),

    full_name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),

    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),

    status: Joi.string()
        .valid("Active", "Pending", "Deactivated")
        .optional(),
});

export const updateUserValidation = Joi.object({
    role_id: Joi.string().optional(),

    full_name: Joi.string().min(3).optional(),

    email: Joi.string().email().optional(),

    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional(),

    status: Joi.string()
        .valid("Active", "Pending", "Deactivated")
        .optional(),
});
