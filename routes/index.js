import express from "express";
import blockRoutes from "../routes/apartmentmanagement/block.js"
import floorRoutes from "../routes/apartmentmanagement/floor.js";
import flatRoutes from "../routes/apartmentmanagement/flat.js";

const router = express.Router();

router.use("/blocks", blockRoutes);
router.use("/floors", floorRoutes);
router.use("/flats", flatRoutes);

export default router;
