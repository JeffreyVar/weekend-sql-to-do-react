import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App () {

  // let [toDoListTask, setToDoListTask] = useState('');
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
  useEffect(() => {
    fetchList();
  }, [])

  // const addTask = (event) => {
  //   event.preventDefault();
  //   // console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
  //   // 

  //   axios.post('/list', {task: toDoListTask})
  //   .then((response) => {
  //     console.log(response);
  //     fetchList();
  //   }).catch((error) => {
  //     console.log(error);
  //   });

    return (
      <div>
        <h1>TO DO APP</h1>
      
        <h3>Add Task</h3>
        {<form>
          <label>Task</label>
          {/* <input onChange={ (event) => setToDoListTask(event.target.value)}  /> */}
          <button type="submit">Add Task</button>
        </form>
        }
        <br></br>
        <br></br>
        <h3>My Tasks</h3>
        <ul>
        {toDoListArray.map(task => (<li key={task.task} >{task.task}</li>))}
        </ul>
      </div>
    )
  }


export default App
