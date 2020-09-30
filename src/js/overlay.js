window.onload = () => {
    const storagePrefix = 'LO_'
    const tabComunication = new BroadcastChannel(`${storagePrefix}tabComunication`)

    var mainContainer = document.querySelector('#main-container')
    var listTitle = document.querySelector('#list-title')
    var listFirstField = document.querySelector('#list-head-first-field')
    var listSecondField = document.querySelector('#list-head-second-field')
    var tableBody = document.querySelector('#list-body')
    var tableContainer = document.querySelector('#table-container')
    var higlights = () => document.querySelectorAll('.higlight')
    var listItens = () => document.querySelectorAll('.list-item')

    

    function drawOverlayList() {    
        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
        let list = getDataFromStorage(`${storagePrefix}list`)
        let { firstFieldName, secondFieldName } = getDataFromStorage(`${storagePrefix}fields`) 
        let tableBodyHTML = ``       

        listTitle.textContent = options.listTitle.titleText
        listFirstField.textContent = firstFieldName
        listSecondField.textContent = secondFieldName 
        
        
        list.forEach( (listItem, index ) => {
            tableBodyHTML += `
                <tr class="list-item ${listItem.higlight ? 'higlight' : ''}">
                    <th scope="row">${parseInt(index) +1}</th>                     
                    <td>${listItem.firstField}</td>
                    <td>${listItem.secondField}</td>                    
                </tr>            
            `
        })
        
        tableBody.innerHTML = tableBodyHTML

        applyStyle()
    }



    function applyStyle(){      

        let options = getDataFromStorage(`${storagePrefix}overlayOptions`)
               
 
        // container
        mainContainer.style.maxWidth = `${options.screen.screenWidth}px`
        mainContainer.style.maxHeight = `${options.screen.screenHeight}px`
        mainContainer.style.minWidth = `${options.screen.screenWidth}px`
        mainContainer.style.minHeight = `${options.screen.screenHeight}px`
        mainContainer.style.backgroundColor = options.screen.screenBgcolor

        // table container
        tableContainer.style.width = `${options.list.listWidht}px`
        tableContainer.style.height = `${options.list.listHeight}px`
        tableContainer.style.backgroundColor = options.list.listBgColor
        //use main but set table container
        mainContainer.style.justifyContent = options.list.listColumnPosition
        mainContainer.style.alignItems = options.list.listLinePosition


        listItens().forEach(element =>{
            element.style.color = options.listItems.itemsDefaultColor
        })       
       tableBody.style.fontSize = `${options.listItems.itemsFontSize}pt`


       higlights().forEach(element =>{
        element.style.fontSize = `${options.higlight.higlightFontSize}pt` 
        element.style.color = options.higlight.higlightFontColor
        element.style.backgroundColor  = options.higlight.higlightBgColor
    })


       
    
        
       // console.log()
       

        // title
        options.listTitle.showTitle? listTitle.style.display = 'block':  listTitle.style.display = 'none'
        listTitle.style.backgroundColor =  options.listTitle.titleBgColor
        listTitle.style.fontSize =  `${options.listTitle.titleFontSize }pt`
        listTitle.style.color =  options.listTitle.titleFontColor
       // listTitle.style.padding =  `${titlePadding}px`       
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

    tabComunication.onmessage = function(e) {
       let type = e.data.type
       drawOverlayList()
        console.log(type)
    };
   

    //localStorage.clear()
    drawOverlayList()   
}