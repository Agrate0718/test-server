"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const info = (namespace, message, object) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    }
    else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(chalk_1.default.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
    }
    else {
        console.error(chalk_1.default.red(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    }
    else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};
const getTimeStamp = () => {
    return new Date().toISOString();
};
exports.default = {
    info,
    warn,
    error,
    debug
};
