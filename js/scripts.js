// define global variables
const gallery = document.getElementById('gallery')
const body = document.querySelector('body')
const url = 'https://randomuser.me/api/?results=12&nat=us'

// fetch data from using url query for 12 random people
fetch(url)
    // parse the JSON data
    .then(response => response.json())
    // run function to create html using response
    .then(data => createCards(data))
    // catch that will log data to the console
    .catch(error => console.log('Problem found', error))

/**
 * Iterate over Objects of people to create HTML cards,
 * add click event listeners that will generate a modal window,
 * and display the cards in the document.
 * 
 * @param {Object} data JSON formatted Object from randomuser API
 */
function createCards(data) {
    let people = data.results
    for (let i = 0; i < people.length; i++) {
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = createCardHTML(people[i])
        card.addEventListener('click', () => {
            createModalWindow(people[i])
        })
        gallery.appendChild(card)
    }
}

/**
 * Create HTML elements for modal windows, call the function to
 * generate the inner HTML for the window, add the window to the
 * document, and add an event listener to the window exit button
 * that will delete the window from the document when clicked.
 * 
 * @param {Object} data JSON formatted Object from randomuser API
 */
function createModalWindow(data) {
    const modalCard = document.createElement('div')
    modalCard.className = 'modal-container'
    const html = createModalHTML(data)
    modalCard.innerHTML = html
    body.append(modalCard)
    const exit = document.getElementById('modal-close-btn')
    document.addEventListener('click', (e) => {
        if (e.target === exit || e.target === exit.firstChild) {
            document.body.removeChild(modalCard)
        }
    })
}

/**
 * Create the inner HTML for an employee card.
 * 
 * @param {Object} data Person Object from randomuser API
 */
function createCardHTML(data) {
    return `
        <div class="card-img-container">
            <img class="card-img" src=${data.picture.medium} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}</p>
        </div>`
}

/**
 * Create the inner HTML for the modal window.
 * 
 * @param {Object} data Person Object from randomuser API
 */
function createModalHTML(data) {
    const year = data.dob.date.substr(0,4)
    const month = data.dob.date.substr(5,2)
    const day = data.dob.date.substr(8,2)
    return `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${data.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell}</p>
            <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
        </div>
    </div>`
}