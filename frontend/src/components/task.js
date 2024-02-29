import React, { useState } from 'react'
import axios from '../axios';
import ErrorItem from './error';

function TaskItem({ task, onDelete }) {
    const { id, title, description, completed } = task;
    const [comp, setCompleted] = useState(completed)
    const [error, setError] = useState(null);

    const onChange = (evt) => {
        setCompleted(evt.target.checked)

        const data = JSON.stringify({ completed: evt.target.checked });
        axios.put(`/tasks/${id}`, data)
        .then(res => {
            console.log(res.data);
        }).catch(err => {   
            setError(<ErrorItem errData={err} />)
        })
    }
  return (
    <div className='p-2 position-relative shadow mb-3 border'>
        {error}
        <form>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" name="completed" id="completed" checked={comp} onChange={onChange}/>
                <b>{title}</b>
              </label>
              <small><br/>{description}</small>
            </div>
        </form>
        <button type='button' className='btn btn-danger' onClick={() => onDelete(id)} style={{ position: 'absolute', right: 15, top: 15}}>
        &#x2715;
        </button>
    </div>
  )
}

export default TaskItem