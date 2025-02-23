import { countries, reset, search } from "./countriesService.js";

const restoreLikedCountries = () => {

    const getHistory = localStorage.getItem('Countries');
    if (getHistory !== null) {
        const likedCountries = JSON.parse(getHistory);
        const heartIcons = document.querySelectorAll('.fa-heart');

        heartIcons.forEach(heartIcon => {
            const countryName = heartIcon.parentElement.parentElement.querySelector('.glow').innerText;
            if (likedCountries.includes(countryName)) {
                heartIcon.classList.add('text-red-500');
                heartIcon.classList.remove('text-black-500');
            }
        });
    }
};
const cardsContainer = document.querySelector('#cards');
const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true, preserveDrawingBuffer: true
});
renderer.setSize(176, 128);
renderer.setPixelRatio(1);
renderer.setClearColor(0x000000, 0);
renderer.autoClear = true;

const scenes = [];
const cameras = [];
const flags = [];
const flagElements = [];

document.getElementById('searchInput').addEventListener('input', (event) => {
    reset();
    cardsContainer.innerHTML = '';
    flagElements.length = 0;

    if (!event.target.value || event.target.value === '') {
        cardsContainer.innerHTML = '';
        createCards(countries);
    } else {
        search(event.target.value);

        createCards(countries);
    };
});
const generateCard = (country) => {

    const card = document.createElement('div');
    card.className = 'card w-48 h-auto p-2 my-2 mx-auto outline-white bg-black border rounded overflow-hidden shadow';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'w-44 h-36';

    const flagCanvas = document.createElement('div');
    flagCanvas.className = 'object-cover w-44 h-32';
    flagCanvas.src = country.flags.png;

    const bodycontainer = document.createElement('div');
    bodycontainer.className = 'flex flex-col justify-between';

    const cardBody = document.createElement('div');
    cardBody.className = 'px-2 py-4 max-w-sm max-h-64';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'glow min-w-max font-bold text-lg mb-2 text-red-100';
    cardTitle.innerText = country.name.common;

    const population = document.createElement('p');
    population.className = 'text-sm text-white';
    population.innerText = `Population: ${country.population}`;

    const region = document.createElement('p');
    region.className = 'text-base text-white';
    region.innerText = `Region: ${country.region}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = 'px-6 py-2 bg-gray-200 rounded flex justify-center mb-1';

    let heartIcon = document.createElement('i');
    heartIcon.className = 'fa fa-heart text-black-500';
    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('text-red-500');
        heartIcon.classList.toggle('text-black-500');
        const checkStorage = localStorage.getItem('Countries');

        let likedCountry = [];
        if (heartIcon.classList.contains('text-red-500') && checkStorage === null) {
            likedCountry.push(country.name.common);
            localStorage.setItem('Countries', JSON.stringify(likedCountry));
        } else if (heartIcon.classList.contains('text-red-500') && checkStorage !== null) {
            likedCountry = JSON.parse(localStorage.getItem('Countries'));
            likedCountry.push(country.name.common);
            localStorage.setItem('Countries', JSON.stringify(likedCountry));
        };

        if (heartIcon.classList.contains('text-black-500') && checkStorage !== null) {
            likedCountry = JSON.parse(localStorage.getItem('Countries'));
            likedCountry = likedCountry.filter((item) => item !== country.name.common);
            localStorage.setItem('Countries', JSON.stringify(likedCountry));
        };
    });


    cardFooter.appendChild(heartIcon);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);
    imgContainer.appendChild(flagCanvas);
    card.appendChild(imgContainer);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardsContainer.appendChild(card);

    if (country.name.common === 'Palestine') {
        initFlag(flagCanvas, './images/palestine.png');
    } else {
        initFlag(flagCanvas, country.flags.png);
    }


};
const createCards = () => {

    for (const country of countries) {
        generateCard(country);
    };
    restoreLikedCountries();
};
let flagUrl = '';
let container = '';

const initFlag = (container, flagUrl) => {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(7, 4, 50, 30);
    const material = new THREE.MeshBasicMaterial({
        map: loader.load(flagUrl),
        wireframe: false,
        transparent: true
    });
    const flag = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const texture = new THREE.TextureLoader().load(flagUrl);
    scene.add(flag);

    const canvas = document.createElement('canvas');
    canvas.width = 176;
    canvas.height = 128;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    flagElements.push({
        scene,
        camera,
        flag,
        canvas: canvas.getContext('2d', { alpha: true })
    });
};
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    flagElements.forEach(({ scene, camera, flag, canvas }) => {
        const position = flag.geometry.attributes.position;
        renderer.clear();
        canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);

            const waveX1 = 0.8 * Math.sin(x * 2 + time * 3);
            const waveY = 0.5 * Math.sin(y + time);
            const waveX2 = 0.1 * Math.sin(x * 3 + time);
            const multi = (x + 2.5) / 10;

            position.setZ(i, (waveX1 + waveY + waveX2) * multi);
        }

        position.needsUpdate = true;
        renderer.render(scene, camera);
        canvas.drawImage(renderer.domElement, 0, 0, canvas.canvas.width, canvas.canvas.height);
    });
}
animate();
export { createCards };


