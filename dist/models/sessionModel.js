import mongoose from "mongoose"
const Schema = mongoose.Schema
const SessionSchema = new Schema({
    deviceId: { type: String, required: true },
    currentState: { type: String, required: true },
    temporaryOrder: { type: Array, default: [] },
    currentOrderId: { type: mongoose.Types.ObjectId, ref: 'Order', default: null }
}, {
    timestamps: true
});
export default mongoose.model('Session', SessionSchema)
