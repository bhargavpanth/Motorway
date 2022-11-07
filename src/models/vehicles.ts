import model from './model'

export class Vehicles {
    getTable() {
        return 'vehicles'
    }

    getVehicleById(vehicleId: string) {
        const query = `SELECT * FROM ${this.getTable()} WHERE id = $1`
        return model.query(query, [vehicleId])
    }
}
