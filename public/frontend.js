function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">${item.text}</span>
                <div>
                    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>`
}

// Initial Page Load Rendering
let itemHTML = items.map((item) => {
    return itemTemplate(item)
}).join('')
document.getElementById("item-list").insertAdjacentHTML("beforeend", itemHTML)

// Create Feature
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('/create-item', {text: createField.value}).then((response) => {
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(() => {
        console.log("Please try again later")
    })
})

document.addEventListener("click", (e, err) => {
    // Update Feature
    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (userInput) {
            axios.post('/update-item', {id: e.target.getAttribute("data-id"), text: userInput}).then(() => {
                console.log('updated!')
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(() => {
                console.log("Please try again later")
            })
        }
    }

    // Delete Feature
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Do you really want to delete this item ?")) {
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(() => {
                e.target.parentElement.parentElement.remove()
            }).catch(() => {
                console.log("Please try again later")
            })
        }
    }
})