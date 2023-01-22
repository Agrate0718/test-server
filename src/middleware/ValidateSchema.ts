import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IUser } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name1: Joi.string().required(),
            name2: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name1: Joi.string().required(),
            name2: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
};
