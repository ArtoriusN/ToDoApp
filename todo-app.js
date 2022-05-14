(function () {
    //создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h1');
        appTitle.className = "header";
        appTitle.innerHTML = title;
        return appTitle;
    }
    //создаем и возвращаем форму для создания дела форма инпут див баттон
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = "Введите название нового дела";
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = "Добавить дело";
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }
    //создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    function createTodoItem(name) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let buttonDone = document.createElement('button');
        let buttonDelete = document.createElement('button');

        //Помещаем передаваемое название в элемент списка
        item.textContent = name;
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        buttonDone.classList.add('btn', 'btn-success');
        buttonDelete.classList.add('btn', 'btn-danger');
        buttonDone.textContent = 'Готово';
        buttonDelete.textContent = 'Удалить';

        //вкладываем кнопки в div для объединения
        buttonGroup.append(buttonDone);
        buttonGroup.append(buttonDelete);
        item.append(buttonGroup);

        return {
            item,
            buttonDone,
            buttonDelete,
        }
    }

    function createTodoApp(container, title = 'Список дел', obj) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        // todoItemForm.form.append(createTodoItem("head").item);
        if (Object.keys(obj).length == 0) {
            console.log('пуст');
        } else {
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    console.log(obj[key]);
                    var todoItem = createTodoItem(obj[key]);
                    addItemToDom(todoItem);
                } else if (obj[key] === true) {
                    todoItem.item.classList.toggle('list-group-item-success');
                }
            }
        }

        function addItemToDom(todoItem) {
            todoList.append(todoItem.item);
                    
                    todoItem.buttonDone.addEventListener("click", function (){
                        todoItem.item.classList.toggle('list-group-item-success');
                    });
        
                    todoItem.buttonDelete.addEventListener("click", function (){
                        if (confirm('Хотите удалить?')) {
                            todoItem.item.remove();
                        }
                    });
        }

        todoItemForm.input.addEventListener('input', function () {
            if (!todoItemForm.input.value) {
                todoItemForm.button.disabled = true;
                return;
            } else {
            todoItemForm.button.disabled = false;
            }
        });

        todoItemForm.form.addEventListener('submit', function (e) {
            console.log(todoItemForm.button.disabled);
            //предотвращаем стандартное действие браузера при отправке формы (перезагрузка страницы)
            e.preventDefault();

            //игнорируем создание элемента если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value || todoItemForm.input.value.trim() === '') {
                todoItemForm.input.value = '';
                return;
            }
            let todoItem = createTodoItem(todoItemForm.input.value);
            addItemToDom(todoItem);
            //создаем и добавляем в список (ul) новое дело (li) с названием из поля ввода фармы
            // todoList.append(createTodoItem(todoItemForm.input.value).item);

            //обнуляем значение в поле ввода формы, чтобы пользователь не стирал
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();