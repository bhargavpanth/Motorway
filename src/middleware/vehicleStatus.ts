import { StateLogs } from '../models/stateLogs'

type Row = {
    state : string
}

const fetchState = (rows: Array<Row>): string => {
    return rows[0].state
}

export const fetchVehicleStatusMiddleware = async (req, res, next) => {
    const { vehicle_id } = req.params
    const { timestamp } = req.query

    if (!timestamp) return res.status(400).json({ message: `must pass a valid timestamp` })

    if (isNaN(Date.parse(timestamp))) return res.status(400).json({ message: `invalid timestamp` })

    const stateLog = new StateLogs()

    try {
        const stateLogInfo = await stateLog.getStateLogByVehicleIdBeforeTime(
            vehicle_id,
            new Date(timestamp)
        )

        if (!stateLogInfo || !stateLogInfo.rows.length) return res.status(404).json({
            message: `cannot find transactions conducted on given date for vehicle ${vehicle_id}`
        })

        res.status(200).json({
            status: fetchState(stateLogInfo.rows)
        })

    } catch (error) {
        res.status(500).json({
            message: `internal server error ${error}`
        })
    }
}
