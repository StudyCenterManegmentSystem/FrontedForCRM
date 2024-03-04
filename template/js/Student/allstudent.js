// Function to fetch all students from the API
function getAllStudents() {
    $.ajax({
        url: 'https://localhost:7177/api/students/get-all-students',
        type: 'GET',
        success: function(response) {
            // If the request is successful
            displayStudents(response);
        },
        error: function(xhr, status, error) {
            // If there's an error with the request
            console.error(error);
        }
    });
}

// Function to display students on the HTML page
function displayStudents(students) {
    var studentList = $('#studentList');
    studentList.empty(); // Clear the existing list

    students.forEach(function(student) {
        // Create list item for each student
        var listItem = $('<li>').addClass('list-group-item').text(student.firstName + ' ' + student.lastName);
        studentList.append(listItem);
    });
}

// Fetch all students when the page loads
$(document).ready(function() {
    getAllStudents();
});