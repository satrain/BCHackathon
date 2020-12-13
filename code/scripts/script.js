const searchInput = document.querySelector(".search-input")
const guides = document.querySelector(".guides");
const body = document.querySelector("body");

searchInput.addEventListener("click", function() {
    guides.style.transform = "translateX(0)";
    body.style.overflowY = "scroll";
})