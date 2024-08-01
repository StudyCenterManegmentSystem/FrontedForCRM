function submitAttendance() {
    const talabaId = document.getElementById("studentId").value;
    const groupId = document.getElementById("groupId").value;
    const keldiKemadiValue = document.getElementById("keldiKemadi").value;
    const keldiKemadi = keldiKemadiValue === "true"; // Convert string to Boolean
    const qachon = document.getElementById("qachon").value;

    // Basic validation
    if (!talabaId || !groupId || !keldiKemadiValue || !qachon) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }

    const jsonData = {
        talabaId: talabaId,
        qachon: qachon,
        keldiKemadi: keldiKemadi,
        groupId: groupId,
    };

    fetch("https://crm-edu-center.fn1.uz/api/attendances/create-attendance", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    })
        .then((response) => {
            if (response.ok) {
                document.getElementById("result").textContent = "Attendance submitted successfully!";
                document.getElementById("attendanceForm").reset();

                setTimeout(() => {
                    window.location.href = './all-attandance.html';
                }, 1000);
            } else {
                response.text().then((text) => {
                    document.getElementById("errorDisplay").textContent = "Error: " + text;
                });
            }
        })
        .catch((error) => {
            document.getElementById("errorDisplay").textContent = "Error: " + error;
        });
}

const API_TO_STUDENTS = "https://crm-edu-center.fn1.uz/api/students/get-all-students";
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
                    studentIdSelect.appendChild(option);
                });
                // Refresh selectpicker after populating the options
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

const API_TO_GROUPS = "https://crm-edu-center.fn1.uz/api/groups/get-all-guruh";
let groupIdSelect = document.getElementById("groupId");

function loadGroup() {
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
                // Refresh selectpicker after populating the options
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.error("Element with ID 'groupId' not found.");
            }
        })
        .catch(error => {
            console.log("Error loading groups: ", error);
        });
}

function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html";
        return true;
    }
    return false;
}
window.addEventListener('DOMContentLoaded', () => {
    redirectToLoginPage();
    loadGroup();
});
        