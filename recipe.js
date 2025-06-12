const heading = document.querySelector(".heading");

const getId = location.search.split("=")[1];

console.log(getId)

heading.innerHTML = `Recipe for Food ${getId}`



