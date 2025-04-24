import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  Stack,
  Collapse
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Hotel as HotelIcon
} from '@mui/icons-material';
import { useState } from 'react';

const AccommodationCard = ({ accommodation, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(accommodation);

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
              fullWidth
              label="Name"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Address"
              value={editedData.address}
              onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
            />
            <TextField
              fullWidth
              label="Check-in"
              type="datetime-local"
              value={editedData.checkIn}
              onChange={(e) => setEditedData({ ...editedData, checkIn: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Check-out"
              type="datetime-local"
              value={editedData.checkOut}
              onChange={(e) => setEditedData({ ...editedData, checkOut: e.target.value })}
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
              {accommodation.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {accommodation.address}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Check-in: {new Date(accommodation.checkIn).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Check-out: {new Date(accommodation.checkOut).toLocaleString()}
            </Typography>
            {accommodation.bookingRef && (
              <Typography variant="body2">
                Booking Reference: {accommodation.bookingRef}
              </Typography>
            )}
          </Box>
          <Box>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(accommodation.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
