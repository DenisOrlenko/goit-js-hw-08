import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';


let formData = {};

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

function onFormSubmit(e) {
	// запрет перезагрузки страницы при отправке формы
	e.preventDefault()
	// если одно из полей формі не заполнено - alert
	if (refs.email.value === "" || refs.message.value === "") {
    return alert("Please fill in all the fields!");
  }
	else {
		// вывожу в консоль распарсенные значения полей формы
		console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
		// очищение полей формы при отправке формы
		e.target.reset()
		// очищение локального хранилища при отправке формы
		localStorage.removeItem(STORAGE_KEY)
	}
}

function onFormInput(e) {
	// создаю для обьекта formData => ключ: значение
// 		1) ключ = e.target.name => получаем из элементов формы, которые имеют атрибут name=""
// 		2) ключ name приходит к нам в виде строки ""
// 		Доступ к свойству объекта Object[]
// или
// 		Object[] - Создаю свойство объекта через обращение к свойству -> [] (если свойство задается в виде строки "")
	formData[e.target.name] = e.target.value
	// console.log('onFormInput  formData', formData)
	// помещаю обьект в хранилище (т.е. преобразовую обьект formData в JSON-формат)
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// функция сохранения значений введенных пользователем в поля формы, в случае потери данных (презагрузка страницы)
function populateFormData() {
	// вывожу значение из хранилища - строка-JSON
	const data = localStorage.getItem('feedback-form-state');

	// в случае перезагрузки страницы и если пользователем было введено значение в поле формы (оно автоматически записывается в хранилище)
  if (data) {
		// распарсиваю значение из хранилища для дальнейшего использования значения в JS-формате
		formData = JSON.parse(data);
		// присваиваю значение для полей формы (refs.email.value) из локального хранилища (значения свойств обьекта: formData.email, formData.message) в случае потери данных из полей формы (например - перезагрузка страницы)
		// или заполняю пустой строкой (''), чтобы не было ошибки underfined
    refs.email.value = formData.email || '';
    refs.message.value = formData.message || '';
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

//
//

// доступ к свойствам - в случае обращения через строку
// const myCar = {
//   make: "Ford",
//   model: "Mustang",
//   year: 1969,
// };

// const myCar = {
//   make: "Ford",
//   model: "Mustang",
//   year: 1969,
// };
