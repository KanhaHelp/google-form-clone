var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  guestId: String,
  userType: String,
  image: {type: String},
  createdForms: []
 }, {timestamps: true});

UserSchema.plugin(mongoosePaginate);
User = mongoose.model('User', UserSchema, 'Users');
module.exports = User;