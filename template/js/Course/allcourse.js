// Fetch data from the API
fetch('https://localhost:7177/api/fans/get-all-fans')
.then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  })
  .then(data => {
    if (data && data.length > 0) {
      displayCourses(data);
    } else {
      console.log('No courses found.');
    }
  })
  .catch(error => {
    console.error('Error fetching courses:', error);
  });
function displayCourses(courses) {
  const coursesListContainer = document.getElementById('courses-list');
  coursesListContainer.innerHTML = '';
  courses.forEach(course => {
    const courseElement = document.createElement('div');
    courseElement.classList.add('course');
    courseElement.innerHTML = `
      <h3>${course.fanName}</h3>
      <p>${course.fanDescription}</p>
      <p>ID: ${course.id}</p>
    `;
    coursesListContainer.appendChild(courseElement);
  });
}