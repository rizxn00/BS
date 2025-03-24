import { Schema, model, Document, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  authorId: Types.ObjectId;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "users", required: true },
},
  {
    timestamps: {
      createdAt: 'addedAt',
      updatedAt: 'modifiedAt'
    },
  });

const BlogModel = model<IBlog>("blogs", BlogSchema);

export default BlogModel;
