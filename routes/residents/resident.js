import express from "express";
import {
  createResident,
  getResidents,
  getResidentById,
  updateResident,
  deleteResident
} from "../../controllers/residents/resident.js";

const router = express.Router();

router.post("/", createResident);
router.get("/", getResidents);
router.get("/:id", getResidentById);
router.put("/:id", updateResident);
router.delete("/:id", deleteResident);

export default router;
