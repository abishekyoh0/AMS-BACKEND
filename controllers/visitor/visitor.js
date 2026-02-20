import Visitor from "../../models/visitor/visitor.js";
import {
  addVisitorValidation,
  approvalValidation,
} from "../../validations/visitor/visitor.js";


export const addVisitor = async (req, res) => {
  try {
    const { error } = addVisitorValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const visitor = await Visitor.create({
      resident_id: req.params.residentId,
      ...req.body,
    });

    res.status(201).json(visitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const verifyVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor)
      return res.status(404).json({ message: "Visitor not found" });

    if (!visitor.approval_required) {
      visitor.approval_status = "Approved";
    }

    await visitor.save();

    res.json({
      message: "Verification complete. Awaiting approval.",
      visitor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const approveVisitor = async (req, res) => {
  try {
    const { error } = approvalValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const visitor = await Visitor.findById(req.params.id);

    if (!visitor)
      return res.status(404).json({ message: "Visitor not found" });

    visitor.approval_status = req.body.approval_status;

    await visitor.save();

    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const allowEntry = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor)
      return res.status(404).json({ message: "Visitor not found" });

    if (visitor.approval_status !== "Approved") {
      return res
        .status(400)
        .json({ message: "Visitor not approved" });
    }

    visitor.entry_status = "Inside";
    visitor.entry_time = new Date();

    await visitor.save();

    res.json({ message: "Entry allowed", visitor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logExit = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor)
      return res.status(404).json({ message: "Visitor not found" });

    visitor.entry_status = "Exited";
    visitor.exit_time = new Date();

    await visitor.save();

    res.json({ message: "Exit logged", visitor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getResidentVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({
      resident_id: req.params.residentId,
    }).sort({ createdAt: -1 });

    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};