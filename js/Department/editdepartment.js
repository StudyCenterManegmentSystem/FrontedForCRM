const apiUrl = 'https://localhost:7177/api/rooms/update';
const editDepartmentForm = document.getElementById('editDepartmentForm');

editDepartmentForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const departmentName = document.getElementById('departmentName').value;
    const floor = document.getElementById('floor').value;
    const studentCount = document.getElementById('studentcount').value;
    const departmentId = document.getElementById('departmentId').value.trim();

    const departmentData = {
        "id": departmentId,
        "roomName": departmentName,
        "qavat": floor,
        "sigimi": studentCount
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(departmentData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Department edited successfully:', data);
            document.getElementById('result').innerText = 'Department edited successfully';
        } else {
            console.error('Error editing department:', response.statusText);
            document.getElementById('errorDisplay').innerText = 'Error editing department: ' + response.statusText;
        }
    } catch (error) {
        console.error('Network error:', error);
        document.getElementById('errorDisplay').innerText = 'Network error: ' + error.message;
    }
});