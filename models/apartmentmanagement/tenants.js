import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    flat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: true
    },

    agreement_doc: {
      type: String,
      trim: true,
      default: ""
    },

    start_date: {
      type: Date,
      required: true
    },

    end_date: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active"
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

export default mongoose.model("Tenant", tenantSchema);
