import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';


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
    
      <h3>Add Task</h3>
      <form id="form" onSubmit={addTask}>
        <label id="task">Task:</label>
        <input value={toDoListTask} type="text" id="input" onChange={(event) => setToDoListTask(event.target.value)}/>
        <br></br>
        <button id="add-task">Add Task</button>
      </form>
      {/* Resets form to show all items as "not complete" */}
      <button id="reset" onClick={() => resetList()}>Reset</button>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <th>My Tasks</th>
            <th id="complete-heading">Complete</th>
            <th id="delete-heading">Delete</th>
          </tr>
        </thead>
        <tbody>
          {toDoListArray.map(task => (
          <tr key={task.task}>
            {/* Conditional formating allows task text to appear differently, based on if task complete is true or false*/}
            <td id={task.complete ? "complete-task" : "not-complete-task"}>{task.task}</td>
            {/* Buttons will also appear differently, based on if task complete is true or false*/}
            <td><button id={task.complete ? "complete" : "not-complete"} onClick={() => 
              completeTask(task.id)}
>             {task.complete ? "Completed" : "Complete"}
            </button></td>
            <td><button id="delete" onClick={() => deleteTask(task.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App