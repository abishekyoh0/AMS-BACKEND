import Floor from "../../models/apartmentmanagement/floor.js";
import Block from "../../models/apartmentmanagement/block.js";
import { floorValidation } from "../../validations/apartmentmanagement/floor.js";


export const createFloor = async (req, res) => {
  try {
    const { error } = floorValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const blockExists = await Block.findById(req.body.block_id);

    if (!blockExists) {
      return res.status(404).json({
        success: false,
        message: "Block not found"
      });
    }

    const existing = await Floor.findOne({
      block_id: req.body.block_id,
      floor_number: req.body.floor_number
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Floor already exists in this block"
      });
    }

    const floor = await Floor.create(req.body);

    res.status(201).json({
      success: true,
      data: floor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getFloors = async (_req, res) => {
  try {
    const floors = await Floor.find({ isDeleted: false })
      .populate("block_id", "block_name")
      .sort({ floor_number: 1 });

    res.json({
      success: true,
      count: floors.length,
      data: floors
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const getFloorById = async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id)
      .populate("block_id", "block_name");

    if (!floor || floor.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Floor not found"
      });
    }

    res.json({
      success: true,
      data: floor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const updateFloor = async (req, res) => {
  try {
    const { error } = floorValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const floor = await Floor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!floor) {
      return res.status(404).json({
        success: false,
        message: "Floor not found"
      });
    }

    res.json({
      success: true,
      message: "Floor updated successfully",
      data: floor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const deleteFloor = async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!floor) {
      return res.status(404).json({
        success: false,
        message: "Floor not found"
      });
    }

    res.json({
      success: true,
      message: "Floor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
