const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  addresses: {
    no: String,
  },
}, { collection: 'companys' });

const company = mongoose.model('Company', schema)

module.exports = company;