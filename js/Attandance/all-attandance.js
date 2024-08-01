$(document).ready(function() {
    const token1 = localStorage.getItem('token'); // Retrieve token from localStorage

    $('#teacherTable').DataTable({
        "ajax": {
            "url": "https://crm-edu-center.fn1.uz/api/attendances/getall-attendace",
            "dataSrc": "",
            "headers": {
                "Authorization": `Bearer ${token1}` // Include token in the request headers
            },
            "error": function(xhr, error, code) {
                console.error('Error fetching data for DataTable:', error);
                alert('Error loading data, please try again.');
            }
        },
        "columns": [
            { "data": "student.firstName", "title": "First Name" },
            { "data": "student.lastName", "title": "Last Name" },
            {
                "data": "qachon",
                "title": "Attendance Date",
                "render": function(data) {
                    return data ? formatDateTime(data) : 'N/A';
                }
            },
            {
                "data": "keldiKemadi",
                "title": "Status",
                "render": function(data) {
                    return data ? 'Came' : 'Did Not Come';
                }
            }
        ]
    });

    // Optionally, fetch attendance data for another use case
    fetchAttendanceData();
});

// Function to format the date and time
function formatDateTime(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Function to fetch attendance data (if needed)
function fetchAttendanceData() {
    const token = localStorage.getItem('token');
    $.ajax({
        url: 'https://crm-edu-center.fn1.uz/api/attendances/getall-attendace',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            console.log('Fetched attendance data:', response);
            // Handle the fetched data if needed
        },
        error: function(xhr, error, code) {
            console.error('Error fetching attendance data:', error);
        }
    });
}
