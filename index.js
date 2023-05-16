const task = document.getElementById("add-task");
const list = document.getElementById("list");
const clearItemsbtn = document.querySelector(".clear-btn");

var editFlag = false;
var editElement;

task.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        addItemToList(task.value);
        task.value = "";
        if (list.childNodes.length >= 0) {

            clearItemsbtn.classList.add("clear-btn-diplay")
        }
    }

});


function addItemToList(value) {

    if (value == "") {
        alert("No task to add");
    } else if (value != "" && editFlag) {
        editFlag = false;
        console.log(editElement);
        editElement.textContent = value;
    } else {
        var listitem = document.createElement("li");
        listitem.innerHTML = ` <input type="checkbox">
            <span>${value}</span>
            <i class="fa fa-trash del"></i>
            <i class="fa fa-edit edit"></i> <hr>`
        list.appendChild(listitem);
        var delbtn = listitem.querySelector(".del");
        var editbtn = listitem.querySelector(".edit");
        var checkbox = listitem.querySelector("input");
        delbtn.addEventListener("click", deleteitem);
        editbtn.addEventListener("click", edititem);
        checkbox.addEventListener("click", changeStyle);

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
    if (list.childNodes.length <= 1) {
        console.log(list.childNodes.length)
        clearItemsbtn.classList.remove("clear-btn-diplay")
    }
};

function edititem(e) {
    editFlag = true;
    editElement = e.target.parentElement.childNodes[3];

    console.log(e.target.parentElement.childNodes[3].textContent)
    task.value = e.target.parentElement.childNodes[3].textContent;
};