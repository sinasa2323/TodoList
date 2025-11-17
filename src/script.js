const aside = document.querySelector('aside');
const startBox = document.getElementById('startBox');
const startBtn = document.getElementById('startBtn');
const taskBox = document.getElementById('taskBox');
const inputAndBtnDiv = document.getElementById('inputAndBtnDiv');
const mainHeader = document.getElementById('mainHeader');
// const btnAdd = document.getElementById('btnAdd');
const taskInput = document.getElementById('taskInput');
const ul1 = document.querySelector('#ul1');
const ul2 = document.querySelector('#ul2');


//header
// FULLscreen BTN
function toggleFullscreen() {
    // اگر در حال حاضر فول‌اسکرین نیستیم
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {

        const elem = document.documentElement; // کل صفحه (html)

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // برای Safari
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) { // نسخه‌های قدیمی Firefox
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge قدیمی
            elem.msRequestFullscreen();
        }
    } else {
        // اگر الان فول‌اسکرین هستیم، خارج شو
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// FULLscreen BTN

//Theme BTN (dark or light)
function toggleTheme() {
    const html = document.documentElement; // <html>

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
       

        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.classList.remove('mdi-lightbulb-on');
            btn.classList.add('mdi-lightbulb-off-outline');
        }
    } else {
        html.classList.add('dark');
        

        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.classList.remove('mdi-lightbulb-off-outline');
            btn.classList.add('mdi-lightbulb-on');
        }
    }

    updateLogoColor();
}
//Theme BTN (dark or light)

//Theme LOGO
function updateLogoColor() {
    const logo = document.getElementById('Layer_1');
    const html = document.documentElement;
    if (!logo) return;

    if (html.classList.contains('dark')) {
        // دارک مود → رنگ روشن
        logo.setAttribute('fill', '#ccc');
    } else {
        // لایت مود → رنگ زرد
        logo.setAttribute('fill', '#D6885E');
    }
}



//Theme LOGO
//END header

//display menu
    function displayMenu() {
        setTimeout(() => {
            aside.style.display = "block";
           
        }, 300);
        setTimeout(() => {
            
            aside.style.transform = "translateX(0)";
           
        }, 600);
        
    }
//end display menu

// menu off
document.addEventListener('click', function(event) {

   if(aside.style.display == 'block'){
     if (!event.target.closest('aside')) {
        aside.style.transform = "translateX(-100%)";
        
        setTimeout(() => {
            aside.style.display = "none";
        }, 1000);
       
    }
   }
  
});
 
// end menu off

// mouseMoveEvent for startBox perspective event
let wStartBox = startBox.clientWidth/25;
let hStartBox = startBox.clientHeight/25;
startBox.addEventListener('mousemove', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    startBox.style.transform = 'perspective(500px)rotateY('+((x/25)-(wStartBox/2))
    +'deg)rotateX('+((y/25)-(hStartBox/2))+'deg)';
    
    
});
startBox.addEventListener('mouseout',()=>{
    startBox.style.transform = '';

})
 // end mouseMoveEvent for startBox perspective event

 //move the location of the startBox & taskBox
startBtn.addEventListener('click', () => {
    startBox.style.transform = 'translateY(-800px)';
    startBox.style.transitionDuration = '2s';
    
    setTimeout(() => {
        startBox.remove();
        taskBox.style.display = 'flex';
        inputAndBtnDiv.style.display = 'flex';
        mainHeader.style.display = 'flex';
    }, 1000);
    setTimeout(() => {
        taskBox.style.transform = "translateX(0)";
        inputAndBtnDiv.style.transform = "translateX(0)";
        mainHeader.style.transform = "translateY(0)";
    }, 1500);
    
    setTimeout(() => {
        taskInput.focus();
    }, 4000);
});

