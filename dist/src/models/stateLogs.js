"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateLogs = void 0;
const model_1 = __importDefault(require("./model"));
class StateLogs {
    getTable() {
        return 'stateLogs';
    }
    getStateLogsByVehicleId(vehicleId) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 ORDER BY timestamp`;
        return model_1.default.query(query, [vehicleId]);
    }
    getStateLogByVehicleIdAtTime(vehicleId, timestamp) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 AND timestamp = $2`;
        return model_1.default.query(query, [vehicleId, timestamp]);
    }
    getStateLogByVehicleIdBeforeTime(vehicleId, timestamp) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 AND timestamp <= $2 ORDER BY timestamp DESC LIMIT 1`;
        return model_1.default.query(query, [vehicleId, timestamp.toUTCString()]);
    }
}
exports.StateLogs = StateLogs;
