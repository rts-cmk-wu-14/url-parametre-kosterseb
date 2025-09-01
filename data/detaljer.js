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
       const content = `<h2>${data.title}</h2>`
         + `<img src="img/${data.image}" alt="${data.title}">`

       mainWrapper.insertAdjacentHTML('beforeend', content);
    }