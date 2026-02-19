import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    resident_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true
    },
    name: {
      type: String,
      required: [true, "Family member name is required"],
      trim: true,
      maxlength: 100
    },
    relation: {
      type: String,
      required: [true, "Relation is required"],
      trim: true,
      enum: ["Spouse", "Child", "Parent"]
    },
    mobile: {
      type: String,
      trim: true,
      maxlength: 15
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
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

export default mongoose.model("Family", familySchema);
