const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const mealContainer = document.getElementById('meal');

searchBtn.addEventListener('click', () => {
    const searchText = searchInput.value.trim();
    if (searchText) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(response => response.json())
            .then(data => {
                mealContainer.innerHTML = '';
                if (data.meals) {
                    data.meals.forEach(meal => {
                        const mealCard = document.createElement('div');
                        mealCard.classList.add('meal-card');
                        mealCard.innerHTML = `
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <div class="meal-name">${meal.strMeal}</div>
                            </div>
                        `;
                        mealContainer.appendChild(mealCard);
                    });
                } else {
                    mealContainer.innerHTML = '<p>No meal found. Please try another search.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                mealContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            });
    } else {
        alert('Please enter a meal to search.');
    }
});
