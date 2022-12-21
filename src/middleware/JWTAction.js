require('dotenv').config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/product/read', '/login', '/register', '/product/read/1', '/product/read/2', '/product/read/3', '/product/read/4', '/product/read/5', '/product/read/6', '/product/read/7', '/product/read/8', '/product/read/9', '/product/read/10', '/product/read/11', '/product/read/12', '/product/read/13', '/product/read/14', '/product/read/15', '/product/read/16', '/product/read/17', '/product/read/18', '/product/read/19', '/product/read/20'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);

    } catch (error) {
        console.log(err);
    }
    return decoded;
};

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'ユーザーを認証していません'
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'ユーザーを認証していません'
        });
    }
};


const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: '無認可'
            });
        }

        let canAccess = roles.some(item => item.url === currentUrl);  // ham lap tra ve true or false
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: '無認可'
            });
        }

    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'ユーザーを認証していません'
        });
    }
};
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}