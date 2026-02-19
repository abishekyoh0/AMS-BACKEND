import userSchema from "../../models/users/userSchema.js";
import generateToken from "../../utils/genarateToken.js";


export const adminLogin = async (req, res) => {
    const { email } = req.body;

    const user = await userSchema
        .findOne({ email, isDeleted: false })
        .populate("role_id");

    if (!user)
        return res.status(404).json({
            message: "User not found",
        });

    if (user.role_id.role_name !== "Admin")
        return res.status(403).json({
            message: "Not an admin",
        });

    const token = generateToken(user._id);

    res.json({
        message: "Login success",
        token,
    });
};
