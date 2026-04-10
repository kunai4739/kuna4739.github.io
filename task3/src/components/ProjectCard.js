import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import HardwareSet from './HardwareSet';
import JoinLeaveButton from './JoinLeaveButton';

/**
 * ProjectCard — displays a single project's info, hardware sets,
 * and join/leave controls.
 *
 * Props (passed from Projects parent):
 *   project    — { id, name, description, hardwareSets[] }
 *   isJoined   — boolean
 *   onJoin     — (projectId) => void
 *   onLeave    — (projectId) => void
 *   onCheckout — (projectId, setName, qty) => void
 *   onCheckin  — (projectId, setName, qty) => void
 */
function ProjectCard({ project, isJoined, onJoin, onLeave, onCheckout, onCheckin }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: isJoined ? '0 0 0 2px #e94560' : undefined,
        transition: 'box-shadow 0.2s',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Project name & joined badge */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
            {project.name}
          </Typography>
          {isJoined && (
            <Chip label="Joined" color="secondary" size="small" sx={{ ml: 1, flexShrink: 0 }} />
          )}
        </Box>

        {/* Project ID */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          ID: {project.id}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Hardware sets — HardwareSet component reused once per hardware set */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Hardware Resources
        </Typography>
        {project.hardwareSets.map((hs) => (
          // Requirement: reuse HardwareSet; pass props (hs data + handlers)
          <HardwareSet
            key={hs.name}
            hardwareSet={hs}
            isJoined={isJoined}
            onCheckout={(qty) => onCheckout(project.id, hs.name, qty)}
            onCheckin={(qty) => onCheckin(project.id, hs.name, qty)}
          />
        ))}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        {/* JoinLeaveButton receives props from ProjectCard */}
        <JoinLeaveButton
          isJoined={isJoined}
          onJoin={() => onJoin(project.id)}
          onLeave={() => onLeave(project.id)}
        />
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
