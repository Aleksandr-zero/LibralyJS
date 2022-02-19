export default class Popup {
	/**
	При наследование класса должны быть свойства:
	* @property popupContainer -> type( HTMLElement )
	*/
	hides_showVerticalScrolling() {
		const body = document.querySelector("body");
		const widthScroll = window.innerWidth - this.popupContainer.clientWidth;

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
