const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        users: {type: [mongoose.Types.ObjectId], default: []},
        owner: {type: mongoose.Types.ObjectId, required: true},
        description: {type: String},
    },
    {
        timestamps: true
    }
);

const TeamModel = mongoose.model('team', TeamSchema);
module.exports = {
    UserModel,
};