import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, Collapse, Box } from '@mui/material';
import moment from 'moment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ReportTableAdmin(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [openRows, setOpenRows] = useState({}); // Use an object to track the open state for each row

  const divStyle = {
    color: isHovered ? 'red' : 'black',
    transition: 'color 0.3s', // Add a smooth transition for the color change
  };
  const cellStyle = {
    maxWidth: '100px', // Maximum width
    maxHeight: '50px', // Maximum height
    overflow: 'hidden', // Hide content that exceeds max width/height
    textOverflow: 'ellipsis', // Add ellipsis for overflow text
    whiteSpace: 'nowrap', // Prevent text from wrapping
  };
  const handleRowToggle = (rowId) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [rowId]: !prevOpenRows[rowId], // Toggle the state of the clicked row
    }));
  };
  return (
    <div>
      <Typography variant="h6">Claims Table Admin</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map(item =>
              <>
                <TableRow
                  key={item._id}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowToggle(item._id)} 
                    >
                      {openRows[item._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell style={cellStyle} >{item.content}</TableCell>
                  <TableCell>{moment(item.date).calendar()}</TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>{item.user.firstName} {item.user.lastName}</TableCell>
                  <TableCell>{item.user.grade}</TableCell>
                  <TableCell>{item.user.job}</TableCell>
                  <TableCell>{item.user.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows[item._id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Details
                        </Typography>
                        
                        <Typography variant='body1'>
                          {item.content}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
