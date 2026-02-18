import mongoose from "mongoose";

const floorSchema = new mongoose.Schema(
  {
    block_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: true
    },

    floor_number: {
      type: Number,
      required: true,
      min: 0,
      max: 200
    }, 
    
    isActive: {
      type: Boolean,
      default: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

export default mongoose.model("Floor", floorSchema);
