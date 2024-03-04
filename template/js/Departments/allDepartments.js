function fetchDataFromAPI() {
    return fetch('https://localhost:7177/api/rooms/all-room') // Replace this URL with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        })
        .then(data => {
            return data; // Return the data received from the API
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}
function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    if (dataContainer !== null) {
        dataContainer.innerHTML = '';
        data.forEach(item => {
            const paragraph = document.createElement('p');
            paragraph.textContent = item.name; 
            dataContainer.appendChild(paragraph);
        });
    } else {
        console.error('dataContainer element not found');
    }
}


// Call the fetchDataFromAPI function when the page loads
window.onload = function () {
    fetchDataFromAPI()
        .then(data => {
            // Process the data received from the API
            console.log(data); // Log the data to the console
            displayData(data); // Call a function to display the data
        });
};
