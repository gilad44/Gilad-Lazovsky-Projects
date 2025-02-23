const clockIntervals = new Map();

const getCityPhoto = async (city) => {
    const headers = {
        'Authorization': 'OXcs4hZ4VcTVa7tvVsWvwUp8PToN9lq2NMfJL9zzJmhiOxPD0z6spSmC'
    };

    const searchTerms = [
        `${city} cityscape`,
        `${city} aerial view`,
        `${city} skyline`,
        `${city} city view`,
    ];

    for (const term of searchTerms) {
        const formattedQuery = encodeURIComponent(term);
        const request = await fetch(
            `https://api.pexels.com/v1/search?query=${formattedQuery}&orientation=portrait&size=small&per_page=15&exclude=people`,
            { headers }
        );

        const data = await request.json();
        const relevantPhotos = data.photos?.filter(photo => {
            const description = (photo.alt || '').toLowerCase();
            const excludeKeywords = ['person', 'people', 'crowd', 'human', 'woman', 'man', 'group', 'couple', 'girl', 'wedding'];
            const includeKeywords = ['city', 'skyline', 'building', 'urban', 'architecture', city.toLowerCase()];
            const hasExcludedContent = excludeKeywords.some(keyword =>
                description.includes(keyword)
            );

            return !hasExcludedContent && includeKeywords.some(keyword =>
                description.includes(keyword)
            );
        });

        if (relevantPhotos && relevantPhotos.length > 0) {
            const randomIndex = Math.floor(Math.random() * relevantPhotos.length);
            return {
                url: relevantPhotos[randomIndex].src.large,
                description: relevantPhotos[randomIndex].alt,
            };
        }
    }

    throw new Error(`No relevant photos found for ${city}`);
};

document.addEventListener('DOMContentLoaded', async () => {
    const defaultCities = ['Tel Aviv', 'Tokyo', 'London', 'New York'];
    const forms = document.querySelectorAll('.cityForms');

    forms.forEach(async (form, index) => {
        const city = defaultCities[index];
        const imgElement = form.querySelector('.cityPic');
        const clockElement = form.querySelector('.clock');
        const cityTitle = form.querySelector('.cityName');

        cityTitle.textContent = city;

        try {
            const photo = await getCityPhoto(city);
            imgElement.src = photo.url;

            const timezone = moment.tz.names().find(tz => {
                return tz.toLowerCase().includes(city.toLowerCase()) ||
                    tz.replace('_', ' ').toLowerCase().includes(city.toLowerCase());
            });

            if (timezone) {
                if (clockIntervals.has(clockElement)) {
                    clearInterval(clockIntervals.get(clockElement));
                    clockIntervals.delete(clockElement);

                }
                const intervalId = setInterval(() => {
                    const time = moment().tz(timezone).format('HH:mm:ss');
                    clockElement.innerHTML = time;
                }, 1000);
                clockIntervals.set(clockElement, intervalId);

            }
        } catch (error) {
            console.error(`Error loading initial state for ${city}:`, error);
        }
    });
});

const citiesTitles = document.querySelectorAll('.cityName');
const forms = document.querySelectorAll('.cityForms');
const userInput = document.querySelectorAll('.userInput');

citiesTitles.forEach(city => {
    city.addEventListener('click', function (e) {
        if (e.target === city) {
            city.style.display = 'none';

            const form = city.closest('.cityForms');

            const input = form.querySelector('.userInput');

            input.style.cssText = 'display: inline-block !important';
            input.focus();
        }
    });
});

userInput.forEach(input => {
    input.style.cssText = 'display: none !important';
    input.addEventListener('blur', (e) => {
        const form = e.target.closest('.cityForms');
        const cityTitle = form.querySelector('.cityName');
        cityTitle.style.display = 'inline-block';
        input.style.cssText = 'display: none !important';
    });
});
forms.forEach(form => {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const input = this.querySelector('.userInput');
        const imgElement = this.querySelector('.cityPic');
        const clockElement = this.querySelector('.clock');

        const value = input.value;
        input.style.cssText = 'display: none !important';

        const city = this.querySelector('.cityName');
        city.innerHTML = value.replace(/(^|\s)[a-z]/g, match => match.toUpperCase());
        citiesTitles.forEach(city => {
            city.style.display = 'block';
        });

        try {
            const photo = await getCityPhoto(value);
            imgElement.src = photo.url;

            const timezone = moment.tz.names().find(tz => {
                return tz.toLowerCase().includes(value.toLowerCase()) ||
                    tz.replace('_', ' ').toLowerCase().includes(value.toLowerCase());
            });

            if (timezone) {
                if (clockIntervals.has(clockElement)) {
                    clearInterval(clockIntervals.get(clockElement));
                    clockIntervals.delete(clockElement);
                }
                const intervalId = setInterval(() => {
                    const time = moment().tz(timezone).format('HH:mm:ss');
                    clockElement.innerHTML = time;
                }, 1000);
                clockIntervals.set(clockElement, intervalId);
            } else {
                clockElement.innerHTML = 'Invalid city';
            }
            input.value = '';
        } catch (error) {
            console.error("Error:", error);
            imgElement.src = '';
            clockElement.innerHTML = 'Error loading city data';
        }
    });
});



