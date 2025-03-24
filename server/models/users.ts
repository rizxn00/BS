import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
},
  {
    timestamps: {
      createdAt: 'addedAt',
      updatedAt: 'modifiedAt'
    },
  });

const UserModel = model<IUser>("users", UserSchema);

export default UserModel;
