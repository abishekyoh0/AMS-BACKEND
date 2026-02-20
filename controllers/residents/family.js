import Family from "../../models/residents/family.js";
import { familySchemaValidation } from "../../validations/residents/family.js";

export const createFamily = async (req, res) => {
  try {
    const { error } = familySchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const family = await Family.create(req.body);
    res.status(201).json({ success: true, data: family });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFamilies = async (req, res) => {
  try {
    const families = await Family.find().sort({ createdAt: -1 });
    res.json({ success: true, count: families.length, data: families });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFamilyById = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    if (!family) return res.status(404).json({ success: false, message: "Family member not found" });
    res.json({ success: true, data: family });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateFamily = async (req, res) => {
  try {
    const { error } = familySchemaValidation.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const family = await Family.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" } 
    );

    if (!family) return res.status(404).json({ success: false, message: "Family member not found" });

    res.json({ success: true, message: "Family updated successfully", data: family });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteFamily = async (req, res) => {
  try {
    const family = await Family.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { returnDocument: "after" }
    );

    if (!family) return res.status(404).json({ success: false, message: "Family member not found" });

    res.json({ success: true, message: "Family deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
