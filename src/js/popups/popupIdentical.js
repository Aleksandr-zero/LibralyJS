import Popup from "./popup.js";


export class PopupIdentical extends Popup {
  /**
	Идентичный pop-up.
	* @param btnsOpen -> block "popup-identical-btn-open" ( type -> HTMLElement )
  */
	constructor(btnsOpen) {
		super();

		this.popupContainer = document.querySelector(".popup-identical");
		this.btnsOpen = btnsOpen;
		this.popup;

		this.deletePopup = () => {
			if (event.target.classList.contains("popup-identical") && !event.target.classList.contains("popup-identical-btn-open")) {
				this.popup.classList.remove("popup-identical--active");

				document.removeEventListener("click", this.deletePopup);

				setTimeout(() => {
					super.hides_showVerticalScrolling();
					this.popup = false;
				}, 300);
			};
		};
	}

	openPopup(popup) {
		this.popup = popup;

		this.popup.classList.add("popup-identical--active");
		super.hides_showVerticalScrolling();
		this.addEventClickDocument();
	}

	addEventOpenPopup() {
		this.btnsOpen.forEach(btn => {
			btn.addEventListener("click", () => {
				const numberPopup = event.currentTarget.dataset.numberPopup;
				const popup = document.querySelector(`#popup-identical-${numberPopup}`);
				
				this.openPopup(popup);
			});
		});
	}

	addEventClickDocument() {
		document.addEventListener("click", this.deletePopup);
	}

	run() {
		this.addEventOpenPopup();
	}
}