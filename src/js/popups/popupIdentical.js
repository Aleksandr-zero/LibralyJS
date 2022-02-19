import Popup from "./popup.js";


export class PopupIdentical extends Popup {
  /**
	Идентичный popup.
	* @param btnsOpen -> block "popup-identical-btn-open" ( type -> HTMLElement )
  */
	constructor(btnsOpen, options) {
		super();

		this.popupContainer = document.querySelector(".popup-identical");
		this.btnsOpen = btnsOpen;
		this.popup;
		this.options = options;

		if ( this.options ) this.setOptions();

		this._deletePopup = () => this.deletePopup();
	}

	deletePopup() {
		if (event.target.classList.contains("popup-identical") && !event.target.classList.contains("popup-identical-btn-open")) {
			this.popup.classList.remove(this.activeClass);

			document.removeEventListener("click", this._deletePopup);

			setTimeout(() => {
				super.hides_showVerticalScrolling();
				this.popup = false;
			}, 300);
		};
	}

	setOptions() {
		if ( !this.btnsOpen && !this.btnsOpen[0].nodeType ) throw "Invalid parameter <btnsOpen>"

		this.activeClass = ( this.options && "activeClass" in this.options ) ? this.options.activeClass : "popup-identical--active";
		this.idPopupSearch = ( this.options && "idPopupSearch" in this.options ) ? this.options.idPopupSearch : "popup-identical-";
	}

	openPopup(popup) {
		this.popup = popup;

		this.popup.classList.add(this.activeClass);
		super.hides_showVerticalScrolling();
		this.addEventClickDocument();
	}

	addEventOpenPopup() {
		this.btnsOpen.forEach(btn => {
			btn.addEventListener("click", () => {
				const numberPopup = event.currentTarget.dataset.numberPopup;
				const popup = document.querySelector(`#${this.idPopupSearch}${numberPopup}`);
				
				if ( popup ) this.openPopup(popup);
			});
		});
	}

	addEventClickDocument() {
		document.addEventListener("click", this._deletePopup);
	}

	run() {
		this.addEventOpenPopup();
	}
}