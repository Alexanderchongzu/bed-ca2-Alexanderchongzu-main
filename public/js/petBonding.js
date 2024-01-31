const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const bondingList = document.getElementById("bondingList");
    responseData.forEach((pet) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <h5 class="card-body">
                    <p class="card-text">
                        Username:      ${pet.username} <br>
                        Pet Name:      ${pet.petname} <br>
                        Breeds:        ${pet.breeds} <br>
                        Notes:         ${pet.notes} <br>
                    </p>
                </h5>
            </div>
            `;
        bondingList.appendChild(displayItem);
    });
}

fetchMethod(currentUrl + "/api/pet", callback);