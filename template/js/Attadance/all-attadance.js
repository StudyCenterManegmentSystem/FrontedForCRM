function fetchAttendance() {
    fetch('https://localhost:7177/api/attendances/getall-attendace')
        .then(response => response.json())
        .then(data => {
            const attendanceDetails = document.getElementById('attendanceDetails');
            attendanceDetails.innerHTML = '';
            data.forEach(attendance => {
                const student = attendance.student;
                const qachon = new Date(attendance.qachon).toLocaleString(); 
                const keldiKemadi = attendance.keldiKemadi ? 'Keldi' : 'Kemadi'; 
                const card = document.createElement('div');
                card.classList.add('card');
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                const studentName = document.createElement('p');
                studentName.textContent = `Student Name: ${student.firstName} ${student.lastName}`;
                const phoneNumber = document.createElement('p');
                phoneNumber.textContent = `Phone Number: ${student.phoneNumber}`;
                const attendanceTime = document.createElement('p');
                attendanceTime.textContent = `Attendance Time: ${qachon}`;
                const attendanceStatus = document.createElement('p');
                attendanceStatus.textContent = `Attendance Status: ${keldiKemadi}`;
                cardBody.appendChild(studentName);
                cardBody.appendChild(phoneNumber);
                cardBody.appendChild(attendanceTime);
                cardBody.appendChild(attendanceStatus);
                card.appendChild(cardBody);
                attendanceDetails.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching attendance:', error);
        });
}
window.addEventListener('load', fetchAttendance);