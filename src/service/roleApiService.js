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

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        });
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
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        });
        if (role) {
            await role.destroy();
        }

        return {
            EM: '権限削除が成功',
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: '権限がありません',
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }     // khong lay bang n-n 
            }
        });

        return {
            EM: 'グループ & 権限取得が成功',
            EC: 0,
            DT: roles
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

const assignRoleToGroup = async (data) => {
    try {
        //data = {groupId:2 , groupRoles : {}, {}}
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        });
        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: 'グループに権限割り当てが成功',
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
    createNewRole, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup
};