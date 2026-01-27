import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MenuItemSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
});
export default mongoose.model('MenuItem', MenuItemSchema);
