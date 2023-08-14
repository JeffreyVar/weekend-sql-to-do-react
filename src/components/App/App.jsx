import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App () {

  let [toDoListTask, setToDoListTask] = useState('');
  let [toDoListArray, setToDoListArray] = useState([]);

  const fetchList = () => {
    // TODO: fetch the list of tasks from the server
    axios.get('/list')
    .then((response) => {
      console.log(response.data);
      setToDoListArray(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const addTask = (event) => {
    event.preventDefault();   
    axios.post('/list', {task: toDoListTask})
    .then((response) => {
      console.log(response);
      fetchList();
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h1>TO DO APP</h1>
    
      <h3>Add Task</h3>
      <form id="form" onSubmit={addTask}>
        <label id="task">Task:</label>
        <input type="text" id="input" onChange={ (event) => setToDoListTask(event.target.value)}  />
        <br></br>
        <button id="add-task">Add Task</button>
      </form>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>My Tasks</th>
            <th>Complete</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {toDoListArray.map(task => (
          <tr key={task.task}>
            <td>{task.task}</td>
            <td><button onClick={() => completeTask()}>Complete</button></td>
            <td><button onClick={() => deleteTask()}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App
