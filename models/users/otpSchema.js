import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
    {
        email: String,
        mobile: String,
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("otp", OtpSchema);
