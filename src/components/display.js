export default class Display {
  projects = document.querySelector('.projects');
  todos = document.querySelector('.todos');

  renderProject(project) {
    const newProject = document.createElement('h3');
    newProject.classList.add('project');
    newProject.textContent = project.title;
    this.projects.appendChild(newProject);
  }

  renderTodos(project) {

    this.todos.innerHTML = '';

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
};