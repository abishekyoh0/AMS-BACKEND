import Joi from "joi";

export const createRoleValidation = Joi.object({
    role_name: Joi.string()
        .valid(
            "Admin",
            "Resident",
            "Security",
            "Technician",
            "Accountant",
            "Supervisor",
            "Finance Manager High"
        )
        .required(),

    description: Joi.string().allow("").optional(),
});

export const updateRoleValidation = Joi.object({
    role_name: Joi.string()
        .valid(
            "Admin",
            "Resident",
            "Security",
            "Technician",
            "Accountant",
            "Supervisor",
            "Finance Manager High"
        )
        .optional(),

    description: Joi.string().optional(),
});
