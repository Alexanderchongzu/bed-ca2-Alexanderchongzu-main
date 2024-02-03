document.addEventListener("DOMContentLoaded", function () {

    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const searchForm = document.getElementById("searchForm");
    const petList = document.getElementById("petList");
    const showAllPetsButton = document.getElementById("showAllPetsButton");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput").value.trim();
        if (searchInput !== '') {
            searchPets(searchInput);
        } else {
            // Display message if search input is empty
            petList.innerHTML = "<p>Please enter a pet name to search.</p>";
        }
    });

    showAllPetsButton.addEventListener("click", function () {
        displayAllPets();
    });

    function searchPets(searchInput) {
        // Clear previous search results
        petList.innerHTML = "";

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 200 && responseData.length > 0) {
                // Find the pet with the matching name
                const pet = responseData.find(pet => pet.petname.toLowerCase() === searchInput.toLowerCase());
                if (pet) {
                    // Display information of the found pet
                    const petItem = document.createElement("div");
                    petItem.className = "pet-item";
                    petItem.innerHTML = `
                        <p><strong>Username:</strong> ${pet.username}</p>
                        <p><strong>Pet Name:</strong> ${pet.petname}</p>
                        <p><strong>Breeds:</strong> ${pet.breeds}</p>
                        <p><strong>Notes:</strong> ${pet.notes}</p>
                        <hr>              
                    `;
                    petList.appendChild(petItem);
                } else {
                    // Display message if no pet found with the given name
                    petList.innerHTML = "<p>No pet found with that name.</p>";
                }
            } else {
                // Display message if no pets found
                petList.innerHTML = "<p>No pets found.</p>";
            }
        };

        // Perform search request
        fetchMethod(currentUrl + `/api/pet?petname=${searchInput}`, callback, "GET", null);
    }

    function displayAllPets() {
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
                        <p><strong>Breeds:</strong> ${pet.breeds}</p>
                        <p><strong>Notes:</strong> ${pet.notes}</p>
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
        fetchMethod(currentUrl + `/api/pet`, callback, "GET", null);
    }
});