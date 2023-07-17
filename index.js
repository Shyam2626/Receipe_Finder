const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

// Event listener for search button click
searchButton.addEventListener('click', searchRecipes);

// Function to search recipes
async function searchRecipes() {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Get the search value
  const searchValue = searchInput.value.trim();

  // Perform API request
  const response = await fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=44594daf&app_key=5c696096e0bce6562415f460bc73c384&from=0&to=10`
  );
  const data = await response.json();

  // Display recipes
  displayRecipes(data.hits);
}

// Function to display recipes
function displayRecipes(recipes) {
  recipes.forEach(recipe => {
    const recipeName = recipe.recipe.label;
    const recipeImage = recipe.recipe.image;
    const recipeIngredients = recipe.recipe.ingredientLines;

    // Create HTML elements to display recipe information
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    const imageElement = document.createElement('img');
    imageElement.src = recipeImage;
    recipeElement.appendChild(imageElement);

    const nameElement = document.createElement('h2');
    nameElement.textContent = recipeName;
    recipeElement.appendChild(nameElement);

    const ingredientsElement = document.createElement('ul');
    recipeIngredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsElement.appendChild(li);
    });
    recipeElement.appendChild(ingredientsElement);

    // Add recipe element to the results container
    resultsContainer.appendChild(recipeElement);
  });
}