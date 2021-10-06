const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email :{ type: String , require: true},
    password: { type:String , require: true }
}, 
{ collection : 'users'}
)
const model = mongoose.model('userSchema', userSchema);

module.exports = model