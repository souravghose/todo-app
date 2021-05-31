
// li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");



//define ui element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filterTask = document.querySelector('#task_filter');
let taskList = document.querySelector('ul');
let clearTaskBtn = document.querySelector('#clear_task');

//add event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearTaskBtn.addEventListener('click', clearTask);
filterTask.addEventListener('keyup', taskFilter);
document.addEventListener('DOMContentLoaded', getTask)

//define function
function addTask(e){
    if(taskInput.value == ''){
        alert("Add a Task");
    } else{
        let li = document.createElement('li');
        // li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        taskList.appendChild(li);
        let link = document.createElement('button');
        link.setAttribute('class', 'btn btn-danger');
        link.setAttribute('href', '#');
        link.innerHTML = "DELETE";
        li.appendChild(link);

        // local store
        storeTaskInLocalStorage(taskInput.value);
    
        taskInput.value = '';
        }
    e.preventDefault();
}


// remove task

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure?")){
        let ele = e.target.parentElement;
        ele.remove();
        // console.log(ele);

        removeFromLS(ele); //removing from local storage
        
        }
       
    }
}

//clear task list

function clearTask(){
    // taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }
    localStorage.clear();
}

//filter task 
function taskFilter(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => { //arrow function
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
            
            console.log(task);
        } else{
            task.style.display = 'none';
        }
    })
    // console.log(text);
}


// store in local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));    
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get tasks from local storage
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));    
    }

    tasks.forEach(task =>{
        let li = document.createElement('li');
        // li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        li.appendChild(document.createTextNode(task + ' '));
        taskList.appendChild(li)
        let link = document.createElement('button');
        link.setAttribute('class', 'btn btn-danger');
        link.setAttribute('href', '#');
        link.innerHTML = "DELETE";
        li.appendChild(link);
    })
}

//remove task from local storage
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));    
    }

    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//add date month year

let dateMonthYear = new Date();
let date = dateMonthYear.getDate();
let year = dateMonthYear.getFullYear();
var n = dateMonthYear.getUTCDay();
//get date
 var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

   let months = month[dateMonthYear.getMonth()];


if(n==0){
   document.getElementById('date').innerHTML = "Sunday " + date + "/" + months + "/" + year;
} else if(n==1){
   document.getElementById('date').innerHTML = "Monday " + date + "/" + months + "/" + year;
} else if(n==2){
   document.getElementById('date').innerHTML = "Tuesday " + date + "/" + months + "/" + year;
} else if(n==3){
   document.getElementById('date').innerHTML = "Wednesday " + date + "/" + months + "/" + year;
} else if(n==4){
   document.getElementById('date').innerHTML = "Thursday " + date + "/" + months + "/" + year;
} else if(n==5){
   document.getElementById('date').innerHTML = "Friday " + date + "/" + months + "/" + year;
} else if(n==6){
   document.getElementById('date').innerHTML = "Saturday " + date + "/" + months + "/" + year;
} else{
   document.getElementById('date').innerHTML = date + "/" + months + "/" + year;

}
