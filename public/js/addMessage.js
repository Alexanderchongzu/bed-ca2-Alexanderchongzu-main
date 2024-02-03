document.addEventListener("DOMContentLoaded", function () {
 
    // Retrieve elements from the DOM
    const messageForm = document.getElementById("messageForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const username = localStorage.getItem("username");
    document.getElementById("fixedUsername").innerHTML = username;
    console.log(username)
    // Add event listener for form submission
    messageForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Retrieve form input values
      const messageText = document.getElementById("messageText").value;
  
      // Log form input values for debugging purposes
      console.log("Form submitted");
      console.log("username:", username);
      console.log("Message Text:", messageText);
  
      // Hide the warning card initially
      warningCard.classList.add("d-none");
  
      // Prepare data object for message submission
      const data = {
        username: username,
        message_text: messageText,
      };
  
      // CDefine a callback function for handling the fetch response
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        // Check if message submission was successful (HTTP status 200)
        if (responseStatus == 201) {
          // Redirect to the singleMessageInfo.html page upon success
          window.location.href = "message.html";
        } else {
          // Display the warning card with the error message
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };
  
      // Perform a fetch request to update the message data
      fetchMethod(currentUrl + "/api/message", callback, "POST", data);
  
      // Reset the form fields after submission
      messageForm.reset();
    });
  
    // Add an event listener to clear the warning when the form is being filled
    messageForm.addEventListener("input", function () {
      // Hide the warning card when the user interacts with the form
      warningCard.classList.add("d-none");
    });
  });