const { displayListStudent, createFakeListStudent, createStudentFromInput, findStudentsFromInput, displayStatistics, saveListStudentToFile, getListStudentFromFile } = require('./handleStudents')
const Student = require('./student.model')
const { getLine, rl } = require('./utils')


const defaultPath = './students.json'
const EX2_DISPLAY_LIST = "1.Display The List Of Students"
const EX3_ADD_STUDENT = "2.Add New Students To The List"
const EX4_SEARCH_STUDENT = "3.Search For Students By Name"
const EX5_DISPLAY_STATISTICS = "4.Display Statistics:"
const EX6_SAVE_TO_FILE = "5.Save The Student List To A File (JSON)"
const EX7_LOAD_FROM_FILE = "Load Student List From File"

const BREAK_LINE = "========================================"
const GOODBYE = "Goodbye!"
const EXIT = "6. Exit"
const EXIT_INPUT = 6;
const displayTitle = () => {
    console.log(BREAK_LINE)
    console.log(EX2_DISPLAY_LIST)
    console.log(EX3_ADD_STUDENT)
    console.log(EX4_SEARCH_STUDENT)
    console.log(EX5_DISPLAY_STATISTICS)
    console.log(EX6_SAVE_TO_FILE)
    console.log(EXIT)

}


const start = async () => {
    console.log(EX7_LOAD_FROM_FILE)
    let listStudent = await getListStudentFromFile(defaultPath);
    // listStudent = listStudent.length > 0 ? listStudent : createFakeListStudent();
    await getLine("enter continue to continue...")
    do {
        displayTitle()
        selectInput = await getLine("Please select: ")
        console.log(BREAK_LINE)
        switch (Number(selectInput)) {
            case 1:
                console.log(EX2_DISPLAY_LIST)
                displayListStudent(listStudent);
                break;
            case 2:
                console.log(EX3_ADD_STUDENT)
                await createStudentFromInput(listStudent);
                break;
            case 3:
                console.log(EX4_SEARCH_STUDENT)
                await findStudentsFromInput(listStudent);
                break;
            case 4:
                console.log(EX5_DISPLAY_STATISTICS)
                displayStatistics(listStudent)
                break;
            case 5:
                console.log(EX6_SAVE_TO_FILE)
                await saveListStudentToFile(defaultPath, listStudent);
                break;
            case EXIT_INPUT:
                console.log(GOODBYE)
                break;
            default:
                console.log("Please select a valid option.");
                break;
        }
        if (selectInput != EXIT_INPUT) {
            await getLine("enter continue to continue...")
        }
    }
    while (selectInput != EXIT_INPUT)
    rl.close()
}

start()
