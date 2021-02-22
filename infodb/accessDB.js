const Sequelize = require("sequelize");

const userDB = process.env.USERDB;
const dB = process.env.USERDB;
const dBpass = process.env.PASSDB;
const url = process.env.SERVDB;

const sequelize = new Sequelize(dB, userDB, dBpass,{
    host: url,
    dialect: 'mysql',
    pool:{
        max:3,
        min:0,
        require:30000,
        idle:10000
    },
    logging: false
});


const books = require('../models/modelsDB/books/booksModel');
const genBook =  require('../models/modelsDB/books/cateBooksModel');
const users = require('../models/modelsDB/users/userModel');
const rolesUser =  require('../models/modelsDB/users/roleModel');
const loans = require('../models/modelsDB/loans/loansModel');


const bookSeque = books(sequelize, Sequelize);
const genbookSeque = genBook(sequelize, Sequelize);
const usersSeque = users(sequelize, Sequelize);
const roleUsersSeque = rolesUser(sequelize, Sequelize);
const loansSeque = loans(sequelize, Sequelize);


sequelize.sync({alter: true})
         .then(()=>{
             console.log('tabla actualizada')
         })
         .catch((err)=>{
             console.log(`Error: ${err}`);
         });
         
module.exports = {
    bookSeque,
    genbookSeque,
    usersSeque,
    roleUsersSeque,
    loansSeque
}         