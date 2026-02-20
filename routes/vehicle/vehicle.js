import express from "express";
import {
  addVehicle,
  getResidentVehicles,
  requestDeleteVehicle,
  approveDeleteVehicle,
  verifyVehicle,
  vehicleEntry,
  vehicleExit,
  residentLogs,
} from "../../controllers/vehicle/vehicle.js";

const router = express.Router();

router.post("/", addVehicle);
router.get("/resident/:resident_id", getResidentVehicles);
router.put("/request-delete/:id", requestDeleteVehicle);
router.get("/logs/:resident_id", residentLogs);

router.delete("/approve-delete/:id", approveDeleteVehicle);

router.get("/verify/:number", verifyVehicle);
router.post("/entry", vehicleEntry);
router.post("/exit", vehicleExit);

export default router;