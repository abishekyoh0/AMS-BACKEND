import mongoose from "mongoose";

const vehicleLogSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    entry_time: {
      type: Date,
      default: Date.now,
    },

    exit_time: Date,

    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
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

export default mongoose.model("VehicleLog", vehicleLogSchema);