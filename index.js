
const foods= document.querySelector(".foods");

const input = document.querySelector(".searchInput");

const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

fetchData();

async function fetchData(){

    try{
      for (i = 0; i < 10; i++){
        const response = await fetch(url);
        
        const data = await response.json();
        console.log(data.meals[0]);
        displayFood(data.meals[0]);
      }
      
    }
    catch(error){
      console.error(error)

      if(error){
        foods.innerHTML = "<h2 class='errorMsg'> Something went wrong... try again later </h2>"
      }
    }
}


function displayFood(food){
  
  foods.innerHTML += `<div class="foodContainer">
       <img class="foodImg" src="${food.strMealThumb}" alt="food">
      <p class="foodName">${food.strMeal}</p>
      <div>
      <p class="foodCategory">Category: ${food.strCategory}</p>
      <p class="foodCountry">Country: ${food.strArea}</p>
      </div>
    
      <a href="recipe.html?id=${food.idMeal}">Check out Ingredients and Recipe</a>
     </div>`;
}
