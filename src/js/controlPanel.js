window.onload = () => {
    const storagePrefix = 'LO_'
    const tabComunication = new BroadcastChannel('LO_tabComunication')
    const menuItems = document.querySelectorAll('.menu-item')
    const bodySections = document.querySelectorAll('section')


    // add item page
    var addItemFieldName_1 = document.querySelector('#first-field-name')
    var addItemFieldName_2 = document.querySelector('#second-field-name')
    var addHiglightSwitch = document.querySelector('#add-higlight-switch')
    //buttons
    const btn_addListItem = document.querySelector('#show-options-add-item')

    btn_addListItem.onclick = event => {
        event.preventDefault()

        let firstField = document.querySelector('#add-item-field-1').value
        let secondField= document.querySelector('#add-item-field-2').value        
        document.querySelector('#higlight-switch:checked') ? higlight = true : higlight = false
       
        if( firstField != '' || secondField != ''  ){

            addItemToList(firstField, secondField, higlight)

            showSelectedMenu('show-list')
            
        }
    }


    // options page 
    var optionsLabelField1 = document.querySelector('#options-lb-field-1 span')
    var optionsLabelField2 = document.querySelector('#options-lb-field-2 span')
    var optionsLabelHiglight = document.querySelector('#options-lb-higlight span')
    //buttons
    const btn_optionsChangeFields = document.querySelector('#options-change-fields')

    btn_optionsChangeFields.onclick = event => {
        event.preventDefault()
        let newFieldName1 = document.querySelector('#options-change-field-1').value
        let newFieldName2 = document.querySelector('#options-change-field-2').value
        let newFielHiglight = document.querySelector('#options-change-higlight').value

        updateFieldsName(newFieldName1, newFieldName2, newFielHiglight)

    }


    function updatePanelInterface() {

        let { firstFieldName, secondFieldName, higlight } = getDataFromStorage(`${storagePrefix}fields`)

        // add item page
        addItemFieldName_1.textContent = firstFieldName
        addItemFieldName_2.textContent = secondFieldName
        addHiglightSwitch.textContent = higlight


        // options page        
        optionsLabelField1.innerHTML = firstFieldName
        optionsLabelField2.innerHTML = secondFieldName
        optionsLabelHiglight.innerHTML = higlight

    }


    function showListItems() {
        let list = getDataFromStorage(`${storagePrefix}list`)
        let html = `<ul>`
        list.forEach(listItem => {
            html += `<li>${listItem.firstField} | ${listItem.secondField} | ${listItem.higlight}</li>`
        })

        html += `</ul>`

        document.querySelector('section.show-list').innerHTML = html

    }


    function updateFieldsName(firstFieldName, secondFieldName, higlight) {

        let newFieldsName = { firstFieldName, secondFieldName, higlight }

        saveInStorage(`${storagePrefix}fields`, newFieldsName)

        updatePanelInterface()
    }



    function addItemToList(firstField, secondField, higlight) {
        let item = { firstField, secondField, higlight }

        let list = getDataFromStorage(`${storagePrefix}list`)

        list.push(item)

        saveInStorage('LO_list', list)

        showListItems()

    }


    function removeItemFromList(index) {

        let list = getDataFromStorage("LO_list")

        list.splice(index, 1)

        saveInStorage("LO_list", list)

    }


    //menu 
    menuItems.forEach(item => {
        item.addEventListener('click', event => {

            higlightSelected(event)
            showSelectedMenu(event.currentTarget.id)
        })
    })

    function higlightSelected(item) {

        menuItems.forEach(element => {
            element.classList.remove("btn-active")
        })

        item.currentTarget.classList.add("btn-active")
    }


    function showSelectedMenu(menu) {

        
        bodySections.forEach(element => {
            element.classList.add("hide")

            if (element.classList.contains(menu)) {

                element.classList.toggle("hide")
            }
        })

    }


    //Storage
    function saveInStorage(name, data) {
        try {
            localStorage.setItem(name, JSON.stringify(data))

            if (localStorage.getItem(name)) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    function getDataFromStorage(name) {

        try {

            if (localStorage.getItem(name)) {

                let data = JSON.parse(localStorage.getItem(name))

                return data

            } else {

                return false
            }

        } catch (error) {

            console.log(error)
        }
    }




    // localstorage check
    if (!getDataFromStorage(`${storagePrefix}list`)) {
        let list = [{ "firstField": "Jon Doe", "secondField": "Have a nice day", "higlight": false }]
        saveInStorage(`${storagePrefix}list`, list)
    }

    if (!getDataFromStorage(`${storagePrefix}fields`)) {
        let fields = { "firstFieldName": "Requester", "secondFieldName": "Music", "higlight": "Extreme" }
        saveInStorage(`${storagePrefix}fields`, fields)
    }


    

    showListItems()
    updatePanelInterface()
}


