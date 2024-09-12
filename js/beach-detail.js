// Extract beach name from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const beachName = urlParams.get('name');

// Fetch beaches data from external JSON file
async function fetchBeaches() {
    try {
        const response = await fetch('data/beache.json');
        const beaches = await response.json();
        return beaches;
    } catch (error) {
        console.error('Error fetching beach data:', error);
    }
}

// Display beach details
async function displayBeachDetails() {
    const beaches = await fetchBeaches();
    const beach = beaches.find(b => b.name === beachName);

    if (beach) {
        document.getElementById('beachName').textContent = beach.name;

        // Update images dynamically
        const imageElements = document.querySelectorAll('.beach-images img');
        beach.images.forEach((image, index) => {
            if (imageElements[index]) {
                imageElements[index].src = image;
                imageElements[index].alt = `${beach.name} Image ${index + 1}`;
            }
        });

        // Display description and rating
        document.getElementById('beachDescription').textContent = beach.description;
        document.getElementById('beachRating').textContent = `Rating: ${beach.rating} / 5`;

        // Display tsunami history
        document.getElementById('tsunamiHistory').textContent = `Tsunami History: ${beach.tsunamiHistory}`;

        // Display famous places
        const famousPlacesList = document.getElementById('famousPlaces');
        beach.famousPlaces.forEach(place => {
            const listItem = document.createElement('li');
            listItem.textContent = place;
            famousPlacesList.appendChild(listItem);
        });

        // Display best hotels
        const hotelsList = document.getElementById('bestHotels');
        beach.bestHotels.forEach(hotel => {
            const listItem = document.createElement('li');
            listItem.textContent = hotel;
            hotelsList.appendChild(listItem);
        });

        // Display additional info
        document.getElementById('safetyTips').textContent = `Safety Tips: ${beach.additionalInfo.safetyTips}`;
        document.getElementById('activities').textContent = `Activities: ${beach.additionalInfo.activities}`;

        // Render charts
        renderCrowdChart(beach.crowdData);
        renderQualityChart(beach.quality);
        renderQualityRatingChart(beach.quality);
    }
}

// Render crowd population chart
function renderCrowdChart(crowdData) {
    const ctx = document.getElementById('crowdChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: crowdData.months,
            datasets: [{
                label: 'Monthly Crowd Population',
                data: crowdData.values,
                borderColor: '#008cba',
                backgroundColor: 'rgba(0, 140, 186, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render quality metrics chart
function renderQualityChart(qualityData) {
    const ctx = document.getElementById('qualityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Air', 'Water', 'Sand'],
            datasets: [{
                label: 'Quality Metrics',
                data: [qualityData.air, qualityData.water, qualityData.sand],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render quality rating chart
function renderQualityRatingChart(qualityData) {
    const ctx = document.getElementById('qualityRatingChart').getContext('2d');
    const categories = ['Air', 'Water', 'Sand'];
    const values = [qualityData.air, qualityData.water, qualityData.sand];

    // Map numerical values to quality ratings
    const ratings = values.map(value => {
        if (value >= 85) return 'Excellent';
        if (value >= 70) return 'Good';
        if (value >= 50) return 'Normal';
        return 'Bad';
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Quality Ratings',
                data: values,
                backgroundColor: ratings.map(rating => {
                    switch (rating) {
                        case 'Excellent':
                            return '#4caf50'; // Green
                        case 'Good':
                            return '#8bc34a'; // Light Green
                        case 'Normal':
                            return '#ffeb3b'; // Yellow
                        case 'Bad':
                            return '#f44336'; // Red
                        default:
                            return '#9e9e9e'; // Grey
                    }
                })
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${ratings[context.dataIndex]}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayBeachDetails);
