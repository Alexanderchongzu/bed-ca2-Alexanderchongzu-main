document.addEventListener("DOMContentLoaded", function () {

    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const userList = document.getElementById("showallUser");

    // Clear previous search results
    userList.innerHTML = "";

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus === 200 && responseData.length > 0) {
            // Display all user names
            responseData.forEach(user => {
                const userItem = document.createElement("div");
                userItem.className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                userItem.innerHTML = `
                    <div class="card">
                    <div class="card-body">
                        <p class="card-text">
                            <strong>Username:</strong> ${user.username} <br>
                            <strong>Email:</strong> ${user.email}
                        </p>
                    </div>
                </div>
                    `;
                userList.appendChild(userItem);
            });
        } else {
            // Display message if no user found
            userList.innerHTML = "<p>No user found.</p>";
        }
    };

    // Perform request to fetch all user
    fetchMethod(currentUrl + `/api/user`, callback);
});