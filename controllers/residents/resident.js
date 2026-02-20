import Resident from "../../models/residents/resident.js";
import { residentSchemaValidation } from "../../validations/residents/resident.js";

export const createResident = async (req, res) => {
  try {
    const { error } = residentSchemaValidation.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const resident = await Resident.create(req.body);

    res.status(201).json({ success: true, data: resident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResidents = async (req, res) => {
  try {
    const residents = await Resident.find()
      .populate("user_id")
      .populate("flat_id")
      .sort({ created_at: -1 });

    res.json({ success: true, count: residents.length, data: residents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id)
      .populate("user_id")
      .populate("flat_id");

    if (!resident)
      return res.status(404).json({ success: false, message: "Resident not found" });

    res.json({ success: true, data: resident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResident = async (req, res) => {
  try {
    const { error } = residentSchemaValidation.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const resident = await Resident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!resident)
      return res.status(404).json({ success: false, message: "Resident not found" });

    res.json({ success: true, message: "Resident updated", data: resident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { returnDocument: "after" }
    );

    if (!resident)
      return res.status(404).json({ success: false, message: "Resident not found" });

    res.json({ success: true, message: "Resident deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerResident = async (req, res) => {
  const resident = await Resident.create(req.body);

  res.json({
    success: true,
    message: "Registration submitted. Waiting for OTP verification",
    data: resident
  });
};

export const approveResident = async (req, res) => {
  const resident = await Resident.findByIdAndUpdate(
    req.params.id,
    {
      status: "Approved",
      isActive: true
    },
    { returnDocument: "after" }
  );

  res.json({ success: true, data: resident });
};



