import db from "../models/index";
import { checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterService';


const getAllUsers = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        });
        if (users) {
            // console.log('>>>check user', users);
            return {
                EM: 'データ取得が成功',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'データ取得が成功',
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

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'address', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            order: [['id', 'DESC']]
        });

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        };

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

const createNewUser = async (data) => {
    try {
        // check email/ phonenumber are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: '登録したメールは存在してます',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: '登録した電話番号は存在してます',
                EC: 1,
                DT: 'phone'
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: '追加が成功',
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

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'グループはありません',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        });
        if (user) {
            //update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            });
            return {
                EM: '編集成功です',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'グループはありません',
                EC: 2,
                DT: ''
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

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            await user.destroy();
            return {
                EM: 'ユーザ削除が成功',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'ユーザーが存在しません',
                EC: 2,
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
    getAllUsers, createNewUser, updateUser, deleteUser, getUserWithPagination
};