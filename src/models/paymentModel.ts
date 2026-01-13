import mongoose from "mongoose"

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
  orderId: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
  timestamps: true
})

export default mongoose.model('Payment', PaymentSchema)