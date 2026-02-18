import express from "express";
import {
  createFloor,
  getFloors,
  getFloorById,
  updateFloor,
  deleteFloor
} from "../../controllers/apartmentmanagement/floor.js";

const router = express.Router();

router.post("/", createFloor);
router.get("/", getFloors);
router.get("/:id", getFloorById);
router.put("/:id", updateFloor);
router.delete("/:id", deleteFloor);

export default router;
