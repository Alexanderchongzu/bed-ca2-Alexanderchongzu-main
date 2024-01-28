const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 401) {
        localStorage.removeItem("token");
        window.location.href = "login.htmk";
    }

    const petList = document.getElementById("petList");
    responseData.forEach((pet) => {
        
    })
}