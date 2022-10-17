import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';


var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {

    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        });
    } catch (e) {
        console.log('>>check error : ', e);
    };

};

const getUserList = async () => {
    let users = [];
    users = await db.User.findAll();
    return users;

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM `User`');
    //     // console.log('>>>check rows : ', rows);
    //     return rows;
    // } catch (e) {
    //     console.log('>>check error : ', e);
    // };
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    });

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM User WHERE id = ?', [id]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>check error : ', e);
    // };
};

const getUserById = async (userId) => {
    let user = {};
    user = await db.User.findOne(
        { where: { id: userId } }
    );
    return user.get({ plain: true });

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM User WHERE id = ?', [id]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>check error : ', e);
    // };
};
const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: { id: id }
        }
    );

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE User SET email = ?, username = ? WHERE id=?', [email, username, id]);
    //     return rows;
    // } catch (e) {
    //     console.log('>>check error : ', e);
    // };
};
module.exports = { createNewUser, getUserList, deleteUser, getUserById, updateUserInfo };