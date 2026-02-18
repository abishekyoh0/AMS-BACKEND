import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    block_name: {
      type: String,
      required: [true, "Block name is required"],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: 1,
      maxlength: 10
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: ""
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

export default mongoose.model("Block", blockSchema);
