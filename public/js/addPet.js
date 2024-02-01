document.addEventListener("DOMContentLoaded", function () {
  const addpetForm = document.getElementById("addpetForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const username = localStorage.getItem("username");
  document.getElementById("username").value = username;
  console.log(username);
  // Rest of the code will be added here
  addpetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Rest of the code will be added here
    const username = document.getElementById("username").value;
    const petname = document.getElementById("petname").value;
    const breeds = document.getElementById("breeds").value;
    const notes = document.getElementById("notes").value;


      console.log("Signup successful");
      console.log("Username:", username);
      console.log("Petname:", petname);
      console.log("Breeds:", breeds);
      console.log("Notes:", notes);

      const data = {
        username: username,
        petname: petname,
        breeds: breeds,
        notes: notes
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
            window.location.href = "petlist.html";
            /////////change the profile.html to other location
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };

      // Perform signup request
      fetchMethod(currentUrl + "/api/pet", callback, "POST", data);
      //////////////////////////change the endpoint//////////
      // Reset the form fields
      addpetForm.reset();
      
      
  });
});
