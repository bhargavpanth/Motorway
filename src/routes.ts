import express from 'express'
import * as middleware from './middleware'

const router = express.Router()

router.get('/status/vehicle/:vehicle_id',
    middleware.checkIfVehicleExistsMiddleware,
    middleware.fetchVehicleStatusMiddleware
)

export default router
