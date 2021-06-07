export class PopupMuliple {
    /*
	Многоразовай попап.
    */

	constructor(popupContainer, templatePopup, options) {
		this.popupContainer = popupContainer;
		this.popupBlockContainer = this.popupContainer.querySelector(".popup-multiple__container");
		this.popupContainerContent = this.popupContainer.querySelector(".popup-multiple__container-content");
		this.templatePopup = templatePopup;
		this.options = options;

		if (this.options) {
			this.addOptions();
		};

		this.deletePopup = () => {
			/* Происходит при клике на весь document.  */

			if (!event.target.closest(".popup")) {
				const popupContainer = document.querySelector('.popup-multiple');
				popupContainer.classList.remove("popup-multiple-active");
				popupContainer.classList.add('popup-multiple-delete-popup')

				document.removeEventListener("click", this.deletePopup);

				setTimeout(() => {
					document.querySelector(".popup").remove();
					popupContainer.classList.remove('popup-multiple-delete-popup');
					this.hides_showVerticalScrolling();
				}, 300);
			};
		};
	}

	addOptions() {
		this.numberOfPopup = (this.options.numberOfPopup) ? this.options.numberOfPopup : 2;
	}


	// Отвечают за навешивание событий и их обработчиков.
	addEventClick_BtnsOpenPopup() {
		/* Добавляет события клика на кнопки открытия popup.  */

		const btnsPopup = this.popupContainer.querySelectorAll(".popup-multiple-btn-open");

		btnsPopup.forEach((btn) => {
			btn.addEventListener("click", () => { this.pressedBtnOpenPopup(); });
		});
	}

	pressedBtnOpenPopup() {
		/* Срабатывает при клике на кнопку.   */

		const numberPopup = event.currentTarget.dataset.popupNumber;
		const data = this.options.popups[numberPopup];

		const newPopup = this.createPopup(
			this.data = data
		);

		this.insertsNewPopup_In_Container(newPopup);
		this.hides_showVerticalScrolling();
		setTimeout(() => {
			this.addEventClickDocument();
		}, 0);
	}

	addEventClickDocument() {
		/* Добавляет события клика для всего document (чтобы при клике закрывать popup).  */
		document.addEventListener("click", this.deletePopup);
	}


	// Вспомогательные методы.
	hides_showVerticalScrolling() {
		/* Скрывает вертикальную прокрутку (чтобы не было тряски контента при появления popup).  */

		const body = document.querySelector("body");

		const widthScroll = window.innerWidth - this.popupBlockContainer.clientWidth;

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


	// Отвечают за функционал.
	createPopup(data) {
		/* Создаёт указанный popup.  */

		let newPopup = this.templatePopup;

		for (const key in data) {

			// Если в настройки будет передан обьект.
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
		/* Помещает новый popup в контейнер.  */

		this.popupContainerContent.insertAdjacentHTML("beforeend", newPopup);
		this.popupContainer.classList.add("popup-multiple-active");
	}


	run() {
		this.addEventClick_BtnsOpenPopup();
	}
};
