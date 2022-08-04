const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    empName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empCode: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    uan: {
        type: String,
        required: true
    },
    pfAccount: {
        type: String,
        required: true
    },
    annualIncome: {
        type: Number,
        required: true
    },
    choosedPFDeduction: {
        type: Number,
        required: true
    },
    dateOfJoining:{
        type: Date,
        required: true
    },
    attendance:[{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }]
});

module.exports = mongoose.model("Employee", employeeSchema);
