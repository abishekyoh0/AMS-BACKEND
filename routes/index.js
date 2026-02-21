import express from "express";
import blockRoutes from "../routes/apartmentmanagement/block.js"
import floorRoutes from "../routes/apartmentmanagement/floor.js";
import flatRoutes from "../routes/apartmentmanagement/flat.js";
import familyRoutes from "../routes/residents/family.js"
import residentRoutes from "../routes/residents/resident.js"
import userRoutes from "../routes/UserManagement/usersRoute.js";
import roleRoutes from "../routes/UserManagement/role.route.js";
import { adminLogin } from "../controllers/usermanagement/admincontroll.js";
import tenantRoutes from "../routes/apartmentmanagement/tenants.js"
import vehicleRoutes from "../routes/vehicle/vehicle.js"
import parkingSlotRoutes from "../routes/vehicle/parking.js"
import visitorRoutes from "../routes/visitor/visitor.js"
import invoiceRoutes from "../routes/invoice/invoice.js"


const router = express.Router();

router.use("/blocks", blockRoutes)
router.use("/floors", floorRoutes)
router.use("/flats", flatRoutes)
router.use("/families", familyRoutes)
router.use("/residents", residentRoutes)
router.use("/tenants", tenantRoutes)
router.use("/user", userRoutes)
router.use("/roles", roleRoutes)
router.post("/admin-login", adminLogin)
router.use("/vehicles", vehicleRoutes)
router.use("/parkingSlots", parkingSlotRoutes)
router.use("/visitors", visitorRoutes);
router.use("/invoices", invoiceRoutes);


export default router;
