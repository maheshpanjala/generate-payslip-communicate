const DataLoader = require('dataloader');
const Attendance = require('../../models/attendance');
const sendEmail = require('../../email/email.send');
const templates = require('../../email/email.templates');
const Employee = require('../../models/employee');
const { dateToString } = require('../../helpers/date');

const attendanceLoader = new DataLoader(attendanceIds => {
    return attendance(attendanceIds);
});

const employeeLoader = new DataLoader(empIds => {
    return Employee.find({ _id: { $in: empIds } });
});

const employee = async empCode => {
    try {
        const empCode = await employeeLoader.load(empCode.toString());
        return {
            ...employee._doc,
            _id: employee.id,
            date: dateToString(employee._doc.date),
            attendance: () => attendanceLoader.loadMany(employee._doc.attendance)
        }
    } catch (err) {
        throw err;
    }

};

const transformAttendance = attendance => {
    return {
        ...attendance._doc,
        _id: attendance.id,
        employee: employee.bind(this, attendance.employee)
    };
};

const attendance = async attendanceIds => {
    try {
        const attendanceM = await Attendance.find({ _id: { $in: attendanceIds } })
        attendanceM.sort((a, b) => {
            return (
                attendanceIds.indexOf(a._id.toString()) - attendanceIds.indexOf(b._id.toString())
            );
        });

        return attendanceM.map(attendance => {
            return transformAttendance(attendance);
        })
    } catch (err) {
        throw err;
    }
}
const getTax = annualBasic =>{
    let tax;
    
    // can write any logic to calculate 

    tax = 60000 + (annualBasic - 180000) * 0.45;
    
    return tax;

}
const calculateSalary = (attendance, emp) =>{
    let salary = {};
    const annualBasic = 590000;
    salary["payperiod"] = "Payfor the month of July 2022";
    salary["professionalTax"] = 200;
    salary["lop"] = 6;
    salary["noOfDays"] =31;

    let tax = getTax(590000);
    
    salary["grossIncome"] = Math.round( emp.annualIncome /12);
    salary["basic"] = Math.round( annualBasic /12);
    salary["hra"] =  Math.round(salary.basic * 0.7);
    salary["conveyance"] = salary.grossIncome - salary.basic - salary.hra;

    salary["incomeTax"] = Math.round(tax/12);
    salary["totalDeductions"] = salary["incomeTax"]+emp.choosedPFDeduction+salary["professionalTax"];
    salary["netIncome"] = salary["grossIncome"] - salary.totalDeductions;
    
   return salary;

}
const calculateSalaryAndCommunicate = async emp =>{
    console.log("attendance data "+emp.attendance);
    const salary = calculateSalary(emp.attendance, emp);
   const confirmationStatus = await sendEmail(emp.email, templates.generated(emp,salary));
   // console.log("email sent"+confirmationStatus);
}
const employees = async () => {
    try {
        const employees = await Employee.find()
        return employees.map(employee => {
            const emp = {
                ...employee._doc,
                 password: null,
                _id: employee.id,
                attendance: attendance.bind(this, employee._doc.attendance)
            };
            console.log("attendance data in map "+emp.attendance);
            return emp;
        })
    } catch (err) {
        throw err;
    }
}

exports.employees = employees;
exports.calculateSalaryAndCommunicate = calculateSalaryAndCommunicate;
exports.transformAttendance = transformAttendance;