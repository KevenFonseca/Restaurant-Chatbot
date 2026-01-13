import mongoose from "mongoose"

const Schema = mongoose.Schema

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
})

export default mongoose.model('MenuItem', MenuItemSchema)