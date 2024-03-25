function addpayment() {
    const studentId = document.getElementById("talabaId").value;
    const groupId = document.getElementById("groupId").value;
    const qachontolangan = document.getElementById("qachontolangan").value;
    const qancha = document.getElementById("qanchatolangan").value;
    const type = document.getElementById("paymentType").value;
    const jsonData = {
        studentId: studentId,
        groupId: groupId,
        qachontolangan: qachontolangan,
        qancha: qancha,
        type: type
    };
    fetch("https://localhost:7177/api/payments/create-payment", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
        if (response.ok || response.status === 200 || response.status === 201) {
            return response.json();
        } else {
            throw new Error("Failed to add payment. Status: " + response.status);
        }
    })
    .then((data) => {
        document.getElementById("result").textContent = "Payment added successfully!";
        document.getElementById("paymentForm").reset();
        console.log("Payment added:", data); 
    })
    .catch((error) => {
        console.error("Error adding payment:", error); 
        document.getElementById("errorDisplay").textContent = "Error: " + error.message;
    });
}