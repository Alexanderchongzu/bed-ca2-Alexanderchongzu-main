document.addEventListener("DOMContentLoaded", function () {

    const userId = localStorage.getItem("user_id");
    // Clear previous search results

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        const userList = document.getElementById("showoneUser");

        if (responseStatus == 404) {
            userList.innerHTML = `${responseData.message}`
            return;
        }
            // Display all user names
            const user = responseData; 
                userList.innerHTML = `
                    <p class="card-text">
                        <strong>Username:</strong> ${user.username} <br>
                        <strong>Email:</strong> ${user.email}
                    </p>
                    `;            
        
    };

    // Perform request to fetch all user
      console.log("Fetching user data for user ID:", userId);
    console.log("API endpoint:", currentUrl + `/api/user/${userId}`);
    fetchMethod(currentUrl + `/api/user/${userId}`, callback);
});