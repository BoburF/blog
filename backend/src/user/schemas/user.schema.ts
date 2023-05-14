import * as mongoose from 'mongoose';

export type User = {
  name: string;
  email: string;
  password: string;
  img: Buffer;
  posts: [];
};

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
      },
    ],
  },
  { timestamps: true },
);
