const { lstat } = require('fs');

const Student = require('./student.model')
const { loadFile, saveFile, getKeyboardInputValid } = require('./utils');


const STUDENT_LIST_EMPTY = "Student list is empty"



function displayListStudent(list) {
    let strDisplay = STUDENT_LIST_EMPTY;
    if (list.length > 0) {
        strDisplay = `The list has a ${list.length} students: \n`;
        for (let i = 0; i < list.length; i++) {
            strDisplay += `${i + 1}. ${list[i].toString()}\n`
        }
    }
    console.log(strDisplay);
}
async function getListStudentFromFile(path) {
    try {
        const studentListJson = await loadFile(path);
        if (!Array.isArray(studentListJson)) {
            console.log("Invalid data format. Expected an array.");
            return []
        }

        let studentList = getStudentsFromJson(studentListJson);
        console.log(`Load from file : ${studentList.length} success`);
        let failed = studentListJson.length - studentList.length;
        if (failed > 0) {
            console.log(`load failed: ${failed} students due to invalid data.`);
        }
        return studentList;
    } catch (error) {
        console.log("Error loading student list from file:", path);
        return [];
    }
}

function getStudentsFromJson(json) {
    let students = []
    for (let i = 0; i < json.length; i++) {
        let data = json[i];
        if (!Student.validateStudent(data.id, data.name, data.age, data.grade)) {
            console.log(`Invalid student data at index ${i}: ${JSON.stringify(data)}`);
            continue;
        }
        students.push(Student.fromJSON(data))
    }
    return students
}

async function saveListStudentToFile(path, list) {
    if (list.length === 0) {
        console.log(STUDENT_LIST_EMPTY);
        console.log("No data to save.");
        return;
    }
    try {
        await saveFile(path, list);
        console.log(`Student list saved successfully ${path}`);
    } catch (error) {
        console.error("Error saving student list to file:", path);
    }
}

function getClassification(list) {
    let excellent = 0;
    let good = 0;
    let average = 0;
    for (const student of list) {
        if (student.grade >= 8) {
            excellent++;
        } else if (student.grade >= 6.5) {
            good++;
        } else {
            average++;
        }
    }
    return {
        excellent: excellent,
        good: good,
        average: average
    }
}
function getAverageGrade(list) {
    let total = 0;
    for (const student of list) {
        total += student.grade
    }
    return total / list.length
}

function displayStatistics(list) {
    if (list.length > 0) {
        let statistics = getClassification(list);
        let total = list.length;
        let average = getAverageGrade(list);
        console.log(`Total students: ${total}`);
        console.log(`Average grade: ${average}`);
        console.log(`Classification: `);
        console.log(`\tExcellent: ${statistics.excellent}`);
        console.log(`\tGood: ${statistics.good}`);
        console.log(`\tAverage: ${statistics.average}`);
    } else {
        console.log(STUDENT_LIST_EMPTY)
    }
}

async function getStudentFromInput() {
    let id = await getKeyboardInputValid(Student.validateId, "id: ", "Invalid ID. Please enter a positive integer.", true)
    let name = await getKeyboardInputValid(Student.validateName, "name: ", "Invalid name. Please enter a non-empty string.")
    let age = await getKeyboardInputValid(Student.validateAge, "age: ", "Invalid age. Please enter a positive integer.", true)
    let grade = await getKeyboardInputValid(Student.validateGrade, "grade: ", "Invalid grade. Please enter a number between 0 and 10.", true)
    return new Student(id, name, age, grade)
}

async function findStudentsFromInput(list) {
    let searchName = await getKeyboardInputValid(Student.validateName, "Enter search name:", "Invalid name. Please enter a non-empty string.")
    let results = findStudentsFromName(list, searchName)
    if (results.length > 0) {
        displayListStudent(results)
    } else {
        console.log(`No students found with name: ${searchName} `);
    }
}

function findStudentsFromName(list, name) {
    return list.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
}

async function createStudentFromInput(list) {
    let student = await getStudentFromInput();
    if (list.some(e => e.id === student.id)) {
        console.log("Duplicate ID. Please enter a unique one.");
    }
    else {
        list.push(student)
        console.log("Student added successfully.");
        displayListStudent(list)
    }
}



const names = ['Alice', 'Bob', 'Charlie', 'Daisy', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ivan', 'Jenny'];
function createFakeListStudent() {
    let students = []
    for (let i = 0; i < 10; i++) {
        const id = i + 1;
        const name = names[Math.floor(Math.random() * names.length)];
        const age = Math.floor(Math.random() * 5) + 18; // tuổi từ 18 đến 22
        const grade = Math.floor(Math.random() * 10);
        const student = new Student(id, name, age, grade);
        students.push(student);
    }
    return students
}

module.exports = {
    createFakeListStudent,
    displayListStudent,
    createStudentFromInput,
    findStudentsFromInput,
    displayStatistics,
    getListStudentFromFile,
    saveListStudentToFile,
}
