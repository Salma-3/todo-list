import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Tasks from './pages/tasks';
import Home from './pages/home';
import Layout from './components/layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><Home/></Layout>
    },
    {
        path: '/login',
        element: <Layout><Login/></Layout>
    }, 
    {
        path: '/signup',
        element: <Layout><Signup/></Layout>
    }, 
    {
        path: '/tasks',
        element: <Layout><Tasks/></Layout>
    }

])

export default router;