import Popup from "./popup.js";


export class PopupDisposable extends Popup {
    /**
	Одноразовый popup.
	* @param popupContainer -> block "popup-disposable" ( type -> HTMLElement )
    */

	constructor(popupContainer) {
		super();

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
					super.hides_showVerticalScrolling();
				}, 300);
			};
		};
	}


	// Отвечают за навешивание событий и их обработчиков.
	addEventClickBtnOpenPopup() {
		/* Добавляет событие клик на кнопку открытия popup  */

		this.btnOpenPopup.addEventListener("click", () => { this.openPopup(); });
	}

	openPopup() {
		this.popupContainer.classList.add("popup-disposable-active")

		super.hides_showVerticalScrolling();
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
