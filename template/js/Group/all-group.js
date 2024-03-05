function fetchGroupData() {
    $.ajax({
        url: 'https://localhost:7177/api/groups/get-all-guruh',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            populateGroupHTML(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching group data:', error);
        }
    });
}


function deleteGroup(groupId) {
    $.ajax({
        url: `https://localhost:7177/api/groups/delete-guruh/${groupId}`,
        type: 'DELETE',
        dataType: 'path',

    })
}

$('.row').on('click', '.delete-btn', function(e) {
    e.preventDefault();
    var groupId = $(this).data('id');
    deleteGroup(groupId);
});
function formatDateTime(datetimeString) {
    var date = new Date(datetimeString);
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedDate = month + ' ' + (day < 10 ? '0' + day : day) + ', ' + year;

    return formattedDate;
}

function populateGroupHTML(data) {
    var container = $('.row');

    data.forEach(function(group) {
        var formattedStart = formatDateTime(group.start);
        var studentCount = group.students ? group.students.length : 0;
        var groupHTML = `
        <div class='col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6 mt-3 ml-2'>
            <div class='card'>
                <!-- Populate card content with group data -->
                <div class='card-body'>
                    <h4>${group.groupName}</h4>
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

                        </li>
                        <li class='list-group-item px-0 d-flex justify-content-between'>
                            <span>
                                <i class='fa fa-graduation-cap text-primary mr-2'></i>Science
                            </span>
                            <strong>${group.fan.fanName}</strong>
                        </li>
                        <li class='list-group-item px-0 d-flex justify-content-between'>
                            <span>
                                <i class='text-primary mr-2'></i>Room 
                            </span>
                            <strong>${group.room.roomName}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
        container.append(groupHTML);
    });
}

$(document).ready(function() {
    fetchGroupData();
});