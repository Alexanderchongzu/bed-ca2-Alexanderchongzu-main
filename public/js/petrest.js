document.addEventListener("DOMContentLoaded", function () {

  // Retrieve elements from the DOM
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const username = localStorage.getItem("username");
  const petList = document.getElementById("petList");
  const showPetButton = document.getElementById("showAllPetsButton");
  document.getElementById("fixedUsername").innerHTML = username;

  showPetButton.addEventListener("click", function () {
    displayPet();
  });

  function displayPet() {
    // Clear previous search results
    petList.innerHTML = "";

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus === 200 && responseData.length > 0) {
        // Display all pet names
        responseData.forEach(pet => {
          const petItem = document.createElement("div");
          petItem.className = "pet-item";
          petItem.innerHTML = `
                      <p><strong>Username:</strong> ${pet.username}</p>
                      <p><strong>Pet Name:</strong> ${pet.petname}</p>
                      <hr>
                  `;
          petList.appendChild(petItem);
        });
      } else {
        // Display message if no pets found
        petList.innerHTML = "<p>No pets found.</p>";
      }
    };

    // Perform request to fetch all pets
    fetchMethod(currentUrl + `/api/pet?petname=${searchInput}`, callback, "GET", null);
  }
  // Hide the warning card when the user interacts with the form
  warningCard.classList.add("d-none");
});
