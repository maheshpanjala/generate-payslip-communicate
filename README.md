# generate-payslip-communicate

# clone repo cd app and npm install 
# create a mongoDB as per configuration's

# do a npm start

# server will start on port 8080

# http://localhost:8080/api-v2 will open GraphiQL 

# to register employee use mutaion 

mutation{
  registerEmployee(employeeInput:{
    empName:"Venkata",
    email:"krve@sonata-software.com",
    empCode:1235,
    password:"test@123",
    designation:"Tech Lead"
    uan:"123456",
    annualIncome:1200000,
    pfAccount:"ABCD123-NZB"
    choosedPFDeduction:3000,
    dateOfJoining:"2022-08-04T14:31:46.281Z"
    
  }){
    _id
    empCode
  }
}

# then update attendance
mutation{
  updateAttendance(attendanceInput:{
    lop:6,
    daysInMonth:31,
    payableDays:26
  }){
    _id
    
  }
}

#finally call generatePaslip this will fetch employee & attendance from DB, calculate tax, communicate/ send an email using nodemailer   

query {
  generatePaslip {
    empName 
    email
    empCode
    password 
    uan
    pfAccount
    annualIncome
    choosedPFDeduction
    attendance{
      lop
      payableDays
      
    }
    _id
  }
}
