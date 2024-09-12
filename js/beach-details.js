// Fetch beaches data from external JSON file
async function fetchBeaches() {
    try {
        const response = await fetch('data/beaches.json');
        const beaches = await response.json();
        return beaches;
    } catch (error) {
        console.error('Error fetching beach data:', error);
    }
  }
  
  // Function to display default beaches
  function displayDefaultBeaches(beaches) {
    const defaultBeachesContainer = document.getElementById('defaultBeachesContainer');
    defaultBeachesContainer.innerHTML = '';
  
    // Display first 5 beaches as default
    beaches.slice(0, 5).forEach(beach => {
        const beachCard = document.createElement('div');
        beachCard.classList.add('beach-card');
  
        beachCard.innerHTML = `
            <img src="${beach.image}" alt="${beach.name}">
            <div class="beach-card-content">
                <h3>${beach.name}</h3>
                <p>${beach.description}</p>
                <p><strong>Rating:</strong> ${beach.rating}</p>
                <p><strong>Quality:</strong> ${beach.quality}</p>
                <p><strong>Crowd:</strong> ${beach.crowd}</p>
            </div>
        `;
  
        // Add click event to navigate to the beach detail page
        beachCard.addEventListener('click', () => {
            // Redirect to beach-detail.html with the beach name as a URL parameter
            window.location.href = `beach-detail.html?name=${encodeURIComponent(beach.name)}`;
        });
  
        defaultBeachesContainer.appendChild(beachCard);
    });
  }
  
  // Function to filter and display searched beaches
  function searchBeaches(beaches, query) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
  
    const filteredBeaches = beaches.filter(beach =>
        beach.name.toLowerCase().includes(query.toLowerCase())
    );
  
    filteredBeaches.forEach(beach => {
        const beachCard = document.createElement('div');
        beachCard.classList.add('beach-card');
  
        beachCard.innerHTML = `
            <img src="${beach.image}" alt="${beach.name}">
            <div class="beach-card-content">
                <h3>${beach.name}</h3>
                <p>${beach.description}</p><br>
                <p><strong>Rating:</strong> ${beach.rating}</p><br>
                <p><strong>Quality:</strong> ${beach.quality}</p><br>
                <p><strong>Crowd:</strong> ${beach.crowd}</p>
            </div>
        `;
  
        // Add click event to navigate to the beach detail page
        beachCard.addEventListener('click', () => {
            // Redirect to beach-detail.html with the beach name as a URL parameter
            window.location.href = `beach-detail.html?name=${encodeURIComponent(beach.name)}`;
        });
  
        resultsContainer.appendChild(beachCard);
    });
  }
  
  // Initialize the app
  async function init() {
    const beaches = await fetchBeaches();
    if (beaches) {
        displayDefaultBeaches(beaches);
  
        // Set up the search event
        const searchForm = document.getElementById('beachForm');
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = document.getElementById('beachInput').value.trim();
            if (query) {
                searchBeaches(beaches, query);
            } else {
                // Show default beaches if search is cleared
                displayDefaultBeaches(beaches);
            }
        });
    }
  }
  
  // Run the init function on page load
  document.addEventListener('DOMContentLoaded', init);
  