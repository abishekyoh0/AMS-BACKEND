import mongoose from "mongoose";

const residentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },

    flat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: [true, "Flat reference is required"]
    },

    resident_type: {
      type: String,
      enum: ["Owner", "Tenant"],
      required: true
    },

    id_proof: {
      type: String,
      trim: true,
      maxlength: 200
    },

    address_proof: {
      type: String,
      trim: true,
      maxlength: 200
    },

    emergency_contact: {
      type: String,
      trim: true,
      maxlength: 15
    },

    move_in_date: {
      type: Date,
      required: true
    },

    move_out_date: Date,

    isVerified: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    rejection_reason: {
      type: String,
      default: ""
    },

    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    approved_at: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: false
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

residentSchema.index({ user_id: 1 }, { unique: true });

export default mongoose.model("Resident", residentSchema);