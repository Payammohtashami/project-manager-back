const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        text: {type: String},
        team: {type: mongoose.Types.ObjectId},
        title: {type: String, required: true},
        owner: {type: mongoose.Types.ObjectId, required: true},
        image: {type: String, default: '/defualt/default.png'},
        private: {type: Boolean, default: true},
    },
    {
        timestamps: true
    }
);

const ProjectModel = mongoose.model('project', ProjectSchema);
module.exports = {
    ProjectModel,
};