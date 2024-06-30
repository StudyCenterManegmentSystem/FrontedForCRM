const API_TO_GROUPS = "https://localhost:7177/api/groups/get-all-guruh";
let groupIdSelect = document.getElementById("groupId");

// Function to load groups and populate groupIdSelect
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

        const data = await response.json(); // Parse response as JSON
        return data; // Return parsed data
    } catch (error) {
        console.error("Error loading groups: ", error);
        throw error; // Rethrow error to handle it in caller function
    }
}

// Function to populate groupIdSelect dropdown with loaded groups
async function populateGroupOptions() {
    try {
        const allGroups = await loadGroups();

        // Get groupIdSelect element after DOM is loaded
        let groupIdSelect = document.getElementById("groupId");

        if (!groupIdSelect) {
            console.error("Element with ID 'groupId' not found.");
            return;
        }

        // Clear existing options (if any)
        groupIdSelect.innerHTML = "";

        // Populate select with fetched group names
        allGroups.forEach(group => {
            const option = document.createElement("option");
            option.value = group.id; // Use group ID as option value
            option.textContent = group.groupName; // Display group name as option text
            groupIdSelect.appendChild(option);
        });

        // Initialize Bootstrap Select Picker after modifying options
        $(groupIdSelect).selectpicker('refresh');
    } catch (error) {
        console.error("Error populating group options: ", error);
        document.getElementById('errorDisplay').innerText = 'Error loading groups.';
    }
}

// Call populateGroupOptions to initially populate groupIdSelect after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateGroupOptions();
});

// Function to add a new student
async function addStudent() {
    try {
        // Get input values
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const phoneNumber = document.getElementById('mobilephone').value;
        const selectedOptions = Array.from(document.getElementById('mySelect').selectedOptions);

        // Extract selected group IDs
        const groupIds = selectedOptions.map(option => option.value);

        // Validate group selection
        if (groupIds.length === 0) {
            document.getElementById('errorDisplay').innerText = 'Please select at least one group.';
            return;
        }

        // Prepare student data
        const studentData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            groupIds: groupIds
        };

        // Send POST request to add student
        const response = await fetch('https://localhost:7177/api/students/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Student added successfully!';
            document.getElementById('errorDisplay').innerText = '';
        } else {
            const errorData = await response.json();
            document.getElementById('errorDisplay').innerText = `Error: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('errorDisplay').innerText = `Error: ${error.message}`;
    }
}
