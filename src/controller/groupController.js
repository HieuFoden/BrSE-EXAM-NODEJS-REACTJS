import groupService from '../service/groupService';

const readGroup = async (req, res) => {
    try {
        let data = await groupService.getGroups();
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
    readGroup
};