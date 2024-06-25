const APITOFANS = "https://localhost:7177/api/fans/get-all-fans";
const APITOROOMS = "https://localhost:7177/api/rooms/all-room";
const API_TO_TEACHER = "https://localhost:7177/api/admins/all-teachers-with-fans";
const API_TO_CREATE_GROUP = "https://localhost:7177/api/groups/create-guruh";

function loadFans() {
    fetch(APITOFANS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(data => {
        const fanSelect = document.getElementById("fanId");
        fanSelect.innerHTML = ""; // Clear the select options before populating
        data.forEach(fan => {
            const option = document.createElement("option");
            option.value = fan.id;
            option.textContent = fan.fanName;
            fanSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error loading fans:", error);
    });
}
 x
function loadRooms() {
    fetch(APITOROOMS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(data => {
        const roomSelect = document.getElementById("roomId");
        roomSelect.innerHTML = "";
        data.forEach(room => {
            const option = document.createElement("option");
            option.value = room.id;
            option.textContent = room.roomName;
            roomSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error loading rooms:", error);
    });
}

// Function to load teachers
function loadTeachers() {
    fetch(API_TO_TEACHER, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then(data => {
        const teacherSelect = document.getElementById("teacherId");
        teacherSelect.innerHTML = "";
        data.forEach(teacher => {
            const option = document.createElement("option");
            option.value = teacher.teacherId;
            option.textContent = teacher.firstName + " " + teacher.lastName;
            teacherSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error loading teachers:", error);
    });
}

// Event listener for form submission to create a group
document.getElementById('addGroupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedWeekdays = [];
    var weekdaysMap = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    };

    var checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked && weekdaysMap.hasOwnProperty(checkbox.value)) {
            selectedWeekdays.push(weekdaysMap[checkbox.value]);
        }
    });

    var formData = {
        groupName: document.getElementById('groupName').value,
        roomId: document.getElementById('roomId').value,
        fanId: document.getElementById('fanId').value,
        teacherId: document.getElementById('teacherId').value,
        weekdays: selectedWeekdays,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value,
        price: document.getElementById('price').value,
        duration: document.getElementById('duration').value
    };

    console.log(formData);
    console.log(localStorage.getItem('token'));
    fetch(API_TO_CREATE_GROUP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating group: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Group added successfully!');
        window.location.href = './all-group.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error adding group. Please try again later.');
    });
});

// Function to redirect to login page if token is not found
function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html"; // Redirect to login page
        return true; // Return true to indicate redirection happened
    }
    return false; // Return false if token is found
}

// Event listener to redirect to login page if token is not found
window.addEventListener('DOMContentLoaded', () => {
    redirectToLoginPage();
    loadFans();
    loadRooms();
    loadTeachers();
});
