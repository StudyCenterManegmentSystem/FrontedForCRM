function editAttendance() {
    const id = document.getElementById('id').value;
    const talabaId = document.getElementById('talabaId').value;
    const groupId = document.getElementById('groupId').value;
    const keldiKemadiElement = document.getElementById('keldiKemadi');
    const keldiKemadi = keldiKemadiElement.checked;
    const qachon = document.getElementById('qachon').value;

    let payload;
    try {
        payload = JSON.stringify({
            id: id, 
            talabaId: talabaId,
            groupId: groupId,
            keldiKemadi: keldiKemadi,
            qachon: qachon
        });
    } catch (error) {
        console.error('Error converting to JSON:', error);
        return;
    }

    fetch('https://localhost:7177/api/attendances/update-attendace', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById('result').innerText = 'Attendance updated successfully!';
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        document.getElementById('errorDisplay').innerText = 'Error updating attendance.';
    });
}