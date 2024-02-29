import React, { useEffect, useState } from 'react'

function ErrorItem({ errData }) {
    const [errorsList, setErrorsList] = useState([]);
    const [msg, setMsg] = useState('Error');

    useEffect(() => {
        const errorsArr = errData?.response?.data?.errors;
        if(errorsArr) {
            setErrorsList(errorsArr)
        }
        
        const message = errData?.response?.data?.message || errData.message;
        setMsg(message);
    }, [errData])

    return (
        <div className="alert alert-danger bg-danger alert-dismissible fade show" role="alert">
            <h6 className='alert-heading text-white'>{msg}</h6>
            {errorsList.length > 0 &&
                <>
                    <hr />
                    <ul>
                        {
                            errorsList.map(e => (
                                <li key={`err-${e.path}`}>{e.msg}</li>
                            ))
                        }
                    </ul>
                </>
            }
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default ErrorItem