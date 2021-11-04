console.log("script loaded");

function displayMenu(el) {
    const menu = document.getElementById("menu");
    if(menu.style.getPropertyValue("display") === "" || menu.style.getPropertyValue("display") === "none"){
        menu.style.setProperty("display", "block");
    }
    else {
        menu.style.setProperty("display", "none");
    }
    
}