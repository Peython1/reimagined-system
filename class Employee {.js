class Employee {
    constructor(name, id, salary) {
      this.name = name;
      this.id = id;
      this.salary = salary;
    }
  
    getName() {
      return this.name;
    }
  
    getId() {
      return this.id;
    }
  
    getSalary() {
      return this.salary;
    }
  
    setSalary(salary) {
      this.salary = salary;
    }
  
    toString() {
      return `Name: ${this.name}\nID: ${this.id}\nSalary: ${this.salary}\n-------------------`;
    }
  }
  
  class EmployeeManagementSystem {
    constructor() {
      this.employees = [];
    }
  
    addEmployee(employee) {
      this.employees.push(employee);
    }
  
    removeEmployee(employeeId) {
      this.employees = this.employees.filter((e) => e.getId() !== employeeId);
    }
  
    updateEmployeeSalary(employeeId, newSalary) {
      for (let employee of this.employees) {
        if (employee.getId() === employeeId) {
          employee.setSalary(newSalary);
          break;
        }
      }
    }
  
    displayAllEmployees() {
      console.log("Employees:");
      for (let employee of this.employees) {
        console.log(employee);
      }
    }
  
    sortEmployeesByName() {
      this.employees.sort((a, b) => a.getName().localeCompare(b.getName()));
    }
  
    sortEmployeesBySalary() {
      this.employees.sort((a, b) => a.getSalary() - b.getSalary());
    }
  }
  
  function main() {
    const system = new EmployeeManagementSystem();
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    rl.setPrompt(`
  1. Add Employee
  2. Remove Employee
  3. Update Employee Salary
  4. Display All Employees
  5. Sort Employees by Name
  6. Sort Employees by Salary
  7. Exit
  
  Enter your choice: `);
  
    rl.prompt();
  
    rl.on("line", (choice) => {
      switch (choice) {
        case "1":
          rl.question("Enter employee name: ", (name) => {
            rl.question("Enter employee ID: ", (id) => {
              rl.question("Enter employee salary: ", (salary) => {
                const employee = new Employee(name, parseInt(id), parseFloat(salary));
                system.addEmployee(employee);
                console.log("Employee added successfully!");
                rl.prompt();
              });
            });
          });
          break;
        case "2":
          rl.question("Enter employee ID to remove: ", (employeeId) => {
            system.removeEmployee(parseInt(employeeId));
            console.log("Employee removed successfully!");
            rl.prompt();
          });
          break;
        case "3":
          rl.question("Enter employee ID to update salary: ", (employeeId) => {
            rl.question("Enter new salary: ", (newSalary) => {
              system.updateEmployeeSalary(parseInt(employeeId), parseFloat(newSalary));
              console.log("Employee salary updated successfully!");
              rl.prompt();
            });
          });
          break;
        case "4":
          system.displayAllEmployees();
          rl.prompt();
          break;
        case "5":
          system.sortEmployeesByName();
          console.log("Employees sorted by name.");
          rl.prompt();
          break;
        case "6":
          system.sortEmployeesBySalary();
          console.log("Employees sorted by salary.");
          rl.prompt();
          break;
        case "7":
          console.log("Exiting...");
          rl.close();
          break;
        default:
          console.log("Invalid choice! Please try again.");
          rl.prompt();
      }
    });
  
    rl.on("close", () => {
      process.exit(0);
    });
  }
  
  main();