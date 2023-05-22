import * as mongoose from 'mongoose';

export type Post = {
  title: string;
  body: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  comments: { userId: string; text: string }[];
};

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);
