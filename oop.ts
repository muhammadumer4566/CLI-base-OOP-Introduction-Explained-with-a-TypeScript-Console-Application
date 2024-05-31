#! /usr/bin/env node
import inquirer from "inquirer";

class Student{
    name : string;
    constructor(name : string){
        this.name = name;
    }
}

class Person{
    students : Student[] = []
    addStudent(obj : Student){
       this.students.push(obj);
    }
}

const person = new Person();

const program = async (person : Person) => {

    do{
        console.log("-".repeat(60));
        console.log("Welcome");
        console.log("-".repeat(60));
      
        const ans = await inquirer.prompt([
          {
              name : "select",
              type : "list",
              message : "Whom with you like to intract with?",
              choices : ["staff", "student", "exit"]
          }
        ])
      
        if(ans.select === "staff"){
          console.log("You approach the staff room. Please feel free to ask any question.")
        }
        if(ans.select === "student"){
          const ans = await inquirer.prompt([
              {
                  name : "student",
                  type: "input",
                  message : "Enter the student's name you wish to engage with: "
              }
          ]);
          const student = person.students.find(val => val.name == ans.student);
         
          if(!student){
             const name = new Student(ans.student);
             person.addStudent(name);
             console.log(`Hello I am ${name.name}. Nice to meet you!`);
             console.log("New Student Added");
             console.log("Current Student List: ");
             console.log(person.students);
          }
          else{
              console.log(`Hello I am ${student.name}. Nice to see you again`);
             console.log("Current Student List: ");
             console.log(person.students);
          }
        }
        if(ans.select === "exit"){
          process.exit();
        }
    }
    while(true);     
}
program(person);