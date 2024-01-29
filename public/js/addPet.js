document.addEventListener("DOMContentLoaded", function () {
  const addpetForm = document.getElementById("addpetForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const username = localStorage.getItem("username");
  document.getElementById("username").value = username;

  // Rest of the code will be added here
  addpetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Rest of the code will be added here
    const username = document.getElementById("username").value;
    const petname = document.getElementById("petname").value;
    const breed = document.getElementById("breed").value;
    const notes = document.getElementById("notes").value;


      console.log("Signup successful");
      console.log("Username:", username);
      console.log("Petname:", petname);
      console.log("Breed:", breed);
      console.log("Notes:", notes);

      const data = {
        username: username,
        petname: petname,
        breeds: breed,
        notes: notes
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
            window.location.href = "petbonding.html";
            /////////change the profile.html to other location
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };

      // Perform signup request
      fetchMethod(currentUrl + "/pet", callback, "POST", data);
      //////////////////////////change the endpoint//////////
      // Reset the form fields
      addpetForm.reset();
      
      
  });
});