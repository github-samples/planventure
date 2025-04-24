import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Stack,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useState } from 'react';

const TransportationCard = ({ transport, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(transport);

  const handleSave = () => {
    onUpdate(editedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              select
              fullWidth
              label="Type"
              value={editedData.type}
              onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
            >
              <MenuItem value="flight">Flight</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="car">Car Rental</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="From"
              value={editedData.from}
              onChange={(e) => setEditedData({ ...editedData, from: e.target.value })}
            />
            <TextField
              fullWidth
              label="To"
              value={editedData.to}
              onChange={(e) => setEditedData({ ...editedData, to: e.target.value })}
            />
            <TextField
              fullWidth
              label="Departure"
              type="datetime-local"
              value={editedData.departure}
              onChange={(e) => setEditedData({ ...editedData, departure: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Arrival"
              type="datetime-local"
              value={editedData.arrival}
              onChange={(e) => setEditedData({ ...editedData, arrival: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Booking Reference"
              value={editedData.bookingRef}
              onChange={(e) => setEditedData({ ...editedData, bookingRef: e.target.value })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button startIcon={<CancelIcon />} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {transport.type.charAt(0).toUpperCase() + transport.type.slice(1)}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {transport.from} → {transport.to}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Departure: {new Date(transport.departure).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Arrival: {new Date(transport.arrival).toLocaleString()}
            </Typography>
            {transport.bookingRef && (
              <Typography variant="body2">
                Booking Reference: {transport.bookingRef}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(transport.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransportationCard;
