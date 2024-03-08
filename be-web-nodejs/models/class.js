const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;


const classSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
    timeStartSemester: {
        type: Date,
        default: '',
    },
    timeEndSemester: {
        type: Date,
        default: '',
    },
    totalSeat: {
        type: Currency,
        required: true,
        min: 0,
    },
    tuition: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        default: 'S',
    },
    // child: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Child', 
    // }]
       // teacher: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'User', 
    // }]
}, {
    timestamps: true
});

var Class = mongoose.model('ClassList', classSchema);
module.exports = Class;