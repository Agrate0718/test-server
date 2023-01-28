"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Logging_1 = __importDefault(require("../library/Logging"));
const loggings_1 = __importDefault(require("../library/loggings"));
let NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config_1.config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    Logging_1.default.info(`Attempting to sign token for ${user.name1}`);
    try {
        jsonwebtoken_1.default.sign({
            name1: user.name1
        }, config_1.config.server.token.secret, {
            issuer: config_1.config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        loggings_1.default.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
