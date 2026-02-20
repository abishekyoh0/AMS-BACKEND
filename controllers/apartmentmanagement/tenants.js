import Tenant from "../../models/apartmentmanagement/tenants.js";
import { tenantValidation } from "../../validations/apartmentmanagement/tenants.js";


export const createTenant = async (req, res) => {
  try {
    const { error } = tenantValidation.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const tenant = await Tenant.create(req.body);

    res.status(201).json({
      success: true,
      data: tenant
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({ isDeleted: false })
      .populate("flat_id", "flat_number")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tenants.length,
      data: tenants
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant)
      return res.status(404).json({ success: false, message: "Tenant not found" });

    res.json({ success: true, data: tenant });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateTenant = async (req, res) => {
  try {
    const { error } = tenantValidation.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.details[0].message });

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!tenant)
      return res.status(404).json({ success: false, message: "Tenant not found" });

    res.json({
      success: true,
      message: "Tenant updated",
      data: tenant
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { returnDocument: "after" }
    );

    if (!tenant)
      return res.status(404).json({ success: false, message: "Tenant not found" });

    res.json({ success: true, message: "Tenant deleted" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
