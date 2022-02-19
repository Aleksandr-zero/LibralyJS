import Popup from "./popup.js";


export class PopupDisposable extends Popup {
  /**
	Одноразовый popup.
	* @param popupContainer -> block "popup-disposable" ( type -> HTMLElement )
	* @param btnOpen -> block "popup-disposable-btn-open" ( type -> HTMLElement )
  */
	constructor(popupContainer, btnOpen) {
		super();

		this.popupContainer = popupContainer;
		this.btnOpenPopup = btnOpen;

		this.deletePopup = () => {
			if ( event.target.classList.contains("popup-disposable") && !event.target.classList.contains("popup-disposable-btn-open") ) {
				const popupContainer = document.querySelector('.popup-disposable');
				popupContainer.classList.remove("popup-disposable--active");

				document.removeEventListener("click", this.deletePopup);

				setTimeout(() => {
					super.hides_showVerticalScrolling();
				}, 300);
			};
		};
	}

	addEventClickBtnOpenPopup() {
		this.btnOpenPopup.addEventListener("click", () => { this.openPopup(); });
	}

	openPopup() {
		this.popupContainer.classList.add("popup-disposable--active")

		super.hides_showVerticalScrolling();
		this.addEventClickDocument();
	}

	addEventClickDocument() {
		document.addEventListener("click", this.deletePopup);
	}

	run() {
		this.addEventClickBtnOpenPopup();
	}
};