//create list items
function btnAdd() {
 if(taskInput.value != ''){
    const newTask = document.createElement('li');
    newTask.className = "text-white bg-[#1d1d21ac] hover:bg-slate-900  duration-500 flex justify-between px-7 py-5";
    const inputDiv = document.createElement('div');
    const inputDivChildren =
     `
     <input onclick="checkBoxClick(this)" class="appearance-none border border-slate-300 outline-none rounded-full w-[16px] h-[16px] cursor-pointer checked:bg-slate-200 duration-300 focus:ring-1 ring-slate-100" type="checkbox">
     `;          
    const text = document.createElement('p');
    text.textContent = taskInput.value;
    const editBox = document.createElement('div');
    const editBoxChildren = 
    `
        <span onclick="importantTask(this)" class="mdi mdi-star-outline mx-1 cursor-pointer"></span>
        <span onclick="editTask(this)" class="mdi mdi-pencil mx-1 cursor-pointer"></span>
        <span onclick="deleteTask(this)" class="mdi mdi-delete mx-1 cursor-pointer"></span>
    `; 

    newTask.appendChild(inputDiv);
    inputDiv.innerHTML = inputDivChildren;
    newTask.appendChild(text);
    editBox.innerHTML = editBoxChildren;
    newTask.appendChild(editBox);
    taskBox.querySelector('ul').appendChild(newTask);
    taskInput.value = '';
    taskInput.focus();

    const list = document.querySelectorAll('#taskBox>ul>li');
    list.forEach((val,i)=>{

       val.setAttribute('data-i',i);
        
    })

     setTaskNumber();
    
  }
}


function editTask(s){
    let x = prompt('edit your task name')
    let y =  s.parentElement.previousElementSibling;
    if(x){ y.textContent = x;}
 
}

function deleteTask(s){
   let x = confirm("Are you sure to delete?");
   if(x){ s.parentElement.parentElement.remove();}
   const list = document.querySelectorAll('#taskBox>ul>li');
    list.forEach((val,i)=>{
       val.setAttribute('data-i',i);    
    })
   setTaskNumber();
   setImportantNumber();
    
}

// create task done list
function checkBoxClick(inp){
   
    if(inp.checked){
        inp.parentElement.nextElementSibling.style.textDecoration = 'line-through';
       let li = inp.parentElement.parentElement;
        li.style.opacity = '0.5';
        ul2.appendChild(li);
        inp.parentElement.nextElementSibling.nextElementSibling.children[0].classList.add('hidden');
        setTaskNumber();
        setImportantNumber();
        
    }else{
        inp.parentElement.nextElementSibling.style.textDecoration = 'none';
        inp.parentElement.nextElementSibling.nextElementSibling.children[0].classList.remove('hidden');
        inp.parentElement.nextElementSibling.nextElementSibling.children[0].classList.replace('mdi-star', 'mdi-star-outline');
        let li = inp.parentElement.parentElement;
        li.style.opacity = '1';
       
        let item = li.getAttribute('data-i');
        console.log(item);
        
        let ul1 = document.querySelector('#ul1');
        ul1.insertBefore(li, ul1.children[item]);
        setTaskNumber();
        setImportantNumber();
        
    
    }

}
// end create task done list

// showTaskScreen & showImportantScreen
const tasksHomeSection = document.querySelector('#tasksHomeSection');
const impotantSection = document.querySelector('#impotantSection');
function showTaskScreen(s){
    console.log('task screen');
    tasksHomeSection.classList.remove('hidden')
    impotantSection.classList.add('hidden')

    
}

function showImportantScreen(s){
    console.log('important screen');
    tasksHomeSection.classList.add('hidden')
    impotantSection.classList.remove('hidden')

   
    
}
 //end showTaskScreen & showImportantScreen

    // adding task to important section
    function importantTask(s){
       
        if(s.classList.contains('mdi-star-outline')){
            s.classList.replace('mdi-star-outline','mdi-star')
            let li = s.parentElement.parentElement; // گرفتن عنصر li
            let ul = document.querySelector('#importantList'); // پیدا کردن لیست وظایف مهم
            ul.appendChild(li); 
            setTaskNumber();
            setImportantNumber();
        }else{
            s.classList.replace('mdi-star','mdi-star-outline')
            //moving li from importantList to ul1
            
            let li = s.parentElement.parentElement;
            let item = li.getAttribute('data-i');
            console.log(item);
    
            let ul1 = document.querySelector('#ul1');
            ul1.insertBefore(li, ul1.children[item]);
            setTaskNumber();
            setImportantNumber()

        }
    }

   function setTaskNumber(){
   
    console.log(ul1.children.length);
    document.querySelector('#taskNumber').innerHTML = ul1.children.length;
    
   }

   function setImportantNumber(){
   let x= document.querySelector('#importantList').children.length;
    document.querySelector('#importantNumber').innerHTML = x;
   }
