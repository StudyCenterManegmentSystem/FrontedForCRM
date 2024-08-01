const apiUrl = 'https://crm-edu-center.fn1.uz/api/fans/get-all-with-teachers';

async function fetchCourses() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

function renderCourses(courses) {
    const courseTableBody = document.getElementById('courseTableBody');

    courseTableBody.innerHTML = '';

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.fanName}</td>
            <td>${getTeacherNames(course.teachers)}</td>
        `;
        courseTableBody.appendChild(row); 
        
    });
}

     
function getTeacherNames(teachers) {
    return teachers.map(teacher => `${teacher.firstName} ${teacher.lastName}`).join(', ');
}


async function init() {
    try {
        const courses = await fetchCourses();

        renderCourses(courses);
    } catch (error) {
        console.error('Error initializing application:', error);    
    }
}
init();