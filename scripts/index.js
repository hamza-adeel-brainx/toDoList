const task = document.getElementById("add-task");
const list = document.getElementById("list");
const clearItemsbtn = document.querySelector(".clear-btn");
const alertText=document.querySelector(".alert");

let editFlag = false;
let editElement;

task.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        if(validateInput(task.value))
        {
            addItemToList(task.value);
        }       
        task.value = "";
       
    }

});

function validateInput(value) {
    let inputpattern="^\\s+$";;
    if(value.match(inputpattern))
    {
        displayAlert("Invalid input","text-danger");
        return false;
    }
    else if(value==""){
        displayAlert("No Input","text-danger");
        return false;
    }
    else{
        return true;
    }
}

function addItemToList(value) {

    if (value != "" && editFlag) {
        editFlag = false;
        editElement.textContent = value;
        displayAlert("sucessfully edited","text-success");
    } else {
        const listitem = document.createElement("li");
        listitem.innerHTML = ` <input type="checkbox">
            <span>${value}</span>
            <i class="fa fa-trash del"></i>
            <i class="fa fa-edit edit"></i> <hr>`
        list.appendChild(listitem);
        const delbtn = listitem.querySelector(".del");
        const editbtn = listitem.querySelector(".edit");
        const checkbox = listitem.querySelector("input");
        delbtn.addEventListener("click", deleteitem);
        editbtn.addEventListener("click", edititem);
        checkbox.addEventListener("click", changeStyle);
        clearItemsbtn.classList.add("clear-btn-diplay");
        displayAlert("Item Added", "text-success");
        
    }
    

}

function changeStyle(e) {

    e.target.parentElement.childNodes[3].classList.toggle("line-througth");

}
clearItemsbtn.addEventListener("click", clearItems)

function clearItems() {
    list.innerHTML = "";
    clearItemsbtn.classList.remove("clear-btn-diplay")

}

function deleteitem(e) {
    list.removeChild(e.target.parentElement)
    displayAlert("Item removed", "text-danger");
    if (list.childNodes.length <= 1) {
      
        clearItemsbtn.classList.remove("clear-btn-diplay")
    }
};

function edititem(e) {
    editFlag = true;
    editElement = e.target.parentElement.childNodes[3];

  
    task.value = e.target.parentElement.childNodes[3].textContent;
};

function displayAlert(text,type) {
   
    alertText.textContent=text;
    alertText.classList.add("alert-display")
    alertText.classList.add(type);

    setTimeout(function () {
        alertText.textContent = "";
        alertText.classList.remove("alert-display");
        alertText.classList.remove(type);
      }, 1000);
    
}