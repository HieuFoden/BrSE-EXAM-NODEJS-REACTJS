import db from "../models/index";

const getAllProducts = async () => {

    try {
        let products = await db.Product.findAll();
        if (products) {
            // let data = users.get({ plain: true });
            return {
                EM: 'get data success',
                EC: 0,
                DT: products
            }
        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'サーバーには何かエラーがある',
            EC: 1,
            DT: []
        }
    }
};

module.exports = {
    getAllProducts
};