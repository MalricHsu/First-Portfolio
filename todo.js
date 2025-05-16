const todo = document.querySelector(".todo");
const btnTodo = document.querySelector(".btn-todo");
const btnClear = document.querySelector(".btn-clear");
const list = document.querySelector(".list");

// 新增任務事件
btnTodo.addEventListener("click", () => {
  const task = todo.value.trim();
  if (!task) return;

  const newTask = {
    text: task,
    checked: false,
    time: new Date().toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  displayTask(newTask); // 顯示任務
  saveTasks(); // 儲存任務到本地
  todo.value = ""; // 清空輸入框
});

// 顯示任務
function displayTask(task) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.checked = task.checked;

  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("task");

  const btnEdit = document.createElement("button");
  btnEdit.innerHTML = "修改";
  btnEdit.classList.add("btn-edit");

  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = "刪除";
  btnDelete.classList.add("btn-delete");

  const todoButton = document.createElement("div");
  todoButton.classList.add("todo-button");
  todoButton.append(btnEdit, btnDelete);

  const time = document.createElement("div");
  const timeString = `建立於 ${new Date().toLocaleString("zh-TW")}`;
  time.textContent = timeString;
  time.classList.add("timesetup");

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");
  todoContent.append(checkbox, span, todoButton);

  const li = document.createElement("li");
  if (task.checked) li.classList.add("done");
  li.append(todoContent);
  li.append(time);

  // 勾選任務時儲存
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done");
    saveTasks(); // 更新本地
  });

  // 刪除任務時儲存
  btnDelete.addEventListener("click", () => {
    list.removeChild(li);
    saveTasks(); // 更新本地
  });

  // 修改任務
  btnEdit.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = span.textContent;
    input.classList.add("edit-input");

    const btnSave = document.createElement("button");
    btnSave.innerHTML = "儲存";
    btnSave.classList.add("btn-save");

    btnSave.addEventListener("click", () => {
      const newContent = input.value.trim();
      if (newContent) {
        span.textContent = newContent;
        input.replaceWith(span);
        btnSave.replaceWith(btnEdit);
        saveTasks(); // 更新本地
      }
    });

    span.replaceWith(input);
    btnEdit.replaceWith(btnSave);
  });

  list.appendChild(li); // 顯示任務在畫面上
}

// 儲存任務至本地端
function saveTasks() {
  const tasks = [];
  const listItems = document.querySelectorAll(".list li");
  listItems.forEach((item) => {
    const taskText = item.querySelector(".task").textContent;
    const isChecked = item.querySelector("input[type='checkbox']").checked;
    const timeCreated = item.querySelector(".timesetup").textContent;

    tasks.push({
      text: taskText,
      checked: isChecked,
      time: timeCreated,
    });
  });

  localStorage.setItem("todoList", JSON.stringify(tasks)); // 儲存至本地
}

// 載入任務
function loadTasks() {
  const saveTasks = localStorage.getItem("todoList");
  if (saveTasks) {
    const tasks = JSON.parse(saveTasks);
    tasks.forEach((task) => {
      displayTask(task); // 顯示每一個儲存的任務
    });
  }
}

// 頁面載入時載入任務
window.addEventListener("load", loadTasks);
