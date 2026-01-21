import mongoose from "mongoose"

const Schema = mongoose.Schema

const SessionSchema = new Schema({
  deviceId: { type: String, required: true },
  currentState: { type: String, required: true },
  temporaryOrder: { type: Array, default: [] }
},{
    timestamps: true
})

export default mongoose.model('Session', SessionSchema)