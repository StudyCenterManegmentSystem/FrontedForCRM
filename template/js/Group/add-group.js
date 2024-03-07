document.getElementById('addGroupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedWeekdays = []; 
    var checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            // Convert the string value of the weekday to its integer representation
            switch (checkbox.value) {
                case 'Monday':
                    selectedWeekdays.push(1);
                    break;
                case 'Tuesday':
                    selectedWeekdays.push(2);
                    break;
                case 'Wednesday':
                    selectedWeekdays.push(3);
                    break;
                case 'Thursday':
                    selectedWeekdays.push(4);
                    break;
                case 'Friday':
                    selectedWeekdays.push(5);
                    break;
                case 'Saturday':
                    selectedWeekdays.push(6);
                    break;
                case 'Sunday':
                    selectedWeekdays.push(7);
                    break;
                default:
                    break;
            }
        }
    });
    var formData = {
        groupName: document.getElementById('groupName').value,
        roomId: document.getElementById('roomId').value,
        fanId: document.getElementById('fanId').value,
        teacherId: document.getElementById('teacherId').value,
        weekdays: selectedWeekdays,
        start: document.getElementById('start').value,
        end: document.getElementById('end').value,
        price: document.getElementById('price').value,
        duration: document.getElementById('duration').value
    };

    var apiUrl = 'https://localhost:7177/api/groups/create-guruh';
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setTimeout(() => {
            window.location.href = './all-groups.html';
        }, 2000);
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Group added successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error adding group. Please try again later.');
    });
});
