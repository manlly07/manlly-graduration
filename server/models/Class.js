const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    className: { type: String, required: true },
    listUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    date_created: Date
})

const Class = mongoose.model('Class', ClassSchema, 'classes')
exports.schema = Class