import roleSchema from "../../models/users/roleSchema.js";

export const createRole = async (req, res) => {
    try {
        const roleExists = await roleSchema.findOne({
            role_name: req.body.role_name,
        });

        if (roleExists)
            return res.status(400).json({
                message: "Role already exists",
            });

        const role = await roleSchema.create(req.body);

        res.status(201).json({
            message: "Role created successfully",
            role,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRoles = async (req, res) => {
    const roles = await roleSchema.find({
        isDeleted: false,
    });

    res.json(roles);
};

export const getRoleById = async (req, res) => {
    const role = await roleSchema.findOne({
        _id: req.params.id,
        isDeleted: false,
    });

    if (!role)
        return res.status(404).json({ message: "Role not found" });

    res.json(role);
};
export const updateRole = async (req, res) => {
    const role = await roleSchema.findById(req.params.id);

    if (!role || role.isDeleted)
        return res.status(404).json({ message: "Role not found" });

    Object.assign(role, req.body);
    await role.save();

    res.json({
        message: "Role updated successfully",
        role,
    });
};


export const deleteRole = async (req, res) => {
    const role = await roleSchema.findById(req.params.id);

    if (!role)
        return res.status(404).json({ message: "Role not found" });

    role.isDeleted = true;
    await role.save();

    res.json({
        message: "Role deleted successfully",
    });
};
