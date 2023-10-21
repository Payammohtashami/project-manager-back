const mongoose = require('mongoose');

const InviteRequest = new mongoose.Schema({
    teamId: {type: mongoose.Types.ObjectId, require: true},
    caller: {type: String, require: true, lowercase: true,},
    requsetDate: {type: Date, default: new Date()},
    status: {type: String, default: 'PENDING'} // PENDING, REJECTED, ACCEPTED
});

const UserSchema = new mongoose.Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        username: {type: String, required: true, unique: true, lowercase: true,},
        mobile: {type: String, required: true, unique: true},
        role: {type: [String], default: ['USER']},
        email: {type: String, required: true, unique: true, lowercase: true,},
        password: {type: String, unique: true},
        profile_image: {type: String},
        skills: {type: [String], default: []},
        teams: {type: [mongoose.Types.ObjectId], default: []},
        inviteRequest: {type: [InviteRequest]}
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('user', UserSchema);
module.exports = {
    UserModel,
};