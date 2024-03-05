$(document).ready(function() {
    $('.delete-btn').click(function() {
        var studentId = $(this).data('student-id');
        if (confirm('Are you sure you want to delete this student?')) {
            $.ajax({
                type: 'DELETE',
                url: 'https://localhost:7177/api/students/delete-student/' + studentId, 
                success: function(response) {
                    console.log('Student deleted successfully:', response);
                    window.location.reload();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting student:', error);
                    alert('Error deleting student');
                }
            });
        }
    });
});