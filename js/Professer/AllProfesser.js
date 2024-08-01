const token1 = localStorage.getItem('token');
console.log(token1); // Logs the token to the console for debugging

$(document).ready(function() {
  $('#teacherTable').DataTable({
    "ajax": {
      "url": "https://crm-edu-center.fn1.uz/api/admins/all-teachers-with-fans",
      "dataSrc": "",
      "headers": {
        "Authorization": `Bearer ${token1}`
      }
    },
    "columns": [
      { "data": "firstName" },
      { "data": "lastName" },
      { "data": "email" },
      {
        "data": null,
        "render": function(data, type, row) {
          return `<a href="#" class="btn btn-primary">Edit</a> <a href="./delete-professor.html" class="btn btn-danger">Delete</a>`;
        }
      }
    ]
  });
});