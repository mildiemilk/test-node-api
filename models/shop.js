const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String, default: 'nopic.png' },
  location: {
    lat: Number,
    lgn: Number,
  },
}, {
  toJSON: { virtuals: true },
  timestamps: true, // auto generate createdAt and updatedAt
  collection: 'shops'
});

schema.virtual('menus', {
  ref: 'Menu', // link to model Menu
  localField: '_id', // _id of model Shop
  foreignField: 'shop' // field of model Menu
})

const shop = mongoose.model('Shop', schema)

module.exports = shop;