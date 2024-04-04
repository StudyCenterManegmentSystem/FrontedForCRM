async function addCourse() {
    if (!localStorage.getItem('token')) {
        window.location.href = './page-login.html';
    }
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const TOKEN = localStorage.getItem('token');
    const courseData = {
        fanName: name,
        fanDescription: description
    };

    try {
        const response = await fetch('https://localhost:7177/api/fans/create-fan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok || response.status === 200 || response.status === 201) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kurs muvaffaqiyatli qo'shildi.";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';
            setTimeout(() => {
                window.location.href = './all-courses.html';
            }, 2000);
        } else if (response.status === 401) {
            2
            throw new Error("User is not authorized. Please log in.");
        } else {
            const errorMessage = await response.text();
            throw new Error(`Error adding course: ${response.status} - ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error adding course:', error);
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Kurs qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
        resultDiv.style.color = 'red';
        resultDiv.style.display = 'block';
    }
}
function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html"; // Redirect to login page
        return true; // Return true to indicate redirection happened
    }
    return false; // Return false if token is found
}
window.addEventListener('DOMContentLoaded', redirectToLoginPage);

