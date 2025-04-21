import './style.css';

const content = document.querySelector('#content');
const projectsList = document.querySelector('#projects-list');

// Modal elements
const editTaskModal = document.querySelector('#editTaskModal');
const createProjectModal = document.querySelector('#createProjectModal');
const editProjectModal = document.querySelector('#editProjectModal');
const createTaskModal = document.querySelector('#createTaskModal');

// Buttons to open modals
const addTaskBtn = document.querySelector('#add-task');
const addProjectBtn = document.querySelector('#add-project');
addTaskBtn.addEventListener('click', () => showModal(createTaskModal));
addProjectBtn.addEventListener('click', () => {
  createProjectForm.reset();
  showModal(createProjectModal);
});

// Buttons to close modals
const cancelEditTaskBtn = document.querySelector('#cancelBtn');
const cancelCreateProjectBtn = document.querySelector('#cancelCreateProject');
const cancelEditProjectBtn = document.querySelector('#cancelEditProject');
const cancelCreateTaskBtn = document.querySelector('#cancelCreateTask');
cancelCreateTaskBtn.addEventListener('click', () => hideModal(createTaskModal));
cancelCreateProjectBtn.addEventListener('click', () => hideModal(createProjectModal));
cancelEditProjectBtn.addEventListener('click', () => hideModal(editProjectModal));
cancelEditTaskBtn.addEventListener('click', () => hideModal(editTaskModal));

// Forms
const editTaskForm = document.querySelector('#editTaskForm');
const createProjectForm = document.querySelector('#createProjectForm');
const editProjectForm = document.querySelector('#editProjectForm');
const createTaskForm = document.querySelector('#createTaskForm');

addTaskBtn.addEventListener('click', () => {
  createTaskForm.reset();
  createTaskForm.onsubmit = (e) => {
    e.preventDefault();

    const title = document.querySelector('#newTaskTitle').value;
    const description = document.querySelector('#newTaskDescription').value;
    const dueDate = document.querySelector('#newTaskDate').value;
    const priority = document.querySelector('#newTaskPriority').value;

    createTask(title, description, dueDate, priority);
    hideModal(createTaskModal);
    showTasks();
  };
});

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#newProjectName').value;
  const description = document.querySelector('#newProjectDescription').value;

  createProject(name, description);
  hideModal(createProjectModal);
  showProjects();
});
cancelCreateProjectBtn.addEventListener('click', () => hideModal(createProjectModal));

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
  saveToLocalStorage();
  return task;
}

function createProject(name, description) {
  const project =  {
    name,
    description,
    tasks: [],
  };
  projects.push(project);
  saveToLocalStorage();
  return project;
}

function removeTask(task) {
  tasks = tasks.filter((element) => element !== task);

  projects.forEach(project => {
    project.tasks = project.tasks.filter((element) => element !== task);
  });

  saveToLocalStorage();
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
  heading.textContent = 'Next Actions';
  content.appendChild(heading);

  if (!tasks.length) {
    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = 'No tasks available.';
    content.appendChild(info);
  }

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

        saveToLocalStorage();
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
      saveToLocalStorage();
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
    div.addEventListener('click', () => {
      showTasksFromProject(project);
    });
    const title = document.createElement('p');
    title.textContent = project.name;

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editBtn.addEventListener('click', () => {
      document.querySelector('#editProjectName').value = project.name;
      document.querySelector('#editProjectDescription').value = project.description;

      showModal(editProjectModal);

      editProjectForm.onsubmit = (e) => {
        e.preventDefault();
        project.name = document.querySelector('#editProjectName').value;
        project.description = document.querySelector('#editProjectDescription').value;

        saveToLocalStorage();
        hideModal(editProjectModal);
        showProjects();
        showTasksFromProject(project);
      };
    });

    cancelEditProjectBtn.addEventListener('click', () => {
      hideModal(editProjectModal);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const confirmDelete = confirm('Do you want to delete this project and its tasks?');
      if (confirmDelete) {
        removeProjectWithTasks(project);
        saveToLocalStorage();
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

  const addTaskBtn = document.createElement('button');
  addTaskBtn.classList.add('add-task-btn');
  addTaskBtn.innerHTML = '<span class="material-symbols-outlined">add</span> Add Task to Project';
  addTaskBtn.addEventListener('click', () => {
    createTaskForm.reset();
    showModal(createTaskModal);

    createTaskForm.onsubmit = (e) => {
      e.preventDefault();

      const title = document.querySelector('#newTaskTitle').value;
      const description = document.querySelector('#newTaskDescription').value;
      const dueDate = document.querySelector('#newTaskDate').value;
      const priority = document.querySelector('#newTaskPriority').value;

      const task = createTask(
        title,
        description,
        dueDate,
        priority,
      );
      project.tasks.push(task);

      saveToLocalStorage();
      hideModal(createTaskModal);
      showTasksFromProject(project);
    };
  });
  content.appendChild(addTaskBtn);

  const showAllTasks = document.createElement('button');
  showAllTasks.classList.add('show-tasks-btn');
  showAllTasks.innerHTML = '<span class="material-symbols-outlined">list</span> Show All Tasks';
  showAllTasks.addEventListener('click', showTasks);
  content.appendChild(showAllTasks);

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

      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn');
      editBtn.innerHTML = '<span class="material-symbols-outlined">edit</span> Edit';
      editBtn.addEventListener('click', () => {
        document.querySelector('#editTitle').value = task.title;
        document.querySelector('#editDesc').value = task.description;
        document.querySelector('#editDate').value = task.dueDate;
        document.querySelector('#editPriority').value = task.priority;

        showModal(editTaskModal);

        editTaskForm.onsubmit = (e) => {
          e.preventDefault();
          task.title = document.querySelector('#editTitle').value;
          task.description = document.querySelector('#editDesc').value;
          task.dueDate = document.querySelector('#editDate').value;
          task.priority = document.querySelector('#editPriority').value;

          saveToLocalStorage();
          hideModal(editTaskModal);
          showTasksFromProject(project);
        };
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span> Delete';
      deleteBtn.addEventListener('click', () => {

        project.tasks = project.tasks.filter(t => t !== task);

        tasks = tasks.filter(t => t !== task);

        saveToLocalStorage();
        showTasksFromProject(project);
      });

      div.appendChild(title);
      div.appendChild(description);
      div.appendChild(dueDate);
      div.appendChild(priority);
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);

      content.appendChild(div);
    });
  } else {
    const info = document.createElement('p');
    info.classList.add('info');
    info.textContent = 'This project has no tasks yet.';
    content.appendChild(info);
  }
}

function showModal(modal) {
  modal.classList.remove('hidden');
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  const storedProjects = localStorage.getItem('projects');

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  if (storedProjects) {
    projects = JSON.parse(storedProjects);
  }
}

if (localStorage.getItem('tasks') || localStorage.getItem('projects')) {
  loadFromLocalStorage();
} else {
  let demoProject = createProject('Demo Project', 'Demo Description');
  let demoTask = createTask('Demo Task', 'Demo Task Description', '2025-04-21', 'Medium');
  demoProject.tasks.push(demoTask);
}
showTasks();
showProjects();