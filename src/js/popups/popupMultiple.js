import Popup from "./popup.js";


export class PopupMuliple extends Popup {
  /**
	Многоразовай popup.
	* @param popupContainer -> block "popup-multiple" ( type -> HTMLElement )
	* @param templatePopup -> template popup ( type -> String )
	* @param options -> custom settings ( type -> Object )
  */
	constructor(popupContainer, templatePopup, options) {
		super();

		this.popup = popupContainer;
		this.popupContainer = this.popup.querySelector(".popup-multiple__container");
		this.popupContainerContent = this.popup.querySelector(".popup-multiple__container-content");
		this.templatePopup = templatePopup;
		this.options = options;

		if ( this.options ) this.setOptions();

		this._deletePopup = () => this.deletePopup();
	}

	deletePopup() {
		if (!event.target.closest(".popup")) {
			const popup = document.querySelector('.popup-multiple');
			popup.classList.remove("popup-multiple-active");
			popup.classList.add('popup-multiple-delete-popup');

			document.removeEventListener("click", this._deletePopup);

			setTimeout(() => {
				document.querySelector(".popup").remove();
				popup.classList.remove('popup-multiple-delete-popup');
				super.hides_showVerticalScrolling();
			}, 300);
		};
	}

	setOptions() {
		this.numberOfPopup = Object.keys(this.options.popups).length;
	}

	addEventClick_BtnsOpenPopup() {
		const btnsPopup = this.popup.querySelectorAll(".popup-multiple-btn-open");
		btnsPopup.forEach((btn) => {
			btn.addEventListener("click", () => { this.pressedBtnOpenPopup(); });
		});
	}

	pressedBtnOpenPopup() {
		const numberPopup = event.currentTarget.dataset.popupNumber;
		const data = this.options.popups[numberPopup];

		const newPopup = this.createPopup(data);

		this.insertsNewPopup_In_Container(newPopup);
		super.hides_showVerticalScrolling();
		setTimeout(() => {
			this.addEventClickDocument();
		}, 0);
	}

	addEventClickDocument() {
		document.addEventListener("click", this._deletePopup);
	}

	createPopup(data) {
		let newPopup = this.templatePopup;

		for (const key in data) {
			if (typeof data[key] === "object") {
				for (const keyObj in data[key]) {
					newPopup = newPopup.replace(`{{ ${key}.${keyObj} }}`, data[key][keyObj]);
				};
				continue;
			};
			newPopup = newPopup.replace(`{{ ${key} }}`, data[key]);
		};
		return newPopup;
	}

	insertsNewPopup_In_Container(newPopup) {
		this.popupContainerContent.insertAdjacentHTML("beforeend", newPopup);
		this.popup.classList.add("popup-multiple-active");
	}

	run() {
		this.addEventClick_BtnsOpenPopup();
	}
};
