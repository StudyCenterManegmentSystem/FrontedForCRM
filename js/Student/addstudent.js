   const token = localStorage.getItem('token');

function loadGroups() {
  fetch('https://localhost:7177/api/groups/get-all-guruh', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
      console.error('Error loading groups:', error);
    });
}

function addStudent() {
  const token2 = localStorage.getItem('token');

  if (token2 === null) {
    window.location.href = 'page-login.html';
    return;
  }

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const phonenumber = document.getElementById("mobilephone").value;

  const groupSelect = document.getElementById("mySelect");
  const selectedOptions = Array.from(groupSelect.selectedOptions).map(option => option.value);

  if (selectedOptions.length === 0) {
    alert("Please select at least one group.");
    return;
  }

  const studentData = {
    firstName: firstname,
    lastName: lastname,
    phoneNumber: phonenumber,
    groupIds: selectedOptions
  };

  
  fetch('https://localhost:7177/api/students/create-student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token2}`
    },
    body: JSON.stringify(studentData)         
  })
   .then(response => {
    console.log(JSON.stringify(studentData));
    if (response.ok || response.status === 200 || response.status === 201) {
        document.getElementById("errorDisplay").innerHTML = "";
      document.getElementById("result").innerHTML = "Student added successfully";
      document.getElementById("result").style.color = "green";  
      document.getElementById("result").style.display = "block";
      setTimeout(() => {
        document.getElementById("result").style.display = "none";
        wivndow.location.href = './all-students.html';
      }, 3000);
    } else if (response.status == 400 || response.status == 409) {
      response.json().then(errorResponse => {
        document.getElementById("errorDisplay").innerHTML = `Error: ${errorResponse.message}`;
        document.getElementById("errorDisplay").style.color = "red";
        document.getElementById("errorDisplay").style.display = "block";
      });
    }
  }).catch(error => {
    console.error(error);
    document.getElementById("errorDisplay").innerHTML = "An error occurred. Please try again later.";
    document.getElementById("errorDisplay").style.color = "red";
    document.getElementById("errorDisplay").style.display = "block";
  });
}

function redirectToLoginPage() {
  if (!localStorage.getItem('token')) {
    window.location.href = "page-login.html";
    return true; 
  }
  return false;
}

window.addEventListener('DOMContentLoaded', redirectToLoginPage);
window.addEventListener('DOMContentLoaded', loadGroups);