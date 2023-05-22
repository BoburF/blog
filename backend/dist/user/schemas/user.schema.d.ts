/// <reference types="node" />
import * as mongoose from 'mongoose';
export type User = {
    name: string;
    email: string;
    password: string;
    img: Buffer;
    posts: [];
    createdAt: Date;
    updatedAt: Date;
};
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    name: string;
    posts: mongoose.Types.ObjectId[];
    img?: {
        data?: Buffer;
        contentType?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    name: string;
    posts: mongoose.Types.ObjectId[];
    img?: {
        data?: Buffer;
        contentType?: string;
    };
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    name: string;
    posts: mongoose.Types.ObjectId[];
    img?: {
        data?: Buffer;
        contentType?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
