/* Global Variables */
const owmUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const owmApiKey = '&appid=66c1a8d4f4f4474aeae2c15feab2bcaf&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Main Functions
const getWeatherData = (event) => {
    const zip = document.getElementById('zip').value;
    getWeatherforZip(owmUrl + zip + owmApiKey)
        .then((owmResponse) => {
            if (owmResponse.main && owmResponse.main.temp) {
                const userResponse = document.getElementById('feelings').value;
                const data = {
                    temperature: owmResponse.main.temp,
                    date: newDate,
                    userResponse
                }
                postData('/weatherdata', data)
                    .then((postResponse) => {
                        updateUI();
                    });
            } else {
                showErrorMessage(owmResponse);
            }
        }).then;
}

const updateUI = () => {
    retrieveAllData('/allweatherdata')
        .then((allData) => {
            const latestEntry = getLatestEntry(allData);
            document.getElementById('date').innerHTML = latestEntry.date;
            document.getElementById('temp').innerHTML = latestEntry.temperature;
            document.getElementById('content').innerHTML = latestEntry.userResponse;
        })
}

const showErrorMessage = (owmResponse) => {
    const modal = document.getElementById('errorModal');
    document.getElementById('errorMessage').innerHTML = owmResponse.message;
    modal.style.display = "block";
    document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {if (event.target !== modal) {modal.style.display = 'none';}});
}

// Helper Functions
const getLatestEntry = (allData) => {
    const keysAsNumbers = Object.keys(allData).map(key => parseInt(key));
    const latestKey = Math.max.apply(null, keysAsNumbers);
    return allData[latestKey];
}

// Fetch Functions
const getWeatherforZip = async (url = '') => {
    const response = await fetch(url);
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.log('An error occurred while calling the OpenWeatherMap-API: ', error);
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('An error occurred while updating the data: ', error);
    }
}

const retrieveAllData = async (url = '') => {
    const response = await fetch(url);
    try {
        const allData = await response.json();
        return allData;
    } catch (error) {
        console.log('An error occurred while retrieving the projectData: ', error);
    }
}

// Event listeners
document.getElementById('generate').addEventListener('click', getWeatherData);
