
async function addStudent() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phonenumber = document.getElementById("mobilephone").value;
    const selectestGroupname = Array.from(document.getElementById("groupname").selectedOptions).map(option => option.value);

    const studentData = {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
        gruopIds: selectestGroupname
    }
    
    try {
        const response = await fetch('https://localhost:7177/api/students/create-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok === true || response.status === 201 || response.status === 200) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "O'quvchi muvaffaqiyatli qo'shildi";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            setTimeout(() => {
                window.location.href = './all-students.html';
            }, 2000);

            document.getElementById('errorDisplay').innerText = "";
        } else if (response.status === 400 || response.status === 404 || response.status === 500) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "O'quvchi qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';

        }
        
        else {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "O'quvchi qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';

        }
    }
    catch (error) {
        console.log(error);
    }
}