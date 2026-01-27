import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    sessionId: { type: mongoose.Types.ObjectId, ref: 'Session', required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
    items: [{
        menuItemId: { type: mongoose.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true, min: 0 }
}, {
    timestamps: true
})

export default mongoose.model('Order', OrderSchema)