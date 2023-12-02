import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import moment from 'moment';


export default function ReportTableClient(props) {


  return (
    <div>
      <Typography variant="h6">Claims Table Client</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.content}</TableCell>
                <TableCell>{moment(item.date).calendar()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
