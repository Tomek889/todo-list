import './style.css';

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

// Create a default project
createProject('Next Actions');

