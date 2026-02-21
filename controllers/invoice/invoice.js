import Invoice from "../../models/invoice/invoice.js";
import { invoiceValidation } from "../../validations/invoice/invoice.js";


export const generateInvoice = async (req, res) => {
  try {
    const { error } = invoiceValidation.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const invoiceNumber = "INV-" + Date.now();

    const invoice = await Invoice.create({
      ...req.body,
      invoice_number: invoiceNumber
    });

    res.status(201).json({
      success: true,
      message: "Receipt generated successfully",
      data: invoice
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("resident_id")
      .populate("flat_id")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("resident_id")
      .populate("flat_id");

    if (!invoice)
      return res.status(404).json({ success: false, message: "Invoice not found" });

    res.json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const downloadReceipt = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice)
      return res.status(404).json({ success: false, message: "Receipt not found" });

    res.json({
      success: true,
      receipt: invoice
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};