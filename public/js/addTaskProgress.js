document.addEventListener("DOMContentLoaded", function () {
 
    // Retrieve elements from the DOM
    const messageForm = document.getElementById("messageForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    document.getElementById("fixedUsername").innerHTML = username;
    document.getElementById("userId").innerHTML = userId;
    console.log(username)
    console.log(userId)
    // Add event listener for form submission
    messageForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Retrieve form input values
      // const username = document.getElementById("fixedUsername").value;
      const TaskId= parseInt(document.getElementById("TaskId").value);
      const Date= document.getElementById("Date").value;
      const Notes= document.getElementById("Notes").value;

      // Log form input values for debugging purposes
      console.log("Form submitted");
      console.log("Task ID:", TaskId);
      console.log("Date:", Date);
      console.log("Notes:", Notes);

      // Hide the warning card initially
      warningCard.classList.add("d-none");
  
      // Prepare data object for message submission
      const data = {
        user_id: userId,
        task_id: TaskId,
        completion_date: Date,
        notes: Notes
      };
  
      // CDefine a callback function for handling the fetch response
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        // Check if message submission was successful (HTTP status 200)
        if (responseStatus == 201) {
          // Redirect to the singleMessageInfo.html page upon success
          window.location.href = "grooming.html";
        } else {
          // Display the warning card with the error message
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };
  
      // Perform a fetch request to update the message data
      fetchMethod(currentUrl + "/api/taskprogress", callback, "POST", data);
  
      // Reset the form fields after submission
      messageForm.reset();
    });
  
    // Add an event listener to clear the warning when the form is being filled
    messageForm.addEventListener("input", function () {
      // Hide the warning card when the user interacts with the form
      warningCard.classList.add("d-none");
    });
  });