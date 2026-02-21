import express from "express";
import {
  generateInvoice,
  getInvoices,
  getInvoiceById,
  downloadReceipt
} from "../../controllers/invoice/invoice.js";

const router = express.Router();

router.post("/", generateInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoiceById); 
router.get("/:id/download", downloadReceipt);

export default router;