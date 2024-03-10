$(document).ready(function () {
    // Make an AJAX request to the API
    $.ajax({
        url: 'https://localhost:7177/api/rooms/all-room',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Loop through the received data and append it to the table
            $.each(data, function (index, item) {
                var editButton = '<a href="./edit-departments.html" class="btn btn-primary edit-btn" data-id="' + item.id + '">Edit</a>';
                $('#example3').append('<tr><td>' + item.id + '</td><td>' + item.qavat + '</td><td>' + item.sigimi + '</td><td>' + item.roomName + '</td><td>' + editButton + '&nbsp;<button class="btn btn-danger delete-btn" data-id="' + item.id + '">Delete</button></td></tr>');
            });

            // Initialize DataTables
            $('#example3').DataTable();
        },
        error: function (xhr, status, error) {
            // Handle errors here
            console.error(xhr.responseText);
        }
    });

    // Edit button click handler
    $('#example3').on('click', '.edit-btn', function () {
        var roomId = $(this).data('id');
        // Perform actions to edit the department using roomId
        // Redirect to edit page or show edit modal, etc.
    });

    $('#example3').on('click', '.delete-btn', function (e) {
        e.preventDefault();
        var roomId = $(this).data('id');
        var deleteButton = $(this); // Store reference to the button

        $.ajax({
            url: `https://localhost:7177/api/rooms/delete/${roomId}`,
            type: 'DELETE',
            success: function (response) {
                // Remove the row from the table using the stored reference
                deleteButton.closest('tr').remove();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});