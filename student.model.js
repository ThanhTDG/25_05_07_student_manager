// 1.Store Student Information (Id, Name, Age, Grade)

class Student{
    
    constructor(id, name, age, grade){
        this.id = id;
        this.name = name;
        this.age = age;
        this.grade = grade
    }

    toString(){
        let str = `id: ${this.id}, name: ${this.name}, age: ${this.age}, grade: ${this.grade}`
        return str;
    }
}

module.exports = Student;