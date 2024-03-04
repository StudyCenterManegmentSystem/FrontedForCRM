async function addCourse() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const courseData = {
        fanName: name,
        fanDescription: description
    }

    try{
        const response = await fetch('https://localhost:7117/api/fans/create-fan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok === true || response.status === 201 || response.status === 200) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kurs muvaffaqiyatli qo'shildi.";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';
            setTimeout(() => {
                window.location.href = './all-courses.html';
            }, 2000);
        } else if (response.status === 400 || response.status === 404 || response.status === 500) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kurs qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';
        }
    }
    catch (error) {
        console.log(error);
    }
}