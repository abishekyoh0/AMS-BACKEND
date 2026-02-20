import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },

    vehicle_number: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },

    vehicle_type: {
      type: String,
      enum: ["Car", "Bike", "Other"],
      required: true,
    },

    model: String,
    color: String,

    parking_slot: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    isApproved: {
      type: Boolean,
      default: true,
    },

    deleteRequested: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Vehicle", vehicleSchema);