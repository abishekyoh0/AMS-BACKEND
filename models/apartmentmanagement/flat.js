import mongoose from "mongoose";

const flatSchema = new mongoose.Schema(
  {
    block_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: true
    },

    floor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true
    },

    flat_number: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 10
    },

    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["Occupied", "Vacant"],
      default: "Vacant"
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

export default mongoose.model("Flat", flatSchema);
