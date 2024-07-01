function submitForm(event) {
    event.preventDefault(); 

    var fanId = document.getElementById('courseCode').value; 
    var fanName = document.getElementById('courseName').value;
    
    var fanDescription = document.getElementById('courseDescription').value;

    var data = {
        id: fanId,
        fanName: fanName,
        fanDescription: fanDescription
    };

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://crm-edu-center.fn1.uz/api/fans/update-fan', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Fan details updated successfully');
        } else {
            console.error('Error updating fan details:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Network error occurred');
    };

    xhr.send(JSON.stringify(data));
}

function cancelEdit() {
    document.getElementById('courseName').value = ''; 
    document.getElementById('courseDescription').value = ''; 
}

document.getElementById('editCourseForm').addEventListener('submit', submitForm);