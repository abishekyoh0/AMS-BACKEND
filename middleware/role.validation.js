export const allowRoles = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role_id.role_name;

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        next();
    };
};
