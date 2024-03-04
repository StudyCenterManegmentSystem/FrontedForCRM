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

// Function to format datetime string as "Month Day Year"
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

    var formattedDate = month + ' ' + (day < 10 ? '0' + day : day) + ' ' + year;

    return formattedDate;
}

// Function to populate HTML with group data
function populateGroupHTML(data) {
    // Get the container element where group cards will be appended
    var container = $('.row');

    // Iterate over the group data and create HTML for each group
    data.forEach(function (group) {
        // Format start datetime
        var formattedStart = formatDateTime(group.start);

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
                                <i class='fa fa-graduation-cap text-primary mr-2'></i>Science
                            </span>
                            <strong>${group.fan.fanName}</strong>
                        </li>
                        <li class='list-group-item px-0 d-flex justify-content-between'>
                            <span>
                                <i class='mr-2'>Room :</i>
                                &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <strong>${group.room.roomName}</strong>
                            </span>
                        </li>
                        <!-- Add more list items as needed -->
                    </ul>
                </div>
            </div>
        </div>
    `;
    

        // Append group HTML to the container
        container.append(groupHTML);
    });
}

// Call fetchGroupData function when the page is ready
$(document).ready(function () {
    fetchGroupData();
});
