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
        button.className

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

    document.addEventListener("DOMContentLoaded", function(event) {
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        // todoItemForm.form.append(createTodoItem("head").item);
        todoItemForm.form.addEventListener('submit', function (e) {
            //предотвращаем стандартное действие браузера при отправке формы (перезагрузка страницы)
            e.preventDefault();

            //игнорируем создание элемента если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }
            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.buttonDone.addEventListener("click", function (){
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.buttonDelete.addEventListener("click", function (){
                if (confirm('Хотите удалить?')) {
                    todoItem.item.remove();
                }
            });

            todoList.append(todoItem.item);
            //создаем и добавляем в список (ul) новое дело (li) с названием из поля ввода фармы
            // todoList.append(createTodoItem(todoItemForm.input.value).item);

            //обнуляем значение в поле ввода формы, чтобы пользователь не стирал
            todoItemForm.input.value = '';
        });


    });
})();