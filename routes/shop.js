const express = require('express');
// const productsController = require('../controllers/product')
const shopCotroller = require('../controllers/shop')

const router = express.Router();

router.get('/', shopCotroller.getProducts);

router.get('/show-product/:id', shopCotroller.getOneProductById)

router.get('/cart', shopCotroller.getCart)

router.post('/cart', shopCotroller.postCart)

router.post('/cart-delete-item', shopCotroller.postCartDeleteProduct)


module.exports = router;