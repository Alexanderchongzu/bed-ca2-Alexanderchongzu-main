const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  if (responseStatus == 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
  }

  const profileInfo = document.getElementById("profileInfo");
  const displayItem = document.createElement("div");
  displayItem.className = "col-xl-9 col-lg-9 col-md-12 col-sm-12 p-3";
  displayItem.innerHTML = `
      <div class="card">
          <div class="card-body">
              <p class="card-text">
                  Username: ${responseData.username} <br>
                  Email: ${responseData.email} <br>
                  Total Points: ${responseData.total_points} <br>
              </p>
          </div>
      </div>
      <div class="mt-2">
          <a href="#" class="btn btn-danger" id="delete-${responseData.user_id}">Delete Account</a>
      </div>
      `;
  profileInfo.appendChild(displayItem);
  
  const deleteButton = document.getElementById(`delete-${responseData.user_id}`);
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const callbackForDelete = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      localStorage.removeItem("token");
      window.location.href = "index.html";
    };
    fetchMethod(currentUrl + "/api/user/" + responseData.user_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
  });
};

fetchMethod(currentUrl + "/api/user/token", callback, "GET", null, localStorage.getItem("token"));