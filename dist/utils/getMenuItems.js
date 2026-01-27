import menuItemModel from "../models/menuItemModel";
const getMenuItems = async () => {
    try {
        const menuItens = await menuItemModel.find({ isAvailable: true });
        return menuItens;
    }
    catch (err) {
        throw new Error('Error fetching menu items');
    }
};
export { getMenuItems };
