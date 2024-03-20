function submitAttendance() {
    // Get form data
    const talabaId = document.getElementById("talabaId").value;
    const groupId = document.getElementById("groupId").value;
    const keldiKemadiValue = document.getElementById("keldiKemadi").value;
    const keldiKemadi = keldiKemadiValue === "true"; // Convert string to Boolean
    const qachon = document.getElementById("qachon").value;

    // Validate data (optional)
    // You can add checks here to ensure required fields are filled and data is in the correct format

    // Prepare data as JSON
    const jsonData = {
        dto: "someValue", // Add a placeholder value for "dto" field
        talabaId: talabaId,
        qachon: qachon,
        keldiKemadi: keldiKemadi,
        groupId: groupId,
    };

    if (!talabaId || !groupId || !keldiKemadiValue || !qachon) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }
    // Send data to server using fetch API
    fetch("https://localhost:7177/api/attendances/create-attendance", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            if (response.ok || response.status === 200 || response.status === 201) {
                document.getElementById("result").textContent = "Attendance submitted successfully!";
                // Clear the form (optional)
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