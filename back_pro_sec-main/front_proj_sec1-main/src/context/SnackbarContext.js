import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity = 'info') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, [open,message,severity]);

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={closeSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={severity}
          onClose={closeSnackbar}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export { SnackbarProvider, useSnackbar };
