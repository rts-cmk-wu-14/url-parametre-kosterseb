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
            
            infoDiv.innerHTML = `
            <a href="#" class="favourite"><img src="img/image.png" alt="icon"></a>
            <a href="detaljer.html?id=${destination.id}" class="more-link"><h2>MORE</h2> </a>
            `;
            
            // Add event listener for the favourite link
            const favLink = infoDiv.querySelector('.favourite');
            favLink.addEventListener('click', (e) => {
                e.preventDefault();
                const favIcon = favLink.querySelector('img');
                if (favIcon.src.includes('image.png')) {
                    favIcon.src = 'img/imagered.png';
                } else {
                    favIcon.src = 'img/image.png';
                }
                localStorage.setItem(destination.destination, favIcon.src);
                
            });
            
            listItem.appendChild(img);
            listItem.appendChild(infoDiv);
            destinationsList.appendChild(listItem);
        });
    }
    )
