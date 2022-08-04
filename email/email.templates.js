const { CLIENT_ORIGIN } = require('../config')

module.exports = {
  generated: (emp, salary) => ({
    subject: salary.payperiod,
    html: `
    <div>
    <table style= "width:100%; border-collapse: collapse; border: 2px solid rgb(34, 53, 135); margin: 5px 20px;">
    <tr style= " border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><td>Employee Code</td><td>${emp.empCode}</td><td>Employee Name</td><td>${emp.empName}</td></tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><td>Designation</td><td>${emp.designation}</td><td>Date Of Joining</td><td>${emp.dateOfJoining}</td></tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><td>UAN</td><td>${emp.uan}</td><td>PF No.</td><td>${emp.pfAccount}</td></tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><td>Location</td><td>Hyderabad</td><td>No of days/ LOP</td><td> ${salary.noOfDays} / ${salary.lop}</td></tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>${salary.payperiod}</th></tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>Earnings</th><th>Amount</th><th>Deductions</th><th> Amount</th> </tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>Basic</th><td>${salary.basic}</td><th>Profession Tax</th><td> 200</td> </tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>H.R.A</th><td>${salary.hra}</td><th>Provident Fund (PF)</th><td> ${emp.choosedPFDeduction}</td> </tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>Conveyance</th><td>${salary.conveyance}</td><th>Income Tax</th><td> ${salary.incomeTax}</td> </tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th>Gross Earnings</th><td>${salary.grossIncome}</td><th>Gross Deductions</th><td> ${salary.totalDeductions}</td> </tr>
    <tr style= "border-collapse: collapse; border: 2px solid rgb(34, 53, 135); "><th> Net Pay</th><td> ${salary.netIncome}</td></tr>

    </table>
    <hr>
      <a href='${CLIENT_ORIGIN}/download/${emp.empCode}'>
          click here to dowmload payslip        
      </a>
      </div>
    `  })
}