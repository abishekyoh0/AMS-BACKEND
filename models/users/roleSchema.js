import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        role_name: {
            type: String,
            enum: [
                "Admin",
                "Resident",
                "Security",
                "Technician",
                "Accountant",
                "Supervisor",
                "Finance Manager High",
            ],
            required: true,
            unique: true,
        },

        description: String,

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("role", RoleSchema);
