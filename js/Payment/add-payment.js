function addpayment() {
    if (!localStorage.getItem('token')) {
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
        "qanchaTolagan": parseInt(qanchaTolagan, 10),
        "paymentType": parseInt(paymentType, 10)
    };

    var xhr = new XMLHttpRequest();
    var url = 'https://crm-edu-center.fn1.uz/api/payments/create-payment';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            try {
                var response = JSON.parse(xhr.responseText);
            } catch (e) {
                console.error("Error parsing JSON response: ", e);
                document.getElementById("errorDisplay").innerText = "An error occurred while processing the response.";
                return;
            }

            if (xhr.status === 200 || xhr.status === 201) {
                console.log(response, data);
                document.getElementById("errorDisplay").innerHTML = "";
                document.getElementById("result").innerHTML = "Payment added successfully!";
            } else if (xhr.status === 401) {
                document.getElementById("errorDisplay").innerText = "Unauthorized. Please log in again.";
                window.location.href = './page-login.html';
            } else {
                document.getElementById("errorDisplay").innerHTML = response.error || "An error occurred.";
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

function loadStudents() {
    const API_TO_STUDENTS = "https://crm-edu-center.fn1.uz/api/students/get-all-students";
    let studentIdSelect = document.getElementById("talabaId");

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
                studentIdSelect.appendChild(option);
            });
            $('.selectpicker').selectpicker('refresh');
        } else {
            console.error("Element with ID 'talabaId' not found.");
        }
    })
    .catch(error => {
        console.log("Error loading students: ", error);
    });
}

function loadGroup() {
    const API_TO_GROUPS = "https://crm-edu-center.fn1.uz/api/groups/get-all-guruh";
    let groupIdSelect = document.getElementById("groupId");

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
    loadStudents();
    loadGroup();
});
