"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_js_1 = __importDefault(require("expect.js"));
const axios_1 = __importDefault(require("axios"));
/**
 * Before running these tests, ensure that the dependecy
 * (i.e Postgres) is spun up and is running on port 5432
*/
describe('Intergration tests for vehicle status route', () => {
    let requestClient;
    before(() => {
        requestClient = axios_1.default.create({
            baseURL: 'http://localhost:8080/api/status',
            timeout: 1000
        });
    });
    describe('Faulty requests', () => {
        describe('Not providing a vehicle ID', () => {
            let response = null;
            let error = null;
            before(async () => {
                await requestClient.get('/vehicle')
                    .then(data => response = data)
                    .catch(err => error = err);
            });
            it('should throw an error', () => {
                (0, expect_js_1.default)(error.response.status).to.be.equal(404);
            });
            it('should not return a response', () => {
                (0, expect_js_1.default)(response).to.equal(null);
            });
        });
        describe('Providing an invalid vehicle ID', () => {
            let response = null;
            let error = null;
            const invalidVehicleId = 123;
            before(async () => {
                await requestClient.get(`/vehicle/${invalidVehicleId}`)
                    .then(data => response = data)
                    .catch(err => error = err);
            });
            it('should throw an error', () => {
                (0, expect_js_1.default)(error.response.status).to.be.equal(404);
                (0, expect_js_1.default)(error.response.data.message).to.equal(`cannot find vehicle with ID ${invalidVehicleId}`);
            });
            it('should not return a response', () => {
                (0, expect_js_1.default)(response).to.equal(null);
            });
        });
        describe('Not providing a timestamp', () => {
            let response = null;
            let error = null;
            before(async () => {
                await requestClient.get(`/vehicle/1`)
                    .then(data => response = data)
                    .catch(err => error = err);
            });
            it('should throw an error', () => {
                (0, expect_js_1.default)(error.response.status).to.be.equal(400);
                (0, expect_js_1.default)(error.response.data.message).to.equal(`must pass a valid timestamp`);
            });
            it('should not return a response', () => {
                (0, expect_js_1.default)(response).to.equal(null);
            });
        });
        describe('Providing an invalid timestamp', () => {
            let response = null;
            let error = null;
            const invalidTimestamp = `2022-09-12%2012%3A41%3A41%200`;
            before(async () => {
                await requestClient.get(`/vehicle/1?timestamp=${invalidTimestamp}`)
                    .then(data => response = data)
                    .catch(err => error = err);
            });
            it('should throw an error', () => {
                (0, expect_js_1.default)(error.response.status).to.be.equal(400);
                (0, expect_js_1.default)(error.response.data.message).to.equal(`invalid timestamp`);
            });
            it('should not return a response', () => {
                (0, expect_js_1.default)(response).to.equal(null);
            });
        });
    });
    describe('Requesting for vehicle status', () => {
        describe('on the date/time of a', () => {
            describe('quoted transaction', () => {
                let response = null;
                let error = null;
                const quotedDate = `2022-09-11%2009%3A11%3A45%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${quotedDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating quoted', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('quoted');
                });
            });
            describe('selling transaction', () => {
                let response = null;
                let error = null;
                const sellingDate = `2022-09-11%2023%3A21%3A38%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${sellingDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating selling', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('selling');
                });
            });
            describe('sold transaction', () => {
                let response = null;
                let error = null;
                const soldDate = `2022-09-12%2012%3A41%3A41%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${soldDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating sold', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('sold');
                });
            });
        });
        describe('a minute before the date/time of a', () => {
            describe('sold transaction', () => {
                let response = null;
                let error = null;
                const soldDate = `2022-09-12%2012%3A40%3A41%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${soldDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating selling', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('selling');
                });
            });
            describe('selling transaction', () => {
                let response = null;
                let error = null;
                const sellingDate = `2022-09-11%2023%3A20%3A38%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${sellingDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating quoted', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('quoted');
                });
            });
            describe('quoted transaction', () => {
                let response = null;
                let error = null;
                const quotedDate = `2022-09-11%2009%3A11%3A44%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${quotedDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error.response.status).to.be.equal(404);
                    (0, expect_js_1.default)(error.response.data.message).to.equal(`cannot find transactions conducted on given date for vehicle 3`);
                });
                it('should not return a response', () => {
                    (0, expect_js_1.default)(response).to.equal(null);
                });
            });
        });
        describe('a minute after the date/time of a', () => {
            describe('sold transaction', () => {
                let response = null;
                let error = null;
                const soldDate = `2022-09-12%2012%3A42%3A41%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${soldDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating sold', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('sold');
                });
            });
            describe('selling transaction', () => {
                let response = null;
                let error = null;
                const sellingDate = `2022-09-11%2023%3A21%3A38%2B00%27`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${sellingDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating selling', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('selling');
                });
            });
            describe('quoted transaction', () => {
                let response = null;
                let error = null;
                const quotedDate = `2022-09-11%2009%3A11%3A45%2B00`;
                before(async () => {
                    await requestClient.get(`/vehicle/3?timestamp=${quotedDate}`)
                        .then(data => response = data)
                        .catch(err => error = err);
                });
                it('should not throw an error', () => {
                    (0, expect_js_1.default)(error).to.equal(null);
                });
                it('should return a response stating quoted', () => {
                    (0, expect_js_1.default)(response.data.status).to.equal('quoted');
                });
            });
        });
    });
});
