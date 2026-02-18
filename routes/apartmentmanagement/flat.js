import express from "express";
import {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat
} from "../../controllers/apartmentmanagement/flat.js";

const router = express.Router();

router.post("/", createFlat);
router.get("/", getFlats);
router.get("/:id", getFlatById);
router.put("/:id", updateFlat);
router.delete("/:id", deleteFlat);

export default router;
