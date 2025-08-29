const json = '/data/destinations.json';
const destinationsList = document.getElementById('destinations-list');

fetch(json)
    .then(response => response.json())
    .then(data => {
        data.destinations.forEach(destination => {
            const listItem = document.createElement('li');
            listItem.className = 'destination-item';

            const img = document.createElement('img');
            img.src = "img/" + destination.image;
            img.alt = destination.destination;

            listItem.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'destination-info';

            infoDiv.innerHTML = `
             <a href="#" class="favourite"><img src="img/image.png" alt="icon"></a>
                <h2>MORE</h2>
            `;

            const favLink = infoDiv.querySelector('.favourite');
            favLink.addEventListener('click', (e) => {
                e.preventDefault();
                const favIcon = favLink.querySelector('img');
                if (favIcon.src.includes('image.png')) {
                    favIcon.src = 'img/imagered.png';
                } else {
                    favIcon.src = 'img/image.png';
                }

            });

            listItem.appendChild(infoDiv);

            destinationsList.appendChild(listItem);
        });
    }
    )
