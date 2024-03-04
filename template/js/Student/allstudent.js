$(document).ready(function() {
    if ($.fn.DataTable.isDataTable('#example3')) {
        $('#example3').DataTable().destroy();
    }
    $('#example3').DataTable({
        "ajax": {
            "url": "https://localhost:7177/api/students/get-all-students",
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
                    return `<a href="./edit-students.html" class="btn btn-primary edit-btn" data-id="${row.id}" data-firstname="${row.firstName}" data-lastname="${row.lastName}" data-phonenumber="${row.phoneNumber}">Edit</a> <a href="#" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</a>`;
                }
            }
        ]
    });
    $('#example3').on('click', '.edit-btn', function(e) {
        e.preventDefault(); 
        var studentId = $(this).data('id');
        var firstName = $(this).data('firstname');
        var lastName = $(this).data('lastname');
        var phoneNumber = $(this).data('phonenumber');
        
        $('#editStudentModal #studentId').val(studentId);
        $('#editStudentModal #firstName').val(firstName);
        $('#editStudentModal #lastName').val(lastName);
        $('#editStudentModal #phoneNumber').val(phoneNumber);
        $('#editStudentModal').modal('show');
    });

    $('#example3').on('click', '.delete-btn', function(e) {
        e.preventDefault();
        var studentId = $(this).data('id');
        $.ajax({
            url: `https://localhost:7177/api/students/delete-student/${studentId}`,
            type: 'DELETE',
            success: function(response) {
                $('#example3').DataTable().ajax.reload();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            }
        });
    });
});