const { buildSchema } = require('graphql');

module.exports =buildSchema(`
type Employee{
    _id  : ID!
    empName : String!
    email : String!
    password : String
    empCode : Int!
    designation : String!
    uan : String
    annualIncome : Float!
    pfAccount : String!
    choosedPFDeduction : Float!
    dateOfJoining:String!
    attendance : [Attendance]

}
type Attendance{
    _id  : ID!
    lop : Int!
    daysInMonth : Int!
    payableDays : Int!
    employee : Employee!
}
type AuthData{
    empCode :Int!
    token: String!
    tokenExpiration: Int!
    empName: String!
}
input  EmployeeInput{
    empName : String!
    email : String!
    password : String!
    empCode : Int!
    designation : String!
    uan : String
    annualIncome : Float!
    pfAccount : String!
    choosedPFDeduction : Float!
    dateOfJoining:String!
}
input AttendanceInput{
    lop : Int!
    daysInMonth : Int!
    payableDays : Int!
}
type RootQuery{
    generatePaslip:[Employee!]!
    attendance:[Attendance!]!
    login(email:String!, password:String!):AuthData!
}

type RootMutation{
    registerEmployee(employeeInput:EmployeeInput):Employee
    updateAttendance(attendanceInput : AttendanceInput): Attendance
}
schema {
    query: RootQuery
    mutation:RootMutation
}
`);