import express from "express";
import { authMiddleware } from "../../middleware/auth.validations.js";
import { allowRoles } from "../../middleware/role.validation.js";
import { validate } from "../../middleware/common.js";
import { createRoleValidation, updateRoleValidation } from "../../validations/UserManagement/roleValidation.js";
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "../../controllers/usermanagement/role.controllers.js";

const router = express.Router();

router.post(
    "/",
    // authMiddleware,
    // allowRoles("Admin"),
    validate(createRoleValidation),
    createRole
);

router.get(
    "/",
    getRoles
);

router.get(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    getRoleById
);

router.put(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    validate(updateRoleValidation),
    updateRole
);

router.delete(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    deleteRole
);

export default router;
