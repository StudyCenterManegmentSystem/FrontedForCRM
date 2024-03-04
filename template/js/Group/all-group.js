fetch('')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const groupTableBody = document.getElementById('groupTableBody');
            data.forEach(group => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${group.id}</td>
                    <td>${group.name}</td>
                    <td>${group.description}</td>
                    <td>Action</td>
                `;
                groupTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });