document.addEventListener("DOMContentLoaded", function () {
   const userID = localStorage.getItem("user_id");
  console.log(userID)
    const callbackForPlayerInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const userProfileinfo = document.getElementById("userProfileinfo");
  
      if (responseStatus == 404) {
        userProfileinfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      userProfileinfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                      User Name: ${responseData.username} <br>
                  </p>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/user/${userID}`, callbackForPlayerInfo);
  });