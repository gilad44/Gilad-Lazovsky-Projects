const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        return res.json();
    } catch (err) {
        console.error('Failed to fetch countries', err);
    }
};

const countriesFull = await getCountries();
let countries = [...countriesFull];

const reset = () => {
    countries = [...countriesFull];
}
const search = (word) => {
    countries = countriesFull.filter((country) => {
        const name = country.name.common.toLowerCase();
        const formattedWord = word.toLowerCase();
        return name.includes(formattedWord);
    });
};

export { countries, reset, search };
