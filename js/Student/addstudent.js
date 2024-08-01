const API_TO_GROUPS = "https://crm-edu-center.fn1.uz/api/groups/get-all-guruh";

async function loadGroups() {
    try {
        const response = await fetch(API_TO_GROUPS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    } catch (error) {
        console.error("Error loading groups: ", error);
        throw error;
    }
}

async function populateGroupOptions() {
    try {
        const allGroups = await loadGroups();
        const groupIdSelect = document.getElementById("groupId");

        if (!groupIdSelect) {
            console.error("Element with ID 'groupId' not found.");
            return;
        }

        groupIdSelect.innerHTML = "";

        allGroups.forEach(group => {
            const option = document.createElement("option");
            option.value = group.id;
            option.textContent = group.groupName;
            groupIdSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error populating group options: ", error);
        document.getElementById('errorDisplay').innerText = 'Error loading groups.';
    }
}

async function addStudent() {
    try {
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const phoneNumber = document.getElementById('mobilephone').value;
        const groupIdSelect = document.getElementById('groupId');

        if (!groupIdSelect) {
            console.error("Element with ID 'groupId' not found.");
            return;
        }

        const selectedOptions = Array.from(groupIdSelect.selectedOptions);
        const groupIds = selectedOptions.map(option => option.value);

        if (groupIds.length === 0) {
            document.getElementById('errorDisplay').innerText = 'Please select at least one group.';
            return;
        }

        const studentData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            gruopIds: groupIds
        };

        console.log("Student Data: ", studentData);

        const response = await fetch('https://crm-edu-center.fn1.uz/api/students/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(studentData)
        });

        const responseData = await response.json();
        console.log("Response Data: ", responseData);

        if (response.ok) {
            document.getElementById('result').innerText = 'Student added successfully!';
            setTimeout(() => {
                window.location.href = 'all-students.html';
                document.getElementById('errorDisplay').innerText = '';
            }, 2000);
        } else {
            console.error("Error Data: ", responseData);
            document.getElementById('errorDisplay').innerText = `Error: ${responseData.message}`;
        }
    } catch (error) {
        console.error("Error adding student: ", error);
        document.getElementById('errorDisplay').innerText = `Error: ${error.message}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateGroupOptions();
    document.getElementById('addStudentButton').addEventListener('click', addStudent);
});