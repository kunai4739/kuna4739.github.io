import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProjectCard from './ProjectCard';

// Hardcoded initial project data (no backend yet)
const INITIAL_PROJECTS = [
  {
    id: 'proj001',
    name: 'Autonomous Robot Lab',
    description: 'A research project focused on autonomous navigation using ROS and computer vision.',
    hardwareSets: [
      { name: 'HWSet 1', available: 80, capacity: 100 },
      { name: 'HWSet 2', available: 15, capacity: 50 },
    ],
  },
  {
    id: 'proj002',
    name: 'Smart Home Controller',
    description: 'IoT platform for managing home automation sensors and actuators.',
    hardwareSets: [
      { name: 'HWSet 1', available: 40, capacity: 100 },
      { name: 'HWSet 2', available: 50, capacity: 50 },
    ],
  },
  {
    id: 'proj003',
    name: 'Satellite Ground Station',
    description: 'Ground-based telemetry collection and uplink system for CubeSat missions.',
    hardwareSets: [
      { name: 'HWSet 1', available: 10, capacity: 100 },
      { name: 'HWSet 2', available: 0, capacity: 50 },
    ],
  },
];

function Projects() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  // Set of project IDs the current user has joined
  const [joinedProjects, setJoinedProjects] = useState(new Set());
  const [joinIdInput, setJoinIdInput] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Custom event handler: join a project by its ID
  const handleJoin = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      setSnackbar({ open: true, message: `No project found with ID "${projectId}"`, severity: 'error' });
      return;
    }
    if (joinedProjects.has(projectId)) {
      setSnackbar({ open: true, message: 'You already joined this project.', severity: 'warning' });
      return;
    }
    setJoinedProjects((prev) => new Set([...prev, projectId]));
    setSnackbar({ open: true, message: `Joined "${project.name}"!`, severity: 'success' });
  };

  // Custom event handler: leave a project
  const handleLeave = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setJoinedProjects((prev) => {
      const next = new Set(prev);
      next.delete(projectId);
      return next;
    });
    setSnackbar({ open: true, message: `Left "${project?.name}".`, severity: 'info' });
  };

  // Custom event handler: checkout hardware units from a project's hardware set
  const handleCheckout = (projectId, setName, qty) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          hardwareSets: p.hardwareSets.map((hs) => {
            if (hs.name !== setName) return hs;
            const newAvail = Math.max(0, hs.available - qty);
            return { ...hs, available: newAvail };
          }),
        };
      })
    );
  };

  // Custom event handler: check in (return) hardware units
  const handleCheckin = (projectId, setName, qty) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          hardwareSets: p.hardwareSets.map((hs) => {
            if (hs.name !== setName) return hs;
            const newAvail = Math.min(hs.capacity, hs.available + qty);
            return { ...hs, available: newAvail };
          }),
        };
      })
    );
  };

  const handleJoinByInput = () => {
    handleJoin(joinIdInput.trim());
    setJoinIdInput('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* MUI Component 1: AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Hardware Checkout System
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Logged in as: student_user
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page header */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1a1a2e' }}>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Browse available projects below. Join a project to check out hardware resources.
        </Typography>

        {/* Join by ID panel */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            mb: 4,
            p: 2,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {/* MUI Component 2: TextField */}
          <TextField
            label="Enter Project ID to Join"
            variant="outlined"
            size="small"
            value={joinIdInput}
            onChange={(e) => setJoinIdInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoinByInput()}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleJoinByInput}
            disabled={!joinIdInput.trim()}
          >
            Join Project
          </Button>
        </Box>

        {/* Project cards grid — ProjectCard is reused for every project */}
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              {/* Requirement: reuse ProjectCard; pass props (project, isJoined, handlers) */}
              <ProjectCard
                project={project}
                isJoined={joinedProjects.has(project.id)}
                onJoin={handleJoin}
                onLeave={handleLeave}
                onCheckout={handleCheckout}
                onCheckin={handleCheckin}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Projects;
