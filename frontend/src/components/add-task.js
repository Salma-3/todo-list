import React, { useState } from 'react'
import axios from '../axios';
import ErrorItem from './error';

function AddTask({ pushTask }) {
    const [formData, setForm] = useState({
        title: '',
        description: ''
    });

    const { title, description } = formData;
    const [error, setError] = useState(null);

    const onChange = evt => setForm({ ...formData, [evt.target.name]: evt.target.value });

    const onSubmit = evt => {
        evt.preventDefault();

        const data = JSON.stringify(formData);

        axios.post('/tasks', data).then(res => {
            console.log(res.data);
            setError(null);
            pushTask(res.data);
            setForm({ title: '', description: '' })
        }).catch(err => {
            setError(<ErrorItem errData={err}/>);
        })
    }
  return (
    <div className='mt-4 p-4'>
        <strong>Add new task</strong>
        {error}
        <form method='post' onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title"></label>
              <input type="text" className="form-control" name="title" id="title" placeholder="Task Title" value={title} onChange={e => onChange(e)}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description"></label>
              <textarea className="form-control" name="description" id="description" placeholder="Task description" value={description} onChange={e => onChange(e)}/>
            </div>
            <button type='submit' className='btn btn-primary'>
               Create
            </button>
        </form>
    </div>
  )
}

export default AddTask