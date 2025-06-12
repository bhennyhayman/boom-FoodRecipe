const foodSection= document.querySelector(".foods");

const input = document.querySelector(".searchInput");

input.addEventListener("keypress", (event)=>{
  console.log(event.key);
  if(event.key == 'Enter'){
    fetchSearch();
  }
})

let foodsHtml = ``;


const url = './assets/foods.json';

fetchData();

async function fetchData(){

    try{
      const response = await fetch(url);

      const data = await response.json();
      const foods = await data.foods;

      foods.forEach(food => {
        let foodHtml = `
          <div class="foodContainer">
        <img class="foodImg" src="assets/imgs/logosocial.PNG" alt="food">
        <p class="foodName">${food.name} with ${food.consumedWith}</p>
        <p class="healthy">Healthy: <span>${food.healthy ? "Yes" : "No"}</span></p>
        <p class="Nutrients">Nutrients: <span>${food.nutrients}</span> </p>
        <p class="amount">Cost: <span> GHC ${(food.amount/100).toFixed(2)}</span></p>
        <a href="recipe.html?id=${food.id}">Check out Ingredients and Recipe</a>
      </div>
        `;

        foodsHtml += foodHtml;

        foodSection.innerHTML = foodsHtml;
  
      });

      foodSection.innerHtml = foodsHtml;
    }
    catch(error){
      console.error(error)

      if(error){
        foodSection.innerHTML = "<h2 class='errorMsg'> Something went wrong... try again later </h2>"
      }
    }
}



const searchBtn = document.querySelector(".searchBtn");

searchBtn.onclick = fetchSearch;

async function fetchSearch() {

    try{
       const wantedFood = document.querySelector(".searchInput").value.toLowerCase();
       console.log(wantedFood);

        if(wantedFood){
            const response = await fetch('./assets/foods.json');
            const data = await response.json();

            const foods = data.foods;

            const matches =foods.filter(f => (f.name).toLowerCase()  == wantedFood || (f.consumedWith).toLowerCase()  == wantedFood || (f.consumedWith).toLowerCase().includes(wantedFood));

            console.log(matches);

            if(matches.length > 0){
              foodSection.innerHTML = "";
              matches.forEach(match => {
              let matchHtml = `
              <div class="foodContainer">
                <img class="foodImg" src="assets/imgs/logosocial.PNG" alt="food">
                  <p class="foodName">${match.name} with ${match.consumedWith}</p>
                  <p class="healthy">Healthy: <span>${match.healthy ? "Yes" : "No"}</span></p>
                  <p class="Nutrients">Nutrients: <span>${match.nutrients}</span> </p>
                  <p class="amount">Cost: <span> GHC ${(match.amount/100).toFixed(2)}</span></p>
                  <a href="${match.name}">Check out Ingredients and Recipe</a>
              </div>
            `;
          
            foodSection.innerHTML += matchHtml;
            })
            }else{
              foodSection.innerHTML = `<h2 class='errorMsg'> Couldn't find ${wantedFood} </h2>`;
            }

            
        }
  }
    catch(error){
       console.error(error);
      foodSection.innerHTML = "<h2 class='errorMsg'> No results </h2>";
    }
};