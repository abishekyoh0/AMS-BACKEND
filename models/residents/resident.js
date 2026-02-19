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
      required: [true, "Resident type is required"]
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
      required: [true, "Move-in date is required"]
    },

    move_out_date: {
      type: Date
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

export default mongoose.model("Resident", residentSchema);
