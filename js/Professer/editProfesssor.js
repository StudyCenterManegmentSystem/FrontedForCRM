function changePassword() {
    var formData = {
        email: document.getElementById('email').value,
        oldPassword: document.getElementById('oldPassword').value,
        newPassword: document.getElementById('newPassword').value
    };

    fetch('https://localhost:7177/api/teachers/change-teacher-password',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Password changed successfully:', data);
        alert('Password changed successfully'); 
    })
    .catch(error => {
        console.error('There was a problem changing the password:', error);
        alert('Error changing password: ' + error.message); 
    }); 
}   