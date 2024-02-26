import mongoose, { Types } from "mongoose";

export interface IMessage {
  _id?: mongoose.ObjectId
  sender: string
  text: string
  media?: string
}

export interface IConversation {
  _id?: mongoose.ObjectId
  code: string
  messages: Types.DocumentArray<IMessage> | []
  createdAt?: Date
  updatedAt?: Date
}
