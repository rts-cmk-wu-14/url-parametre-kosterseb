const url = 'data/destinations.json';
const destinationsList = document.getElementById('destinations-list');

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.destinations.map(destination => {
        renderDestinations(destination);
        });
    })
    .catch(error => console.error('Error fetching destinations:', error));

// Render destinations
function renderDestinations() {

        destinationElement.innerHTML = 
         /* html */ `
          <img src="${destination.image}" alt="${destination.destination}">
          <div class="destination-content">
            <span class="destination-country">${destination.destination}</span>
            <h3 class="destination-title">${destination.title}</h3>
            <p class="destination-subtitle">${destination.subtitle}</p>
            <div class="facilities-preview">
              ${destination.facilities.map(facility => 
                `<span class="facility-tag">${facility}</span>`
              ).join('')}
              ${destination.facilities.length > 3 ? '<span class="facility-tag">+more</span>' : ''}
            </div>
          </div>
        `;

        destinationsList.appendChild(destinationElement);
    };
