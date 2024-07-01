function changePassword() {
    console.log("Token:", localStorage.getItem('token'));

    var formData = {
        email: document.getElementById('email').value,
        oldPassword: document.getElementById('oldPassword').value,
        newPassword: document.getElementById('newPassword').value
    };

    fetch('https://crm-edu-center.fn1.uz/api/teachers/change-teacher-password', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Add the token here
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Password changed successfully:', data);
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Password changed successfully";
        resultDiv.style.color = 'green';
        resultDiv.style.display = 'block';
        setTimeout(() => {
            window.location.href = './all-professors.html';
        }, 2000);
    })
    .catch(error => {
        console.error('There was a problem changing the password:', error);
        alert('Error changing password: ' + error.message);
    });
}
