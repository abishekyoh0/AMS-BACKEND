import ParkingSlot from "../../models/vehicle/parking.js";
import { parkingSlotValidation, assignSlotValidation } from "../../validations/vehicle/parking.js";

export const createParkingSlot = async (req, res) => {
  try {
    const { error } = parkingSlotValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const slot = await ParkingSlot.create(req.body);

    res.status(201).json({ success: true, data: slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find().populate("assigned_to").populate("block_id");
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id).populate("assigned_to").populate("block_id");
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    res.json({ success: true, message: "Slot updated", data: slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndDelete(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    res.json({ success: true, message: "Slot deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignSlot = async (req, res) => {
  try {
    const { error } = assignSlotValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { slot_id, resident_id } = req.body;

    const slot = await ParkingSlot.findById(slot_id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    if (slot.status === "Occupied") return res.status(400).json({ message: "Slot already occupied" });

    slot.assigned_to = resident_id;
    slot.status = "Occupied";
    await slot.save();

    res.json({ success: true, message: "Slot assigned", data: slot });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const residentSlot = async (req, res) => {
  try {
    const resident_id = req.params.resident_id;

    const slot = await ParkingSlot.findOne({ assigned_to: resident_id }).populate("block_id");
    if (!slot) return res.status(404).json({ message: "No slot assigned" });

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};