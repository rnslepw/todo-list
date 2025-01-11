export default class Project {
  constructor(title, id) {
    this.title = title;
    this.todos = [];
    this.id = id;
  }

  createProject(projects) {
   return projects.concat(this);
  }
};