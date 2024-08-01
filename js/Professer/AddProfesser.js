const APITOROOMS = "https://crm-edu-center.fn1.uz/api/fans/get-all-fans";
let fanSelect = document.getElementById("fanIds");

// Function to load fans
function loadFans() {
  const TOKEN = localStorage.getItem('token');

  fetch(APITOROOMS, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  })
    .then(res => {
      if (res.status === 401) {
        // Handle 401 Unauthorized error
        redirectToLoginPage();
        return;
      }

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    })
    .then(data => {
      if (data) {
        fanSelect.innerHTML = "";
        data.forEach(fan => {
          const option = document.createElement("option");
          option.value = fan.id;
          option.textContent = fan.fanName;
          fanSelect.appendChild(option);
        });
        $(fanSelect).selectpicker('refresh');
      }
    })
    .catch(error => {
      console.error("Error loading fans:", error);
    });
}

// Function to redirect to login page if token is missing
function redirectToLoginPage() {
  if (!localStorage.getItem('token')) {
    window.location.href = "page-login.html";
  }
}

// Function to add professor
async function addProfessor() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const fanIdsSelect = document.getElementById("fanIds");
  const selectedFanIds = Array.from(fanIdsSelect.selectedOptions).map(option => option.value);

  const TOKEN = localStorage.getItem('token');


  const professorData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    fanIds: selectedFanIds
  };

  try {
    const response = await fetch('https://crm-edu-center.fn1.uz/api/admins/register-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}` // Ensure this is correct
      },
      body: JSON.stringify(professorData)
    });

    if (response.status === 401) {
      console.error("Unauthorized request. Token might be invalid or expired.");
      redirectToLoginPage();
      return;
    }

    if (response.ok || response.status === 201) {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "Professor added successfully";
      resultDiv.style.color = 'green';
      resultDiv.style.display = 'block';

      document.getElementById('errorDisplay').innerText = '';

      setTimeout(() => {
        window.location.href = './all-professors.html';
      }, 2000);
    } else {
      const resultDiv = document.getElementById("errorDisplay");
      const errorText = await response.text();
      console.error(`Error: ${errorText}`);
      resultDiv.innerText = `Error: ${errorText}`;
      resultDiv.style.color = 'red';
      resultDiv.style.display = 'block';
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

window.addEventListener('DOMContentLoaded', redirectToLoginPage);
window.addEventListener('DOMContentLoaded', loadFans);
