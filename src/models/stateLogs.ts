import model from './model'

export class StateLogs {
    getTable() {
        return 'stateLogs'
    }

    getStateLogsByVehicleId(vehicleId: string) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 ORDER BY timestamp`
        return model.query(query, [vehicleId])
    }

    getStateLogByVehicleIdAtTime(vehicleId: string, timestamp: string) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 AND timestamp = $2`
        return model.query(query, [vehicleId, timestamp])
    }

    getStateLogByVehicleIdBeforeTime(vehicleId: string, timestamp: Date) {
        const query = `SELECT * FROM "${this.getTable()}" WHERE "vehicleId" = $1 AND timestamp <= $2 ORDER BY timestamp DESC LIMIT 1`
        return model.query(query, [vehicleId, timestamp.toUTCString()])
    }
}
