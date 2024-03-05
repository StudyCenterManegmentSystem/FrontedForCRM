function add_department() {
    var departmentData = {
        "roomName": document.getElementById('name').value,
        "qavat": parseInt(document.getElementById('floor').value),
        "sigimi": parseInt(document.getElementById('studentcount').value)
    };
    var xhr = new XMLHttpRequest();
    var url = 'https://localhost:7177/api/rooms/create-room'; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('result').innerHTML = "Department added successfully!";
        } else if (xhr.readyState === 4) {
            document.getElementById('errorDisplay').innerHTML = "Error adding department. Please try again.";
        }
    };
    var data = JSON.stringify(departmentData);
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('result').innerHTML = xhr.responseText; 
            } else {
                document.getElementById('errorDisplay').innerHTML = "Error adding department. Please try again.";
            }
        }
    };
}