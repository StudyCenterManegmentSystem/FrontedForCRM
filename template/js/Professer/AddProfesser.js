const APITOROOMS = "https://localhost:7177/api/fans/get-all-fans";
let fanSelect = document.getElementById("fanIds");

function loadFans() {
    fetch(APITOROOMS)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            fanSelect.innerHTML = ""; // Clear the select options before populating
            data.forEach(fan => {
                const option = document.createElement("option");
                option.value = fan.id;
                option.textContent = fan.fanName;
                console.log("option to rooms", option);
                fanSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading fans:", error);
        });
}

window.addEventListener('DOMContentLoaded', loadFans);

async function addProfesser() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fanIdsSelect = document.getElementById("fanIds");
    const selectedFanIds = Array.from(fanIdsSelect.selectedOptions).map(option => option.value);

    const professerData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        fanIds: selectedFanIds
    }

    try {
        const response = await fetch('https://localhost:7177/api/admins/register-teacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(professerData)
        });
        if (response.ok) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Ustoz muvaffaqiyatli qo'shildingiz";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';

            setTimeout(() => {
                window.location.href = './all-professors.html';
            }, 2000);

        } else if (response.status == 400 || response.status == 500) {
            const resultDiv = document.getElementById("errorDisplay");
            resultDiv.innerHTML = "Ustoz qo'shishda xatolik yuz berdi";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';
        } else {
            const resultDiv = await response.text();
            console.error(`Xatolik: ${resultDiv}`);
            document.getElementById('errorDisplay').innerText = `Xatolik: ${resultDiv}`;
        }

    }
    catch (error) {
        console.error(error);
    }
}
