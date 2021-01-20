const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorController = require('./controllers/error')
const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('6006413a3d1e2930d1daaa84')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose.connect('mongodb+srv://Sakshi:sakshi123@cluster0.vpzlm.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        // User.findOne(user => {
        //     if (!user) {
        //         const user = new User({
        //             name: 'Sakshi',
        //             email: 'sakshi@abc.com',
        //             cart: {
        //                 items: []
        //             }
        //         })
        //         user.save()
        //     }
        // })
        app.listen(3000)
    })
    .catch(err => {
        console.log('CONNECTION ERR', err)
    })
