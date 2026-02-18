import Block from "../../models/apartmentmanagement/block.js";
import { blockSchemaValidation } from "../../validations/apartmentmanagement/block.js";

export const createBlock = async (req, res) => {
  try {
    const { error } = blockSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const existing = await Block.findOne({
      block_name: req.body.block_name.toUpperCase()
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Block already exists"
      });
    }

    const block = await Block.create(req.body);

    res.status(201).json({
      success: true,
      data: block
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getBlocks = async (_req, res) => {
  try {
    const blocks = await Block.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blocks.length,
      data: blocks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateBlock = async (req, res) => {
  try {
    const { error } = blockSchemaValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const existing = await Block.findOne({
      block_name: req.body.block_name.toUpperCase(),
      _id: { $ne: req.params.id }  
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Block name already exists"
      });
    }

    const block = await Block.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Block not found"
      });
    }

    res.json({
      success: true,
      message: "Block updated successfully",
      data: block
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        isActive: false
      },
      { new: true }
    );

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Block not found"
      });
    }

    res.json({
      success: true,
      message: "Block deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getBlockById = async (req, res) => {
  try {
    const block = await Block.findOne({
      _id: req.params.id,
      isDeleted: false
    });

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "Block not found"
      });
    }

    res.json({
      success: true,
      data: block
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

