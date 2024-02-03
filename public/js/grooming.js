document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const points = localStorage.getItem("totalpoints");

    const classicMessage = document.getElementById("classicMessage");
    const advanceMessage = document.getElementById("advanceMessage");
    const specialMessage = document.getElementById("specialMessage");

    const display30points = document.getElementById("display30points");
    display30points.classList.add("d-none");        
    display30points.addEventListener("click", d30pbutton);    
    selectClassicButton.addEventListener("click", selectClassic);

    function selectClassic() {

        display30points.classList.remove("d-none");
        display50points.classList.add("d-none");
        display180points.classList.add("d-none");
    }

    function d30pbutton() {
        if (points >= 30) {
            classicMessage.innerText = "you have chosen one session";
        } else {
            classicMessage.innerText = "You don't have enough points to use this service";
        }
    }
    
    const display50points = document.getElementById("display50points");
    display50points.classList.add("d-none");        
    display50points.addEventListener("click", d50pbutton);  
    selectAdvanceButton.addEventListener("click", selectAdvance);


    function selectAdvance() {
    
        display30points.classList.add("d-none");        
        display50points.classList.remove("d-none");
        display180points.classList.add("d-none");
    }
    function d50pbutton() {
        if (points >= 50) {
            classicMessage.innerText = "you have chosen one session";
        } else {
            classicMessage.innerText = "You don't have enough points to use this service";
        }
    }
    
    const display180points = document.getElementById("display180points");
    display180points.classList.add("d-none");        
    display180points.addEventListener("click", d180pbutton);  
    selectSpecialButton.addEventListener("click", selectSpecial);

    function selectSpecial() {

        display30points.classList.add("d-none");        
        display50points.classList.add("d-none");
        display180points.classList.remove("d-none");
    } 

    function d180pbutton() {
        if (points >= 180) {
            classicMessage.innerText = "you have chosen one session";
        } else {
            classicMessage.innerText = "You don't have enough points to use this service";
        }
    }

    // Fetch user data and display user points
    const callback = (responseStatus, responseData) => {
        const userPointsDisplay = document.getElementById("userPoints");

        userPointsDisplay.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">          
                        <strong>Username:</strong> ${username} <br>
                        <strong>Total Points:</strong> <span id="points" data-total-points="${responseData.total_points || 0}">${responseData.total_points || 0}</span> <br>
                    </p>
                </div>
            </div>
        `;
        localStorage.setItem("totalpoints", responseData.total_points);

    };

    fetchMethod(currentUrl + "/api/user/" + userId, callback);
});