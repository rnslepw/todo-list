export default class Todo {
  constructor(title, description, dueDate, priority, note, id) {
    this.title = title,
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.note = note,
    this.id = id
  }

  saveTodo(project, newTodo) {
    return project.todos.concat(newTodo);
  }

  editTodo(project, todo, newTodo) {
    return project.todos.map(t => t.title === todo.title ? newTodo : t);
  }
}