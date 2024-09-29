import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface TfaType extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  interaction: string;
  used: boolean;
  usage_code: string;
  expiration: Date;
}

const tfaSchema = new Schema<TfaType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    interaction: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      required: false,
      default: false,
    },
    usage_code: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Tfa = mongoose.model<TfaType>("tfa", tfaSchema);
