const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID

class User {
    constructor(username, email, cart, id) {
        this.username = username
        this.email = email
        this.cart = cart // {items: []}
        this._id = id
    }

    save() {
        const db = getDb()
        return db
            .collection('users')
            .insertOne(this)
            .then()
            .catch(err => console.log(err))
    }

    addToCart(product) {
        const db = getDb()
        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]

        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            })
        }
        const updatedCart = {
            items: updatedCartItems
        }
        return db.collection('users').updateOne(
            { _id: this._id },
            { $set: { cart: updatedCart } }
        )
    }

    getCart() {
        const db = getDb()
        const productIds = this.cart.items.map(i => {
            return i.productId
        })
        return db.collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    console.log('PRODUCT IDS FROM THE CART', p._id)
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
            .catch()
    }

    deleteItemFromCart(prodId) {
        const db = getDb()

        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== prodId.toString()
        })
        return db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: updatedCartItems } } })
    }

    addOrder() {
        const db = getDb()
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.username
                }
            }
            db.collection('orders').insertOne(order)
        })
            .then(result => {
                this.cart = { items: [] }
                return db.collection('users').updateOne(
                    { _id: new ObjectId(this._id) },
                    { $set: { cart: { items: [] } } })
            })
    }

    getOrders() {
        const db = getDb()
        return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray()
    }

    static findById(userId) {
        const db = getDb()

        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then(user => {
                return user
            })
            .catch(err => console.log(err))
    }
}

module.exports = User
