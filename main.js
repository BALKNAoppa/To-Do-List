function addTask() {
  const taskInput = document.getElementById('taskInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const taskDate = document.getElementById('taskDate');
  const todoList = document.getElementById('todoList');

  if (taskInput.value.trim() === '') {
      alert('Please enter a task');
      return;
  }
  if (!taskDate.value) {
      alert('Please select a date');
      return;
  }

  // Create a new task item
  const li = document.createElement('li');
  li.setAttribute('data-priority', prioritySelect.value); // Set priority as a data attribute
  li.innerHTML = `
      <span class="task-text">${taskInput.value}</span>
      <span class="task-priority">[Priority: ${prioritySelect.value}]</span>
      <span class="task-datetime">[Date: ${taskDate.value}</span>
      <div class="task-buttons">
          <button class="move-btn" onclick="moveTask(this, 'inProgressList')">In Progress</button>
          <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      </div>
  `;

  // Append to the To-Do list
  todoList.appendChild(li);
  sortTasks(todoList); // Sort tasks by priority

  // Clear input fields
  taskInput.value = '';
  taskDate.value = '';
  taskTime.value = '';
}

function moveTask(button, targetListId) {
  const li = button.parentElement.parentElement;
  const targetList = document.getElementById(targetListId);

  const newButtons = getTaskButtons(targetListId);
  li.querySelector('.task-buttons').innerHTML = newButtons;
  targetList.appendChild(li);

  // Sort the To-Do list if moving back
  if (targetListId === 'todoList') {
      sortTasks(targetList);
  }
}

function getTaskButtons(listId) {
  if (listId === 'todoList') {
      return `
          <button class="move-btn" onclick="moveTask(this, 'inProgressList')">In Progress</button>
          <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      `;
  } else if (listId === 'inProgressList') {
      return `
          <button class="move-btn" onclick="moveTask(this, 'todoList')">To-Do</button>
          <button class="move-btn" onclick="moveTask(this, 'doneList')">Done</button>
          <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      `;
  } else if (listId === 'doneList') {
      return `
          <button class="move-btn" onclick="moveTask(this, 'inProgressList')">In Progress</button>
          <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      `;
  }
  return '';
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  li.remove();
}

function sortTasks(list) {
  const tasks = Array.from(list.children);
  tasks.sort((a, b) => {
      const priorities = { High: 1, Medium: 2, Low: 3 };
      const priorityA = priorities[a.getAttribute('data-priority')];
      const priorityB = priorities[b.getAttribute('data-priority')];
      return priorityA - priorityB;
  });
  tasks.forEach(task => list.appendChild(task));
}
