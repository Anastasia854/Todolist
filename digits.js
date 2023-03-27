(function () {
    //создаем и возращаем заголовок
    function createAppTitle(title) { // в скобачках мы это прописали в случае, если заголовок надо будет изменить
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //создаем и возращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        //input - поле для ввода
        let input = document.createElement('input');
        //правильно стилизовать кнопку
        let buttonWrapper = document.createElement('div');
        // создание самой кнопки
        let button = document.createElement('button');

        //теперь расставим различные атрибуты
        //classList.add - добавление классов
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        //позиционировать элемент в форме справа от нашего поля для ввода
        buttonWrapper.classList.add('input-group-append');
        // 'btn' - класс чтобы стилизовал Bootstrap кнопку, как их всегда делают
        //'btn-primary' - нарисует эту кнопку красивым синим цветом
        button.classList.add('btn', 'btn-primary');
        // текст внутри кнопки
        button.textContent = 'Добавить дело';

        //вкладываем buttonWrapper в button
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper)

        return {
            form,
            input,
            button,
        };
    }

    //создаем и возращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    // создаем и возращаем, дело которое может быть добавленным удаленным и завершенным
    function createTodoItem(name) {
        let item = document.createElement('li');
        //кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        //устанaвливаем стили для элемента списка, а также для размещения кнопок в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        //вкладываем кнопки в отдельный элемент, чтобы они обьеденились в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        //приложению нужен доступ к самому элементу и кнопкам, чтобы отрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
            };
        }


    //теперь чтобы все функции зароботали, их надо вставить в DOM и сделаем мы это так
    //Событие DOMContentLoaded – DOM готов, так что обработчик может искать DOM-узлы и инициализировать интерфейс.
    document.addEventListener('DOMContentLoaded', function() {
        let container = document.getElementById('todo-app');

        // поочердно вызываем функции, которые создали
        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
 

        // потом их результат размещаем внутри контейнера
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            //эта строчка необходимо, чтобы предовратить станд.действие браузера
            //в данном случаем мы не хотим, чтобы станица перезагружалась при отправке формы
            e.preventDefault();

            //игнорируем создание элемента, если пользователь ничего не ввел в поле
            if(!todoItemForm.input.value) {
                return;
            }
            
            let todoItem = createTodoItem(todoItemForm.input.value);

            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if(confirm('Вы уверены?')) {
                    todoItem.item.remove();
                }
            });
            
            //создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);
            //обнуляем значение в поле, чтобы не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });
    });
})();