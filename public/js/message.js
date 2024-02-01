document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
 
        const challengeList = document.getElementById("messageList");
        responseData.forEach((challenge) => {
            // Rest of the code will be added here
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    <strong>Message:</strong> ${challenge.message_text} <br>
                    <strong>User:</strong> ${challenge.user_id} <br>
                </p>
            </div>
        </div>
        `;
        challengeList.appendChild(displayItem);
        });
    };
 
    fetchMethod(currentUrl + "/api/message", callback);
});