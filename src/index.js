import './style.css';

const content = document.querySelector('#content');
const modal = document.querySelector('#modal');
const editForm = document.querySelector('#editForm');
const cancelBtn = document.querySelector('#cancelBtn');

let projects = [];
let tasks = [];

function createTask(title, description, dueDate, priority) {
  const task = {
    title,
    description,
    dueDate,
    priority,
  };
  tasks.push(task);
  return task;
}

function createProject(name) {
  const project =  {
    name,
    tasks: [],
  };
  projects.push(project);
  return project;
}

function addTaskToProject(project, task) {
    project.tasks.push(task);
}

function removeTaskFromProject(project, task) {
  project.tasks = project.tasks.filter((element) => element !== task);
}

function removeTask(task) {
  tasks = tasks.filter((element) => element !== task);

  projects.forEach(project => {
    project.tasks = project.tasks.filter((element) => element !== task);
  });
}

function removeProjectItself(project) {
  projects = projects.filter((element) => element !== project);
}

function removeProjectWithTasks(project) {
  project.tasks.forEach(task => {
    tasks = tasks.filter((element) => element !== task);
  });

  removeProjectItself(project);
}

let currentTaskBeingEdited = null;
function openModal(task) {
  currentTaskBeingEdited = task;

  document.getElementById('editTitle').value = task.title;
  document.getElementById('editDesc').value = task.description;
  document.getElementById('editDate').value = task.dueDate;
  document.getElementById('editPriority').value = task.priority;

  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  currentTaskBeingEdited = null;
}

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentTaskBeingEdited) {
    currentTaskBeingEdited.title = document.getElementById('editTitle').value;
    currentTaskBeingEdited.description = document.getElementById('editDesc').value;
    currentTaskBeingEdited.dueDate = document.getElementById('editDate').value;
    currentTaskBeingEdited.priority = document.getElementById('editPriority').value;

    showTasks();
    closeModal();
  }
});

cancelBtn.addEventListener('click', closeModal);

function showTasks() {
  content.innerHTML = '';

  const heading = document.createElement('p');
  heading.classList.add('heading');
  heading.textContent = 'My Tasks';
  content.appendChild(heading);

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.classList.add('element');
    const title = document.createElement('p');
    title.textContent = `Title: ${task.title}`;
    const description = document.createElement('p');
    description.textContent = `Description: ${task.description}`;
    const dueDate = document.createElement('p');
    dueDate.textContent = `Due Date: ${task.dueDate}`;
    const priority = document.createElement('p');
    priority.textContent = `Priority: ${task.priority}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      removeTask(task);
      showTasks();
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      openModal(task);
    });
    
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(dueDate);
    div.appendChild(priority);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    content.appendChild(div);
  });
}

// Create a default project
createProject('Demo Project');
createTask('Demo Task');
showTasks();