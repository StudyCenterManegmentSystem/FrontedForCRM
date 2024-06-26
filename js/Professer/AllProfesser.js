$(document).ready(function () {
    $('#teacherTable').DataTable({
        "ajax": {
            "url": "https://localhost:7177/api/admins/all-teachers-with-fans",
            "dataSrc": ""
        },
        "columns": [
            { "data": "firstName" },
            { "data": "lastName" },
            { 
                "data": "fans",
                "render": function(data, type, row) {
                    // Assuming you want to display all fan names in one column
                    let fanNames = data.map(fan => fan.fanName).join(', ');
                    return fanNames;
                }
            },
            { "data": "email" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return `<a href="#" class="btn btn-primary">Edit</a> <a href="./delete-professor.html" class="btn btn-danger">Delete</a>`;
                }
            }
        ]
    });
});
