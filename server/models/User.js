const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String },
  DOB: { type: Date },
  address: {type: String},
  role: { type: Number, enum: [0, 1, 2], default: 0}
}); 

const User = mongoose.model('User', UserSchema, 'users');
exports.schema = User;