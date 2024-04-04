function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDisplay = document.getElementById("errorDisplay");

    // Check if email and password are filled
    if (!email || !password) {
        errorDisplay.innerHTML = "Please fill in all fields";
        return;
    }

    const loginData = {
        email: email,
        password: password
    };

    const API_TO_LOGIN = "https://localhost:7177/api/authentication/login";

    fetch(API_TO_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful:', data);
        const token = data.accessToken; // Assuming token is in accessToken field

        if (token) {
            localStorage.setItem('token', token);
            window.location.href = "about-courses.html"; // Redirect after successful login
        } else {
            throw new Error('Token not received'); // Throw error if token not received
        }
    })
    .catch(error => {
        console.error('There was a problem:', error);
        errorDisplay.innerHTML = "Login failed";
    });
}
