"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfVehicleExistsMiddleware = void 0;
const vehicles_1 = require("../models/vehicles");
const checkIfVehicleExistsMiddleware = async (req, res, next) => {
    const { vehicle_id } = req.params;
    if (!vehicle_id)
        res.status(400).json({ message: `must pass vehicle ID` });
    const vehicle = new vehicles_1.Vehicles();
    try {
        const vehicleInfo = await vehicle.getVehicleById(vehicle_id);
        if (!vehicleInfo || !vehicleInfo.rows.length)
            return res.status(404).json({
                message: `cannot find vehicle with ID ${vehicle_id}`
            });
        next();
    }
    catch (error) {
        res.status(500).json({
            message: `internal server error ${error}`
        });
    }
};
exports.checkIfVehicleExistsMiddleware = checkIfVehicleExistsMiddleware;
