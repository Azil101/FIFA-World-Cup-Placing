// FIFA World Cup 2026 Toronto Seat Booking Application
// Global variables
let selectedMatch = null;
let selectedSeats = [];
let totalPrice = 0;

// Match data
const matches = {
    1: { name: 'Group Stage Match 1', date: 'June 12, 2026', time: '2:00 PM EST', teams: 'TBD vs TBD' },
    2: { name: 'Group Stage Match 2', date: 'June 18, 2026', time: '7:00 PM EST', teams: 'TBD vs TBD' },
    3: { name: 'Round of 32', date: 'June 28, 2026', time: '4:00 PM EST', teams: 'TBD vs TBD' },
    4: { name: 'Quarter Final', date: 'July 9, 2026', time: '3:00 PM EST', teams: 'TBD vs TBD' }
};

// Seat configuration for each section
const seatConfig = {
    premium: { rows: 3, seatsPerRow: 10, price: 500 },
    vip: { rows: 4, seatsPerRow: 12, price: 350 },
    standard: { rows: 6, seatsPerRow: 15, price: 200 },
    economy: { rows: 8, seatsPerRow: 18, price: 100 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSeats();
    initializeMatchSelection();
    initializeForm();
});

// Generate seats for all sections
function initializeSeats() {
    Object.keys(seatConfig).forEach(section => {
        const grid = document.querySelector(`[data-section="${section}"]`);
        const config = seatConfig[section];

        for (let row = 1; row <= config.rows; row++) {
            for (let seat = 1; seat <= config.seatsPerRow; seat++) {
                const seatElement = createSeat(section, row, seat, config.price);
                grid.appendChild(seatElement);
            }
        }
    });

    // Randomly mark some seats as occupied for realism
    randomlyOccupySeats();
}

// Create a seat element
function createSeat(section, row, seat, price) {
    const seatDiv = document.createElement('div');
    const seatId = `${section}-${row}-${seat}`;

    seatDiv.className = 'seat available';
    seatDiv.dataset.seatId = seatId;
    seatDiv.dataset.section = section;
    seatDiv.dataset.row = row;
    seatDiv.dataset.seat = seat;
    seatDiv.dataset.price = price;
    seatDiv.textContent = seat;
    seatDiv.title = `${section.charAt(0).toUpperCase() + section.slice(1)} - Row ${row}, Seat ${seat} - $${price}`;

    seatDiv.addEventListener('click', function() {
        if (!selectedMatch) {
            alert('Please select a match first!');
            return;
        }

        if (this.classList.contains('occupied')) {
            return;
        }

        toggleSeatSelection(this);
    });

    return seatDiv;
}

// Toggle seat selection
function toggleSeatSelection(seatElement) {
    const seatId = seatElement.dataset.seatId;
    const price = parseInt(seatElement.dataset.price);

    if (seatElement.classList.contains('selected')) {
        // Deselect seat
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');

        const index = selectedSeats.findIndex(s => s.id === seatId);
        if (index > -1) {
            selectedSeats.splice(index, 1);
            totalPrice -= price;
        }
    } else {
        // Select seat
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');

        selectedSeats.push({
            id: seatId,
            section: seatElement.dataset.section,
            row: seatElement.dataset.row,
            seat: seatElement.dataset.seat,
            price: price
        });
        totalPrice += price;
    }

    updateBookingSummary();
}

// Randomly occupy some seats
function randomlyOccupySeats() {
    const allSeats = document.querySelectorAll('.seat.available');
    const occupyCount = Math.floor(allSeats.length * 0.3); // Occupy 30% of seats

    const shuffled = Array.from(allSeats).sort(() => 0.5 - Math.random());
    const toOccupy = shuffled.slice(0, occupyCount);

    toOccupy.forEach(seat => {
        seat.classList.remove('available');
        seat.classList.add('occupied');
    });
}

// Initialize match selection
function initializeMatchSelection() {
    const matchCards = document.querySelectorAll('.match-card');

    matchCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            matchCards.forEach(c => c.classList.remove('selected'));

            // Add selection to clicked card
            this.classList.add('selected');

            // Update selected match
            selectedMatch = matches[this.dataset.match];

            // Update summary
            updateMatchSummary();
        });
    });
}

// Update match summary
function updateMatchSummary() {
    const matchText = document.getElementById('selected-match-text');
    if (selectedMatch) {
        matchText.textContent = `${selectedMatch.name} - ${selectedMatch.date} at ${selectedMatch.time}`;
    } else {
        matchText.textContent = 'Please select a match';
    }
}

