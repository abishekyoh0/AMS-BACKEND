import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    block_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: true,
    },
    slot_number: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      default: null,
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

export default mongoose.model("ParkingSlot", parkingSlotSchema);