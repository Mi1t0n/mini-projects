window.onload = ()=>{
    const addBtn = document.querySelector('.addBtn')
    const searchBtn = document.querySelector('.searchBtn')
    const ingredientsList = document.querySelector('.ingredientsList')
    const page = document.querySelector('.page')

    let ingredients = []


    async function requestApiRecipes (){
        const res = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=6&apiKey=787f588c1d5a4c228c44285e13cadda5`)
        const data = await res.json()
        renderSearch(data)
    }

    async function fullRecipe (id){
        const res = await fetch(` https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=787f588c1d5a4c228c44285e13cadda5`)
        const fullData = await res.json()
        return fullData
    }

    const addHandler = ()=>{
        event.preventDefault()
        
        const nameOfIngredient =  document.querySelector('.ingredientInput')

        if(!nameOfIngredient.value) return

        ingredients.push(`+${nameOfIngredient.value}`)
        ingredientsList.insertAdjacentHTML('beforeend',`<p>${nameOfIngredient.value}<span class="deleteBtn">&times;</span></p>`)
        nameOfIngredient.value=''
    }

    const searchHandler = () => {
        event.preventDefault()
        requestApiRecipes()
    }

    const openRecipe = () => {
        if(event.target.tagName === 'IMG'){
            const recipe = fullRecipe(event.target.dataset.id)

            recipe.then(result =>{
                result = result[0].steps
                const modalBg = document.querySelector('.modalWin')
                const modalWin= document.querySelector('.window')

                modalWin.insertAdjacentHTML('beforeend',`
                            <div class="window">
                                <h2>Steps</h2>
                                <ol>
                                    ${result.map(el=>{return `<li>${el.step}</li>`}).join('')}
                                </ol>
                            </div>
                `)

                modalBg.classList.add('open')
                
                modalBg.onclick =()=>{
                    if(event.target.className === 'modalWin open'){
                        modalBg.classList.remove('open')
                            setTimeout(() => {
                                modalWin.innerHTML =''
                            }, 550)
                    }
                }
            })
        }
    }

    const deleteHandler = () => {
        if(event.target.getAttribute('class') == 'deleteBtn') {
            delete ingredients[ingredients.indexOf('+'+event.target.parentNode.innerHTML.slice(0, -32))]
            event.target.parentNode.remove()
        }
    }

    const renderSearch = (data) =>{
        page.innerHTML = ''
        data.forEach(el => {
            const IngrLi = el.missedIngredients.map(ing => `<li>${ing.original}</li>`)
            page.insertAdjacentHTML('beforeend',`
                <div class="recipe">
                    <img src="${el.image}" data-id='${el.id}'>
                    <h2>${el.title}</h2>
                    <ul>${IngrLi.join('')}</ul>
                </div>
            `)
        })
    }

    
    addBtn.addEventListener('click',addHandler)
    searchBtn.addEventListener('click',searchHandler)
    page.addEventListener('click',openRecipe)
    ingredientsList.addEventListener('click',deleteHandler)
}