// Update booking summary
function updateBookingSummary() {
    const seatsCount = document.getElementById('selected-seats-count');
    const seatsList = document.getElementById('selected-seats-list');
    const priceElement = document.getElementById('total-price');

    seatsCount.textContent = selectedSeats.length;
    priceElement.textContent = `$${totalPrice}`;

    // Update seats list
    seatsList.innerHTML = '';
    selectedSeats.forEach(seat => {
        const tag = document.createElement('div');
        tag.className = 'seat-tag';
        tag.innerHTML = `
            ${seat.section.charAt(0).toUpperCase() + seat.section.slice(1)} R${seat.row}S${seat.seat} - $${seat.price}
            <span class="remove" onclick="removeSeat('${seat.id}')">&times;</span>
        `;
        seatsList.appendChild(tag);
    });

    // Enable/disable submit button
    updateSubmitButton();
}

// Remove a seat from selection
function removeSeat(seatId) {
    const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
    if (seatElement) {
        toggleSeatSelection(seatElement);
    }
}

// Initialize form
function initializeForm() {
    const form = document.getElementById('booking-form');
    const inputs = form.querySelectorAll('input, select, textarea');

    // Add input listeners for validation
    inputs.forEach(input => {
        input.addEventListener('input', updateSubmitButton);
        input.addEventListener('change', updateSubmitButton);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            processBooking();
        }
    });
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('booking-form');
    const formValid = form.checkValidity();

    if (selectedMatch && selectedSeats.length > 0 && formValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Validate form
function validateForm() {
    if (!selectedMatch) {
        alert('Please select a match!');
        return false;
    }

    if (selectedSeats.length === 0) {
        alert('Please select at least one seat!');
        return false;
    }

    const form = document.getElementById('booking-form');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields!');
        return false;
    }

    return true;
}

// Process booking
function processBooking() {
    const form = document.getElementById('booking-form');
    const formData = new FormData(form);

    const bookingData = {
        match: selectedMatch,
        seats: selectedSeats,
        totalPrice: totalPrice,
        customer: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            specialRequests: formData.get('specialRequests')
        },
        bookingDate: new Date().toLocaleString(),
        confirmationNumber: generateConfirmationNumber()
    };

    // Store booking data (in a real app, this would be sent to a server)
    console.log('Booking Data:', bookingData);

    // Show confirmation modal
    showConfirmation(bookingData);
}

// Generate confirmation number
function generateConfirmationNumber() {
    const prefix = 'FIFA2026-TOR';
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${prefix}-${random}`;
}

// Show confirmation modal
function showConfirmation(bookingData) {
    const modal = document.getElementById('confirmation-modal');
    const detailsDiv = document.getElementById('confirmation-details');

    detailsDiv.innerHTML = `
        <p><strong>Confirmation Number:</strong> ${bookingData.confirmationNumber}</p>
        <p><strong>Name:</strong> ${bookingData.customer.fullName}</p>
        <p><strong>Email:</strong> ${bookingData.customer.email}</p>
        <p><strong>Match:</strong> ${bookingData.match.name}</p>
        <p><strong>Date:</strong> ${bookingData.match.date} at ${bookingData.match.time}</p>
        <p><strong>Number of Seats:</strong> ${bookingData.seats.length}</p>
        <p><strong>Seats:</strong></p>
        <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
            ${bookingData.seats.map(seat =>
                `<li>${seat.section.charAt(0).toUpperCase() + seat.section.slice(1)} - Row ${seat.row}, Seat ${seat.seat} ($${seat.price})</li>`
            ).join('')}
        </ul>
        <p style="margin-top: 1rem;"><strong>Total Amount:</strong> $${bookingData.totalPrice}</p>
        <p><strong>Booking Date:</strong> ${bookingData.bookingDate}</p>
    `;

    modal.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('active');

    // Reset form and selections
    resetBooking();
}

// Reset booking
function resetBooking() {
    // Reset match selection
    selectedMatch = null;
    document.querySelectorAll('.match-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Reset seat selection
    selectedSeats.forEach(seat => {
        const seatElement = document.querySelector(`[data-seat-id="${seat.id}"]`);
        if (seatElement && seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
            seatElement.classList.add('available');
        }
    });

    selectedSeats = [];
    totalPrice = 0;

    // Reset form
    document.getElementById('booking-form').reset();

    // Update UI
    updateMatchSummary();
    updateBookingSummary();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Print functionality
function printConfirmation() {
    window.print();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Export booking data (for future use)
function exportBookingData() {
    const data = {
        match: selectedMatch,
        seats: selectedSeats,
        totalPrice: totalPrice,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'fifa-booking-data.json';
    link.click();

    URL.revokeObjectURL(url);
}

// Initialize tooltips and additional UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('confirmation-modal');
            if (modal.classList.contains('active')) {
                closeModal();
            }
        }
    });
});

// Console welcome message
console.log('%cFIFA World Cup 2026 Toronto Booking System', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cBook your seats for the greatest sporting event!', 'color: #666; font-size: 14px;');
