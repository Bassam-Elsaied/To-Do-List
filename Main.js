let input = document.querySelector(".input");
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.Tasks');

let arrayOfTasks = [];

if(localStorage.getItem("Tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}

getData();

submit.onclick = function (){
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value ="";
    };
};

taskDiv.addEventListener("click", (e)=>{
    if (e.target.classList.contains("del")){
        deletTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("Task")){
        doneToggle(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(value) {
    const task = {
        id: Date.now(),
        title: value,
        completed : false
    };
    arrayOfTasks.push(task);
    addElmentToPage(arrayOfTasks);
    addToStorge(arrayOfTasks);
};

function addElmentToPage (Array){
    taskDiv.innerHTML= '';
    Array.forEach((task) => {
        let div = document.createElement("div");
        div.className="Task";
        if(task.completed === true){
            div.className ="Task done"
        }
        div.setAttribute("data-id" , task.id)
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delet"));
        div.appendChild(span);
        taskDiv.appendChild(div);
    });
}

function addToStorge(arrayOfTasks){
    window.localStorage.setItem("Tasks" , JSON.stringify(arrayOfTasks));
}

function getData(){
    let data = window.localStorage.getItem("Tasks");
    if(data){
        let Tasks = JSON.parse(data);
        addElmentToPage(Tasks);
    }
}

function deletTask(id){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != id)
    addToStorge(arrayOfTasks);
}

function doneToggle(id){
    for(let i =0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == id ){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addToStorge(arrayOfTasks);
}
