import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};


const refs = {
	form: document.querySelector(".feedback-form"),
	email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 1000));

populateFormData()

function onFormInput(e) {
	formData[e.target.name] = e.target.value
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
	console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
	e.preventDefault()
	e.target.reset()
	localStorage.removeItem(STORAGE_KEY)

}

function populateFormData() {
	const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (data) {
    refs.email.value = data.email;
    refs.message.value = data.message;
  }
}
//
//
//
//
//
//
//
//
//

// создаю ключ для хранилища - STORAGE_KEY
// создаю обьект для хранения данных formData = {}
// устанавливаю пакет Lodash.throttle (задержка слушателя событий) => импортирую в файл-js - import throttle from 'lodash.throttle';
//
// 1. Поиск элементов (document.querySelector) через refs = {form: document.querySelector('.form')} => (ссылки на элементы)
//
// 2. Вешаю слушатель события на форму:
// 		=> при событии INPUT (которое включено в форму) -> будет вызываться функция => onFormDataInput
//    => при событии SUBMIT (отправка формы) -> будет вызываться функция => onFormSubmit
//
// 3. При событии SUBMIT на форме => вызываю функцию onFormSubmit
// 3.1 Присваиваю атрибуту name - значение, которое будет введено пользователем => formData[e.target.name] = e.target.value, где:
// 	-		formData[e.target.name] - атрибут name с соответсвующтм значеием (name="email" и name="message")
//  -		e.target.value - значение, которое введено пользователем
// 3.2 Создаю запись в локальном хранилище (localStorage) в виде объекта (formData) => преобразовую JS-обьект в JSON-формат (JSON.stringify(formData)
//
// 4. Отключаю перезагрузку страницы при событии SUBMIT => event.preventDefault()