document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 200) {
      // Check if login was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user_id", responseData.userId);
        // Redirect or perform further actions for logged-in user
        window.location.href = "home.html";
      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  const loginForm = document.getElementById("loginForm");
  const forgetPasswordLink = document.getElementById("forgetPasswordLink");
  const forgetPasswordSubmitButton = document.getElementById("forgetPasswordSubmit");

  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const data = {
      username: username,
      password: password,
    };

    // Store username
    // localstorage.setItem("username", username);

    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    
    // Reset the form fields
    loginForm.reset();
  });

  // forgetPasswordLink.addEventListener("click", function (event) {
  //     event.preventDefault();

  //     const userEmail = prompt("Please enter your email address:");
  //     if (userEmail) {
  //       console.log(`Initiate password reset for email: ${userEmail}`);
  //         // Perform further actions with the email (e.g., initiate password reset request to the server)
  //     // You can make an AJAX request or use fetch to send the email to your server
  //     // For example:
  //     fetch(currentUrl + "/reset-password", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: userEmail }),
  //     })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  //     }
  // });

  // forgetPasswordSubmitButton.addEventListener("click", function () {
  //     const userEmail = document.getElementById("forgetPasswordEmail").value;
  //     // Here you would typically make a request to your server to initiate the password reset process
  //     // This can involve sending a reset link to the provided email address
  //     console.log(`Initiate password reset for email: ${userEmail}`);
  
  //     // Close the modal after processing
  //     $('#forgetPasswordModal').modal('hide');
  // });

});