document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  document.getElementById("fixedUsername").innerHTML = username;

  // Callback function for handling the response after deleting a message
  const callbackForDeleteMessageInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // Check the response status
    if (responseStatus == 200) {
      window.location.href = "message.html";
    } else if (responseStatus == 404) {
      // Display an error message if the message is not found
      taskInfo.innerHTML = `${responseData.message}`;
      return;
    }
    // Handle other possible response statuses as needed
  };

  // Get a reference to the deleteMessageButton
  const deleteButton = document.getElementById("deleteMessageButton");

  deleteButton.addEventListener("click", function () {
    const data = {
      username: username
    };
  
    fetchMethod(currentUrl + `/api/message/${username}`, callbackForDeleteMessageInfo, "DELETE", data);
  });
});