const TOKEN = localStorage.getItem('token');

$(document).ready(function() {
    if ($.fn.DataTable.isDataTable('#example3')) {
        $('#example3').DataTable().destroy();
    }
    $('#example3').DataTable({
        "ajax": {
            "url": "https://localhost:7177/api/students/get-all-students",
            "headers": {
                "Authorization": `Bearer ${TOKEN}`
            },
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "phoneNumber" },
            {
                "data": null,
                "render": function(data, type, row) {
                    return `<a href="./edit-students.html" class="btn btn-primary edit-btn" data-id="${row.id}" data-firstname="${row.firstName}" data-lastname="${row.lastName}" data-phonenumber="${row.phoneNumber}">Edit</a> <a href="#" class="btn btn-danger delete-btn" data-id="${row.id}">Delete</a>`;
                }
            }
        ]
    });
    $('#example3').on('click', '.delete-btn', function(e) {
        e.preventDefault();
        var studentId = $(this).data('id');
        $.ajax({
            url: `https://localhost:7177/api/students/delete-student/${studentId}`,
            type: 'DELETE',
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            },
            success: function(response) {
                $('#example3').DataTable().ajax.reload();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); 
            }
        });
    });
});