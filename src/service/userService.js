import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


var salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {

    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('INSERT INTO Users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
        // console.log('>>>check rows : ', rows);
        return rows;
    } catch (e) {
        console.log('>>check error : ', e);
    };

};

const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM `Users`');
        // console.log('>>>check rows : ', rows);
        return rows;
    } catch (e) {
        console.log('>>check error : ', e);
    };
};

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM Users WHERE id = ?', [id]);
        return rows;
    } catch (e) {
        console.log('>>check error : ', e);
    };
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Users WHERE id = ?', [id]);
        return rows;
    } catch (e) {
        console.log('>>check error : ', e);
    };
};
const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'JWT', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('UPDATE Users SET email = ?, username = ? WHERE id=?', [email, username, id]);
        return rows;
    } catch (e) {
        console.log('>>check error : ', e);
    };
};

module.exports = { createNewUser, getUserList, deleteUser, getUserById, updateUserInfo };