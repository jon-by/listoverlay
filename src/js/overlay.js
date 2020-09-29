window.onload = () => {
    const storagePrefix = 'LO_'
    const tabComunication = new BroadcastChannel(`${storagePrefix}tabComunication`)

    var mainContainer = document.querySelector('#main-container')
    var listTitle = document.querySelector('#list-title')
    var listFirstField = document.querySelector('#list-head-first-field')
    var listSecondField = document.querySelector('#list-head-second-field')
    var tableBody = document.querySelector('#list-body')
    var tableContainer = document.querySelector('#table-container')

    

    function drawOverlayList() {    

        let list = getDataFromStorage(`${storagePrefix}list`)
        let {firstFieldName, secondFieldName, title } = getDataFromStorage(`${storagePrefix}fields`) 
        let tableBodyHTML = ``       

        listTitle.textContent = title
        listFirstField.textContent = firstFieldName
        listSecondField.textContent = secondFieldName 
        
        
        list.forEach( (listItem, index ) => {
            tableBodyHTML += `
                <tr ${listItem.higlight ? `class="higlight"` : ''}>
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

        let options = getDataFromStorage( `${storagePrefix}overlayOptions` )

        let { overlayWidth, overlayHeight,overlayBGcolor } = options.container
        let {titleBgcolor, titleFontSize, titleFontColor, titlePadding} = options.title       

        // container
        mainContainer.style.minWidth = `${overlayWidth}px`
        mainContainer.style.minHeight = `${overlayHeight}px`
        mainContainer.style.backgroundColor = overlayBGcolor

        // table container
        tableContainer.style.width = '400px'
        tableContainer.style.height = '400px'
        tableContainer.style.backgroundColor = 'red'
        //tableContainer.style.maxWidth = '100px'

        // title
        listTitle.style.backgroundColor =  titleBgcolor
        listTitle.style.fontSize =  `${titleFontSize}pt`
        listTitle.style.color =  titleFontColor
        listTitle.style.padding =  `${titlePadding}px`       
    }


   

    //localStorage.clear()
    drawOverlayList()



    tabComunication.onmessage = function(e) {
        console.log('Received', e.data);
      };
   
}