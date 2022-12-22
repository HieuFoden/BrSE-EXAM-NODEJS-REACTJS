import userService from '../service/userService';

const readUser = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM, //ERROR MESSAGE
                EC: data.EC, //error code
                DT: data.DT //data
            });

        } else {
            let data = await userService.getAllUsers();
            return res.status(200).json({
                EM: data.EM, //ERROR MESSAGE
                EC: data.EC, //error code
                DT: data.DT //data
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

const createUser = async (req, res) => {
    try {
        //validate

        let data = await userService.createNewUser(req.body);

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

const updateUser = async (req, res) => {
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

const deleteUser = async (req, res) => {

    try {
        let data = await userService.deleteUser(req.body.id);
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

const getUserAcount = async (req, res) => {
    return res.status(200).json({
        EM: 'ok', //ERROR MESSAGE
        EC: 0, //error code
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    });
};

module.exports = {
    readUser, createUser, updateUser, deleteUser, getUserAcount
};

