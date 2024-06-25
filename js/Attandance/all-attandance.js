function formatDateTime(dateTime) {
    var date = new Date(dateTime);
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'long' }); 
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    day = (day < 10) ? '0' + day : day;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    var formattedDateTime = month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes;

    return formattedDateTime;
}

function fetchAttendanceData() {
    $.ajax({
        url: 'https://localhost:7177/api/attendances/getall-attendace',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            populateAttendanceHTML(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching attendance data:', error);
        }
    });
}

function populateAttendanceHTML(data) {
    var container = $('.attendance-container');
    container.empty(); 

    data.forEach(function(attendance) {
        var formattedDateTime = formatDateTime(attendance.qachon);
        var attendanceStatus = attendance.keldiKemadi ? 'Came' : 'Did Not Come';
        var attendanceHTML = `
            <div class='attendance-entry'>
                <h4>${attendance.student.firstName} ${attendance.student.lastName}</h4>
                <p>Time: ${formattedDateTime}</p>
                <p>Status: ${attendanceStatus}</p>
            </div>
        `;
        container.append(attendanceHTML);
    });
}
$(document).ready(function() {
    fetchAttendanceData();
});