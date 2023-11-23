const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarkSchema = new Schema({
    mark: {type: String, required: true},
    type: {type: String, required: true},
    teacherId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date_created: Date
}) 

const Mark = mongoose.model('Mark', MarkSchema, 'marks')
exports.schema = Mark

exports.create = async function(teacherId,mark){
    const data = {
        mark: mark.mark,
        type: mark.type,
        teacherId: teacherId,
        date_created: new Date()
    }
    const newMark = Mark(data)
    await newMark.save()
    return newMark
} 

exports.get = async function(markId){
    try{
        const mark = await Mark.findById(markId)
        return mark
    }catch(err){
        return err
    }
}