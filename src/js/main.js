
function fetchRecipe(authToken, ingredients) {
    const fetchObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            "prompt": `Write a recipe based on these ingredients and instructions:\n\nIngredients:${ingredients}\n\nDirections:`,
            "temperature": 0,
            "max_tokens": 140,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          })
    }

    fetch('https://api.openai.com/v1/engines/davinci-instruct-beta-v3/completions', fetchObj)
    .then((data) => {
        return data.json();
    })
    .then((res) => {
        showRecipe(res.choices[0].text)
    });
}

function showRecipe(recipe) {
    const directionsNode = document.getElementById("directions")
    directionsNode.innerText = recipe
}

function getRecipeHandler() {
    const authToken = document.getElementById("secret-input").value

    const ingredientsNode = document.getElementById("ingredients-textbox")

    if (!authToken) {
        window.alert("You Need The GPT-3 Secret! 🤖🤖🤖")
        return
    }
    fetchRecipe(authToken, ingredientsNode.value)
}

document.getElementById("get-recipe").addEventListener("click", getRecipeHandler)
