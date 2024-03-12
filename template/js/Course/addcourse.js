async function addCourse() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const courseData = {
        fanName: name,
        fanDescription: description
    };

    try {
        const response = fetch('https://localhost:7177/api/fans/create-fan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok || (await response).status == 200 || (await response).status == 201) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Kurs muvaffaqiyatli qo'shildi.";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';
            setTimeout(() => {
                window.location.href = './all-courses.html';
            }, 2000);
        } else {
            const errorMessage = await response.text();
            throw new Error(`Error adding course: ${response.status} - ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error adding course:', error);
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "Kurs qo'shib bo'lmadi. Iltimos, qayta urunib ko'ring.";
        resultDiv.style.color = 'red';
        resultDiv.style.display = 'block';
    }
}