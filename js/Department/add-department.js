async function add_department() {
    const name = document.getElementById("name").value;
    const studentcount = document.getElementById("studentcount").value;
    const floor = document.getElementById("floor").value;

    const departmentData = {
        roomName: name,
        sigimi: studentcount,
        qavat: floor
    }

    try {
        const response = await fetch('https://localhost:7177/api/rooms/create-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(departmentData)
        });

        if (response.ok || response.status === 200 || response.status === 201) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kafedra muvaffaqiyatli qo'shildi";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            console.log('Department added successfully');

            document.getElementById('errorDisplay').innerText = '';
            setTimeout(() => {
                window.location.href = 'all-departments.html';
            });
        }
        else if (response.status === 400 || response.status === 404 || response.status === 500) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kafedra qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';

            console.error('Error adding department:', response.status);

            document.getElementById('errorDisplay').innerText = 'Kafedra qo\'shilishda xatolik yuz berdi. Iltimos, qayta urunib ko\'ring.';
        }
        else {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kafedra qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';

            console.error('Error adding department:', response.status);
        }
    }
    catch (error) {
        console.error('Error adding department:', error);        
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