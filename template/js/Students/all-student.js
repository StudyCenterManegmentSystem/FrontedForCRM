$(document).ready(function() {
    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable('#example3')) {
        // DataTable already initialized, destroy it
        $('#example3').DataTable().destroy();
    }

    // Initialize DataTable
    $('#example3').DataTable({
        "ajax": {
            "url": "https://localhost:44334/api/students/get-all-students",
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "phoneNumber" },
            {
                "data": "guruhReturnDtos",
                "render": function(data, type, row) {
                    let groups = "";
                    data.forEach(function(group) {
                        groups += group.groupName + "<br>";
                    });
                    return groups;
                }
            },
            {
                "data": null,
                "render": function(data, type, row) {
                    return `<a href="#" class="btn btn-primary edit-btn" data-id="${row.id}" data-firstname="${row.firstName}" data-lastname="${row.lastName}" data-phonenumber="${row.phoneNumber}">Edit</a> <a href="#" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</a>`;
                }
            }
        ]
    });

    // Add click event listener to edit buttons
    $('#example3').on('click', '.edit-btn', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var studentId = $(this).data('id');
        var firstName = $(this).data('firstname');
        var lastName = $(this).data('lastname');
        var phoneNumber = $(this).data('phonenumber');
        
        // Populate modal form fields with student details
        $('#editStudentModal #studentId').val(studentId);
        $('#editStudentModal #firstName').val(firstName);
        $('#editStudentModal #lastName').val(lastName);
        $('#editStudentModal #phoneNumber').val(phoneNumber);

        // Show the modal
        $('#editStudentModal').modal('show');
    });

    // Add click event listener to delete buttons
    $('#example3').on('click', '.delete-btn', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var studentId = $(this).data('id');
        
        // Make AJAX request to delete student
        $.ajax({
            url: `https://localhost:44334/api/students/delete-student/${studentId}`,
            type: 'DELETE',
            success: function(response) {
                // Reload DataTable after successful deletion
                $('#example3').DataTable().ajax.reload();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); // Log error message if deletion fails
            }
        });
    });
    $(document).ready(function() {
    // Add click event listener to edit buttons
    $('#example3').on('click', '.edit-btn', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var studentId = $(this).data('id');
        var firstName = $(this).data('firstname');
        var lastName = $(this).data('lastname');
        var phoneNumber = $(this).data('phonenumber');
        
        // Populate form fields with student details
        $('#editStudentForm #studentId').val(studentId);
        $('#editStudentForm #firstname').val(firstName);
        $('#editStudentForm #lastname').val(lastName);
        $('#editStudentForm #mobilephone').val(phoneNumber);

        // Show the form
        $('#editStudentForm').show();
    });

    // Add click event listener to delete buttons
    $('#example3').on('click', '.delete-btn', function(e) {
        // Your existing delete functionality
    });

    // Add click event listener to submit button
    $('#editStudentForm').on('click', 'button[type="button"]', function() {
        // Your submit functionality (e.g., AJAX request to update student details)
        // You may also want to hide the form after submission
        $('#editStudentForm').hide();
    });
});

});
