
const foods= document.querySelector(".foods");
const input = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const errorElement = document.querySelector("#error");
const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

searchBtn.addEventListener("click", searchData);

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchData();
  }
});


fetchData();

async function fetchData(){

    try{
      for (let i = 0; i < 10; i++){
        const response = await fetch(url);
        
        const data = await response.json();
        errorElement.classList.remove("errorMsg");
        displayFood(data.meals[0]);
      }
      
    }
    catch(error){
      console.error(error)

      if(error){
        errorElement.innerText = " Something went wrong... try again later";
        errorElement.classList.add("errorMsg");
      }
    }
}

function displayFood(food){
  if(food != null){
    foods.innerHTML += `<div class="foodContainer">
       <img class="foodImg" src="${food.strMealThumb}" alt="food">
      <p class="foodName">${food.strMeal}</p>
      <div>
      <p class="foodCategory"> <span class="tag">Category: </span> ${food.strCategory}</p>
      <p class="foodCountry"><span class="tag">Country: </span>${food.strArea}</p>
      </div>
    
      <a href="recipe.html?id=${food.idMeal}" class="foodLink">Check out Ingredients and Recipe</a>
     </div>`;
  }
  
}

function searchData(){
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  if (searchValue === "") {
    input.placeholder= "PLEASE ENTER A FOOD NAME";
    return;
  }

  // Brie wrapped in prosciutto & brioche
  const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

async function fetchSearchData() {

  foods.innerHTML = "";
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();

      const foods = data.meals;
      console.log(foods);

      displayFood(foods[0]);
    } catch (error) {
      console.error(error);
      errorElement.innerText = " No results found... ";
      errorElement.classList.add("errorMsg");
      input.value = "";
    }
  }

  fetchSearchData();
   
}
