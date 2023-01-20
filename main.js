// const Api_URL = `https://resource-ghblii-api.onrender.com/films`
const Forms = document.querySelector('form')
const filmTitle = document.querySelector("titles") 
const NReviews = document.querySelector("new-reviews")
const ShowPeople = document.querySelector("#show-people")
const makOl = document.querySelector("ol")
// const makUl = document.querySelector("ul")
const DEt = document.querySelector("#display-info")
const selectEl =document.querySelector("select")
// const Show3 = document.createElement("h3")
// const MakLi = document.createElement("li") //li for people
// const RevLi = document.createElement("li") //li for review
let titleMovie = ""
let allMovies = []
const restButton = document.querySelector("#reset-reviews")


function movieDetail(movie) {
    const addedH3 = document.createElement("h3")
    // addedH3.textContent = movie.title
    const releaseYrP = document.createElement("p")
    const descriptionP = document.createElement("p")

    selectEl.addEventListener("change", () => {
        movie.forEach((movies) => {
            if (selectEl.value === movies.id) {
                addedH3.innerText = movies.title
                titleMovie = movies.title
                releaseYrP.innerText = movies.release_date
                descriptionP.innerText = movies.description
                
            }
        })
        for (const li of document.querySelectorAll(".lis2")) {li.remove(); }
    })
    DEt.append(addedH3, releaseYrP, descriptionP)
    
}


   //review section
    Forms.addEventListener("submit", (event) => {
        event.preventDefault()
       if (titleMovie === "") {alert("Please select a movie")}
       else {
        
        const makUl = document.querySelector("ul")
         const addli = document.createElement("li")  
        addli.setAttribute("class", "deleteLi")
        addli.innerHTML = ` <strong>${titleMovie}: </strong> ${event.target.review.value}`
        makUl.append(addli) 
        Forms.reset()
}
    
    })
//reset review button
     restButton.addEventListener("click", (event) => {
        event.preventDefault()
    const DelleteLi = document.querySelectorAll(".deleteLi")
    for (let i = 0; i < DelleteLi.length; i++) {
        DelleteLi[i].remove()
    }
}) //button for people
    //  ShowPeople.addEventListener("submit", (event) => {
    //     event.preventDefault()
    //     const MakLi = document.createElement("li")
    //  })
    function peoples (celebrities, personas) {
        const ol = document.querySelector("ol")
        celebrities.map((actor) => {
            let bioDetail = personas.find((bio) => bio.id === actor.slice(8))
            if (bioDetail != undefined) {
            const li = document.createElement("li")
            li.setAttribute("class","lis2")
            li.textContent = bioDetail.name
            ol.append(li)
            }
        })

    } 

// ----------------------------------------Fetch------------------------------------------/
ShowPeople.addEventListener("click", (event) => {
    event.preventDefault() 
    for (let lix of document.querySelectorAll(".lis2")) {lix.remove(); }
    fetch("https://resource-ghibli-api.onrender.com/people")
    .then((response) => {
     response.json()
     .then((moviePeople) => {

        peoples(allMovies.find((peli) => peli.title === titleMovie).people, moviePeople)

    
     })
    })


})

fetch("https://resource-ghibli-api.onrender.com/films")
    .then((response)=> {
     response.json()
    .then((movieFilms) => { 
        
        allMovies = movieFilms
        for (let i = 0; i < movieFilms.length; i++) {
            const titlesOp = document.createElement("option")
            titlesOp.setAttribute("value", movieFilms[i].id)
            titlesOp.textContent = movieFilms[i].title
       
             selectEl.append(titlesOp)
        
        }
    

      movieDetail(movieFilms)
   
            // const MakLi = document.createElement("li")

          
                
         })
            })
       
        // ShowPeople.addEventListener("click", (event) => {
        //     event.preventDefault() }
        // })

//  fetch("https://resource-ghibli-api.onrender.com/people")
//     .then((response) => {
//      response.json()
//      .then((moviePeople) => {


//         for (let j =0; j < moviePeople.length; j++) {
//             // const MakLi = document.createElement("li") //li for people
//             // MakLi.setAttribute("value", moviePeople[j].id)
//             // MakLi.textContent = moviePeople[j].name

           
//         }
//      })
//     }
//     )
    
            
          
    



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {}
 // Add code you want to run on page load here
   

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
