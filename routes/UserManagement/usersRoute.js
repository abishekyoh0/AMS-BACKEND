import express from "express";
import { createUserValidation, updateUserValidation } from "../../validations/UserManagement/uservalidation.js";
import { validate } from "../../middleware/common.js";
import { allowRoles } from "../../middleware/role.validation.js";
import { authMiddleware } from "../../middleware/auth.validations.js";
import { createUser, deactivateUser, deleteUser, getUserById, getUsers, reactivateUser, updateUser } from "../../controllers/usermanagement/controllers.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    allowRoles("Admin"),
    validate(createUserValidation),
    createUser
);

router.get(
    "/",
    authMiddleware,
    allowRoles("Admin"),
    getUsers
);

router.get(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    getUserById
);


router.put(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    validate(updateUserValidation),
    updateUser
);

router.patch(
    "/:id/deactivate",
    authMiddleware,
    allowRoles("Admin"),
    deactivateUser
);

router.patch(
    "/:id/reactivate",
    authMiddleware,
    allowRoles("Admin"),
    reactivateUser
);

router.delete(
    "/:id",
    authMiddleware,
    allowRoles("Admin"),
    deleteUser
);


export default router;
