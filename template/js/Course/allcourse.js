$(document).ready(function() {
    $('#teacherTable').DataTable({
        "ajax": {
            "url": "https://localhost:44334/api/fans/get-all-fans",
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "fanName" },
            { "data": "fanDescription" },
            {   
                "data": null,
                "render": function(data, type, row) {
                    return `<a href="#" class="btn btn-primary">Edit</a> <a href="./delete-professor.html" class="btn btn-danger">Delete</a> <a href="#" class="btn btn-success">View</a>`;
                }
            }
        ]
    });
});