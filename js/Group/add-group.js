const APITOFANS = "https://crm-edu-center.fn1.uz/api/fans/get-all-fans";
const APITOROOMS = "https://crm-edu-center.fn1.uz/api/rooms/all-room";
const API_TO_TEACHER = "https://crm-edu-center.fn1.uz/api/admins/all-teachers-with-fans";
const API_TO_CREATE_GROUP = "https://crm-edu-center.fn1.uz/api/groups/create-guruh";

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
        fanSelect.innerHTML = "";
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

    // Validate form inputs
    var groupName = document.getElementById('groupName').value.trim();
    var roomId = document.getElementById('roomId').value;
    var fanId = document.getElementById('fanId').value;
    var teacherId = document.getElementById('teacherId').value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var price = parseFloat(document.getElementById('price').value);
    var duration = document.getElementById('duration').value.trim();

    if (!groupName || !roomId || !fanId || !teacherId || !start || !end || isNaN(price) || !duration) {
        alert('Please fill in all fields correctly.');
        return;
    }

    var formData = {
        groupName,
        roomId,
        fanId,
        teacherId,
        weekdays: selectedWeekdays,
        start,
        end,
        price,
        duration
    };

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
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error creating group.');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Group added successfully!');
        window.location.href = './all-group.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding group: ' + error.message);
    });
});

function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html";
        return true;
    }
    return false;
}

window.addEventListener('DOMContentLoaded', () => {
    redirectToLoginPage();
    loadFans();
    loadRooms();
    loadTeachers();
});
