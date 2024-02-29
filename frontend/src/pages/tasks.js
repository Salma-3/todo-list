import React, { useEffect, useState } from 'react'
import axios from '../axios';
import TaskItem from '../components/task';
import AddTask from '../components/add-task';
import ErrorItem from '../components/error';
import { Navigate } from 'react-router-dom';

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get('/tasks/my-tasks').then(res => {
        setTasks(res.data);
        setError(null)
    }).catch(err => {
        setError(<ErrorItem errData={err}/>)
    });
  }, []);
  
  const onDelete = (id) => {
    axios.delete(`/tasks/${id}`).then(res => {
        const newtasks = tasks.filter(tsk => tsk.id !== id);
        setTasks(newtasks)
        setError(null)
    }).catch(err => {
        setError(<ErrorItem errData={err}/>);
    })
  }

  const pushTask = (task) => setTasks([...tasks, task]);

  if(!localStorage.getItem('token')) {
    return <Navigate to='/login'/>
  }
  
  return (
    <div>
        <h3 className='mb-4'>My Tasks</h3>

        {error}
        <div>
            {
                tasks.map(t => (
                    <TaskItem key={t.id} task={t} onDelete={onDelete} />                        
                ))
            }
        </div>
        <AddTask pushTask={pushTask}/>
    </div>
  )
}

export default Tasks