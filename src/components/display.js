import Todo from "./todo";
import Project from "./project";

export default class Display {
  projects = document.querySelector('.projects');
  projectsDOM = document.querySelectorAll('.project');
  main = document.querySelector('main');
  todos = document.querySelector('.todos');
  dialogForm = document.querySelector('.dialog-form');
  addBtn = document.querySelector('.add-btn');
  form = document.querySelector('form');
  dialogDelete = document.querySelector('.dialog-delete');
  confirm = document.querySelector('.confirm');
  abort = document.querySelector('.abort');

  currentId = 0;

  constructor(projectsData) {
    this.projectsData = projectsData
  }

  renderProjects() {
    this.projects.innerHTML = '';
    this.projectsData.forEach(project => {
      this.renderProject(project);
      this.renderTodos(this.projectsData[this.currentId]);
    })
    this.renderProjectForm();
  }

  renderProject(project) {
    const newProject = document.createElement('h3');
    newProject.classList.add('project');
    newProject.textContent = project.title;
    newProject.addEventListener('click', (e) => {
      const currentProject = this.projectsData.find(p => p.title === e.target.textContent);
      this.renderTodos(currentProject);
    })
    this.projects.appendChild(newProject);
  }

  renderProjectForm() {
    const projectsForm = document.createElement('form');
    projectsForm.classList.add('project-form');
    const projectsLegend = document.createElement('legend');
    projectsLegend.textContent = "Add new project";
    const projectsInput = document.createElement('input');
    const projectsBtn = document.createElement('button');
    projectsBtn.textContent = 'Add Project';
    projectsBtn.type = 'submit';

    projectsForm.appendChild(projectsLegend);
    projectsForm.appendChild(projectsInput);
    projectsForm.appendChild(projectsBtn);
    this.projects.appendChild(projectsForm);
    

    projectsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Working');
      
      const newProject = new Project(projectsInput.value, this.projectsData.length);
      this.projectsData = newProject.createProject(this.projectsData);

      console.log(newProject, this.projectsData);
      

      this.currentId = newProject.id;
      this.renderProjects();
    })
  }

  renderAddBtn() {
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Todo';
    this.main.insertBefore(addBtn, this.todos);

    addBtn.addEventListener('click', () => {
      this.renderAddForm({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        note: ''
      });
    })
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

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        this.renderEditForm(todo);
      })

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        this.renderDelete(project, todo);
      })
      
      todoCard.appendChild(todoTitle);
      todoCard.appendChild(todoDescription);
      todoCard.appendChild(todoDueDate);
      todoCard.appendChild(priority);
      todoCard.appendChild(notes);
      todoCard.appendChild(editBtn);
      todoCard.appendChild(deleteBtn);

      this.todos.appendChild(todoCard);
    })
  }

  renderAddForm(todo) {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#date");
    const priority = document.querySelector("#priority");
    const note = document.querySelector("#note");

    title.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    note.value = todo.note;
    
    this.dialogForm.showModal();
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentProject = this.projectsData[this.currentId];
        
      const newTodo = new Todo(title.value, description.value, dueDate.value, priority.value, note.value, currentProject.todos.length);

      currentProject.todos = newTodo.saveTodo(currentProject, newTodo);
      
      this.renderTodos(currentProject);

      this.dialogForm.close();
    }, {once: true});
  }

  renderEditForm(todo) {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#date");
    const priority = document.querySelector("#priority");
    const note = document.querySelector("#note");

    title.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    priority.value = todo.priority;
    note.value = todo.note;
    
    this.dialogForm.showModal();
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentProject = this.projectsData[this.currentId];
        
      const newTodo = new Todo(title.value, description.value, dueDate.value, priority.value, note.value, todo.id);
      
      currentProject.todos = newTodo.editTodo(currentProject, todo, newTodo);

      this.renderTodos(currentProject);

      this.dialogForm.close();
    })
  }

  renderDelete(project, todo) {
    this.dialogDelete.showModal();

    this.confirm.addEventListener('click', () => {
      const currentTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.note, todo.id);
      console.log(currentTodo);
      project.todos = currentTodo.deleteTodo(project, todo);

      this.dialogDelete.close()
      this.renderTodos(project);
    })

    this.abort.addEventListener('click', () => {
      this.dialogDelete.close();
    })
  }
};