// This will return the connection object
// We need to create the connection to execute the query and then close the connection
// Creating new connections all the time to execute other queries becomes inefficient
// Better way is to create the so called connection pool which manages multiple connection
// We get the new connection from the pool everytime we have a query to execute
// We can run multiple queries simultaneously bcoz each query need seperate connection
// Once the query is done the connection is handled back to the pool. And the connection will be made available for the new query

const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'password'
})

module.exports = pool.promise()
