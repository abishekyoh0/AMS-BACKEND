import Vehicle from "../../models/vehicle/vehicle.js";
import VehicleLog from "../../models/vehicle/vehiclelog.js";
import { vehicleValidation, entryValidation } from "../../validations/vehicle/vehicle.js"

export const addVehicle = async (req, res) => {
  try {
    const { error } = vehicleValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle added",
      data: vehicle,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getResidentVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({
    resident_id: req.params.resident_id,
  });

  res.json(vehicles);
};


export const requestDeleteVehicle = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  vehicle.deleteRequested = true;
  await vehicle.save();

  res.json({ message: "Delete request sent to admin" });
};


export const approveDeleteVehicle = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);

  res.json({ message: "Vehicle removed" });
};


export const verifyVehicle = async (req, res) => {
  const vehicle = await Vehicle.findOne({
    vehicle_number: req.params.number.toUpperCase(),
    status: "Active",
    isApproved: true,
  }).populate("resident_id");

  if (!vehicle)
    return res.status(404).json({ message: "Vehicle not allowed" });

  res.json(vehicle);
};


export const vehicleEntry = async (req, res) => {
  const { vehicle_id } = req.body;

  const log = await VehicleLog.create({ vehicle_id });

  res.json({ message: "Entry recorded", log });
};


export const vehicleExit = async (req, res) => {
  const log = await VehicleLog.findOne({
    vehicle_id: req.body.vehicle_id,
    status: "IN",
  }).sort({ createdAt: -1 });

  if (!log)
    return res.status(404).json({ message: "Entry not found" });

  log.exit_time = new Date();
  log.status = "OUT";
  await log.save();

  res.json({ message: "Exit recorded", log });
};


export const residentLogs = async (req, res) => {
  const vehicles = await Vehicle.find({ resident_id: req.params.resident_id });

  const ids = vehicles.map(v => v._id);

  const logs = await VehicleLog.find({ vehicle_id: { $in: ids } })
    .populate("vehicle_id")
    .sort({ createdAt: -1 });

  res.json(logs);
};