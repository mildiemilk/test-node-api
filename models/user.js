const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, index: true },
  password: { type: String, required: true, trim: true, minlength: 3 },
  role: { type: String, default: 'member' }
}, { collection: 'users' });

schema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
}

const user = mongoose.model('User', schema)

module.exports = user;