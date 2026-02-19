import express from "express";
import blockRoutes from "../routes/apartmentmanagement/block.js"
import floorRoutes from "../routes/apartmentmanagement/floor.js";
import flatRoutes from "../routes/apartmentmanagement/flat.js"; 
import residentRoutes from "../routes/residents/resident.js"
import familyRoutes from "../routes/residents/family.js"

const router = express.Router();

router.use("/blocks", blockRoutes);
router.use("/floors", floorRoutes);
router.use("/flats", flatRoutes);
router.use("/residents", residentRoutes);
router.use("/families", familyRoutes);

export default router;
