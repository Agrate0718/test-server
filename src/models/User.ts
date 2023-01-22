import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name1: string;
    name2: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name1: { type: String, required: true },
        name2: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
