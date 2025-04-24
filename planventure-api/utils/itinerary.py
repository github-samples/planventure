from datetime import datetime, timedelta

def generate_default_itinerary(start_date: datetime, end_date: datetime) -> dict:
    """Generate a default itinerary template for the trip duration"""
    itinerary = {}
    current_date = start_date
    
    while current_date <= end_date:
        date_str = current_date.strftime('%Y-%m-%d')
        itinerary[date_str] = {
            'activities': [],
            'meals': {
                'breakfast': {'time': '08:00', 'place': '', 'notes': ''},
                'lunch': {'time': '13:00', 'place': '', 'notes': ''},
                'dinner': {'time': '19:00', 'place': '', 'notes': ''}
            },
            'accommodation': {
                'name': '',
                'address': '',
                'check_in': '',
                'check_out': '',
                'confirmation': ''
            },
            'transportation': [],
            'notes': ''
        }
        current_date += timedelta(days=1)
    
    return itinerary
