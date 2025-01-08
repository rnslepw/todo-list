export default class Display {
  projects = document.querySelector('.projects');
  todos = document.querySelector('.todos');
  dialog = document.querySelector('dialog');
  addBtn = document.querySelector('.add-btn');
  form = document.querySelector('form');

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

  renderForm(todo, project) {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#date");
    const priority = document.querySelector("#priority");
    const note = document.querySelector("#note");

    this.addBtn.addEventListener('click', () => {
      this.dialog.showModal();
      title.value = todo.title;
      description.value = todo.description;
      dueDate.value = todo.dueDate;
      priority.value = todo.priority;
      note.value = todo.note;
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newTodo = {
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
        priority: priority.value,
        note: note.value,
        id: project.todos.length
      }

      project.todos.push(newTodo);
      this.renderTodos(project);

      this.dialog.close();
    })
  }
};