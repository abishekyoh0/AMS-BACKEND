import roleSchema from "../../models/users/roleSchema.js";
import userSchema from "../../models/users/userSchema.js";

export const createUser = async (req, res) => {
    try {
        const { role_id, full_name, email, mobile, status } = req.body;
        const role = await roleSchema.findById(role_id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        const user = await userSchema.create({
            role_id,
            full_name,
            email,
            mobile,
            status,
        });
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUsers = async (req, res) => {
    const users = await userSchema.find({
        isDeleted: false,
    }).populate("role_id");

    res.json(users);
};

export const getUserById = async (req, res) => {
    const user = await userSchema.findById(req.params.id).populate("role_id");
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (req.body.role_id) {
            const role = await roleSchema.findById(req.body.role_id);
            if (!role)
                return res.status(404).json({ message: "Role not found" });
        }
        const updatedUser = await userSchema.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).populate("role_id");
        res.json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deactivateUser = async (req, res) => {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    user.status = "Deactivated";
    await user.save();
    res.json({
        message: "User deactivated successfully",
    });
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await userSchema.findById(id);

    if (!user)
        return res.status(404).json({ message: "User not found" });

    user.isDeleted = true;
    user.status = "Deactivated";

    await user.save();

    res.json({
        message: "User deleted successfully",
    });
};


export const reactivateUser = async (req, res) => {
    const { id } = req.params;

    const user = await userSchema.findOne({
        _id: id,
        isDeleted: false,
    });

    if (!user)
        return res.status(404).json({ message: "User not found" });

    user.status = "Active";
    await user.save();

    res.json({
        message: "User reactivated successfully",
    });
};
