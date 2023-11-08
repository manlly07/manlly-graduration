const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarkSchema = new Schema({
    mark: {type: String, required: true},
    type: {type: String, required: true},
    teacherId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}) 

const Mark = mongoose.model('Mark', MarkSchema, 'marks')
exports.schema = Mark