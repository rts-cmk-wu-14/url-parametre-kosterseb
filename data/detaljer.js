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
    const content = /* html*/ `
       <h2>${data.title}</h2>`
        + `<img src="img/${data.image}" class="main-image" alt="${data.title}">`
        + `<p>${data.subtitle}</p>`
        + `<h3>Facilities</h3><ul>${data.facilities.map(facility =>
            `<li>${facility}</li>`).join('')}</ul>`;

    mainWrapper.insertAdjacentHTML('beforeend', content);
}
