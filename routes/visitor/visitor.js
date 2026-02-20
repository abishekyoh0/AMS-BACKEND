import express from "express";
import {
  addVisitor,
  verifyVisitor,
  approveVisitor,
  allowEntry,
  logExit,
  getResidentVisitors,
} from "../../controllers/visitor/visitor.js";

const router = express.Router();

router.post("/resident/:residentId", addVisitor);

router.put("/verify/:id", verifyVisitor);

router.put("/approve/:id", approveVisitor);

router.put("/entry/:id", allowEntry);

router.put("/exit/:id", logExit);

router.get("/resident/:residentId", getResidentVisitors);

export default router;