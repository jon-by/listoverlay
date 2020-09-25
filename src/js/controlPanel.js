window.onload = () =>{

if( !getDataFromStorage( 'LO_list' ) ){
    let list = [{"Exemple item1": "Exemple item2" }]
    saveInStorage('LO_list', list)
}
 




function addItemToList( item ){

    let list = getDataFromStorage( "LO_list" )

    list.push(item)

    saveInStorage('LO_list', list)    

}


function removeItemFromList( index ){

    let list = getDataFromStorage( "LO_list" )
    
    list.splice(index, 1)
   
    saveInStorage("LO_list", list)
    

}



//menu
const menuItems = document.querySelectorAll('.menu-item')
const bodySections = document.querySelectorAll('section')

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




/**
 * Storage
 */
function saveInStorage(name, data) {
    try {
        localStorage.setItem(name, JSON.stringify(data))

        if( localStorage.getItem(name) ){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

function getDataFromStorage(name){

    try {

        if( localStorage.getItem(name) ){

            let data = JSON.parse(localStorage.getItem(name))

            return data

        }else{

            return false
        }
        
    } catch (error) {

        console.log(error)
    }
}

    
}


