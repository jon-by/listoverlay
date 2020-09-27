window.onload = () => {
    const storagePrefix = 'LO_'
    const tabComunication = new BroadcastChannel('LO_tabComunication')
    var menuItems = document.querySelectorAll('.menu-item')
    var bodySections = document.querySelectorAll('section')

    // add item page
    var addItemFieldName_1 = document.querySelector('#first-field-name')
    var addItemFieldName_2 = document.querySelector('#second-field-name')
    var addHiglightSwitch = document.querySelector('#add-higlight-switch')
    
    var btn_addListItem = document.querySelector('#show-options-add-item')
    btn_addListItem.onclick = event => {
        event.preventDefault()
        let firstField = document.querySelector('#add-item-field-1').value
        let secondField = document.querySelector('#add-item-field-2').value
        document.querySelector('#higlight-switch:checked') ? higlight = true : higlight = false
        if (firstField != '' || secondField != '') {
            addItemToList(firstField, secondField, higlight)
            showSelectedMenu('show-list')
        }
    }

    // list page
    var listHeadFirstField = document.querySelector('#list-head-first-field')
    var listHeadSecondField = document.querySelector('#list-head-second-field')
    var listHeadHiglightField = document.querySelector('#list-head-higlight-field')

    function deleteControl() {
        let ItemDeleteControl = document.querySelectorAll('.control-delete')
        ItemDeleteControl.forEach(item => {
            item.onclick = event => {
                let index = event.currentTarget.getAttribute("value")
                removeItemFromList(index)
            }
        })
    }
    function changeItem() {
        let controls = document.querySelectorAll('.list-controls .control')
        controls.forEach(item => {
            item.onclick = event => {
                let index = event.currentTarget.getAttribute("value")
                let action = event.currentTarget.getAttribute("action")

                changeItemPosition(index, action)
            }
        })

    }

    // options page 
    var optionsLabelField1 = document.querySelector('#options-lb-field-1 span')
    var optionsLabelField2 = document.querySelector('#options-lb-field-2 span')
    var optionsLabelHiglight = document.querySelector('#options-lb-higlight span')    
    var btn_optionsChangeFields = document.querySelector('#options-change-fields')
    btn_optionsChangeFields.onclick = event => {
        event.preventDefault()
        let newFieldName1 = document.querySelector('#options-change-field-1').value
        let newFieldName2 = document.querySelector('#options-change-field-2').value
        let newFielHiglight = document.querySelector('#options-change-higlight').value

        updateFieldsName(newFieldName1, newFieldName2, newFielHiglight)

    }

    function changeItemPosition(index, action) {
        index = parseInt(index)        
        let list = getDataFromStorage(`${storagePrefix}list`)
        let original = list[index]
        if (action == 'up') {            
            if (typeof(list[index - 1]) !== 'undefined') {
                list[index] = list[ index - 1]
                list[index - 1] = original
            }
        }

        if (action == 'down') {            
            if (typeof(list[index + 1]) !== 'undefined'){
                list[index] = list[index + 1]
                list[index + 1] = original
            }
        }

        saveInStorage(`${storagePrefix}list`, list)
        updatePanelInterface()
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

        // list page
        listHeadFirstField.textContent = firstFieldName
        listHeadSecondField.textContent = secondFieldName
        //listHeadHiglightField.textContent = higlight

        showListItems()
    }

    function showListItems() {
        let list = getDataFromStorage(`${storagePrefix}list`)
        let listBody = document.querySelector('#list-body')
        let tableBodyHTML = ``
        list.forEach((listItem, index) => {
            tableBodyHTML += `
                <tr ${listItem.higlight ? `class="table-warning"` : ''}>
                    <th scope="row">
                        <div class="list-controls">
                            <div class="control" action="up" value="${index}"><i class="fas fa-sort-up"></i></div>
                            <div class="control" action="down" value="${index}"><i class="fas fa-sort-down"></i></div>
                        </div>
                    </th>                     
                    <td>${listItem.firstField}</td>
                    <td>${listItem.secondField}</td>
                    <td class="control-delete" value="${index}"><i class="fas fa-times"></i></td>
                </tr>
            `
        })
        listBody.innerHTML = tableBodyHTML        
        deleteControl()
        changeItem()
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
        showListItems()
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
    
    updatePanelInterface()
}


