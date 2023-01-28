"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const router = express_1.default.Router();
// router.post('/create', ValidateSchema(Schemas.user.create), controller.createUser);
// router.get('/get/:userId', controller.readUser);
// router.get('/get/', controller.readAll);
// router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
// router.delete('/delete/:userId', controller.deleteUser);
router.get('/validate', extractJWT_1.default, User_1.default.validateToken);
router.post('/register', User_1.default.register);
router.post('/login', User_1.default.login);
router.get('/get/all', User_1.default.getAllusers);
module.exports = router;
