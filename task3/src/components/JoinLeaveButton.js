import React from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * JoinLeaveButton — a reusable toggle button for joining or leaving a project.
 *
 * Props (passed from ProjectCard):
 *   isJoined — boolean
 *   onJoin   — () => void
 *   onLeave  — () => void
 */
function JoinLeaveButton({ isJoined, onJoin, onLeave }) {
  if (isJoined) {
    return (
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<LogoutIcon />}
        onClick={onLeave}
        fullWidth
      >
        Leave Project
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<LoginIcon />}
      onClick={onJoin}
      fullWidth
    >
      Join Project
    </Button>
  );
}

export default JoinLeaveButton;
