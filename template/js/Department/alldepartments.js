document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://localhost:7177/api/rooms/all-room';

    function fetchDepartments() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayDepartments(data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }

    function displayDepartments(departments) {
        const tableBody = document.querySelector('#example3 tbody');
        if (!tableBody) {
            console.error('Table body not found');
            return;
        }

        tableBody.innerHTML = '';

        departments.forEach(department => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${department.id}</td>
                <td>${department.floor}</td>
                <td>${department.studentCount}</td>
                <td>${department.roomName}</td>
                <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchDepartments();
});