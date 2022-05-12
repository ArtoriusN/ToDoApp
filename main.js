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
    function createTodoItem(head) {
        let item = document.createElement('li');
        let input = document.createElement('input');
        let buttonDone = document.createElement('button');
        let button2 = document.createElement('button');

        input.value = head;

        item.append(input);
        item.append(buttonDone);
        item.append(button2);

        return {
            item,
            input,
            buttonDone,
            button2,
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
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }
            todoList.append(createTodoItem(todoItemForm.input.value).item);
            // todoItemForm.input.value = '';

        });
    });
})();