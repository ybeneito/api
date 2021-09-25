const mongoose = require('mongoose')

const UserModel = mongoose.model(
    'usermodel',
    {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true},
        password: { type: String},
    }, 
    "user"
)

module.exports = UserModel