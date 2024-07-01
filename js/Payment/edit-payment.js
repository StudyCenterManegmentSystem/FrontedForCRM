function editPayment() {
    const id = document.getElementById('id').value;
    const studentId = document.getElementById('talabaId').value;
    const groupId = document.getElementById('groupId').value;
    const qachonTolagan = document.getElementById('qachonTolangan').value;
    const qanchaTolagan = parseInt(document.getElementById('qanchaTolangan').value);
    const paymentType = parseInt(document.getElementById('paymentType').value);
    const data = {
        id: id,
        studentId: studentId,
        groupId: groupId,
        qachonTolagan: qachonTolagan,
        qanchaTolagan: qanchaTolagan,
        paymentType: paymentType
    };
    fetch('https://crm-edu-center.fn1.uz/api/payments/update-payment', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('result').textContent = 'Payment updated successfully.';
        } else {
            document.getElementById('errorDisplay').textContent = 'Failed to update payment. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorDisplay').textContent = 'An error occurred. Please try again later.';
    });
}