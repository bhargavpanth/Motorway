import { Pool } from 'pg'

/**
 * Note: Adding PostgreSQL prefix to ensure that this layer is
 * revisited when moving away from PostgreSQL
 */
const PostgreSQLPort = process.env.POSTGRES_PORT || 5432
const PostgreSQLHost = process.env.POSTGRES_HOST || 'localhost'
const PostgreSQLUser = process.env.POSTGRES_USER || 'user'
const PostgreSQLPassword = process.env.POSTGRES_PASSWORD || 'password'
const PostgreSQLDatabse = process.env.POSTGRES_DB || 'motorway'

const connectionPool = new Pool({
    user: PostgreSQLUser,
    host: PostgreSQLHost,
    database: PostgreSQLDatabse,
    password: PostgreSQLPassword,
    port: PostgreSQLPort,
})

export default {
    query: async (query: String, params: Array<any>) : Promise<any> => connectionPool.query(query, params)
}
