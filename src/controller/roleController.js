import roleApiService from '../service/roleApiService';
import userService from '../service/userService';
const readRole = async (req, res) => {
    try {

        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM, //ERROR MESSAGE
            EC: data.EC, //error code
            DT: data.DT //data
        });
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

const createRole = async (req, res) => {
    try {
        //validate

        let data = await roleApiService.createNewRole(req.body);

        return res.status(200).json({
            EM: data.EM, //ERROR MESSAGE
            EC: data.EC, //error code
            DT: data.DT //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

const updateRole = async (req, res) => {
    try {
        try {
            //validate

            let data = await userService.updateUser(req.body);

            return res.status(200).json({
                EM: data.EM, //ERROR MESSAGE
                EC: data.EC, //error code
                DT: data.DT //data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                EM: 'error from server', //ERROR MESSAGE
                EC: '-1', //error code
                DT: '' //data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

const deleteRole = async (req, res) => {

    try {
        let data = await roleApiService.deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM, //ERROR MESSAGE
            EC: data.EC, //error code
            DT: data.DT //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM, //ERROR MESSAGE
            EC: data.EC, //error code
            DT: data.DT //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM, //ERROR MESSAGE
            EC: data.EC, //error code
            DT: data.DT //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

module.exports = {
    readRole, createRole, updateRole, deleteRole, getRoleByGroup, assignRoleToGroup
};

