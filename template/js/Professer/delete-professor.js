async function deleteProfessor() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value

    const professorData = {
        password: name,
        email: email
    }

    try {
        const response = await fetch('https://localhost:7177/api/admins/delete-teacher-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(professorData)
        });

        if (response.ok || response.status === 200 || response.status === 201) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Ustoz muvaffaqiyatli o'chirildi";
            resultDiv.style.color = 'green';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = '';
             setTimeout(() => {
                window.location.href = './all-professors.html';
            }, 2000);
        }
        else if (response.status === 400 || response.status === 404 || response.status === 500) {
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "Parol yoki email noto'g'ri.";
            resultDiv.style.color = 'red';
            resultDiv.style.display = 'block';

            document.getElementById('errorDisplay').innerText = ''
        }
    }
    catch (error) {
        console.error(error);
    }
}