import Todo from "./todo";

export default class Display {
  projectsDom = document.querySelector('.projects');
  todos = document.querySelector('.todos');
  dialog = document.querySelector('dialog');
  addBtn = document.querySelector('.add-btn');
  form = document.querySelector('form');

  currentId = 0;

  constructor(projectsData) {
    this.projectsData = projectsData
  }

  renderProjects() {
    this.projectsData.forEach(project => {
      this.renderProject(project);
      // currentDisplay.renderTodos(projects[currentId]);
    })
  }

  renderProject(project) {
    const newProject = document.createElement('h3');
    newProject.classList.add('project');
    newProject.textContent = project.title;
    this.projectsDom.appendChild(newProject);
  }

  renderTodos(project) {

    this.todos.innerHTML = '';
    this.currentId = project.id;

    project.todos.forEach(todo => {
      const todoCard = document.createElement('div');
      todoCard.classList.add('todo');

      const todoTitle = document.createElement('h4');
      todoTitle.textContent = todo.title;

      const todoDescription = document.createElement('p');
      todoDescription.textContent = todo.description;

      const todoDueDate = document.createElement('p');
      todoDueDate.textContent = todo.dueDate;

      const priority = document.createElement('p');
      priority.textContent = `Priority: ${todo.priority}`;

      const notes = document.createElement('p');
      notes.textContent = todo.note;

      todoCard.appendChild(todoTitle);
      todoCard.appendChild(todoDescription);
      todoCard.appendChild(todoDueDate);
      todoCard.appendChild(priority);
      todoCard.appendChild(notes);

      this.todos.appendChild(todoCard);
    })
  }

  renderForm() {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#date");
    const priority = document.querySelector("#priority");
    const note = document.querySelector("#note");

    this.addBtn.addEventListener('click', () => {
      this.dialog.showModal();
    })
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentProject = this.projectsData[this.currentId];

      const newTodo = new Todo(title.value, description.value, dueDate.value, priority.value, note.value, currentProject.todos.length);

      newTodo.saveTodo(currentProject);
      this.renderTodos(currentProject);
      this.dialog.close();
    })
  }
};