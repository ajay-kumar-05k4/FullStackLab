/* function User1(name, email) {
  this.name = name;
  this.email = email;

}

// Defining the method 'login1' on the prototype
User1.prototype.login1 = function() {
  console.log(this.name);
};

function Student(name, email, rollno) {
  // Pass arguments to the parent constructor
  User1.call(this, name, email); 
  this.rollno = rollno || 'k4';
}
Student.prototype = Object.create(User1.prototype);

Student.prototype.registerEvent = function() {
  console.log('Hi hello ' + this.rollno);
};

// 1. Correct instantiation using 'new'
let xx = new User1('vijay', 'vijay@');
xx.login1(); 

console.log(new Student('ajay','ajay@','k5')) */















class User {
    constructor() {
        this.name = 'ajay';
        this.email = 'ajay@abcd';
    }
    login(){
        console.log("hello iam "+this.name);
    }
}
class NewTest extends User{
    constructor(){
        super();
        this.pass='ajay123';
    }
}


/*User.prototype.login = function(){
    console.log("Hello " + this.name);
}; */
let obj=new User();
console.log(obj.name);
obj.login();
console.log(User.name);
let obj2=new NewTest();
console.log(obj2.name);
console.log(obj2.pass);
console.log(obj2.login());
