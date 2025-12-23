# FIFA World Cup 2026 Toronto - Seat Booking Application

A modern, interactive web application for booking seats at FIFA World Cup 2026 matches in Toronto at BMO Field.

## Features

### Match Selection
- Choose from multiple FIFA World Cup 2026 matches
- Group Stage matches
- Knockout rounds (Round of 32, Quarter Finals)
- Interactive match cards with date and time information

### Interactive Seat Selection
- Visual stadium layout with multiple seating sections
- **Premium Section** - $500 per seat (3 rows, 10 seats per row)
- **VIP Section** - $350 per seat (4 rows, 12 seats per row)
- **Standard Section** - $200 per seat (6 rows, 15 seats per row)
- **Economy Section** - $100 per seat (8 rows, 18 seats per row)
- Real-time seat availability
- Color-coded seat status (Available, Selected, Occupied)
- Click to select/deselect seats

### Booking Management
- Live booking summary with seat count and total price
- Customer information form with validation
- Required fields: Name, Email, Phone, Country
- Optional special requests field
- Terms and conditions acceptance

### Confirmation System
- Unique booking confirmation number
- Detailed booking confirmation modal
- Printable confirmation page
- Email confirmation notification

### User Experience
- Modern, responsive design
- Mobile-friendly interface
- Smooth animations and transitions
- FIFA World Cup themed colors
- Toronto BMO Field branding

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6)** - Interactive functionality and booking logic
- **No external dependencies** - Pure vanilla JavaScript

## File Structure

```
FIFA-World-Cup-Placing/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── package.json        # Project metadata
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## Installation & Setup

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Azil101/FIFA-World-Cup-Placing.git
cd FIFA-World-Cup-Placing
```

2. Open the application:
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local server (recommended)

### Using Python (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Or using npm script
npm start
```

Then open your browser and navigate to `http://localhost:8000`

### Using Node.js

```bash
# Install a simple HTTP server globally
npm install -g http-server

# Run the server
http-server
```

### Using VS Code

Install the "Live Server" extension and click "Go Live" at the bottom right.

## How to Use

### Step 1: Select a Match
- Browse the available matches displayed in cards
- Click on a match card to select it
- The selected match will be highlighted

### Step 2: Choose Your Seats
- View the stadium layout with different sections
- Check the legend for seat availability
- Click on available (green) seats to select them
- Click again to deselect
- Selected seats turn orange
- Occupied seats are red and cannot be selected

### Step 3: Review Your Booking
- Check the booking summary on the right
- Verify selected seats and total price
- Remove individual seats if needed by clicking the × button

### Step 4: Enter Your Information
- Fill in your personal details
- Name, Email, and Phone are required
- Select your country
- Add any special requests (optional)
- Accept the terms and conditions

### Step 5: Complete Booking
- Click "Complete Booking" button
- Review your confirmation details
- Save your confirmation number
- Print or email your confirmation

## Features Breakdown

### Match Management
- Pre-configured matches for FIFA World Cup 2026
- Match details include teams, date, and time
- Easy match selection interface

### Seat System
- Automatic seat generation based on section configuration
- Random seat occupation simulation (30% occupied)
- Seat pricing based on section type
- Individual seat tracking with unique IDs

### Validation
- Form validation for required fields
- Email format validation
- Phone number validation
- Match selection requirement
- Seat selection requirement

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly seat selection
- Adaptive layout for all screen sizes

### Accessibility
- Semantic HTML structure
- Clear visual indicators
- Keyboard navigation support (ESC to close modal)
- High contrast colors for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential features for future versions:

- Backend integration with database
- Payment processing integration
- User authentication and account management
- Email confirmation system
- QR code ticket generation
- Multi-language support
- Accessibility improvements (ARIA labels, screen reader support)
- Seat recommendations based on preferences
- Group booking features
- Waitlist functionality
- Real-time seat updates with WebSockets
- Mobile app version

## Development

### Project Structure

The application follows a simple, maintainable structure:

- **index.html**: Contains the entire UI structure
- **styles.css**: All styling and responsive design
- **script.js**: All interactive functionality

### Key JavaScript Functions

- `initializeSeats()` - Generates all seats
- `toggleSeatSelection()` - Handles seat selection
- `processBooking()` - Processes the booking
- `showConfirmation()` - Displays confirmation
- `validateForm()` - Validates user input

### Customization

To customize the application:

1. **Change seat prices**: Modify the `seatConfig` object in `script.js`
2. **Update matches**: Edit the `matches` object in `script.js`
3. **Modify colors**: Update CSS variables in `styles.css`
4. **Adjust stadium layout**: Change seat configuration in `seatConfig`

## Venue Information

**BMO Field**
- Location: 170 Princes' Blvd, Toronto, ON M6K 3C3, Canada
- Capacity: 30,000+ (expandable for World Cup)
- Home of Toronto FC
- One of the official FIFA World Cup 2026 venues

## FIFA World Cup 2026

The 2026 FIFA World Cup will be the 23rd FIFA World Cup, jointly hosted by Canada, the United States, and Mexico. Toronto's BMO Field will host multiple matches during the tournament.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for educational purposes.

## Contact

For questions or support regarding this booking system, please contact the development team.

## Acknowledgments

- FIFA World Cup 2026
- Toronto FC and BMO Field
- All football fans around the world

---

**Note**: This is a demonstration application for educational purposes. For actual FIFA World Cup 2026 ticket bookings, please visit the official FIFA website.

## Screenshots

### Home Page
The main landing page features the FIFA World Cup 2026 Toronto branding with match selection cards.

### Stadium View
Interactive stadium seating chart with color-coded availability and section pricing.

### Booking Summary
Real-time summary of selected seats with total price calculation.

### Confirmation
Detailed booking confirmation with unique confirmation number and printable receipt.

---

**Enjoy booking your FIFA World Cup 2026 Toronto seats!**
