export default class Storage {
  data = [];

  constructor(projects) {
    this.projects = projects;
  }

  initialize() {
    const initialData = localStorage.getItem('data');
    if (initialData) {
      this.data = JSON.parse(localStorage.getItem('data'));
    } else {
      localStorage.setItem('data', JSON.stringify(this.projects));
      this.data = JSON.parse(localStorage.getItem('data'));
    }
    return this.data;
  }

  addProject(project) {
    localStorage.setItem('data', JSON.stringify(this.data.concat(project)));
    this.data = JSON.parse(localStorage.getItem('data'));
    return this.data;
  }

  deleteProject(project) {
    localStorage.setItem('data', JSON.stringify(this.data.filter(p => p.title === project.title ? null : p)));
    this.data = JSON.parse(localStorage.getItem('data'));
    return this.data;
  }

  addTodo(project, newTodo) {
    project.todos = project.todos.concat(newTodo);
    
    localStorage.setItem('data', JSON.stringify(this.data.map(d => d.title === project.title ? project : d)));
    this.data = JSON.parse(localStorage.getItem('data'));
    return this.data;
  }

  editTodo(project, todo, newTodo) {
    project.todos = project.todos.map(t => t.title === todo.title ? newTodo : t);

    localStorage.setItem('data', JSON.stringify(this.data.map(d => d.title === project.title ? project : d)));
    this.data = JSON.parse(localStorage.getItem('data'));
    return this.data;
  }

  deleteTodo(project, todo) {
    project.todos = project.todos.filter(t => t.title === todo.title ? null : t);

    localStorage.setItem('data', JSON.stringify(this.data.map(d => d.title === project.title ? project : d)));
    this.data = JSON.parse(localStorage.getItem('data'));
    return this.data;
  }
}