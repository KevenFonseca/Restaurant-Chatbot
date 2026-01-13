import MenuItemModel from '../models/menuItemModel'
import connectDB from '../dbconfig/db'

const menu = [
    { name: "burger", price: 5},
    { name: "pizza", price: 8},
    { name: "salad", price: 4},
    { name: "fries", price: 3},
    { name: "soda", price: 2},
    { name: "coffee", price: 2}
]

const seed = async () => {
    try {
        connectDB()
        await MenuItemModel.insertMany(menu)
        console.log("Menu items seeded successfully")
    } catch (err) {
        console.error("Seeding failed:", err)
        process.exit(1)
    }
}

seed()
