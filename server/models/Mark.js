const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarkSchema = new Schema({
    mark: {type: Number, required: true},
    type: { type: Number, enum: [0, 1, 2], required: true},
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

exports.update = async function(markId,data){
    try{
        const mark = await Mark.findByIdAndUpdate(markId, data)
        const result = await Mark.findById(mark._id)
        return result
    }catch(err){
        return err
    }
}
