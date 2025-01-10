export default class Todo {
  constructor(title, description, dueDate, priority, note, id) {
    this.title = title,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.note = note,
    this.id = id
  }

  saveTodo(project) {
    project.todos.push(this);
  }
}