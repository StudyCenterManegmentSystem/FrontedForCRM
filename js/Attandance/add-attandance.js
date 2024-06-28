document.addEventListener('DOMContentLoaded', (event) => {
    $('.selectpicker').selectpicker('refresh');
});

function submitAttendance() {
    const talabaId = document.getElementById("studentId").value;
    const groupId = document.getElementById("groupId").value;
    const keldiKemadiValue = document.getElementById("keldiKemadi").value;
    const keldiKemadi = keldiKemadiValue === "true"; // Convert string to Boolean
    const qachon = document.getElementById("qachon").value;

    const jsonData = {
        talabaId: talabaId,
        qachon: qachon,
        keldiKemadi: keldiKemadi,
        groupId: groupId,
    };

    console.log("Talaba ID:", talabaId);
    console.log("Group ID:", groupId);

    const token = localStorage.getItem('token');
    console.log("Retrieved Token:", token);

    if (!token) {
        document.getElementById('errorDisplay').innerText = 'No token found. Please log in.';
        return;
    }

    if (!talabaId || !groupId || !keldiKemadiValue || !qachon) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }

    fetch("https://localhost:7177/api/attendances/create-attendance", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then((response) => {
        console.log("Response Status:", response.status);
        if (response.ok || response.status === 200 || response.status === 201) {
            document.getElementById("result").textContent = "Attendance submitted successfully!";
            document.getElementById("attendanceForm").reset();

            setTimeout(() => {
                window.location.href = './all-attendance.html';
            }, 1000);

        } else if (response.status === 401) {
            document.getElementById("errorDisplay").textContent = "Unauthorized: Please check your credentials.";
        } else if (response.status === 403) {
            document.getElementById("errorDisplay").textContent = "Forbidden: You do not have the necessary permissions.";
        } else {
            response.text().then((text) => {
                document.getElementById("errorDisplay").textContent = "Error: " + text;
            });
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById("errorDisplay").textContent = "Error: " + error.message;
    });
}

const API_TO_STUDENTS = "https://localhost:7177/api/students/get-all-students";
let studentIdSelect = document.getElementById("studentId");

function loadStudents() {
    fetch(API_TO_STUDENTS)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            if (studentIdSelect) {
                studentIdSelect.innerHTML = "";
                data.forEach(student => {
                    const option = document.createElement("option");
                    option.value = student.id;
                    option.textContent = student.lastName + " " + student.firstName;
                    console.log(option);
                    studentIdSelect.appendChild(option);
                });
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.error("Element with ID 'studentId' not found.");
            }
        })
        .catch(error => {
            console.log("Error loading students: ", error);
        });
}
loadStudents();

const API_TO_GROUPS = "https://localhost:7177/api/groups/get-all-guruh";
let groupIdSelect = document.getElementById("groupId");

function loadGroups() {
    fetch(API_TO_GROUPS)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok"); 
            }
            return res.json(); // Parse response as JSON
        })
        .then(data => {
            if (groupIdSelect) {
                groupIdSelect.innerHTML = "";
                data.forEach(group => {
                    const option = document.createElement("option");
                    option.value = group.id;
                    option.textContent = group.groupName;
                    groupIdSelect.appendChild(option);
                });
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.error("Element with ID 'groupId' not found.");
            }
        })
        .catch(error => {
            console.log("Error loading groups: ", error);
        });
}

loadGroups();
