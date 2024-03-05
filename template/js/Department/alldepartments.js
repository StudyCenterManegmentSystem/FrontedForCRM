$(document).ready(function () {
    // Make an AJAX request to the API
    $.ajax({
        url: 'https://localhost:7177/api/rooms/all-room',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                $('#example3').append('<tr><td>' + item.id + '</td><td>' + item.qavat + '</td><td>' + item.sigimi + '</td><td>' + item.roomName + '</td><td><button class="btn btn-danger delete-btn" data-id="' + item.id + '">Delete</button></td></tr>');
            });
            $('#example3').DataTable();
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    $('#example3').on('click', '.delete-btn', function (e) {
        e.preventDefault();
        var $deleteButton = $(this); 

        var roomId = $deleteButton.data('id');
        $.ajax({
            url: `https://localhost:7177/api/rooms/delete/${roomId}`,
            type: 'DELETE',
            success: function (response) {
                $deleteButton.closest('tr').remove();
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
});