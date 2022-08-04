const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Attendance = require('../../models/attendance');

const Employee = require('../../models/employee');

const { employees, calculateSalaryAndCommunicate, transformAttendance } = require('./utils');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    registerEmployee: async (args) => {
        try {
            const email = args.employeeInput.email;
            const exisrtingEmployee = await Employee.findOne({ email: email })
            if (exisrtingEmployee) {
                throw new Error("Employee exists already.");
            }
            const hashedPwd = await bcrypt.hash(args.employeeInput.password, 12);
            const employee = new Employee({
                empName: args.employeeInput.empName,
                email: email,
                empCode: args.employeeInput.empCode,
                designation: args.employeeInput.designation,
                password: hashedPwd,
                uan: args.employeeInput.uan,
                pfAccount: args.employeeInput.pfAccount,
                annualIncome: args.employeeInput.annualIncome,
                choosedPFDeduction: args.employeeInput.choosedPFDeduction,
                dateOfJoining: new Date(args.employeeInput.dateOfJoining).toISOString()
            });
            const result = await employee.save();
            console.log(" Employee email after save :: " + email);
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        };
    },
    updateAttendance:async (args, req) =>{
        console.log("request "+req)
        const empId = "62eb9194c5f93779a925cddc";
        const attendance = new Attendance({
            lop: args.attendanceInput.lop,
            daysInMonth: args.attendanceInput.daysInMonth,
            payableDays: args.attendanceInput.payableDays,
            employee: empId
        });
        let createdAttendance;
        try {
            const result = await attendance.save()
            createdAttendance = transformAttendance(attendance);
            const employee = await Employee.findById({"_id": ObjectId(empId)});

            if (!employee) {
                throw new Error("Unable to find User");
            }
            console.log("employee code"+ employee.empCode);
            employee["attendance"].push(attendance);
            await employee.save()
            return createdAttendance;
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const employee = await Employee.findOne({ email: email });
        console.log("employeee Email" + email + " password : " + password);
        if (!employee) {
            throw new Error("Employee does not exist!");
        }
        const isEqual = await bcrypt.compare(password, employee.password);
        if (!isEqual) {
            throw new Error("Password is incorrect");
        }
        const token = jwt.sign({ empCode: employee.empCode, email: employee.email }, "ouNZoWBYIrioDcAIl2iGIJniy1FnXiX", {
            expiresIn: '1h'
        });
        return { empCode: employee.empCode, token: token, tokenExpiration: 1, empName: employee.empName };
    },
    generatePaslip: async ({ email }) => {
        try {
            const employeeList = await employees();

            if (!employeeList) {
                throw new Error("Unable to fetch employees!");
            }
            const empLength = employeeList.length;
            let i = 0;
            for (; i < empLength; i++) {
                calculateSalaryAndCommunicate(employeeList[i]);
            }
            return employeeList;
        } catch (err) {
            throw err;  
        };
    }
}