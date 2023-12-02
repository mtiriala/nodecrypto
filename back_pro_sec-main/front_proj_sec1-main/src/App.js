import './App.css';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import Header from './comp/common/Header';
import PrivateRouteClient from './comp/common/PrivateRouteClient';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardClient from './pages/DashboardClient';
import Footer from './comp/common/Footer';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import PrivateRouteAdmin from './comp/common/PrivateRouteAdmin';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './comp/common/privateRoute';




function App() {
  // const { user, isAuthenticated, logout } = useAuth();

  return (
    <div >

      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRouteAdmin />}>
            <Route path='/dashboardAdmin' element={<DashboardAdmin />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRouteClient />}>
            <Route path='/DashboardClient' element={<DashboardClient />} />
          </Route>

        </Routes>
        {/* <Footer /> */}

      </BrowserRouter>
    </div>


  );
}

export default App;
