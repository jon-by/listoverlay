window.onload = () => {
        const  overlayOptions = {
            "screen":{
                "screenWidth": 1920,
                "screenHeight": 1080,
                "screenBgcolor": "rgba(0,0,0,0)",
            },
            "list":{
                "listWidht": 1920,
                "listHeight": 1080,
                "listBgColor": "rgba(0,0,0,0)",
                "listColumnPosition": "center",
                "listLinePosition": "top"
            },
            "listTitle":{
                "showTitle": true,
                "titleText": "Musics",
                "titleFontSize": 20,
                "titleFontColor": "rgba(163,227,255,1)",
                "titleBgColor": "rgba(0,0,0,0)"
            },
            "listItems":{
                "itemsDefaultColor":"rgba(0,0,0,1)",
                "itemsFontSize": 18
            },
            "higlight":{
                "higlightFontSize": 20,
                "higlightFontColor": "rgba(255,23,229,1)",
                "higlightBgColor": "rgba(227,255,0,1)",
            }
        }
    
        const storagePrefix = 'LO_'
        const tabComunication = new BroadcastChannel(`${storagePrefix}tabComunication`)
        const elementColorPicker = document.querySelectorAll('.pickr')
        

        const menuItems = document.querySelectorAll('.menu-item')
        var bodySections = document.querySelectorAll('section')
        var allInputs = document.querySelectorAll('.check-change')

        // add item page
        var addItemFieldName_1 = document.querySelector('#first-field-name')
        var addItemFieldName_2 = document.querySelector('#second-field-name')
        var addHiglightSwitch = document.querySelector('#add-higlight-switch')
        var btn_addListItem = document.querySelector('#show-options-add-item')       

        // list page
        var listHeadFirstField = document.querySelector('#list-head-first-field')
        var listHeadSecondField = document.querySelector('#list-head-second-field')
        var listHeadHiglightField = document.querySelector('#list-head-higlight-field')
        var listTitle = document.querySelector('#list-title')


        // options page        
        // screen
        var screenWidth = () => document.querySelector('#options-change-screen-width')
        var screenHeight = () => document.querySelector('#options-change-screen-height')
        var screenBgColor = () => document.querySelector('#options-change-screen-bg-color')

        // list        
        var listWidht = () => document.querySelector('#options-change-list-width')
        var listHeight = () => document.querySelector('#options-change-list-height')
        var listBgColor = () => document.querySelector('#options-change-list-bg-color')
        var listVerticalPosition = () => document.querySelector('#options-list-vertical-position')
        var listHorizontalPosition = () => document.querySelector('#options-list-horizontal-position')

        // list title 
        var activeTitle = () => document.querySelector('#options-list-title-active')
        var titleText = () => document.querySelector('#options-change-list-title-text')
        var titleFontSize = () => document.querySelector('#options-change-list-title-font-size')
        var titleFontColor = () => document.querySelector('#options-change-list-title-font-color')
        var titleBgColor = () => document.querySelector('#options-change-list-title-bg-color')

        // list items
        var itemDefaultColor = () => document.querySelector('#options-change-list-item-color')
        var itemFontSize = () => document.querySelector('#options-list-item-font-size')

        // higlight
        var higlightFontSize = () => document.querySelector('#options-higlight-font-size')
        var higlightFontColor = () => document.querySelector('#options-higlight-font-color')
        var higlightBgColor = () => document.querySelector('#options-higlight-bg-color')

        // fields
        var optionsLabelField1 = () => document.querySelector('#options-lb-field-1 span')
        var optionsLabelField2 = () => document.querySelector('#options-lb-field-2 span')
        var optionsLabelHiglight = () => document.querySelector('#options-lb-higlight span')
        var newFieldName1 = () => document.querySelector('#options-change-field-1')
        var newFieldName2 = () => document.querySelector('#options-change-field-2')
        var newFielHiglight = () => document.querySelector('#options-change-higlight')
        var btn_optionsChange = document.querySelector('#options-change-fields')

        function updatePanelInterface() {
            let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
            let { firstFieldName, secondFieldName, higlight } = getDataFromStorage(`${storagePrefix}fields`)
            console.log(options)
            // add item page
            addItemFieldName_1.textContent = firstFieldName
            addItemFieldName_2.textContent = secondFieldName
            addHiglightSwitch.textContent = higlight

            // options page //            
            screenWidth().value = options.screen.screenWidth
            screenHeight().value = options.screen.screenHeight
            screenBgColor().value = options.screen.screenBgcolor

            listWidht().value = options.list.listWidht 
            listHeight().value = options.list.listHeight
            listBgColor().value = options.list.listBgColor 
            listVerticalPosition().value = options.list.listColumnPosition 
            listHorizontalPosition().value = options.list.listLinePosition 
                                        
            activeTitle().checked = options.listTitle.showTitle 
            titleText().value = options.listTitle.titleText 
            titleFontSize().value = options.listTitle.titleFontSize 
            titleFontColor().value = options.listTitle.titleFontColor 
            titleBgColor().value = options.listTitle.titleBgColor

            itemDefaultColor().value = options.listItems.itemsDefaultColor
            itemFontSize().value = options.listItems.itemsFontSize 
            
            higlightFontSize().value = options.higlight.higlightFontSize 
            higlightFontColor().value = options.higlight.higlightFontColor
            higlightBgColor().value = options.higlight.higlightBgColor


            optionsLabelField1().innerHTML = firstFieldName
            optionsLabelField2().innerHTML = secondFieldName
            optionsLabelHiglight().innerHTML = higlight


            // list page
            listHeadFirstField.textContent = firstFieldName
            listHeadSecondField.textContent = secondFieldName
            listTitle.textContent = options.listTitle.titleText
                //listHeadHiglightField.textContent = higlight

            
            
            showListItems()
            
        }


        btn_optionsChange.onclick = event => {
            event.preventDefault()

            saveChangedOptions()            
        }



        function saveChangedOptions(){
            let options = overlayOptions
            
            

            options.screen.screenWidth = screenWidth().value
            options.screen.screenHeight = screenHeight().value
            options.screen.screenBgcolor = screenBgColor().value             

            options.list.listWidht = listWidht().value
            options.list.listHeight = listHeight().value
            options.list.listBgColor = listBgColor().value
            options.list.listColumnPosition = listVerticalPosition().value
            options.list.listLinePosition = listHorizontalPosition().value 

            options.listTitle.showTitle = activeTitle().checked
            options.listTitle.titleText = titleText().value
            options.listTitle.titleFontSize = titleFontSize().value
            options.listTitle.titleFontColor = titleFontColor().value
            options.listTitle.titleBgColor = titleBgColor().value

            options.listItems.itemsDefaultColor = itemDefaultColor().value
            options.listItems.itemsFontSize = itemFontSize().value 

            options.higlight.higlightFontSize = higlightFontSize().value
            options.higlight.higlightFontColor = higlightFontColor().value
            options.higlight.higlightBgColor = higlightBgColor().value           
            

            saveInStorage(`${storagePrefix}overlayOptions`, options)

           
            updateFieldsName(
                newFieldName1().value, 
                newFieldName2().value, 
                newFielHiglight().value
            )

            updatePanelInterface()

            tabComunication.postMessage({
                "type": "updateoverlay"
            })
            
        }

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
        if( firstFieldName == '' || secondFieldName == '' || higlight  == ''){
            return false
        }

        let newFieldsName = { firstFieldName, secondFieldName, higlight }
        saveInStorage(`${storagePrefix}fields`, newFieldsName)
        updatePanelInterface()
        tabComunication.postMessage({"fieldsName": true})
    }


    function changeItemPosition(index, action) {
        index = parseInt(index)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let original = list[index]
        if (action == 'up') {
            if (typeof(list[index - 1]) !== 'undefined') {
                list[index] = list[index - 1]
                list[index - 1] = original
            }
        }

        if (action == 'down') {
            if (typeof(list[index + 1]) !== 'undefined') {
                list[index] = list[index + 1]
                list[index + 1] = original
            }
        }

        saveInStorage(`${storagePrefix}list`, list)
        updatePanelInterface()
        
        tabComunication.postMessage({
            "type": "updateoverlay"
        })
    }

    function addItemToList(firstField, secondField, higlight) {
        let item = { firstField, secondField, higlight }
        let list = getDataFromStorage(`${storagePrefix}list`)
        list.push(item)
        saveInStorage(`${storagePrefix}list`, list)
        showListItems()
        tabComunication.postMessage({
            "type": "updateoverlay"
        })
    }

    function removeItemFromList(index) {
        let list = getDataFromStorage("LO_list")
        list.splice(index, 1)
        saveInStorage(`${storagePrefix}list`, list)
        showListItems()
        tabComunication.postMessage({
            "type": "updateoverlay"
        })
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

    allInputs.forEach( element =>{
        element.onchange = () =>{
            saveChangedOptions()
        }
    })

    

    // color picker
    function loadColorPicker(){
        elementColorPicker.forEach( element =>{
            const pickr = new Pickr({
                el: element,
                useAsButton: true,
                default: element.value,
                theme: 'nano',     
                components: {
                    preview: true,
                    opacity: true,
                    hue: true,
        
                    interaction: {
                    hex: false,
                    rgba: true,
                    hsva: false,
                    input: true,
                    save: true
                    }
                }
                }).on('init', pickr => {       
                    let currentColor = element.value
                    element.value = pickr.getSelectedColor().toRGBA().toString(0)
                    element.style.backgroundColor =  currentColor                
                }).on('save', color => {
                    let pickedColor = pickr.getSelectedColor().toRGBA().toString(0)
                    element.value = pickedColor
                    element.style.backgroundColor = pickedColor
                    pickr.hide();
                    

                }).on('hide', color => {
                    let pickedColor = pickr.getColor().toRGBA().toString(0)
                    element.value = pickedColor
                    element.style.backgroundColor = pickedColor
                    saveChangedOptions()      
                })    
                
            })
    }


    // localstorage check
    if (!getDataFromStorage(`${storagePrefix}list`)) {
        let list = [{ "firstField": "Jon Doe", "secondField": "Have a nice day", "higlight": false }]
        saveInStorage(`${storagePrefix}list`, list)
    }

    if (!getDataFromStorage(`${storagePrefix}fields`)) {
        let fields = { "firstFieldName": "Requester", "secondFieldName": "Music", "higlight": "Extreme"}
        saveInStorage(`${storagePrefix}fields`, fields)
    }       

    if (!getDataFromStorage(`${storagePrefix}overlayOptions`)) {        
        saveInStorage(`${storagePrefix}overlayOptions`, overlayOptions)
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

    

   

   
    updatePanelInterface()
    loadColorPicker()
   // localStorage.clear()
}