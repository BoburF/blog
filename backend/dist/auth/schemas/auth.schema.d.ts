import * as mongoose from 'mongoose';
export type AuthKey = {
    refreshToken: string;
    userId: string;
};
export declare const UserAuthKeySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    refreshToken: string;
    userId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    refreshToken: string;
    userId: mongoose.Types.ObjectId;
}>> & Omit<mongoose.FlatRecord<{
    refreshToken: string;
    userId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
