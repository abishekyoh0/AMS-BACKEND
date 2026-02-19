import express from "express";
import blockRoutes from "../routes/apartmentmanagement/block.js"
import floorRoutes from "../routes/apartmentmanagement/floor.js";
import flatRoutes from "../routes/apartmentmanagement/flat.js";
import userRoutes from "../routes/UserManagement/usersRoute.js";
import roleRoutes from "../routes/UserManagement/role.route.js";
import { adminLogin } from "../controllers/usermanagement/admincontroll.js";

const router = express.Router();

router.use("/blocks", blockRoutes);
router.use("/floors", floorRoutes);
router.use("/flats", flatRoutes);
router.use("/user", userRoutes)
router.use("/roles", roleRoutes)
router.post("/admin-login", adminLogin)

export default router;
