import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        messsage: 'ok',
        data: 'test api'
    });
};

const handleRegister = async (req, res) => {
    try {
        if(!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', //ERROR MESSAGE
                EC: '1', //error code
                DT: '' //data
            });
        }; 

        if(req.body.password && req.body.password.length <4){
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters', //ERROR MESSAGE
                EC: '1', //error code
                DT: '' //data
            });
        };
// server : create user
let data = await loginRegisterService.registerNewUser(req.body);

return res.status(200).json({
    EM: data.EM, //ERROR MESSAGE
    EC: data.EC, //error code
    DT: '' //data
});


    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
    console.log('>>>callme', req.body);
};
module.exports = {
    testApi, handleRegister
};