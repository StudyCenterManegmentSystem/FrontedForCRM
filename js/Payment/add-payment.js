// Function to check token and redirect to login if not present
function redirectToLoginPage() {
    if (!localStorage.getItem('token')) {
        window.location.href = "page-login.html"; 
        return true; 
    }
    return false; 
}

// Function to handle adding a payment
function addpayment() {
    if (localStorage.getItem('token') == null) {
        window.location.href = './page-login.html';
        return;
    }
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
    var url = 'https://crm-edu-center.fn1.uz/api/payments/create-payment';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    console.log(response, data);
                    document.getElementById("errorDisplay").innerHTML = "";
                    document.getElementById("result").innerHTML = "Payment added successfully!";
                } catch (e) {
                    console.error("Error parsing response: ", e);
                    document.getElementById("errorDisplay").innerHTML = "Error parsing server response.";
                }
            } else {
                try {
                    var errorResponse = JSON.parse(xhr.responseText);
                    document.getElementById("errorDisplay").innerHTML = errorResponse.error;
                } catch (e) {
                    console.error("Error parsing error response: ", e);
                    document.getElementById("errorDisplay").innerHTML = "Error processing server response.";
                }
                // xatolar bor
            }
        }
    };
    xhr.onerror = function () {
        console.error("Request failed.");
        document.getElementById("errorDisplay").innerHTML = "Failed to send request.";
    };
    xhr.send(JSON.stringify(data));
}

const API_TO_STUDENTS = "https://crm-edu-center.fn1.uz/api/students/get-all-students";
let studentIdSelect = document.getElementById("talabaId");

function loadStudents() {
    fetch(API_TO_STUDENTS, {
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
        if (studentIdSelect) {
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

const API_TO_GROUPS = "https://crm-edu-center.fn1.uz/api/groups/get-all-guruh";
let groupIdSelect = document.getElementById("groupId");

function loadGroup() {
    fetch(API_TO_GROUPS, {
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

window.addEventListener('DOMContentLoaded', function () {
    redirectToLoginPage();
    loadStudents();
    loadGroup();
});
