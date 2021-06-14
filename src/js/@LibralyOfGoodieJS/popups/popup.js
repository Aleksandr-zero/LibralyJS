export default class Popup {
	/**
	При наследование класса должны быть свойства:
	* @property popupContainer -> type( HTMLElement )
	*/

	hides_showVerticalScrolling() {
		/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

		const body = document.querySelector("body");

		const widthScroll = window.innerWidth - this.popupContainer.querySelector(".popup-container").clientWidth;

		if (widthScroll) {
			body.style.cssText = `
				padding-right: ${widthScroll}px;
				overflow: hidden;
			`;
		} else {
			body.style.cssText = `
				padding-right: ${widthScroll}px;
				overflow: auto;
			`;
		}
	}
};
