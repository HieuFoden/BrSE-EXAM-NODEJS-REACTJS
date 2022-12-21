import loginRegisterService from '../service/loginRegisterService'

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: '全てのフィルードは必須です', //ERROR MESSAGE
                EC: '1', //error code
                DT: '' //data
            });
        };

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'パスワードとパスワード確認の長さが 3 文字以上の必要がある', //ERROR MESSAGE
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
    };
};

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        //set cookie
        if (data && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });  //express : res.cookie
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log('>>> check error : ', error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};
module.exports = {
    handleRegister, handleLogin
};