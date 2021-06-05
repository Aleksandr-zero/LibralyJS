export class PopupDisposable {
    /*
	Одноразовый popup.
    */

	constructor(popupContainer) {
		this.popupContainer = popupContainer;
		this.btnOpenPopup = this.popupContainer.querySelector(".popup-disposable-btn-open");


		this.deletePopup = () => {
			/* Происходит при клике на весь document.  */

			if (!event.target.closest(".pop-up") && !event.target.classList.contains("popup-disposable-btn-open")) {
				const popupContainer = document.querySelector('.popup-disposable');
				popupContainer.classList.remove("popup-disposable-active");
				popupContainer.classList.add('popup-disposable-delete-popup')

				document.removeEventListener("click", this.deletePopup);

				setTimeout(() => {
					popupContainer.classList.remove('popup-disposable-delete-popup');
					this.hides_showVerticalScrolling();
				}, 300);
			};
		};
	}


	// Вспомогательные методы.
	hides_showVerticalScrolling() {
		/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

		const body = document.querySelector("body");

		const widthScroll = window.innerWidth - this.popupContainer.querySelector(".popup-disposable__container-content").clientWidth;

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

	// Отвечают за навешивание событий и их обработчиков.
	addEventClickBtnOpenPopup() {
		/* Добавляет событие клик на кнопку открытия popup  */

		this.btnOpenPopup.addEventListener("click", () => { this.openPopup(); });
	}

	openPopup() {
		this.popupContainer.classList.add("popup-disposable-active")

		this.hides_showVerticalScrolling();
		this.addEventClickDocument();
	}

	addEventClickDocument() {
		/* Добавляет события клика для всего document (чтобы при клике закрывать popup).  */
		document.addEventListener("click", this.deletePopup);
	}


	run() {
		this.addEventClickBtnOpenPopup();
	}
};
	