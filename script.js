function main(){

    //clear the completed
    {
        function clear_all_completed(){
            var clear_completed = document.querySelector('.delete-completed');

            clear_completed.addEventListener('click',() => {
                var completed_tasks = [...document.querySelectorAll('.task.done')];
                var todos = JSON.parse(localStorage.getItem('todos'));

                completed_tasks.forEach(comp => {
                    var index = completed_tasks.indexOf(comp);
                    comp.classList.add('fall');
                    setTimeout(() => {comp.remove()},100); 
                    todos.splice(index,1);
                });
                
                localStorage.setItem('todos',JSON.stringify(todos));
        })
        }

        clear_all_completed();
    }

    //filter tasks
    {
        function filter_tasks(){
            var select_tasks = document.querySelector('.select-tasks');

            select_tasks.addEventListener('click',(e) => {
                var id = e.target.id;
                if (document.querySelector('.on')){
                document.querySelector('.on').classList.remove('on');
                }
                document.getElementById(id).classList.add('on');
                document.querySelector('.task-box').className = `task-box ${id}`
            })
        }
        filter_tasks();
    }

    //Complete task
    {
        function task_state(index){
            var todo = JSON.parse(localStorage.getItem('todos'));
            todo[index].isCompleted = !todo[index].isCompleted;
            localStorage.setItem('todos',JSON.stringify(todo));
        }

        function line_through(checked_element){
            checked_element.previousSibling.previousSibling.style.cssText = 'text-decoration: line-through 2px solid var(--line-through-cl); opacity:0.7;';
        }

        function remove_line_through(unchecked_element){
            unchecked_element.previousSibling.previousSibling.style.cssText = 'text-decoration: none; opacity:1;';
        }

        function compeleted(){
            var complete_task = document.querySelectorAll('.check-btn');
            complete_task = [...complete_task];

            complete_task.forEach(compelete => {
                compelete.addEventListener('click',(e) => {
                    compelete.classList.toggle('checked-btn');
                    var task = compelete.parentElement;
                    var complete_task_index = [...document.querySelectorAll('.task-box .task')].indexOf(task);
                    task_state(complete_task_index);
                    
                    if (compelete.classList.contains('checked-btn')){
                        var count = document.querySelector('.number');
                        var num = Number(count.innerHTML) - 1;
                        count.innerHTML = num;
                        line_through(compelete);
                        task.classList.toggle('done');
                        task.classList.toggle('undone');
                    }
                    else{
                        var count = document.querySelector('.number');
                        var num = Number(count.innerHTML) + 1;
                        count.innerHTML = num;
                        remove_line_through(compelete);
                        task.classList.toggle('done');
                        task.classList.toggle('undone');
                    }
                    task_count.innerHTML = num;
                })
            })
        }
        compeleted();
        
    }

    //Remove task
    {
        function remove_todo(index){
            var todos = JSON.parse(localStorage.getItem('todos'));
            todos.splice(index,1);
            localStorage.setItem('todos',JSON.stringify(todos));
        }
        
        function removed(){
        var remove_task = document.querySelectorAll('.delete');
        remove_task = [...remove_task];
        
        remove_task.forEach(clear => {
            clear.addEventListener('click',(e) => {
                var current_task = clear.parentElement;
                current_task.classList.add('fall');
                var current_task_index = [...document.querySelectorAll('.task-box .task')].indexOf(current_task);
                remove_todo(current_task_index);
                setTimeout(() => {
                    current_task.remove();
                },100); 
                if (!clear.nextSibling.nextSibling.nextSibling.nextSibling.classList.contains('checked-btn')){
                    var count = document.querySelector('.number');
                    var num = Number(count.innerHTML) - 1;
                    count.innerHTML = num;
                }
            })
        })
        }
    }

    //Drag effect
    {
    function drag_drop (){
        var tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            task.addEventListener('dragstart',() => {
            task.classList.add('drag');
            })

            task.addEventListener('dragend',() => {
            task.classList.remove('drag');
            })
        });
    }
    }

    //Theme switcher
    {
        var theme_btn = document.getElementById('theme'),
            body = document.getElementsByTagName('body')[0];

    
        const change_theme = () => {
        if (body.classList.value == 'light'){
            theme_btn.className = "fas fa-moon fa-10px";
        }
        else{
            theme_btn.className = "fas fa-sun fa-10px";
        }
        body.classList.toggle('light');
        }

        theme_btn.addEventListener('click',change_theme);
    }

    //Get todo list from local storage and create html
    {
        var todo_db = localStorage.getItem('todos');
        todo_db = JSON.parse(todo_db);
        var count = 0;
        
        if (todo_db){
            todo_db.forEach(task => {
                // console.log(task.isCompleted);
                if (task.isCompleted == true){
                    var check = 'check-btn checked-btn';
                    var done = 'done';
                }
                else{
                    count += 1;
                    var check = 'check-btn';
                    var done = 'undone';
                }
                var add_html = 
                    `<div class='task ${done}' draggable='true'>
                        <button class='fas fa-remove fa-10px delete'></button>
                        <p class='task-text' dir='rtl'>${task.item}</p>
                        <button class='${check}'><i class='fas fa-check fa-10px'></i></button></div>`;
                document.querySelector('.task-box').innerHTML += add_html;
                
                if(task.isCompleted == true){
                    var index = todo_db.indexOf(task);
                    index = Number(index);
                    [...document.querySelectorAll('.task')[index].children][1].style.cssText = 'text-decoration: line-through 2px solid var(--line-through-cl); opacity:0.7;';
                }
                
            })
            var task_count = document.querySelector('.number');
            task_count.innerHTML = `${count}`;
            drag_drop();
            removed();
            compeleted();
            filter_tasks();
            clear_all_completed();
        }
    }

    //Save task to local storage and add to html
    {
        var input_task = document.querySelector('.input-task'),
            add_btn = document.querySelector('.add-btn');
        
        add_btn.addEventListener('click',() => {
            var item = input_task.value.trim(); //trim removes white spaces
            if (input_task.value.trim()){
                input_task.value = '';
                var todos = !localStorage.getItem('todos') ? [] : JSON.parse(localStorage.getItem('todos'));
                this_todo = {
                    item:item,
                    isCompleted: false
                }
                todos.push(this_todo);
                localStorage.setItem('todos',JSON.stringify(todos));
                var add_html = 
                `<div class='task undone' draggable='true'>
                    <button class='fas fa-remove fa-10px delete'></button>
                    <p class='task-text' dir='rtl'>${item}</p>
                    <button class='check-btn'><i class='fas fa-check fa-10px'></i></button></div>`;
                document.querySelector('.task-box').innerHTML += add_html;
                
                drag_drop();
                removed();
                compeleted();
                filter_tasks();
                clear_all_completed();
                var count = document.querySelector('.number');
                var num = Number(count.innerHTML) + 1;
                count.innerHTML = num;
            }
        })

        input_task.addEventListener('keydown',(event) => {
            if (event.key == 'Enter'){
                add_btn.click();
            }
        })
    }

    //Drag and drop tasks
    {
        drag_drop();

        var task_box = document.querySelector('.task-box');

        task_box.addEventListener('dragover',(event) => {
            event.preventDefault();
            if (event.target.classList.contains('task') & !event.target.classList.contains('drag')){
                var dragging_task = document.querySelector('.drag'),
                    other_tasks = [...task_box.querySelectorAll('.task')], //using spread operator for creating array from nodeList
                    cur_pos = other_tasks.indexOf(dragging_task);
                    new_pos = other_tasks.indexOf(event.target);
                
                if (cur_pos > new_pos){
                    task_box.insertBefore(dragging_task, event.target);
                }
                else{
                    task_box.insertBefore(dragging_task, event.target.nextSibling); //there's no after so we sjould use the attribute next sibling                         
                }

                var todo = JSON.parse(localStorage.getItem('todos'));
                var removed = todo.splice(cur_pos,1); // returns array

                todo.splice(new_pos,0,removed[0]);
                localStorage.setItem('todos',JSON.stringify(todo));
            }
        })
    }

}
document.addEventListener('DOMContentLoaded',main);