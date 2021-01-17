const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

let _db

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Sakshi:sakshi123@cluster0.vpzlm.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            _db = client.db()
            callback()
        })
        .catch(err => {
            throw err
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    // throw 'No Database Found!'
    throw new Error()
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
