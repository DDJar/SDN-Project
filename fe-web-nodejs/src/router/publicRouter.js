import DefaultLayout from '../layout/DefaultLayout';

import AuthLayout from '../layout/AuthLayout';
import LoginPage from '../page/Login/index';
import HomePage from '../page/Home/index';
import ClassListPage from '../page/ClassList';
import RegistPage from '../page/Login/register';
import ProfilePage from '../page/Profile';
const publicRoutes = [
    { path: '/login', component: LoginPage, Layout: AuthLayout },
    { path: '/register', component: RegistPage, Layout: AuthLayout },
    { path: '/', component: HomePage, Layout: DefaultLayout },
    { path: '/class', component: ClassListPage, Layout: DefaultLayout },
    { path: '/profile', component: ProfilePage, Layout: DefaultLayout },
    
];

export default publicRoutes;