import React from 'react'
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem('token'))
    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">Todo</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="/tasks">Tasks</a>
                        {!isAuthenticated ?
                            <a className="nav-link" href="/login">Login</a> :
                            <a className='nav-link' href='#' onClick={onLogout}>Logout</a>
                        }
                    </nav>
                </div>
            </header>

            <main className="px-3">
                {children}
            </main>

            <footer className="mt-auto text-white-50">
                <p>Todo List by @Salma</p>
            </footer>
        </div>
    )
}

export default Layout