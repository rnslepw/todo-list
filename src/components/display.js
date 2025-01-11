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
  
  constructor(storage) {
    this.storage = storage;
    this.projectsData = storage.initialize();
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
    const projectGroup = document.createElement('div');
    projectGroup.classList.add('project-group');
    const newProject = document.createElement('h3');
    newProject.classList.add('project');
    newProject.textContent = project.title;
    newProject.addEventListener('click', (e) => {
      const currentProject = this.projectsData.find(p => p.title === e.target.textContent);
      this.renderTodos(currentProject);
    })
    projectGroup.appendChild(newProject);

    if (project.id !== 0) {
      const deleteProject = document.createElement('button');
      deleteProject.classList.add('delete-btn');
      deleteProject.textContent = 'X';
      deleteProject.addEventListener('click', () => {
        this.renderDeleteProject(project);
      })
      projectGroup.appendChild(deleteProject);
    }

    this.projects.appendChild(projectGroup);
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
      
      const newProject = new Project(projectsInput.value, this.projectsData.length);
      this.projectsData = this.storage.addProject(newProject);
      
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

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => {
        this.renderEditForm(todo);
      })

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        this.renderDeleteNote(project, todo);
      })

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);
      
      todoCard.appendChild(todoTitle);
      todoCard.appendChild(todoDescription);
      todoCard.appendChild(todoDueDate);
      todoCard.appendChild(priority);
      todoCard.appendChild(notes);
      todoCard.appendChild(btnContainer);

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
      
      this.projectsData = this.storage.addTodo(currentProject, newTodo);
    
      this.renderTodos(this.projectsData[this.currentId]);

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

      this.projectsData = this.storage.editTodo(currentProject, todo, newTodo);
    
      this.renderTodos(this.projectsData[this.currentId]);

      this.dialogForm.close();
    })
  }

  renderDeleteNote(project, todo) {
    this.dialogDelete.showModal();

    this.confirm.addEventListener('click', () => {
      this.projectsData = this.storage.deleteTodo(project, todo);
      this.renderTodos(this.projectsData[project.id]);

      this.dialogDelete.close()
    })

    this.abort.addEventListener('click', () => {
      this.dialogDelete.close();
    })
  }

  renderDeleteProject(project) {
    this.dialogDelete.showModal();

    this.confirm.addEventListener('click', () => {
      const currentProject = new Project(project.title, project.id);
      this.projectsData = this.storage.deleteProject(currentProject)
      this.currentId = 0;
      this.renderProjects(this.projectsData);
      this.dialogDelete.close()
    })

    this.abort.addEventListener('click', () => {
      this.dialogDelete.close();
    })
  }
};