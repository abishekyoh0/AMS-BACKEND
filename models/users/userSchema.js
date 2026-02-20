import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role",
            required: true,
        },
        full_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        otp: String,

        is_verified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["Active", "Pending", "Deactivated"],
            default: "Active",
        },
    },
    { timestamps: true }
);

export default mongoose.model("user", UserSchema);
