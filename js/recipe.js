const heading = document.querySelector(".heading");

const getId = location.search.split("=")[1];
console.log(getId)

// heading.innerHTML = `Recipe for Food ${getId}`;

const container = document.querySelector(".foodDetailsContainer");




async function getRecipe(){
  try{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getId}`);
  const data = await response.json();
  
  const food = data.meals[0];
  console.log(food);
  createHtml(food);
  }
  catch(error){
    console.error(error);
    container.innerHTML = `<div style="color: red;text-align: center;margin: 20px;font-size: 30px">     There's is an issue. Try agian later. </div>
    `;
    throw new Error("Connection Problem. Try again later");
    
  }
  
}

getRecipe();



function createHtml(food){

  const ingredientList = [];

  for(let i = 1; i <= 20; i++){
    const ingredient = food[`strIngredient${i}`];
    const measure = food[`strMeasure${i}`];
    if(ingredient && ingredient.trim() !== ""){
      ingredientList.push(`<p>${ingredient} - ${measure} <p>`);
    }
    console.log(ingredientList);
  }

  container.innerHTML = `<div class="foodDetails">
      <h3 class="heading">Recipe for ${food.strMeal}</h3>

      <div class="imgBox">
         <img class="foodImage" src="${food.strMealThumb}" alt="foodImage">

         <div class="timeCost">
          <p class="time">${food.strCategory}</p>
          <p class="cost"> <span style="color: lime;">Tags:</span> ${food.strTags}</span></p>
        </div>

      </div>
     
      <div class="ingredientsSection">
        <span class="heading2">Ingredients</span></div>
        <div class="ingredientBox">
          <div class="item">
            <p class="ingredient">
            ${ingredientList.join("")}
            </p>
          </div>
        </div>
      
      <p class="instructionsBox">
        <span class="heading2">Instructions</span> 
        <div class="instructions">
           ${food.strInstructions}
        </div>
       
      </p>
    </div>`;
}