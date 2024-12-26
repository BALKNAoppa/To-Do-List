function addTask() {
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');

    if (taskInput.value.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
      ${taskInput.value}
      <div class="task-buttons">
        <button class="move-btn" onclick="moveTask(this, 'inProgressList')">In Progress</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
    taskInput.value = '';
  }

  function moveTask(button, targetListId) {
    const li = button.parentElement.parentElement;
    const targetList = document.getElementById(targetListId);

    li.querySelector('.task-buttons').innerHTML = getTaskButtons(targetListId);
    targetList.appendChild(li);
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