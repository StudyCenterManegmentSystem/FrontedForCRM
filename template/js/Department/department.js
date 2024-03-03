$(document).ready(function() {
    // Function to fetch and display group data
    function fetchGroupData() {
        $.ajax({
            url: 'https://localhost:44334/api/groups/get-all-guruh', // URL to your API endpoint
            type: 'GET', // HTTP method (GET request in this case)
            success: function(data) {
                // On success, handle the received data
                displayGroupData(data);
            },
        });
    }

    // Function to display group data on the webpage
    function displayGroupData(groups) {
        // Assuming you have an element with id "group-container" where you want to display the data
        var groupContainer = $('#course-list');

        // Clear existing content
        groupContainer.empty();

        // Iterate over each group and create HTML elements to display the data
        groups.forEach(function(group) {
            var groupCard = $('<div class="card mr-3">');
            var groupCardBody = $('<div class="card-body">');

            // Add group details to the card body
            groupCardBody.append('<h5 class="card-title">Group Name: ' + (group.groupName || '') + '</h5>');
            groupCardBody.append('<p class="card-text">Teacher: ' + (group.teacher.firstName || '') + ' ' + (group.teacher.lastName || '') + '</p>');
            groupCardBody.append('<p class="card-text">Room: ' + (group.room.roomName || '') + '</p>');
            groupCardBody.append('<p class="card-text">Price: $' + (group.price || 0) + '</p>');
            groupCardBody.append('<p class="card-text">Start: ' + formatDate(group.start) + '</p>');
            groupCardBody.append('<p class="card-text">End: ' + formatDate(group.end) + '</p>');
            groupCardBody.append('<p class="card-text">Duration: ' + (group.duration || '') + '</p>');

            // Append the card body to the card
            groupCard.append(groupCardBody);

            // Append the card to the group container
            groupContainer.append(groupCard);
        });
    }

    // Function to format the date
    function formatDate(dateString) {
        // Check if the date string is valid
        if (!dateString) return '';
        
        // Parse the date string
        var date = new Date(dateString);
        
        // Format the date as "Month Day, Year"
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Call the fetchGroupData function when the page loads
    fetchGroupData();
});
