import express from "express";
import {
  createParkingSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
  assignSlot,
  residentSlot,
} from "../../controllers/vehicle/parking.js"

const router = express.Router()

router.post("/", createParkingSlot)
router.get("/", getAllSlots)
router.get("/:id", getSlotById)
router.put("/:id", updateSlot)
router.delete("/:id", deleteSlot)

router.post("/assign", assignSlot)

router.get("/resident/:resident_id", residentSlot)

export default router