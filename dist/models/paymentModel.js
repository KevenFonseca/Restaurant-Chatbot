import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    orderId: { type: mongoose.Types.ObjectId, ref: 'Order', required: true },
    reference: { type: String, require: true },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
}, {
    timestamps: true
});
export default mongoose.model('Payment', PaymentSchema);
