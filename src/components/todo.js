export default class Todo {
  constructor(title, description, dueDate, priority, note, id) {
    this.title = title,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.note = note,
    this.id = id
  }

  deleteTodo(project, todo) {
    return project.todos.filter(t => t.title === todo.title ? null : t);
  }
}