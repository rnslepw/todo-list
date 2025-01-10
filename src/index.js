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
        note: "Should not hurry for this",
        id: 0
      },
      {
        title: "Another Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "High",
        note: "I'm actually too late!",
        id: 1
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
        note: "Should not hurry for this",
        id: 0
      },
      {
        title: "Another Todo",
        description: "Short todo description",
        dueDate: "2025-02-01",
        priority: "High",
        note: "I'm actually too late!",
        id: 1
      }
    ],
    id: 1
  }
]

const currentDisplay = new Display(projects);

currentDisplay.renderProjects();
currentDisplay.renderAddBtn();

const projectsDOM = document.querySelectorAll('.project');
projectsDOM.forEach(project => {
  project.addEventListener('click', (e) => {
    const currentProject = projects.find(p => p.title === e.target.textContent);
    currentDisplay.renderTodos(currentProject);
  })
})





