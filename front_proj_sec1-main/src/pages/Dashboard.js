import React, { useContext } from 'react';
import DashboardClient from './DashboardClient';
import DashboardAdmin from './DashboardAdmin';
// import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useApi from '../hocks/useApi';
import axios from 'axios'
import Loading from "../comp/common/Loading"
function Dashboard() {
    // const { user } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState()
    React.useEffect(() => {
        axios.get('/user/curent')
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })


    }, []);

    return (
        <div style={{marginTop:"50px"}}>
            {loading ? (<Loading />) : (
                user.role === 'client' ? (
                    <DashboardClient user={user} />
                ) : user.role === 'admin' ? (
                    <DashboardAdmin user={user} />
                ) : (<>loading</>)
            )}
        </div>
    );
    // else
    //     return (<Navigate to='/login' />)
}

export default Dashboard;