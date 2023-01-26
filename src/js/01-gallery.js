// 1. Дополнительный импорт стилей для библиотеки
import 'simplelightbox/dist/simple-lightbox.min.css';
//
// 2. ИМПОРТ библиотеки 'simplelightbox' в локальную переменную SimpleLightbox
import SimpleLightbox from 'simplelightbox';
//
// 3. ИМПОРТ {МАССИВА ДАННЫХ} ИЗ ФАЙЛА ./gallery-items
import { galleryItems } from './gallery-items';
//
// Change code below this line
const galleryList = document.querySelector(".gallery")
const cardsMarkup = createGallery(galleryItems)
galleryList.insertAdjacentHTML("beforeend", cardsMarkup)

function createGallery(e) {
	return galleryItems
		.map(({preview, original, description}) => {
			return `
			<a
				class="gallery__item"
				href="${original}">
				<img
					class="gallery__image"
					src="${preview}"
					alt="${description}"
				/>
			</a>`
		})
		.join("")
}
const lightbox = new SimpleLightbox(".gallery__item", {
	captionsData: "alt", captionDelay: 250,
});
