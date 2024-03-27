function addpayment() {
    var studentId = document.getElementById("talabaId").value;
    var groupId = document.getElementById("groupId").value;
    var qachonTolagan = document.getElementById("qachontolangan").value;
    var qanchaTolagan = document.getElementById("qanchatolangan").value;
    var paymentType = document.getElementById("paymentType").value;

    if (!studentId || !groupId || !qachonTolagan || !qanchaTolagan || !paymentType) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }
    
    var data = {
        "studentId": studentId,
        "groupId": groupId,
        "qachonTolagan": qachonTolagan,
        "qanchaTolagan": parseInt(qanchaTolagan), 
        "paymentType": parseInt(paymentType) 
    };

    var xhr = new XMLHttpRequest();
    var url = 'https://localhost:7177/api/payments/create-payment';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                var response = JSON.parse(xhr.responseText);
                console.log(response, data);
                document.getElementById("errorDisplay").innerHTML = "";
                document.getElementById("result").innerHTML = "Payment added successfully!";
            } else {
                var errorResponse = JSON.parse(xhr.responseText);
                document.getElementById("errorDisplay").innerHTML = errorResponse.error;
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

const API_TO_STUDENTS = "https://localhost:7177/api/students/get-all-students";
let studentIdSelect = document.getElementById("talabaId");

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