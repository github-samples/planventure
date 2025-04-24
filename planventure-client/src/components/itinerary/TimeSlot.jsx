import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Stack,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AccessTime as TimeIcon,
  Place as PlaceIcon
} from '@mui/icons-material';

const TimeSlot = ({ slot, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSlot, setEditedSlot] = useState(slot);

  const handleSave = () => {
    onUpdate(editedSlot);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSlot(slot);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card variant="outlined" sx={{ mb: 1 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={editedSlot.time}
              onChange={(e) => setEditedSlot({ ...editedSlot, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Activity"
              value={editedSlot.activity}
              onChange={(e) => setEditedSlot({ ...editedSlot, activity: e.target.value })}
            />
            <TextField
              fullWidth
              label="Location"
              value={editedSlot.location}
              onChange={(e) => setEditedSlot({ ...editedSlot, location: e.target.value })}
            />
            <TextField
              select
              fullWidth
              label="Type"
              value={editedSlot.type}
              onChange={(e) => setEditedSlot({ ...editedSlot, type: e.target.value })}
            >
              <MenuItem value="activity">Activity</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="accommodation">Accommodation</MenuItem>
              <MenuItem value="food">Food</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <IconButton onClick={handleCancel} color="error" size="small">
                <CancelIcon />
              </IconButton>
              <IconButton onClick={handleSave} color="success" size="small">
                <SaveIcon />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="subtitle1" component="div">
              {slot.activity}
            </Typography>
            <Stack direction="row" spacing={2} color="text.secondary">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon fontSize="small" />
                <Typography variant="body2">{slot.time}</Typography>
              </Box>
              {slot.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PlaceIcon fontSize="small" />
                  <Typography variant="body2">{slot.location}</Typography>
                </Box>
              )}
            </Stack>
          </Stack>
          <Box>
            <IconButton onClick={() => setIsEditing(true)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(slot.id)} color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimeSlot;
