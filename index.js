/* Your Code Here */

function createEmployeeRecord(array) {
    let employeeObj = new Object();
    employeeObj.firstName = array[0];
    employeeObj.familyName = array [1];
    employeeObj.title = array[2];
    employeeObj.payPerHour = array[3];
    employeeObj.timeInEvents = [];
    employeeObj.timeOutEvents = []
    return employeeObj;
}

function createEmployeeRecords(array) {
    return array.map(empArr => createEmployeeRecord(empArr));
}

const createTimeInEvent = function(date) {
    const dateArr = date.split(' ');
    let timeInObj = new Object();
    timeInObj.type = "TimeIn";
    timeInObj.hour = parseInt(dateArr[1],10);
    timeInObj.date = dateArr[0];
    this.timeInEvents.push(timeInObj);
    return this;
}

const createTimeOutEvent = function(date) {
    const dateArr = date.split(' ');
    let timeOutObj = new Object();
    timeOutObj.type = "TimeOut";
    timeOutObj.hour = parseInt(dateArr[1],10);
    timeOutObj.date = dateArr[0];
    this.timeOutEvents.push(timeOutObj);
    return this;
}

const hoursWorkedOnDate = function(date) {
    const timeInArr = this.timeInEvents;
    const timeOutArr = this.timeOutEvents;
    for(let i = 0; i < timeInArr.length; i++) {
        if(timeInArr[i].date === date){
            const hoursWorked = (timeOutArr[i].hour - timeInArr[i].hour) / 100;
            return hoursWorked;
        }
    }
}

const wagesEarnedOnDate= function(date) {
    const hoursWorked = hoursWorkedOnDate.bind(this);
    return hoursWorked(date) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeesArr, firstNameString) {
    let obj;
    employeesArr.forEach(employeeObj => {
        if(employeeObj.firstName === firstNameString) {
            obj = employeeObj;
        }
    })
    return obj;
}

function calculatePayroll(employeeArr) {
    const employeeTtlWagesArr = []
    employeeArr.forEach(employeeObj => {
        employeeTtlWagesArr.push(allWagesFor.call(employeeObj));
    })
    return employeeTtlWagesArr.reduce((a, b) => a + b, 0)   
}