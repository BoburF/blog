import * as mongoose from 'mongoose';

export type AuthKey = {
  refreshToken: string;
  userId: string;
};

export const UserAuthKeySchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});
