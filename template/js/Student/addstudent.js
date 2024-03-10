let API = "https://localhost:7177/api/groups/get-all-guruh";
var groupSelect = document.getElementById("myselect");

function loadGroups() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            groupSelect.innerHTML = "";
            data.forEach(group => {
                const option = document.createElement("option");
                option.value = group.id;
                option.textContent = group.groupName;
                groupSelect.appendChild(option);
                console.log(group.id);
            });
            console.log(data, option);
        })
        .catch(error => {
            console.error('Guruhlarni olishda xatolik:', error);
        });

        
}

window.addEventListener('DOMContentLoaded', loadGroups);
async function addStudent() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phonenumber = document.getElementById("mobilephone").value;
    const groupIds = document.getElementById("myselect");
    const selectedGroupIds = Array.from(groupIds.selectedOptions).map(option => option.value);

    console.log('Selected Group IDs:', selectedGroupIds); // Debugging statement

    const studentData = {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
        gruopIds: selectedGroupIds
    };
    try {
        const response = await fetch('https://localhost:7177/api/students/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        console.log('Response from API:', response); // Debugging statement

        if (response.ok || response.status == 200 || response.status == 201) {
            document.getElementById("result").innerHTML = "Student added successfully";
            document.getElementById("result").style.color = "green";
            document.getElementById("result").style.display = "block";
            setTimeout(() => {
                window.location.href = './all-students.html';
            }, 2000);
            document.getElementById("errorDisplay").textContent = "";
        } else if(response.status == 400 || response.status == 404 || response.status == 500)
        {
            throw new Error('Student could not be added. Please try again.');  
        } 
        else {
            throw new Error('Student could not be added. Please try again.');
        }
    } catch (error) {
        document.getElementById("result").innerHTML = error.message;
        document.getElementById("result").style.color = "red";
        document.getElementById("result").style.display = "block";
    }
}
