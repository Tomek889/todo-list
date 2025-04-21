import './style.css';

const content = document.querySelector('#content');
const projectsList = document.querySelector('#projects-list')

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

function createProject(name, description) {
  const project =  {
    name,
    description,
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

    // const deleteBtn = document.createElement('button');
    // deleteBtn.textContent = 'Delete';
    // deleteBtn.classList.add('delete-btn');
    // deleteBtn.addEventListener('click', () => {
    //   removeTask(task);
    //   showTasks();
    // });

    // const editBtn = document.createElement('button');
    // editBtn.textContent = 'Edit';
    // editBtn.classList.add('edit-btn');
    // editBtn.addEventListener('click', () => {
    //   openModal(task);
    // });
    
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(dueDate);
    div.appendChild(priority);
    // div.appendChild(editBtn);
    // div.appendChild(deleteBtn);

    content.appendChild(div);
  });
}

function showProjects() {
  projectsList.innerHTML = '';

  projects.forEach(project => {
    const div = document.createElement('div');
    const title = document.createElement('p');
    title.textContent = project.name;

    div.appendChild(title);
    projectsList.appendChild(div);
  });
}

// Create a default project
createProject('Demo Project', 'Demo description');
createTask('Demo Task');
showTasks();
showProjects();