import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import loggings from '../library/loggings';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('Token validated, user authorized');

    return res.status(200).json({
        message: 'Authorized'
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { name1, password, name2, email } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const user: any = new User({
            _id: new mongoose.Types.ObjectId(),
            name1,
            name2,
            email,
            password: hash
        });

        return user
            .save()
            .then((user: any) => res.status(201).json({ user }))
            .catch((error: any) => res.status(500).json({ error }));
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { name1, password } = req.body;

    User.find({ name1 })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    loggings.error(NAMESPACE, error.message, error);
                    return res.status(401).json({
                        message: 'Unauthorized'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            loggings.error(NAMESPACE, ' Unable to sign token:', _error);

                            return res.status(401).json({
                                messsage: 'Unauthorized',
                                error: _error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Auth Successful',
                                token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllusers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const name1 = req.params.name1;
    console.log('name1:', name1);

    return User.findOneAndDelete({ name1: name1 })
        .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { validateToken, register, login, getAllusers, deleteUser };

// const createUser = (req: Request, res: Response, next: NextFunction) => {
//     const { name1, name2, email, password } = req.body;

//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name1,
//         name2,
//         email,
//         password
//     });

//     return user
//         .save()
//         .then((user) => res.status(201).json({ user }))
//         .catch((error) => res.status(500).json({ error }));
// };

// const readUser = (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params.userId;

//     return User.findById(userId)
//         .then((user) =>
//             user
//                 ? res.status(200).json({ user })
//                 : res.status(404).json({
//                       message: 'Not found'
//                   })
//         )
//         .catch((error) => res.status(500).json({ error }));
// };

// const readAll = (req: Request, res: Response, next: NextFunction) => {
//     return User.find()
//         .then((users) => res.status(200).json({ users }))
//         .catch((error) => res.status(500).json({ error }));
// };
// const updateUser = (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params.userId;

//     return User.findById(userId)
//         .then((user) => {
//             if (user) {
//                 user.set(req.body);

//                 return user
//                     .save()
//                     .then((user) => res.status(201).json({ user }))
//                     .catch((error) => res.status(500).json({ error }));
//             } else {
//                 res.status(404).json({ message: 'Not found' });
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };
// const deleteUser = (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params.userId;

//     return User.findByIdAndDelete(userId)
//         .then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

// export default { createUser, readUser, readAll, updateUser, deleteUser };
