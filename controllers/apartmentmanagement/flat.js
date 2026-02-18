import Flat from "../../models/apartmentmanagement/flat.js";
import Block from "../../models/apartmentmanagement/block.js";
import Floor from "../../models/apartmentmanagement/floor.js";
import { flatValidation } from "../../validations/apartmentmanagement/flat.js";


export const createFlat = async (req, res) => {
  try {
    const { error } = flatValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { block_id, floor_id, flat_number } = req.body;

    const blockExists = await Block.findById(block_id);
    if (!blockExists) {
      return res.status(404).json({ success: false, message: "Block not found" });
    }

    const floorExists = await Floor.findById(floor_id);
    if (!floorExists) {
      return res.status(404).json({ success: false, message: "Floor not found" });
    }

    const existing = await Flat.findOne({
      floor_id,
      flat_number: flat_number.toUpperCase()
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Flat already exists on this floor"
      });
    }

    const flat = await Flat.create({
      ...req.body,
      flat_number: flat_number.toUpperCase()
    });

    res.status(201).json({
      success: true,
      data: flat
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getFlats = async (_req, res) => {
  try {
    const flats = await Flat.find({ isDeleted: false })
      .populate("block_id", "block_name")
      .populate("floor_id", "floor_number")
      .populate("owner_id", "name")
      .populate("tenant_id", "name")
      .sort({ flat_number: 1 });

    res.json({
      success: true,
      count: flats.length,
      data: flats
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFlatById = async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id)
      .populate("block_id", "block_name")
      .populate("floor_id", "floor_number");

    if (!flat || flat.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Flat not found"
      });
    }

    res.json({
      success: true,
      data: flat
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const updateFlat = async (req, res) => {
  try {
    const { error } = flatValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const flat = await Flat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!flat) {
      return res.status(404).json({
        success: false,
        message: "Flat not found"
      });
    }

    res.json({
      success: true,
      message: "Flat updated successfully",
      data: flat
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const deleteFlat = async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!flat) {
      return res.status(404).json({
        success: false,
        message: "Flat not found"
      });
    }

    res.json({
      success: true,
      message: "Flat deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
