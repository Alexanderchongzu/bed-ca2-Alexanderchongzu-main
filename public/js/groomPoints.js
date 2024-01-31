document.addEventListener("DOMContentLoaded", function () {


    const messageForm = document.getElementById("groompointsForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const messageId = parseInt(document.getElementById("groomId").value);

        // Perform form submission logic
        console.log("Form submitted");
        console.log("Groom ID:", messageId);
        warningCard.classList.add("d-none");

        const data = {
            groom_id: messageId
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus == 200) {
                window.location.href = "message.html"
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

        // Perform message submission request
        fetchMethod(currentUrl + "/api/groompoints/" + messageId, callback, "PUT", data);

        // Reset the form fields
        messageForm.reset();
    });

    // Add an event listener to clear the warning when the form is being filled
    messageForm.addEventListener("input", function () {
        warningCard.classList.add("d-none");
    });
});