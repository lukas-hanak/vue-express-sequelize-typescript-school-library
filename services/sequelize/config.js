const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../.env')});

const database = {
    seederStorage: 'sequelize',
    dialect: process.env.DIALECT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
};

module.exports.development = database;
module.exports.production = database;
