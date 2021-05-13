const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }

})

//custom method
userSchema.methods.addCart = function(product){
    const carProductIndex = this.cart.items.findIndex(item => {
        return item.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    if(cartProductIndex >= 0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    }else{
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updateCart = {
        items: updatedCartItems
    }

    this.cart = updateCart
    return this.save()
}

userSchema.methods.removeFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString()
    })
    this.cart.items = updatedCartItems
    return this.save()
}
userSchema.methods.clearCart = function(){
    this.cart = {
        items: []
    }
    return this.save()
}


module.exports = mongoose.model('User', userSchema)