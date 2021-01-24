const express = require('express')
const { body } = require('express-validator')

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct)

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product',
  [
    body('title', 'Title must be at least 3 characters long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL().withMessage('Enter valid Url'),
    body('price').isFloat().withMessage('Enter valid price'),
    body('description')
      .isLength({ min: 3, max: 400 })
      .trim()
      .withMessage('Enter valid description')
  ]
  , isAuth, adminController.postAddProduct)

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)

router.post('/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 3, max: 400 })
      .trim()
  ], isAuth, adminController.postEditProduct)

router.post('/delete-product', isAuth, adminController.postDeleteProduct)

module.exports = router
