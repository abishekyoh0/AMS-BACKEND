import jwt from "jsonwebtoken";
import userSchema from "../models/users/userSchema.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req
            .header("Authorization")
            ?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = await userSchema
            .findById(decoded.id)
            .populate("role_id");

        if (!req.user || req.user.isDeleted) {
            return res.status(401).json({
                message: "User not active",
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
        });
    }
};
