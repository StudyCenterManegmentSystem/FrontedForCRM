function submitAttendance() {
    const talabaId = document.getElementById("talabaId").value;
    const groupId = document.getElementById("groupId").value;
    const keldiKemadi = document.getElementById("keldiKemadi").value === "true";
    const qachon = document.getElementById("qachon").value;
    const jsonData = {
        talabaId,
        qachon,
        keldiKemadi,
        groupId,
    };

    if (!talabaId || !groupId || !keldiKemadi || !qachon) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }
    fetch("https://localhost:7177/api/attendances/create-attendance", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (response.ok) {
                document.getElementById("result").textContent = "Attendance submitted successfully!";
                document.getElementById("attendanceForm").reset();
            } else {
                response.text().then((text) => {
                    document.getElementById("errorDisplay").textContent = "Error: " + text;
                });
            }
        })
        .catch((error) => {
            document.getElementById("errorDisplay").textContent = "Error: " + error;
        });
}