const getDB = require('../util/database').getDB
const mongodb = require('mongodb')

module.exports = class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }

  save() {
    const db = getDB()
    return db.collection('products').insertOne(this)  
  }

  edit(id){
    const db = getDB()
    return db
      .collection('products')
      .updateOne({ _id: mongodb.ObjectID(id) }, {$set: this})
  }

  static fetchAll() {
    const db = getDB()
    return db.collection('products').find().toArray()
  }

  static findById(id) {
    const db = getDB()
    // return db.collection('products').find({ _id: mongodb.ObjectID(id) }).next()
    return db.collection('products').findOne({ _id: mongodb.ObjectID(id) })
  }

  static deleteById(id) {
    const db = getDB()
    return db.collection('products').deleteOne({_id: mongodb.ObjectID(id)})
  }
}
