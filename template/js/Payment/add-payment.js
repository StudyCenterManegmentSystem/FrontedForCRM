function addpayment() {
    var studentId = document.getElementById("talabaId").value;
    var groupId = document.getElementById("groupId").value;
    var qachonTolagan = document.getElementById("qachontolangan").value;
    var qanchaTolagan = document.getElementById("qanchatolangan").value;
    var paymentType = document.getElementById("paymentType").value;

    if (!studentId || !groupId || !qachonTolagan || !qanchaTolagan || !paymentType) {
        document.getElementById('errorDisplay').innerText = 'Please fill in all fields.';
        return;
    }
    
    var data = {
        "studentId": studentId,
        "groupId": groupId,
        "qachonTolagan": qachonTolagan,
        "qanchaTolagan": parseInt(qanchaTolagan), 
        "paymentType": parseInt(paymentType) 
    };

    var xhr = new XMLHttpRequest();
    var url = 'https://localhost:7177/api/payments/create-payment';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                var response = JSON.parse(xhr.responseText);
                console.log(response, data);
                document.getElementById("errorDisplay").innerHTML = "";
                document.getElementById("result").innerHTML = "Payment added successfully!";
            } else {
                var errorResponse = JSON.parse(xhr.responseText);
                document.getElementById("errorDisplay").innerHTML = errorResponse.error;
            }
        }
    };
    xhr.send(JSON.stringify(data));
}