const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
}, {
  toJSON: { virtuals: true },
  timestamps: true, // auto generate createdAt and updatedAt
  collection: 'menus'
});

schema.virtual('price_vat').get(function () {
  return (this.price * 0.07) + this.price
})

const menu = mongoose.model('Menu', schema)

module.exports = menu;