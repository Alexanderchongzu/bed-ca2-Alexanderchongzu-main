document.addEventListener("DOMContentLoaded", function () {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    console.log(username)

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userProfile = document.getElementById("userProfile");

        userProfile.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">         
                <strong>User ID:</strong> ${userId} <br> 
                <strong>Username:</strong> ${username} <br>
                </p>
            </div>
        </div>
        `;

    };

    fetchMethod(currentUrl + "/api/user/" + userId, callback);
});