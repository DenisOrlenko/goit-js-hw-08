import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

// создаю рефы
const refs = {
	form: document.querySelector(".feedback-form"),
	email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
}

// вешаю слушатель события на форму при собитии INPUT, SUBMIT
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500 ));

populateFormData()

function onFormInput(e) {
	// создаю для обьекта formData => ключ: значение
	// как можно по другому реализовать 23 строку?
	formData[e.target.name] = e.target.value
	// console.log('onFormInput  formData', formData)
	// помещаю обьект в хранилище + преобразовую обьект formData => в JSON-формат
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
	// запрет перезагрузки страницы при отправке формы
	e.preventDefault()
	// если одно из полей формі не заполнено - alert
	if (refs.email.value === "" || refs.message.value === "") {
    return alert("Please fill in all the fields!");
  }
	else {
		console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
		// очищение полей формы при отправке формы
		e.target.reset()
		// очищение локального хранилища при отправке формы
		localStorage.removeItem(STORAGE_KEY)
	}
}
// функция сохранения значений введенных пользователем в поля формы, в случае потери данных (презагрузка страницы)
function populateFormData() {
	// распарсиваю значение из хранилища
	const data = JSON.parse(localStorage.getItem('feedback-form-state'));
	// в случае перезагрузки страницы и если пользователем было введено значение в поле формы (оно автоматически записывается в хранилище)
  if (data) {
		// присваиваю значение для полей формы из локального хранилища
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