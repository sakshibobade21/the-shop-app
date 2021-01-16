const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    console.log("RESULT : PRODUCT CREATED");
    res.redirect('/admin/products');
  })
    .catch(err => {
      console.log("ERROR : ",err);
    })

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  req.user.getProducts({where: {id:prodId}})
  // Product.findByPk(prodId)
    .then(products => {
      if (!products[0]) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[0]
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Product.update({title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc}, {where: {id: prodId}})
  //   .then(() = {
  //        res.redirect('/admin/products');
  // })
  //   .catch(err => {
  //     console.log("ERROR",err);
  //   })

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log("RESULT: ", result)
      res.redirect('/admin/products');
    })
    .catch(err => {
          console.log("ERROR : ",err);
    })

};

exports.getProducts = (req, res, next) => {

  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.destroy({where: { id: prodId}})
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })

  // Product.findByPk(prodId)
  //   .then(product => {
  //     return product.destroy();
  //   })
  //   .then(() => {
  //       res.redirect('/admin/products');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

};

