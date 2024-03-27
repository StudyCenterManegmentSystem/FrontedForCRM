function submitAttendance() {
    // Get form data
    const talabaId = document.getElementById("studentId").value;
    const groupId = document.getElementById("groupId").value;
    const keldiKemadiValue = document.getElementById("keldiKemadi").value;
    const keldiKemadi = keldiKemadiValue === "true"; // Convert string to Boolean
    const qachon = document.getElementById("qachon").value;

    // Validate data (optional)
    // You can add checks here to ensure required fields are filled and data is in the correct format

    // Prepare data as JSON
    const jsonData = {
        dto: "someValue", // Add a placeholder value for "dto" field
        talabaId: talabaId,
        qachon: qachon,
        keldiKemadi: keldiKemadi,
        groupId: groupId,
    };

    if (!talabaId || !groupId || !keldiKemadiValue || !qachon) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }
    // Send data to server using fetch API
    fetch("https://localhost:7177/api/attendances/create-attendance", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (response.ok || response.status === 200 || response.status === 201) {
                document.getElementById("result").textContent = "Attendance submitted successfully!";
                // Clear the form (optional)
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
            if (studentIdSelect) { // Ensure studentIdSelect exists before accessing it
                studentIdSelect.innerHTML = "";
                data.forEach(student => {
                    const option = document.createElement("option");
                    option.value = student.id;
                    option.textContent = student.lastName + " " + student.firstName;
                    console.log(option);
                    studentIdSelect.appendChild(option);
                });
                // Refresh Bootstrap Select Picker after modifying options
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.error("Element with ID 'talabaId' not found.");
            }
        })
        .catch(error => {
            console.log("Error loading students: ", error);
        });
}
loadStudents();

const API_TO_GROUPS = "https://localhost:7177/api/groups/get-all-guruh";
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
                // Initialize Bootstrap Select Picker after modifying options
                $('.selectpicker').selectpicker('refresh');
            } else {
                console.error("Element with ID 'groupId' not found.");
            }
        })
        .catch(error => {
            console.log("Error loading groups: ", error);
        });
}

loadGroup();