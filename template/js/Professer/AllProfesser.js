$(document).ready(function() {
    $('#teacherTable').DataTable({
        "ajax": {
            "url": "https://localhost:7177/api/admins/all-teachers-with-fans",
            "dataSrc": ""
        },
        "columns": [
            { "data": "teacherId" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "email" },
            {
                "data": null,
                "render": function(data, type, row) {
                    return `<a href="#" class="btn btn-primary">Edit</a> <a href="./delete-professor.html" class="btn btn-danger">Delete</a> <a href="#" class="btn btn-success">View</a>`;
                }
            }
        ]
    });
});