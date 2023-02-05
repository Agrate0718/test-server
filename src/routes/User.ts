import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import extractJWt from '../middleware/extractJWT';

const router = express.Router();

// router.post('/create', ValidateSchema(Schemas.user.create), controller.createUser);
// router.get('/get/:userId', controller.readUser);
// router.get('/get/', controller.readAll);
// router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
// router.delete('/delete/:userId', controller.deleteUser);

router.get('/validate', extractJWt, ValidateSchema, controller.validateToken);
router.post('/register', ValidateSchema, controller.register);
router.post('/login', ValidateSchema, controller.login);
router.get('/get/all', controller.getAllusers);
router.get('/delete/:name1', controller.deleteUser);

export = router;
