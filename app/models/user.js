const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        userName: {type: String, required: true, unique: true},
        mobile: {type: String, required: true, unique: true},
        role: {type: String, default: ['USER']},
        email: {type: String, required: true, unique: true},
        password: {type: String, unique: true},
        skills: {type: String, default: []},
        teams: {type: String, default: []},
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('user', UserSchema);
module.exports = {
    UserModel,
};