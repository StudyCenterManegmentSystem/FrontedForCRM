function submitAttendance() {
    const talabaId = document.getElementById('talabaId').value;
    const groupId = document.getElementById('groupId').value;
    const keldiKemadi = document.getElementById('keldiKemadi').value;
    const qachon = new Date(document.getElementById('qachon').value).toISOString();
    const data = {
        "talabaId": talabaId,
        "qachon": qachon,
        "keldiKemadi": keldiKemadi,
        "groupId": groupId
    };
    fetch('https://localhost:7177/api/attendances/create-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonResponse => {
        console.log(jsonResponse);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}