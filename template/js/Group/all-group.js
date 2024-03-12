// Function to fetch group data from API
function fetchGroupData() {
    // Make AJAX request
    $.ajax({
        url: 'https://localhost:7177/api/groups/get-all-guruh',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Call function to populate HTML with group data
            populateGroupHTML(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching group data:', error);
        }
    });
}

// Delete group function
function deleteGroup(groupId) {
    // Make AJAX request
    $.ajax({
        url: `https://localhost:7177/api/groups/delete-guruh/${groupId}`,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            // Reload the page after successful deletion
            location.reload();
            console.log('Group deleted successfully');
        },
        error: function (xhr, status, error) {
            // Reload the page if there's an error
            location.reload();
            console.error('Error deleting group:', error);
        }
    });
}

// Click event handler for delete button
$('.row').on('click', '.delete-btn', function (e) {
    e.preventDefault();
    var groupId = $(this).data('id');
    // Call deleteGroup function
    deleteGroup(groupId);
});

// Function to populate HTML with group data
function populateGroupHTML(data) {
    // Get the container element where group cards will be appended
    var container = $('.row');

    // Iterate over the group data and create HTML for each group
    data.forEach(function (group) {
        // Format start datetime
        var formattedStart = formatDateTime(group.start);

        // Calculate student count
        var studentCount = group.students ? group.students.length : 0;

        // Create HTML for group card
        var groupHTML = `
            <div class='col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 mt-3 ml-2'>
                <div class='card'>
                    <!-- Populate card content with group data -->
                    <div class='card-body'>
                        <h4>${group.fan.fanName}</h4>
                        <ul class='list-group mb-3 list-group-flush'>
                            <li class='list-group-item px-0 border-top-0 d-flex justify-content-between'>
                                <span class='mb-0 text-muted'>${formattedStart}</span>
                            </li>
                            <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span class='mb-0'>Duration :</span>
                                <strong>${group.duration}</strong>
                            </li>
                            <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span class='mb-0'>Professor :</span>
                                <strong>${group.teacher.firstName} ${group.teacher.lastName}</strong>
                            </li>
                           <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span>
                                    <i class='text-primary mr-2'></i>Start
                                </span>
                                <strong>${formatDateTime(group.start)}</strong>
                            </li>
                            <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span>
                                    <i class='text-primary mr-2'></i>End
                                </span>
                                <strong>${formatDateTime(group.end)}</strong>
                            </li>
                            <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span>
                                    <i class='text-primary mr-2'></i>Room 
                                </span>
                                <strong>${group.room.roomName}</strong>
                            </li>
                            <li class='list-group-item px-0 d-flex justify-content-between'>
                                <span>
                                    <i class="text-primary mr-2"></i>Delete Group
                                </span>
                                <strong><a href="all-group.html" class="delete-btn btn btn-danger" data-id="${group.id}">Delete</a></strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        container.append(groupHTML);
    });
}

// Function to format datetime string as "Month Day, Year"
function formatDateTime(datetimeString) {
    // Parse datetime string into a Date object
    var date = new Date(datetimeString);

    // Array of month names
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Get month, day, and year from the Date object
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // Formatting hours and minutes with leading zeros if necessary
    var formattedTime = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);

    var formattedDate = month + ' ' + (day < 10 ? '0' + day : day) + ', ' + year + ' ' + formattedTime;

    return formattedDate;
}

// Call fetchGroupData function when the document is ready
$(document).ready(function () {
    fetchGroupData();
});
