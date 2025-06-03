class Person 
{
  constructor(name, age) 
  {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

class Student extends Person
{
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}.`;
  }
}

class Teacher extends Person 
{
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  teach() {
    return `${this.name} teaches ${this.subject}.`;
  }
}

const outputDiv = document.getElementById("output");

document.getElementById("studentBtn").addEventListener("click", () => {
  const s1 = new Student("Arjun", 16, "10th");
  outputDiv.innerHTML = `<h3> Student Info</h3><p>${s1.introduce()}</p><p>${s1.study()}</p>`;
});

document.getElementById("teacherBtn").addEventListener("click", () => {
  const t1 = new Teacher("Mrs. Iyer", 35, "Mathematics");
  outputDiv.innerHTML = `<h3> Teacher Info</h3><p>${t1.introduce()}</p><p>${t1.teach()}</p>`;
});