document.addEventListener('DOMContentLoaded', function() {
    fetchUserInfo();
});

function fetchUserInfo() {
    fetch('/user')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Update HTML content with user information
        const userInfoElement = document.getElementById('userInfo');
        userInfoElement.innerHTML = `
            <strong>User ID:</strong> ${data.user_id}<br>
            <strong>Username:</strong> ${data.username}<br>
            <strong>Email:</strong> ${data.email}<br>
        `;
    })
    .catch(error => console.error('Error fetching user information:', error));
}