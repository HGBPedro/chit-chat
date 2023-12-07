import mongoose, { Schema } from "mongoose";
import { IConversation } from "./interfaces";

const conversationSchema = new Schema<IConversation>({
  code: String,
  messages: [{
    sender: String,
    text: String,
    media: { type: String, required: false }
  }]
})

const Conversation = mongoose.model<IConversation>('Conversations', conversationSchema)

export default Conversation
