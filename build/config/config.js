"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://Agrate0718:${MONGO_PASSWORD}@cluster0.uplcdaz.mongodb.net/${MONGO_USERNAME}`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_PORT ? Number(process.env.SERVER_TOKEN_EXPIRETIME) : 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_PORT ? String(process.env.SERVER_TOKEN_ISSUER) : 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_PORT ? String(process.env.SERVER_TOKEN_SECRET) : 'superencyptedsecret';
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        token: {
            expireTime: SERVER_TOKEN_EXPIRETIME,
            issuer: SERVER_TOKEN_ISSUER,
            secret: SERVER_TOKEN_SECRET
        }
    }
};
