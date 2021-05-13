const Product = require('../models/Products')

exports.getAddProducts = (req,res,next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add a product',
        editing: false
    })
}

exports.postAddProduct = (req,res,next) => {
    const product = new Product( 
       {title: req.body.title, 
        price: req.body.price, 
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.user
    })
    product.save().then(()=>{
        res.redirect('/')
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode){
        return res.redirect('/')
    }
    Product.findById(req.params.productId).then((product) => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        })
    }).catch(err => console.log(err))
    
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updateTitle = req.body.title
    const updatePrice = req.body.price
    const updateDesc = req.body.description
    const updateImageUrl = req.body.imageUrl

    Product.findById(prodId).then(product =>{
        product.title = updateTitle,
        product.price = updatePrice,
        product.description = updateDesc,
        product.imageUrl = updateImageUrl
        return product.save()
    }).then(()=>{
        res.redirect('/')
    }).catch(err=>console.log(err))

  

}

exports.deleteProduct = (req,res,next) => {
    const prodId = req.body.productId
    Product.findOneAndRemove(prodId).then(() => {
        res.redirect('/')

    }).catch(err=>console.log(err))
}

