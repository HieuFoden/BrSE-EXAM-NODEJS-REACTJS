import db from '../models/index';

const createNewRole = async (roles) => {
    try {

        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });

        const results = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)); // so sanh lay ra cac role chua xuat hien
        if (results.length === 0) {
            return {
                EM: '役割が存在しました',
                EC: 1,
                DT: []
            }
        }
        await db.Role.bulkCreate(results);
        return {
            EM: `${results.length}役割追加が成功しました`,
            EC: 0,
            DT: []
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
    createNewRole
};