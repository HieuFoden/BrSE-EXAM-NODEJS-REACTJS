import db from "../models/index";

const getGroupWithRoles = async (user) => {         //sau khi dang nhap dua vao group de lay ra cac role
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ['id', 'name', 'description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through: { attributes: [] }     // khong lay bang n-n 
        }
    });

    return roles ? roles : {};
};

module.exports = {
    getGroupWithRoles
};