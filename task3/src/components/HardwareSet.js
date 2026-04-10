import React, { useState } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  TextField,
  Button,
  Stack,
} from '@mui/material';

/**
 * HardwareSet — displays one hardware set's availability and
 * allows joined users to check out / check in units.
 *
 * Props (passed from ProjectCard):
 *   hardwareSet — { name, available, capacity }
 *   isJoined    — boolean (controls whether checkout/checkin inputs show)
 *   onCheckout  — (qty) => void
 *   onCheckin   — (qty) => void
 */
function HardwareSet({ hardwareSet, isJoined, onCheckout, onCheckin }) {
  const { name, available, capacity } = hardwareSet;
  const [qty, setQty] = useState(1);

  const usedPercent = ((capacity - available) / capacity) * 100;

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) setQty(val);
  };

  return (
    <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f9f9f9', borderRadius: 1 }}>
      {/* Set name and availability text */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {available} / {capacity} available
        </Typography>
      </Box>

      {/* MUI LinearProgress — visual capacity bar */}
      <LinearProgress
        variant="determinate"
        value={usedPercent}
        color={usedPercent > 80 ? 'error' : usedPercent > 50 ? 'warning' : 'success'}
        sx={{ height: 8, borderRadius: 4, mb: 1 }}
      />

      {/* Checkout / check-in controls — only shown when user has joined */}
      {isJoined && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <TextField
            type="number"
            label="Qty"
            size="small"
            value={qty}
            onChange={handleQtyChange}
            inputProps={{ min: 1, max: capacity }}
            sx={{ width: 70 }}
          />
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => onCheckout(qty)}
            disabled={available === 0}
          >
            Check Out
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => onCheckin(qty)}
            disabled={available >= capacity}
          >
            Check In
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default HardwareSet;
