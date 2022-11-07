"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
/**
 * Note: Adding PostgreSQL prefix to ensure that this layer is
 * revisited when moving away from PostgreSQL
 */
const PostgreSQLPort = process.env.POSTGRES_PORT || 5432;
const PostgreSQLHost = process.env.POSTGRES_HOST || 'localhost';
const PostgreSQLUser = process.env.POSTGRES_USER || 'user';
const PostgreSQLPassword = process.env.POSTGRES_PASSWORD || 'password';
const PostgreSQLDatabse = process.env.POSTGRES_DB || 'motorway';
const connectionPool = new pg_1.Pool({
    user: PostgreSQLUser,
    host: PostgreSQLHost,
    database: PostgreSQLDatabse,
    password: PostgreSQLPassword,
    port: PostgreSQLPort,
});
exports.default = {
    query: async (query, params) => connectionPool.query(query, params)
};
