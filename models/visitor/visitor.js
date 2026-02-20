import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },

    visitor_name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
    },

    vehicle_number: {
      type: String,
    },

    approval_required: {
      type: Boolean,
      default: true,
    },

    approval_status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    entry_status: {
      type: String,
      enum: ["Waiting", "Inside", "Denied", "Exited"],
      default: "Waiting",
    },
     isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },

    entry_time: Date,
    exit_time: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);