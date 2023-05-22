import * as mongoose from 'mongoose';
export type Post = {
    title: string;
    body: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    comments: {
        userId: string;
        text: string;
    }[];
};
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    title: string;
    body: string;
    comments: {
        text: string;
        userId: mongoose.Types.ObjectId;
    }[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    title: string;
    body: string;
    comments: {
        text: string;
        userId: mongoose.Types.ObjectId;
    }[];
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: mongoose.Types.ObjectId;
    title: string;
    body: string;
    comments: {
        text: string;
        userId: mongoose.Types.ObjectId;
    }[];
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
