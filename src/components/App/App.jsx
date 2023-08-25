import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      setToDoListTask('');
    }).catch((error) => {
      console.log(error);
    });
  };

  const deleteTask = (taskId) =>
  // Sweet Alert asks user for confirmation, prior to deleting task
  swal({
    title: "Are you sure you want to delete this task?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  // If deletion is confirmed by user, user receives confirmation alert, task is deleted
  .then((willDelete) => {
    if (willDelete) {
    axios.delete(`/list/${taskId}`)
    .then((response) => {
      fetchList();
      swal("Task deleted!", {
        icon: "success",
      });
    }).catch((error) => {
      console.log('Error', error);
      alert('Something went wrong');
    });
  } 
});

  const completeTask = (id) => {
    axios.put(`/list/complete/${id}`, {complete: true})
    .then((response) => {
      fetchList();
    }).catch((error) => {
      console.log('Error', error);
      alert('Something went wrong');
    });
  }

  // Handles reset of list
  const resetList = () => {
    axios.put(`/list/reset`, {complete: false})
    .then((response) => {
      fetchList();
    }).catch((error) => {
      console.log('Error', error);
      alert('Something went wrong');
    });
};

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h1>TO DO APP</h1>
  
      <form id="form" onSubmit={addTask}>

        <TextField size="small" id="input" label="Enter Task" variant="filled" value={toDoListTask} type="text" onChange={(event) => setToDoListTask(event.target.value)}/>
        {/* <label id="task">Task:</label>
        <input value={toDoListTask} type="text" id="input" onChange={(event) => setToDoListTask(event.target.value)}/> */}
        <br></br>
        {/* <button id="add-task">Add Task</button> */}
        <Button type="submit" id="add-task" variant="contained">Add Task</Button> 
        {/* Resets form to show all items as "not complete" */}
        <Button id="reset" onClick={() => resetList()}>Reset</Button>
      </form>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>MY TASKS</th>
            <th id="complete-heading">COMPLETE</th>
            <th id="delete-heading">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {toDoListArray.map(task => (
          <tr key={task.task}>
            {/* Conditional formating allows task text to appear differently, based on if task complete is true or false*/}
            <td id={task.complete ? "complete-task" : "not-complete-task"}>{task.task}</td>
            {/* Buttons will also appear differently, based on if task complete is true or false*/}
            <td><Button id={task.complete ? "complete" : "not-complete"} onClick={() => 
              completeTask(task.id)}
>             {task.complete ? "Completed" : "Complete"}
            </Button></td>
            <td><Button id="delete" onClick={() => deleteTask(task.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App