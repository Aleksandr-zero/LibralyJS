import Popup from "./popup.js";


export class PopupDisposable extends Popup {
  /**
	Одноразовый popup.
	* @param popup -> block "popup-disposable" ( type -> HTMLElement )
	* @param btnOpen -> block "popup-disposable-btn-open" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
  */
	constructor(popup, btnOpen, options) {
		super();

		this.popup = popup;
		this.popupContainer = this.popup;
		this.btnOpenPopup = btnOpen;
		this.options = options;

		if ( this.options ) this.setOptions();
		this._deletePopup = () => this.deletePopup();
	}

	deletePopup() {
		if ( event.target.classList.contains("popup-disposable") && !event.target.classList.contains("popup-disposable-btn-open") ) {
			const popup = document.querySelector('.popup-disposable');
			popup.classList.remove(this.activeClass);

			document.removeEventListener("click", this._deletePopup);

			setTimeout(() => {
				super.hides_showVerticalScrolling();
			}, 300);
		};
	}

	setOptions() {
		if ( !this.popup && !this.popup.tagName ) throw "Invalid parameter <popup>";
		if ( !this.btnOpenPopup && !this.popup.tagName ) throw "Invalid parameter <btnOpenPopup>";

		this.activeClass = ( this.options && "activeClass" in this.options ) ? this.options.activeClass : "popup-disposable--active";
	}

	addEventClickBtnOpenPopup() {
		this.btnOpenPopup.addEventListener("click", () => { this.openPopup(); });
	}

	openPopup() {
		this.popup.classList.add(this.activeClass)

		super.hides_showVerticalScrolling();
		this.addEventClickDocument();
	}

	addEventClickDocument() {
		document.addEventListener("click", this._deletePopup);
	}

	run() {
		this.addEventClickBtnOpenPopup();
	}
};
