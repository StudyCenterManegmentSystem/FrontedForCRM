async function addStudent() {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const groupIdsSelect = document.getElementById("teacherIds");
    const selectedGroupIds = Array.from(groupIdsSelect.selectedOptions).map(option => option.value);
    const weekDays = document.getElementById("teacherIds").value;
    const selectedWeekDays = Array.from(weekDays.selectedOptions).map(option => option.value);
    const roomid = document.getElementById("roomId").value;
    const teacher = document.getElementById("teacherIds").value;

    const studentData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        groupName: selectedGroupIds,
        weekdays: selectedWeekDays,
        roomId: roomid,
        teacherId: teacher
    };

    try {
        const response = await fetch('https://localhost:7177/api/students/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Student successfully added";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';

            setTimeout(() => {
                window.location.href = './all-students.html'; // Redirect to all students page
            }, 2000);
        } else {
            const resultDiv = await response.text();
            console.error(`Error: ${resultDiv}`);
            document.getElementById('errorDisplay').innerText = `Error: ${resultDiv}`;
        }
    } catch (error) {
        console.error(error);
    }
}