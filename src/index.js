import './style.css';

const content = document.querySelector('#content');
const projectsList = document.querySelector('#projects-list')

// Modal elements
const editTaskModal = document.querySelector('#editTaskModal');
const createProjectModal = document.querySelector('#createProjectModal');
const editProjectModal = document.querySelector('#editProjectModal');

// Buttons to open modals
const addTaskBtn = document.querySelector('#add-task');
const addProjectBtn = document.querySelector('#add-project');

// Buttons to close modals
const cancelEditTaskBtn = document.querySelector('#cancelBtn');
const cancelCreateProjectBtn = document.querySelector('#cancelCreateProject');
const cancelEditProjectBtn = document.querySelector('#cancelEditProject');

// Forms
const editTaskForm = document.querySelector('#editTaskForm');
const createProjectForm = document.querySelector('#createProjectForm');
const editProjectForm = document.querySelector('#editProjectForm');

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

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span> Edit';
    editBtn.addEventListener('click', () => {
      document.querySelector('#editTitle').value = task.title;
      document.querySelector('#editDesc').value = task.description;
      document.querySelector('#editDate').value = task.dueDate;
      document.querySelector('#editPriority').value = task.priority;

      showModal(editTaskModal);

      editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        task.title = document.querySelector('#editTitle').value;
        task.description = document.querySelector('#editDesc').value;
        task.dueDate = document.querySelector('#editDate').value;
        task.priority = document.querySelector('#editPriority').value;

        hideModal(editTaskModal);
        showTasks();
      });

      cancelEditTaskBtn.addEventListener('click', () => {
        hideModal(editTaskModal);
      });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span> Delete';
    deleteBtn.addEventListener('click', () => {
      removeTask(task);
      showTasks();
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

function showProjects() {
  projectsList.innerHTML = '';

  projects.forEach(project => {
    const div = document.createElement('div');
    div.classList.add('project-element');

    const title = document.createElement('p');
    title.textContent = project.name;

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editBtn.addEventListener('click', () => {
      document.querySelector('#editProjectName').value = project.name;
      document.querySelector('#editProjectDescription').value = project.description;

      showModal(editProjectModal);

      editProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        project.name = document.querySelector('#editProjectName').value;
        project.description = document.querySelector('#editProjectDescription').value;

        hideModal(editProjectModal);
        showProjects();
      });
    });

    cancelEditProjectBtn.addEventListener('click', () => {
      hideModal(editProjectModal);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteBtn.addEventListener('click', () => {
      const confirmDelete = confirm('Do you want to delete this project and its tasks?');
      if (confirmDelete) {
        removeProjectWithTasks(project);
        showProjects();
        showTasks();
      }
    });

    div.appendChild(title);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    projectsList.appendChild(div);
  });
}

function showTasksFromProject(project) {
  content.innerHTML = '';

  const heading = document.createElement('p');
  heading.classList.add('heading');
  heading.textContent = project.name;
  content.appendChild(heading);
  if (project.description) {
    const description = document.createElement('p');
    description.classList.add('heading-description');
    description.textContent = project.description;
    content.appendChild(description);
  }

  if (project.tasks.length) {
    project.tasks.forEach(task => {
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

      // todo: add edit button, and delete button
    });
  } else {
    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = 'You haven\'t currently any tasks in that project.';
    content.appendChild(info);
  }
}

function showModal(modal) {
  modal.classList.remove('hidden');
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

// Create a default project
let demo = createProject('Demo Project', 'Demo description');
createTask('Demo Task', 'demo', 'ldk', 'kdk');
showTasks();
showProjects();