import db from "../models/index";

const getGroups = async () => {
    try {
        let data = await db.Group.findAll();
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
    getGroups
};