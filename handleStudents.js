const STUDENT_LIST_EMPTY = "Student list is empty"
const Student = require('./student.model')
module.export = function DisplayListStudents(list){
    let strDisplay= "";
    for (const student of list) {
        strDisplay += `\n ${student.toString()}`
    }
    console.log(strDisplay);
}



// check is list studen