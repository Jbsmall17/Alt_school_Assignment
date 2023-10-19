const mongoose = require("mongoose")
const shortid = require('shortid');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender:  { 
        type: String, 
        required: true, 
        enum: ['male', 'female'] 
      },
    created_at: { type: Date, default: new Date() },
    user_type: { type: String, default: 'user' }, 
  });

//before save

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
  
    user.password = hash;
    next();
  })

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel
