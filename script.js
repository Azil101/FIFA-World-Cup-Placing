// FIFA World Cup 2026 Toronto Seat Booking Application
// Global variables
let selectedMatch = null;
let selectedSeats = [];
let totalPrice = 0;

// Match data - Real FIFA World Cup 2026 matchups
const matches = {
    1: { name: 'Group B - Match 1', date: 'June 12, 2026', time: '2:00 PM EST', teams: '🇨🇦 Canada vs 🇨🇭 Switzerland', group: 'B' },
    2: { name: 'Group B - Match 2', date: 'June 18, 2026', time: '7:00 PM EST', teams: '🇨🇦 Canada vs 🇶🇦 Qatar', group: 'B' },
    3: { name: 'Group A - Match 1', date: 'June 20, 2026', time: '4:00 PM EST', teams: '🇲🇽 Mexico vs 🇰🇷 South Korea', group: 'A' },
    4: { name: 'Group C - Match 1', date: 'June 22, 2026', time: '3:00 PM EST', teams: '🇧🇷 Brazil vs 🇲🇦 Morocco', group: 'C' },
    5: { name: 'Group J - Match 1', date: 'June 24, 2026', time: '7:00 PM EST', teams: '🇦🇷 Argentina vs 🇦🇹 Austria', group: 'J' },
    6: { name: 'Group L - Match 1', date: 'June 26, 2026', time: '2:00 PM EST', teams: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England vs 🇭🇷 Croatia', group: 'L' },
    7: { name: 'Round of 32', date: 'June 30, 2026', time: '5:00 PM EST', teams: '🇪🇸 Spain vs 🇳🇱 Netherlands', group: 'Knockout' },
    8: { name: 'Quarter Final', date: 'July 9, 2026', time: '3:00 PM EST', teams: '🇫🇷 France vs 🇵🇹 Portugal', group: 'Knockout' }
};

// Team statistics for each match
const matchStats = {
    1: {
        team1: { name: 'Canada', rank: 40, form: 'W-D-W-L-W', goals: 12, topScorer: 'Jonathan David' },
        team2: { name: 'Switzerland', rank: 18, form: 'W-W-D-W-D', goals: 15, topScorer: 'Breel Embolo' },
        h2h: 'Switzerland leads 2-1'
    },
    2: {
        team1: { name: 'Canada', rank: 40, form: 'W-D-W-L-W', goals: 12, topScorer: 'Jonathan David' },
        team2: { name: 'Qatar', rank: 58, form: 'L-D-L-W-L', goals: 8, topScorer: 'Almoez Ali' },
        h2h: 'First meeting'
    },
    3: {
        team1: { name: 'Mexico', rank: 15, form: 'W-W-D-W-L', goals: 18, topScorer: 'Raúl Jiménez' },
        team2: { name: 'South Korea', rank: 25, form: 'W-L-W-W-D', goals: 14, topScorer: 'Son Heung-min' },
        h2h: 'Tied 1-1'
    },
    4: {
        team1: { name: 'Brazil', rank: 4, form: 'W-W-W-W-D', goals: 22, topScorer: 'Neymar Jr.' },
        team2: { name: 'Morocco', rank: 13, form: 'W-D-W-W-L', goals: 16, topScorer: 'Hakim Ziyech' },
        h2h: 'Brazil leads 2-0'
    },
    5: {
        team1: { name: 'Argentina', rank: 2, form: 'W-W-W-W-W', goals: 24, topScorer: 'Lionel Messi' },
        team2: { name: 'Austria', rank: 22, form: 'W-D-L-W-D', goals: 13, topScorer: 'Marko Arnautović' },
        h2h: 'Argentina leads 3-0'
    },
    6: {
        team1: { name: 'England', rank: 5, form: 'W-W-D-W-W', goals: 20, topScorer: 'Harry Kane' },
        team2: { name: 'Croatia', rank: 10, form: 'D-W-W-L-D', goals: 17, topScorer: 'Luka Modrić' },
        h2h: 'England leads 2-1'
    },
    7: {
        team1: { name: 'Spain', rank: 8, form: 'W-W-W-D-W', goals: 19, topScorer: 'Álvaro Morata' },
        team2: { name: 'Netherlands', rank: 7, form: 'W-D-W-W-W', goals: 21, topScorer: 'Memphis Depay' },
        h2h: 'Spain leads 4-2'
    },
    8: {
        team1: { name: 'France', rank: 3, form: 'W-W-W-D-W', goals: 23, topScorer: 'Kylian Mbappé' },
        team2: { name: 'Portugal', rank: 6, form: 'W-W-L-W-W', goals: 18, topScorer: 'Cristiano Ronaldo' },
        h2h: 'France leads 6-3'
    }
};

// FIFA World Cup 2026 - All 48 Teams by Group
const tournamentGroups = {
    A: ['🇲🇽 Mexico', '🇰🇷 South Korea', '🇩🇰 Denmark', '🇨🇲 Cameroon'],
    B: ['🇨🇦 Canada', '🇨🇭 Switzerland', '🇶🇦 Qatar', '🇪🇨 Ecuador'],
    C: ['🇧🇷 Brazil', '🇲🇦 Morocco', '🇸🇪 Sweden', '🇨🇴 Colombia'],
    D: ['🇩🇪 Germany', '🇯🇵 Japan', '🇸🇳 Senegal', '🇨🇷 Costa Rica'],
    E: ['🇺🇸 USA', '🇺🇾 Uruguay', '🇵🇱 Poland', '🇬🇭 Ghana'],
    F: ['🇮🇹 Italy', '🇳🇬 Nigeria', '🇷🇸 Serbia', '🇨🇱 Chile'],
    G: ['🇦🇺 Australia', '🇪🇬 Egypt', '🇨🇿 Czech Republic', '🇵🇪 Peru'],
    H: ['🇧🇪 Belgium', '🇮🇷 Iran', '🇹🇳 Tunisia', '🇸🇦 Saudi Arabia'],
    I: ['🇳🇱 Netherlands', '🇩🇿 Algeria', '🇮🇸 Iceland', '🇯🇲 Jamaica'],
    J: ['🇦🇷 Argentina', '🇦🇹 Austria', '🇻🇪 Venezuela', '🇲🇱 Mali'],
    K: ['🇪🇸 Spain', '🇹🇷 Turkey', '🇵🇦 Panama', '🇳🇿 New Zealand'],
    L: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇭🇷 Croatia', '🇵🇹 Portugal', '🇫🇷 France']
};

// Match venues and host cities
const venues = {
    1: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    2: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    3: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    4: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    5: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    6: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    7: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' },
    8: { stadium: 'BMO Field', city: 'Toronto, Canada', capacity: '30,000' }
};

// Tournament info
const tournamentInfo = {
    totalTeams: 48,
    totalGroups: 12,
    startDate: 'June 11, 2026',
    endDate: 'July 19, 2026',
    hostCountries: ['🇨🇦 Canada', '🇺🇸 USA', '🇲🇽 Mexico']
};

// Seat configuration for each section
const seatConfig = {
    premium: { rows: 3, seatsPerRow: 10, price: 1000 },
    vip: { rows: 4, seatsPerRow: 12, price: 850 },
    standard: { rows: 6, seatsPerRow: 15, price: 700 },
    economy: { rows: 8, seatsPerRow: 18, price: 600 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTournamentOverview();
    initializeSeats();
    initializeMatchSelection();
    initializeForm();
    initializeMusicPlayer();
    initializeCountdowns();
    updateSeatsRemaining();
    startStadiumAnimation();
});

// Initialize tournament overview section
function initializeTournamentOverview() {
    const overview = document.getElementById('tournament-overview');
    if (!overview) return;

    // Add tournament info
    const infoHTML = `
        <div class="tournament-header">
            <h2>🏆 FIFA World Cup 2026</h2>
            <div class="tournament-stats">
                <div class="stat-badge">${tournamentInfo.totalTeams} Teams</div>
                <div class="stat-badge">${tournamentInfo.totalGroups} Groups</div>
                <div class="stat-badge">📅 ${tournamentInfo.startDate} - ${tournamentInfo.endDate}</div>
            </div>
            <div class="host-countries">
                <strong>Host Countries:</strong> ${tournamentInfo.hostCountries.join(' • ')}
            </div>
        </div>
    `;

    // Add groups display
    let groupsHTML = '<div class="groups-container">';
    Object.keys(tournamentGroups).forEach(group => {
        groupsHTML += `
            <div class="group-card">
                <div class="group-header">Group ${group}</div>
                <div class="group-teams">
                    ${tournamentGroups[group].map(team => `<div class="group-team">${team}</div>`).join('')}
                </div>
            </div>
        `;
    });
    groupsHTML += '</div>';

    overview.innerHTML = infoHTML + groupsHTML;

    // Add toggle functionality
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-groups-btn';
    toggleBtn.textContent = 'Hide Groups ▲';
    toggleBtn.onclick = function() {
        const container = document.querySelector('.groups-container');
        container.classList.toggle('collapsed');
        this.textContent = container.classList.contains('collapsed') ?
            'Show All Groups ▼' : 'Hide Groups ▲';
    };
    overview.querySelector('.tournament-header').appendChild(toggleBtn);
}

// Start stadium entrance animation
function startStadiumAnimation() {
    const stadium = document.querySelector('.stadium');
    if (stadium) {
        stadium.classList.add('stadium-loaded');
    }
}

// Initialize countdown timers for all matches
function initializeCountdowns() {
    // Add countdown elements to all match cards
    Object.keys(matches).forEach(matchId => {
        const matchCard = document.querySelector(`[data-match="${matchId}"]`);
        if (matchCard) {
            const matchDetails = matchCard.querySelector('.match-details');
            if (matchDetails && !matchDetails.querySelector('.countdown')) {
                const countdownDiv = document.createElement('div');
                countdownDiv.className = 'countdown';
                countdownDiv.textContent = 'Loading...';
                matchDetails.appendChild(countdownDiv);
            }

            // Add venue information
            if (venues[matchId] && !matchCard.querySelector('.venue-info')) {
                const venue = venues[matchId];
                const venueDiv = document.createElement('div');
                venueDiv.className = 'venue-info';
                venueDiv.innerHTML = `
                    <div class="venue-details">
                        <span class="venue-icon">🏟️</span>
                        <span class="venue-text">${venue.stadium}</span>
                    </div>
                    <div class="venue-details">
                        <span class="venue-icon">📍</span>
                        <span class="venue-text">${venue.city}</span>
                    </div>
                    <div class="venue-details">
                        <span class="venue-icon">👥</span>
                        <span class="venue-text">Capacity: ${venue.capacity}</span>
                    </div>
                `;
                matchDetails.insertBefore(venueDiv, matchDetails.firstChild);
            }

            // Add team stats
            if (matchStats[matchId] && !matchCard.querySelector('.team-stats')) {
                const stats = matchStats[matchId];
                const statsDiv = document.createElement('div');
                statsDiv.className = 'team-stats';
                statsDiv.innerHTML = `
                    <div class="stats-container">
                        <div class="team-stat">
                            <div class="stat-label">FIFA Rank</div>
                            <div class="stat-value">#${stats.team1.rank}</div>
                        </div>
                        <div class="team-stat">
                            <div class="stat-label">Recent Form</div>
                            <div class="stat-value form-indicator">${stats.team1.form}</div>
                        </div>
                        <div class="team-stat">
                            <div class="stat-label">Top Scorer</div>
                            <div class="stat-value">⚽ ${stats.team1.topScorer}</div>
                        </div>
                    </div>
                    <div class="stats-vs">
                        <div class="h2h-record">H2H: ${stats.h2h}</div>
                    </div>
                    <div class="stats-container">
                        <div class="team-stat">
                            <div class="stat-label">FIFA Rank</div>
                            <div class="stat-value">#${stats.team2.rank}</div>
                        </div>
                        <div class="team-stat">
                            <div class="stat-label">Recent Form</div>
                            <div class="stat-value form-indicator">${stats.team2.form}</div>
                        </div>
                        <div class="team-stat">
                            <div class="stat-label">Top Scorer</div>
                            <div class="stat-value">⚽ ${stats.team2.topScorer}</div>
                        </div>
                    </div>
                `;
                matchDetails.appendChild(statsDiv);
            }
        }
    });

    // Add seats counter elements to all sections
    Object.keys(seatConfig).forEach(section => {
        const sectionElement = document.querySelector(`.${section}-section h4`);
        if (sectionElement && !document.querySelector(`.${section}-counter`)) {
            const counterSpan = document.createElement('span');
            counterSpan.className = `seats-counter ${section}-counter`;
            counterSpan.style.display = 'block';
            counterSpan.style.marginTop = '0.5rem';
            sectionElement.parentElement.insertBefore(counterSpan, sectionElement.nextSibling);
        }
    });

    updateCountdowns();
    // Update every second
    setInterval(updateCountdowns, 1000);
}

// Update countdown timers
function updateCountdowns() {
    Object.keys(matches).forEach(matchId => {
        const match = matches[matchId];
        const countdownElement = document.querySelector(`[data-match="${matchId}"] .countdown`);

        if (countdownElement) {
            const matchDateTime = new Date(`${match.date} ${match.time}`);
            const now = new Date();
            const timeRemaining = matchDateTime - now;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                countdownElement.textContent = `⏰ ${days}d ${hours}h ${minutes}m ${seconds}s`;
                countdownElement.style.color = '#ff9800';
            } else {
                countdownElement.textContent = '⚽ Match Started!';
                countdownElement.style.color = '#4caf50';
            }
        }
    });
}

// Update seats remaining counter
function updateSeatsRemaining() {
    Object.keys(seatConfig).forEach(section => {
        const grid = document.querySelector(`[data-section="${section}"]`);
        if (grid) {
            const availableSeats = grid.querySelectorAll('.seat.available').length;
            const totalSeats = seatConfig[section].rows * seatConfig[section].seatsPerRow;

            const counterElement = document.querySelector(`.${section}-counter`);
            if (counterElement) {
                counterElement.textContent = `${availableSeats}/${totalSeats} available`;

                // Color code based on availability
                const percentage = (availableSeats / totalSeats) * 100;
                if (percentage > 50) {
                    counterElement.style.color = '#4caf50'; // Green
                } else if (percentage > 20) {
                    counterElement.style.color = '#ff9800'; // Orange
                } else {
                    counterElement.style.color = '#f44336'; // Red
                }
            }
        }
    });
}

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
    updateSeatsRemaining();
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
        updatePredictionDropdown();
    } else {
        matchText.textContent = 'Please select a match';
    }
}

// Update prediction dropdown based on selected match
function updatePredictionDropdown() {
    const dropdown = document.getElementById('predicted-winner');
    if (!dropdown || !selectedMatch) return;

    const teams = selectedMatch.teams.split(' vs ');

    dropdown.innerHTML = `
        <option value="">Select your prediction</option>
        <option value="${teams[0]}">${teams[0]} will win</option>
        <option value="${teams[1]}">${teams[1]} will win</option>
        <option value="draw">It will be a draw</option>
    `;
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
        predictedWinner: formData.get('predictedWinner'),
        bookingDate: new Date().toLocaleString(),
        confirmationNumber: generateConfirmationNumber()
    };

    // Store booking data (in a real app, this would be sent to a server)
    console.log('Booking Data:', bookingData);

    // Send confirmation email
    sendConfirmationEmail(bookingData);

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

    const predictionText = bookingData.predictedWinner === 'draw'
        ? 'Draw'
        : `${bookingData.predictedWinner} to win`;

    detailsDiv.innerHTML = `
        <p><strong>Confirmation Number:</strong> ${bookingData.confirmationNumber}</p>
        <p><strong>Name:</strong> ${bookingData.customer.fullName}</p>
        <p><strong>Email:</strong> ${bookingData.customer.email}</p>
        <p><strong>Match:</strong> ${bookingData.match.name}</p>
        <p><strong>Teams:</strong> ${bookingData.match.teams}</p>
        <p><strong>Your Prediction:</strong> 🏆 ${predictionText}</p>
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

// Send confirmation email
function sendConfirmationEmail(bookingData) {
    // Format seat details for email
    const seatDetails = bookingData.seats.map(seat =>
        `${seat.section.charAt(0).toUpperCase() + seat.section.slice(1)} - Row ${seat.row}, Seat ${seat.seat} ($${seat.price})`
    ).join('\n');

    // Email template parameters
    const predictionText = bookingData.predictedWinner === 'draw'
        ? 'Draw'
        : `${bookingData.predictedWinner} to win`;

    const templateParams = {
        to_email: bookingData.customer.email,
        to_name: bookingData.customer.fullName,
        confirmation_number: bookingData.confirmationNumber,
        match_name: bookingData.match.name,
        match_teams: bookingData.match.teams,
        predicted_winner: predictionText,
        match_date: bookingData.match.date,
        match_time: bookingData.match.time,
        seat_count: bookingData.seats.length,
        seat_details: seatDetails,
        total_price: bookingData.totalPrice,
        booking_date: bookingData.bookingDate,
        phone: bookingData.customer.phone,
        country: bookingData.customer.country,
        special_requests: bookingData.customer.specialRequests || 'None'
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS IDs
    if (typeof emailjs !== 'undefined') {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
            }, function(error) {
                console.log('Failed to send email:', error);
                // Still show confirmation even if email fails
            });
    } else {
        console.log('EmailJS not configured. Email template:', templateParams);
    }
}

// Initialize music player
function initializeMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');

    if (!musicToggle || !backgroundMusic) return;

    // Set initial volume
    backgroundMusic.volume = 0.3;

    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('paused');
                musicToggle.title = 'Pause Music';
            }).catch(error => {
                console.log('Audio playback failed:', error);
            });
        } else {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('paused');
            musicToggle.title = 'Play Music';
        }
    });

    // Handle when music ends (though it's set to loop)
    backgroundMusic.addEventListener('ended', function() {
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('paused');
    });
}

// Console welcome message
console.log('%cFIFA World Cup 2026 Toronto Booking System', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cBook your seats for the greatest sporting event!', 'color: #666; font-size: 14px;');
