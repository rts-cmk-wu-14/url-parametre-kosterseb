let params = new URLSearchParams(window.location.search);
const id = params.get("id");
const mainWrapper = document.getElementById('wrapper');
const dataId = '/data/' + id + '.json';

console.log(id);

fetch(dataId)
    .then(response => response.json())
    .then(data => {
        showData(data);
    });

function showData(data) {
    // Check if this destination is already favorited
    const favoriteKey = `favorite_${data.id}`;
    const isFavorited = localStorage.getItem(favoriteKey) === 'true';
    const heartIcon = isFavorited ? 'imagered.png' : 'image.png';
    
    const content = /* html*/ `
        <div class="detail-header">
            <h2>${data.title}</h2>
            <a href="#" class="favourite-detail" id="favButton">
            <img src="img/${heartIcon}" alt="favorite icon" id="favIcon">
            </a>
            <a href="destinations.html" class="back-button">Back</a>
        </div>
        
        <div class="content-container">
            <div class="image-section">
                <img src="img/${data.image}" class="main-image" alt="${data.title}">
            </div>
            <div class="text-section">
                <p class="subtitle-text">${data.subtitle.charAt(0).toUpperCase() + data.subtitle.slice(1) + '.'}</p>
                <p class="filler-text">${data.text}</p>
                <h3>Facilities</h3>
                <ul class="facility-list">${data.facilities.map(facility => `<li>${facility}</li>`).join('')}</ul>
            </div>
        </div>`;

    mainWrapper.insertAdjacentHTML('beforeend', content);
    
    // Add event listener for the favorite button
    const favButton = document.getElementById('favButton');
    const favIcon = document.getElementById('favIcon');
    
    favButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle favorite state
        if (favIcon.src.includes('image.png')) {
            favIcon.src = 'img/imagered.png';
            localStorage.setItem(favoriteKey, 'true');
            console.log(`Added ${data.title} to favorites`);
            showFeedback('Added to favorites!', 'success');
        } else {
            favIcon.src = 'img/image.png';
            localStorage.setItem(favoriteKey, 'false');
            console.log(`Removed ${data.title} from favorites`);
            showFeedback('Removed from favorites!', 'info');
        }
        
        // Visual feedback animation
        favButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            favButton.style.transform = 'scale(1)';
        }, 150);
    });
}

// Function to show feedback message
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
    mainWrapper.insertAdjacentElement('afterbegin', feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 3000);
}