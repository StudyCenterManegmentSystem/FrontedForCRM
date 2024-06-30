const APITOROOMS = "https://localhost:7177/api/fans/get-all-fans";
let fanSelect = document.getElementById("fanIds");

console.log(localStorage.getItem('token'));

// Function to load fans
function loadFans() {
  fetch(APITOROOMS, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(data => {
      fanSelect.innerHTML = "";
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

// Function to periodically clear local storage
function clearLocalStoragePeriodically() {
  setInterval(function() {
    localStorage.clear(); // Clear local storage
  }, 3 * 60 * 60 * 1000); // 3 hours interval
}

function redirectToLoginPage() {
  if (!localStorage.getItem('token')) {
    window.location.href = "page-login.html"; // Redirect to login page
    return true; // Return true to indicate redirection happened
  }
  return false; 
}

// Function to add professor
async function addProfessor() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const fanIdsSelect = document.getElementById("fanIds");
  const selectedFanIds = Array.from(fanIdsSelect.selectedOptions)
    .map(option => option.value);

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
    const response = await fetch('https://localhost:7177/api/admins/register-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}` 
      },
      body: JSON.stringify(professorData)
    });

    if (response.ok || response.status === 200 || response.status === 201) {
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
      switch (response.status) {
        case 401:
          resultDiv.innerHTML = "Unauthorized access. Please login again.";
          throw new Error("Unauthorized access. Please login again.");
        case 400:
          resultDiv.innerHTML = "Professor data is invalid. Please check and try again.";
          break;
        case 500:
          resultDiv.innerHTML = "Server error occurred. Please try again later.";
          break;
        default:
          const errorText = await response.text();
          console.error(`Error: ${errorText}`);
          resultDiv.innerText = `Error: ${errorText}`;
      }
      resultDiv.style.color = 'red';
      resultDiv.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('DOMContentLoaded', loadFans);
window.addEventListener('DOMContentLoaded', clearLocalStoragePeriodically);
window.addEventListener('DOMContentLoaded', redirectToLoginPage);