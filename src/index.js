import './styles.css';

import Display from './components/display';
import Storage from './components/storage';

const initialProjects = [
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
  },
]

const storage = new Storage(initialProjects);
const currentDisplay = new Display(storage);

currentDisplay.renderProjects();
currentDisplay.renderAddBtn();






