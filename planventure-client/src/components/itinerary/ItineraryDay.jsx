import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Collapse,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon
} from '@mui/icons-material';
import TimeSlot from './TimeSlot';
import dayjs from 'dayjs';

const ItineraryDay = ({ date, slots = [], onAddSlot, onUpdateSlot, onDeleteSlot }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddSlot = () => {
    const newSlot = {
      id: Date.now(),
      time: '12:00',
      activity: '',
      location: '',
      type: 'activity'
    };
    onAddSlot(date, newSlot);
  };

  const sortedSlots = [...slots].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Paper elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'primary.light',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography variant="h6">
          {dayjs(date).format('dddd, MMMM D')}
        </Typography>
        <IconButton size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={isExpanded}>
        <Box sx={{ p: 2 }}>
          {sortedSlots.length === 0 ? (
            <Typography 
              color="text.secondary" 
              sx={{ textAlign: 'center', py: 2 }}
            >
              No activities planned for this day yet.
            </Typography>
          ) : (
            sortedSlots.map((slot) => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                onUpdate={(updatedSlot) => onUpdateSlot(date, updatedSlot)}
                onDelete={() => onDeleteSlot(date, slot.id)}
              />
            ))
          )}
          
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddSlot}
            sx={{ mt: 2 }}
          >
            Add Activity
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ItineraryDay;
