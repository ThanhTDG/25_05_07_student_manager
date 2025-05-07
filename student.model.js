// 1.Store Student Information (Id, Name, Age, Grade)
// Excellent (≥ 8), Good (≥ 6.5), Average (< 6.5)

class Student {

    constructor(id, name, age, grade) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.grade = grade
    }

    toString() {
        let str = `id: ${this.id}, name: ${this.name}, age: ${this.age}, grade: ${this.grade}`
        return str;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            grade: this.grade
        }
    }
    static validateId(id) {
        return Number.isInteger(id) && id > 0;
    }
    static validateName(name) {
        return typeof name === 'string' && name.trim() !== '';
    }
    static validateAge(age) {
        return Number.isInteger(age) && age > 0;
    }
    static validateGrade(grade) {
        return typeof grade === 'number' && grade >= 0 && grade <= 10;
    }
    static validateStudent(id, name, age, grade) {
        return this.validateId(id) && this.validateName(name) && this.validateAge(age) && this.validateGrade(grade);
    }

    static fromJSON(json) {
        let student = new Student(Number(json.id), json.name, Number(json.age), Number(json.grade));
        return student;
    }

}

module.exports = Student;