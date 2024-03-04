document.getElementById('addGroupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedWeekdays = []; 
    var checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedWeekdays.push(checkbox.value); 
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

    var apiUrl = 'https://example.com/api/groups/create-guruh'; // Corrected URL
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Group added successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error adding group. Please try again later.');
    });
});