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

const getProductWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit
        });

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPage: totalPages,
            products: rows
        }

        // console.log('>>> check input : offset = ', offset, ' limit = ', limit);
        // console.log('>>> check data : ', data);

        return {
            EM: 'データ取得が成功',
            EC: 0,
            DT: data
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
    getAllProducts, getProductWithPagination
};