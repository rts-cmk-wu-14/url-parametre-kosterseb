const json = '/data/destinations.json';
const destinationsList = document.getElementById('destinations-list');

fetch(json)
    .then(response => response.json())
    .then(data => {
        // Clear existing content
        data.destinations.forEach(destination => {
            const listItem = document.createElement('li');
            listItem.className = 'destination-item';

            // Create image element
            const img = document.createElement('img');
            img.src = "img/" + destination.image;
            img.alt = destination.destination;

            const infoDiv = document.createElement('div');
            infoDiv.className = 'destination-info';
            
            // Check if this destination is already favorited
            const favoriteKey = `favorite_${destination.id}`;
            const isFavorited = localStorage.getItem(favoriteKey) === 'true';
            const heartIcon = isFavorited ? 'imagered.png' : 'image.png';
            
            infoDiv.innerHTML = `
            <h2 class="destination-name">${destination.destination}</h2>
            <a href="#" class="favourite"><img src="img/${heartIcon}" alt="favorite icon"></a>
            <a href="detaljer.html?id=${destination.id}" class="more-link"><h2>MORE</h2></a>
            `;
            
            // Add event listener for the favourite link
            const favLink = infoDiv.querySelector('.favourite');
            favLink.addEventListener('click', (e) => {
                e.preventDefault();
                const favIcon = favLink.querySelector('img');
                
                // Toggle favorite state
                if (favIcon.src.includes('image.png')) {
                    favIcon.src = 'img/imagered.png';
                    localStorage.setItem(favoriteKey, 'true');
                    console.log(`Added ${destination.destination} to favorites`);
                    showFeedback(`Added ${destination.destination} to favorites!`, 'success');
                } else {
                    favIcon.src = 'img/image.png';
                    localStorage.setItem(favoriteKey, 'false');
                    console.log(`Removed ${destination.destination} from favorites`);
                    showFeedback(`Removed ${destination.destination} from favorites!`, 'info');
                }
                
                // Visual feedback animation
                favLink.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    favLink.style.transform = 'scale(1)';
                }, 150);
            });
            
            listItem.appendChild(img);
            listItem.appendChild(infoDiv);
            destinationsList.appendChild(listItem);
        });
        
        console.log('Destinations loaded. Current favorites:', getAllFavorites());
    })

// Helper function to get all favorites from localStorage
function getAllFavorites() {
    const favorites = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('favorite_') && localStorage.getItem(key) === 'true') {
            favorites.push(key.replace('favorite_', ''));
        }
    }
    return favorites;
}

// Helper function to clear all favorites (useful for testing)
function clearAllFavorites() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('favorite_')) {
            keys.push(key);
        }
    }
    keys.forEach(key => localStorage.removeItem(key));
    console.log('All favorites cleared');
}

// Function to show feedback message (same as in detaljer.js)
function showFeedback(message, type) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    
    // Add to page
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 3000);
}