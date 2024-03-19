import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import api from '/src/api.jsx'
import '/src/styles/Report.css';

export default function ReportDialog() {
  const [open, setOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const student_info_id = localStorage.getItem('student_info_id');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReportText(''); // Clear the input when closing the dialog
  };

  const handleReportChange = (event) => {
    setReportText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // You need to provide the reporter ID, and the timestamp and period in the correct format
      const reportData = {
        reporter: reporterId, // This needs to come from the user context or similar
        statement: reportText,
        timestamp: new Date().toISOString(), // Adjust if you need to capture a different time
        // For period, the backend seems to expect a string in a specific format, 
        // possibly 'start_timestamp/end_timestamp' but it depends on how you have structured it.
        period: `${new Date().toISOString()}/${new Date().toISOString()}`, 
      };
      
      const response = await api.post(`/report/create`, reportData);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div>
      <Button variant="outlined" className='report-btn' onClick={handleClickOpen}>
        Report
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <div className='report'>
          <div className='report-inner'>
            <DialogTitle id="alert-dialog-title">
              Report
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CancelOutlinedIcon onClick={handleClose} className='report-close-btn' />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                className="report-field"
                label="Your report"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={reportText}
                onChange={handleReportChange}
              />
            </DialogContent>
            <Button onClick={handleSubmit} className='submit-report' variant="contained">
                Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
