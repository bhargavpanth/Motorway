"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicles = void 0;
const model_1 = __importDefault(require("./model"));
class Vehicles {
    getTable() {
        return 'vehicles';
    }
    getVehicleById(vehicleId) {
        const query = `SELECT * FROM ${this.getTable()} WHERE id = $1`;
        return model_1.default.query(query, [vehicleId]);
    }
}
exports.Vehicles = Vehicles;
