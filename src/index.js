import './styles.css';

import Display from './components/display';

const projects = [
  {
    title: 'First Project',
    todos: [
      {
        title: "First Project Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "Low",
        note: "Should not hurry for this"
      },
      {
        title: "Another Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "High",
        note: "I'm actually too late!"
      }
    ],
    id: 0
  },
  {
    title: 'Second Project',
    todos: [
      {
        title: "Second Project Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "Low",
        note: "Should not hurry for this"
      },
      {
        title: "Another Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "High",
        note: "I'm actually too late!"
      }
    ],
    id: 1
  }
]

let currentId = 0;

const currentDisplay = new Display();

projects.forEach(project => {
  currentDisplay.renderProject(project);
  currentDisplay.renderTodos(projects[currentId]);
})

const projectsDom = document.querySelectorAll('.project');
projectsDom.forEach(project => {
  project.addEventListener('click', (e) => {
    const currentProject = projects.find(project => project.title === e.target.textContent);
    currentId = currentProject.id;

    currentDisplay.renderTodos(projects[currentId]);
  })
})
