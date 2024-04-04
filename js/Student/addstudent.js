// Function to load groups
function loadGroups() {
  fetch('https://localhost:7177/api/groups/get-all-guruh' , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  })
    .then(res => res.json())
    .then(data => {
      const groupSelect = document.getElementById("mySelect");
      if (!groupSelect) {
        console.error('Error: Group select element not found.');
        return;
      }
      groupSelect.innerHTML = "";
      data.forEach(group => {
        const option = document.createElement("option");
        option.value = group.id;
        option.textContent = group.groupName;
        groupSelect.appendChild(option);
        console.log(option);
      });
    })
    .catch(error => {
      console.error('Guruhlarni yuklashda xatolik:', error);
    });
}

// Function to add student
async function addStudent() {
  const token2 = localStorage.getItem('token');

  if (token2 === null) {
    window.location.href = 'page-login.html';
    return; // Return to prevent further execution if token is null
  }

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const phonenumber = document.getElementById("mobilephone").value;
  const groupIds = document.getElementById("mySelect");
  const selectedGroupIds = Array.from(groupIds.selectedOptions).map(option => option.value);

  const studentData = {
    firstName: firstname,
    lastName: lastname,
    phoneNumber: phonenumber,
    groupIds: selectedGroupIds // Corrected typo here
  };

  console.log(token2);

  try {
    const response = await fetch('https://localhost:7177/api/students/create-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token2}`
      },
      body: JSON.stringify(studentData)
    });

    if (response.ok || response.status === 200 || response.status === 201) {
      document.getElementById("errorDisplay").innerHTML = "";
      document.getElementById("result").innerHTML = "Student added successfully";
      document.getElementById("result").style.color = "green";
      document.getElementById("result").style.display = "block";
      setTimeout(() => {
        document.getElementById("result").style.display = "none";
        window.location.href = './all-students.html';
      }, 3000);
    } else if (response.status == 400 || response.status == 409) {
      const errorResponse = await response.json(); // Parse error response as JSON
      document.getElementById("errorDisplay").innerHTML = `Error: ${errorResponse.message}`;
      document.getElementById("errorDisplay").style.color = "red";
      document.getElementById("errorDisplay").style.display = "block";
    } else if (response.status == 401) {
      document.getElementById("errorDisplay").innerHTML = "Authorization token not found. Please login again.";
      document.getElementById("errorDisplay").style.color = "red";
      document.getElementById("errorDisplay").style.display = "block";
      setTimeout(() => {
        window.location.href = 'page-login.html';
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    document.getElementById("errorDisplay").innerHTML = "An error occurred. Please try again later.";
    document.getElementById("errorDisplay").style.color = "red";
    document.getElementById("errorDisplay").style.display = "block";
  }
}

// Function to redirect to login page if token is not found
function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html"; // Redirect to login page
        return true; // Return true to indicate redirection happened
    }
    return false; // Return false if token is found
}

// Event listeners
window.addEventListener('DOMContentLoaded', redirectToLoginPage);
window.addEventListener('DOMContentLoaded', loadGroups);
