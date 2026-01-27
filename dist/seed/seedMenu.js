import MenuItemModel from '../models/menuItemModel';
import connectDB from '../dbconfig/db';
const menu = [
    { id: 1, name: "burger", price: 5 },
    { id: 2, name: "pizza", price: 8 },
    { id: 3, name: "salad", price: 4 },
    { id: 4, name: "fries", price: 3 },
    { id: 5, name: "soda", price: 2 },
    { id: 6, name: "coffee", price: 2 }
];
const seed = async () => {
    try {
        connectDB();
        await MenuItemModel.insertMany(menu);
        console.log("Menu items seeded successfully");
    }
    catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};
seed();
