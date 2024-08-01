$(document).ready(function () {
    // Make an AJAX request to the API
    $.ajax({
        url: 'https://crm-edu-center.fn1.uz/api/rooms/all-room',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Loop through the received data and append it to the table
            $.each(data, function (index, item) {
                $('#example3').append('<tr><td>' + item.qavat + '</td><td>' + item.sigimi + '</td><td>' + item.roomName + '</td><td><button class="btn btn-danger delete-btn" data-id="' + item.id + '">Delete</button></td></tr>');
            });

            // Initialize DataTables
            $('#example3').DataTable();
        },
        error: function (xhr, status, error) {
            // Handle errors here
            console.error(xhr.responseText);
        }
    });

    // Attach click event handler to dynamically added delete buttons
    $('#example3').on('click', '.delete-btn', function (e) {
        e.preventDefault();
        var $deleteButton = $(this); // Store reference to 'this'

        var roomId = $deleteButton.data('id');
        $.ajax({
            url: `https://crm-edu-center.fn1.uz/api/rooms/delete/${roomId}`,
            type: 'DELETE',
            success: function (response) {
                // Remove the row from the table
                $deleteButton.closest('tr').remove();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});
