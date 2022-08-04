const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const attendanceSchema = new Schema({
    lop: {
        type: Number,
        required: true
    },
    daysInMonth: {
        type: Number,
        required: true
    },
    payableDays: {
        type: Number,
        required: true
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }
});

module.exports= mongoose.model("Attendance", attendanceSchema);
