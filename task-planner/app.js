const fs = require('fs'),
      http = require('http'),
      url = require('url'),
      port = 9999

const addTaskHTML = `
<h1>Add Task</h1>
<form action="/addTask" method="GET">
  <label>Employee Id: </label>
  <input matInput type="number" name="empId" required>
<br/>
  <label>Task Id: </label>
  <input matInput type="number" name="taskId" required>
<br/>
  <label>Task: </label>
  <input matInput type="text" name="task" required>
<br/>
  <label>Deadline: </label>
  <input type="date" name="deadline" required>
<br/>
  <button type="submit">ADD</button>
  <button type="reset">RESET</button>
</form>
`

const deleteTaskHTML = `
<h1>Delete Task</h1>
<form action="/deleteTask" method="GET">
  <label>Task Id: </label>
  <input type="number" name="taskId" required>
<br/>
  <button type="submit">DELETE</button>
  <button type="reset">RESET</button>
</form>
`

const listAllTasksHTML = `
<h1>List all tasks</h1>
<form action="/listAllTasks">
  <button type="submit">ALL TASKS</button>
</form>
`

const tableTopHTML = `
<table>
<thead>
  <!-- Table header -->
    <tr>
      <th>Employee Id</th>
      <th>Task Id</th>
      <th>Task</th>
      <th>Deadline</th>
    </tr>
</thead>
<tbody>
`, tableEndHTML = `
</tbody>
</table>
`


let html = addTaskHTML + deleteTaskHTML + listAllTasksHTML;

const server = http.createServer((req,res)=> {
  let path = url.parse(req.url,true).pathname;

  if (req.url == "/") {
    show(res, html, "Home");
  } 
  
  else if (path == "/addTask") {
    task = grabData(req, 'add');
    addTask(task);
    show(res, html, `Added Task #${task.taskId}`);
  } 

  else if (path == "/deleteTask") {
    task = grabData(req, 'delete');
    deleteTask(task);
    show(res, html, `Deleted Task #${task.taskId}`);
  } 

  else if (path == "/listAllTasks") {
    show(res, html, "Listed All Tasks");
    listAllTasks(res);
  }
  
  res.end();
});

// shows default html content, also displays state of system based on "message"
function show(response, content, message) {
  response.setHeader("content-type","text/html");
  response.write(`<div style="text-align:center"> (${message}) </div>`);
  response.write(content); 
}

// grabs request data from url and returns a task object
function grabData(request, type) {
  let data = url.parse(request.url,true).query;
  if (type == 'add') {
    return {
      empId: `${data.empId}`,
      taskId: `${data.taskId}`,
      task: `${data.task}`,
      deadline: `${data.deadline}`
    };
  } else {
    return { taskId:`${data.taskId}` };
  }
}

function addTask(task) {
  let data_str = fs.readFileSync("tasks.json")
  let data_json = JSON.parse(data_str);
  data_json.tasks.push(task);
  data_str = JSON.stringify(data_json);
  fs.writeFileSync("tasks.json", data_str, {flag:"w"});
}

function deleteTask(task) {
  let data_str = fs.readFileSync("tasks.json")
  let data_json = JSON.parse(data_str);

  let tasks = data_json.tasks;
  const index = tasks.findIndex(t => t.taskId === task.taskId);
  if (index !== undefined) tasks.splice(index, 1);

  data_str = JSON.stringify(data_json);
  fs.writeFileSync("tasks.json", data_str, {flag:"w"});
}

function listAllTasks(response) {
  let data_str = fs.readFileSync("tasks.json")
  let data_json = JSON.parse(data_str);
  
  let tableRowsHTML = '';
  data_json.tasks.forEach(task => {
    tableRowsHTML += `
    <tr>
      <td>${task.empId}</td>
      <td>${task.taskId}</td>
      <td>${task.task}</td>
      <td>${task.deadline}</td>
    </tr>
    `
  })
  response.write(tableTopHTML + tableRowsHTML + tableEndHTML);
}

server.listen(port, () => 
  console.log(`Server is running on port number ${port}`)
);