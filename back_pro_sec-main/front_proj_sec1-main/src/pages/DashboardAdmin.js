
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, checkGridRowIdIsValid } from '@mui/x-data-grid';
import useApi from '../hocks/useApi'
import moment from 'moment/moment';
import { useState } from 'react';
import Loading from '../comp/common/Loading'
import ReportTableAdmin from '../comp/reportTabelAdmin';
import axios from 'axios';


export default function DashboardAdmin(props) {
  // const { data, loading, error, get, post, put, remove } = useApi();
  const [loading, setLoading] = React.useState(true)

  const [reports, setReports] = React.useState()
  React.useEffect(() => {
    axios.get('/report')
    .then(res =>{
      setReports(res.data)
      console.log(res.data)
      setLoading(false)
    })
    .catch(err=>{
      console.log(err)
      setLoading(false)
    })
       
      
  }, []);

  if (loading)
    return (<Loading />)
  if (reports)
    return (
      <ReportTableAdmin data={reports} />
    );
}

