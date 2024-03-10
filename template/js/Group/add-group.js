// Correcting constant name typo
const APITOFANS = "https://localhost:7177/api/fans/get-all-fans";
let fanSelect = document.getElementById("fanId");

function loadFans() {
    fetch(APITOFANS)
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
                fanSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading fans:", error);
        });
}

window.addEventListener('DOMContentLoaded', loadFans);

// Correcting constant name typo
const APITOROOMS = "https://localhost:7177/api/rooms/all-room";
let roomSelect = document.getElementById("roomId");

function loadRooms() {
    fetch(APITOROOMS)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
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

window.addEventListener('DOMContentLoaded', loadRooms);


const API_TO_TEACHER = "https://localhost:7177/api/admins/all-teachers-with-fans";
let teacherSelect = document.getElementById("teacherId");

function loadTeachers() {
    fetch(API_TO_TEACHER)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            console.log("Data received:", data); // Log received data
            if (!Array.isArray(data)) {
                throw new Error("Data received is not an array");
            }
            if (!teacherSelect) {
                throw new Error("Teacher select element not found");
            }

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
window.addEventListener('DOMContentLoaded', loadTeachers);


document.getElementById('addGroupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedWeekdays = [];
    var checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedWeekdays.push(checkbox.value);
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

    var apiUrl = 'https://localhost:7177/api/groups/create-guruh';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Group added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding group. Please try again later.');
        });
});

window.addEventListener('DOMContentLoaded', loadRooms);
document.getElementById('addGroupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedWeekdays = [];
    var checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            // Convert the string value of the weekday to its integer representation
            switch (checkbox.value) {
                case 'Monday':
                    selectedWeekdays.push(1);
                    break;
                case 'Tuesday':
                    selectedWeekdays.push(2);
                    break;
                case 'Wednesday':
                    selectedWeekdays.push(3);
                    break;
                case 'Thursday':
                    selectedWeekdays.push(4);
                    break;
                case 'Friday':
                    selectedWeekdays.push(5);
                    break;
                case 'Saturday':
                    selectedWeekdays.push(6);
                    break;
                case 'Sunday':
                    selectedWeekdays.push(7);
                    break;
                default:
                    break;
            }
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

    var apiUrl = 'https://localhost:7177/api/groups/create-guruh';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setTimeout(() => {
                window.location.href = './all-groups.html';
            }, 2000);
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Group added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding group. Please try again later.');
        });
});
