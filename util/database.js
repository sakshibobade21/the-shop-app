// This gives us the database connection pool managed by the sequelize

const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize
