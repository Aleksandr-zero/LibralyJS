import Slider from "./slider.js"


export class SliderEndLess extends Slider {
    /**
    Бесконечный слайдер.
    * @param slider -> block "slider-with-fight" ( type -> HTMLElement )
    * @param options -> custom settings ( type -> Object )
    */

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");
		this.positionSliderTrack = 0;

		this.slides = this.sliderTrack.children;
		this.numberSlides = this.slides.length;
		this.widthSlide = this.slides[0].offsetWidth;

		this.intervals = [];
		this.timeouts = [];

		this.sliderBtnPushLast = this.slider.querySelector(".btn-slider-push-last");
		this.sliderBtnPushNext = this.slider.querySelector(".btn-slider-push-next");

		this.addOptions();
	}

	addOptions() {
		/* Добавляет пользовательские настройки для слайдера.  */

		this.speed = (this.options && this.options.speed) ? this.options.speed : 200;
		this.timerAdvance = (this.options && this.options.timerAdvance) ?
									[this.options.timerAdvance[0], this.options.timerAdvance[1]] : [false];
		this.freezeSliderMouseHover = (this.options.freezeSliderMouseHover) ? this.options.freezeSliderMouseHover : false;
		this.freezeSliderOnLossFocus = (this.options.freezeSliderOnLossFocus) ? this.options.freezeSliderOnLossFocus : false;

		if (this.options && this.timerAdvance[0]) {
			this.addSetInterval_For_Slider();
			this.checks_If_UserOnSite();

			if (this.freezeSliderMouseHover) {
				this.addEventMouse_TouchMove_Slider();
			};
		};
	}

	addEventClick_BtnsSliderPush() {
		/* Добавление событий на кнопки передвижения слайдера.  */

		this.sliderBtnPushLast.addEventListener("click", () => { this.pressedBtnPushSlider(); });
		this.sliderBtnPushNext.addEventListener("click", () => { this.pressedBtnPushSlider(); });
	}


	pushingSlider() {
		/* Продвигет слайдер.  */

		const direction = event.currentTarget.dataset.direction;

		const positionSliderTrack = (direction === "next") ? -this.widthSlide * 2 : 0;
		this.sliderTrack.style.transform = `translate3d(${positionSliderTrack}px, 0px, 0px)`;
		this.addCssSliderTrack();

		if (this.movesSlider_If_OnlyTwoSlides()) return;

		setTimeout(() => {
			(direction === "next") ? this.movesFirstSlide_TheEnd() : this.movesLastSlide_Start();
		}, this.speed * 1.5);
	}

	movesSlider_If_OnlyTwoSlides() {
		/* Передвигает слайдер если всего 2 слайда.  */

		if (this.numberSlides === 2) {
			setTimeout(() => {
				this.changeFirst_LastSlide();
			}, this.speed * 1.5);
			return true;
		};
	}

	pressedBtnPushSlider() {
		/* Передвигает слайдер при клике на кнопку.  */

		this.clearnsSetIntervals();
		this.blocking_unlockingBtnsSliders("none");

		this.pushingSlider();

		setTimeout(() => {
			this.blocking_unlockingBtnsSliders("auto");

			if (!this.freezeSliderMouseHover) {
				this.createSetInterval_For_Slider();
			};

		}, this.speed * 1.5);
	}

	movesFirstSlide_TheEnd() {
		/* Перемещает первый слайд в конец слайдера.  */

		const firstSlide = this.slides[0];
		firstSlide.remove();

		this.sliderTrack.append(firstSlide);
		this.nullifiesCssSliderTrack();
	}

	movesLastSlide_Start() {
		/* Перемещает последний слайд в начало слайдера.  */

		const lastSlide = this.slides[this.numberSlides - 1];
		lastSlide.remove();

		this.sliderTrack.prepend(lastSlide);
		this.nullifiesCssSliderTrack();
	}

	changeFirst_LastSlide() {
		/*
		Меняет слайдер: если первый слайдер номер 1, то другие под номером 2 и наоборот,
		если первый слайдер под номером 2 то остальные под номером 1.
		*/

		const firstSlide = this.slides[0];
		const lastSlide = this.slides[ this.slides.length - 1];

		const middleSlide = this.slides[1].cloneNode(true);

		this.sliderTrack.prepend(middleSlide);
		this.sliderTrack.append(firstSlide)
		this.sliderTrack.append(middleSlide);

		lastSlide.remove();

		this.nullifiesCssSliderTrack();
	}

	addLastSlideStart() {
		/* Добавляет последний слайд в самое начало, ну прям в самое начало.  */

		const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);
		this.sliderTrack.prepend(lastSlide);

		if (this.checkNumbersSlides()) {
			return;
		};

		this.slides[this.slides.length - 1].remove();
	}

	checkNumbersSlides() {
		/* Проверяет количество слайдов если их будет 2, то последний слайд не удаляем.  */

		if (this.numberSlides === 2) {
			return true;
		};
	}

	addCssSliderTrack() {
		/* Добавляет анимацю для продвижение слайдера.  */
		this.sliderTrack.style.transition = `transform 0.${this.speed * 1.5}s`;
	}

	blocking_unlockingBtnsSliders(pointer) {
		/* Блокирует и производит разблокировку кнопок продвижения слайдера.  */

		this.sliderBtnPushLast.style.pointerEvents = `${pointer}`;
		this.sliderBtnPushNext.style.pointerEvents = `${pointer}`;
	}

	nullifiesCssSliderTrack() {
		/* Обнуляет все стили у блока - sliderTrack  */

		this.sliderTrack.style.transition = "none";
		this.sliderTrack.style.transform = `translate3d(-${this.slider.clientWidth}px, 0px, 0px)`;
	}


	// Пользовательские настройки: автоматическое продвижение слайдера.
	addSetInterval_For_Slider() {
		/* Добавляет setInterval для автоматического продвижения слайдера.  */

		if (this.freezeSliderOnLossFocus) {
			this.addEventScroll_BlurWindow();
			this.countsPositionSlider_Window();
		} else {
			this.createSetInterval_For_Slider();
		};
	}

	addEventScroll_BlurWindow() {
		/* Добавляет события скролла на всё окно для измерения области видимиости слайдера.  */

		this.isVisible = false;

		window.addEventListener("scroll", () => {
			this.countsPositionSlider_Window();
		});
	}

	countsPositionSlider_Window() {
		/* Выщитывает кординты блоков и вызвает проверку на зону видимости слайдера.  */

		const positionSlider = {
			top: window.pageYOffset + this.slider.getBoundingClientRect().top,
			bottom: window.pageXOffset + this.slider.getBoundingClientRect().bottom,
		};

		const positionWindow = {
			top: window.pageYOffset,
			bottom: window.pageYOffset + document.documentElement.clientHeight
		};

		this.checks_If_SliderVisible(positionSlider, positionWindow);
	}

	checks_If_SliderVisible(positionSlider, positionWindow) {
		/* Проверяет находится ли слайдер в зоне видимости.  */

		if (positionWindow.top - this.slider.clientHeight <= positionSlider.top &&
			positionSlider.top < positionWindow.bottom) {

			if (this.isVisible) {
				return;
			};

			this.createSetInterval_For_Slider();

			this.isVisible = true;

		} else {
			this.clearnsSetIntervals();
			this.isVisible = false;
		};
	}

	checks_If_UserOnSite() {
		/* Проверяет находится ли пользователь на сайте. Если нет, то заморозим слайдер.  */

		if (!this.timerAdvance[0]) {
			return;
		};

		document.addEventListener("visibilitychange", () => {
			if (document.hidden){
				this.clearnsSetIntervals();
				this.isVisible = false;
			} else {
				this.countsPositionSlider_Window();
			};
		});
	}

	addEventMouse_TouchMove_Slider() {
		/* Добавляет события наведение на слайдер чтобы его заморозить.  */

		this.slider.addEventListener("mousemove", () => { this.clearnsSetIntervals(); });
		this.slider.addEventListener("mouseout", () => { this.createSetInterval_For_Slider(); });

		this.slider.addEventListener("touchstart", () => {
			this.clearnsSetIntervals();
			this.clearnsSetTimeouts();
		}, { passive: true });

		this.slider.addEventListener("touchend", () => {

			this.timeout = setTimeout(() => {
				this.createSetInterval_For_Slider();
			}, 300);
			this.timeouts.push(this.timeout);

		}, { passive: true });
	}

	createSetInterval_For_Slider() {
		/* Создаёт setInterval для поочерёдного движения слайдера.  */

		this.timeInterval = setInterval(() => {
			this.sliderTrack.style.transform = `translate3d(-${this.widthSlide * 2}px, 0px, 0px)`;
			this.addCssSliderTrack();
			this.blocking_unlockingBtnsSliders("none");

			if (this.movesSlider_If_OnlyTwoSlides()) return;

			setTimeout(() => {
				this.movesFirstSlide_TheEnd();
				this.blocking_unlockingBtnsSliders("auto");
			}, this.speed * 1.5);

		}, this.timerAdvance[1]);

		this.intervals.push(this.timeInterval);
	}


	clearnsSetIntervals() {
		/* Чистит все созданные setInterval. */

		this.intervals.forEach((interval) => {
			window.clearInterval(interval);
		});
	}

	clearnsSetTimeouts() {
		/* Чистит все созданные setInterval. */

		this.timeouts.forEach((timeout) => {
			window.clearInterval(timeout);
		});
	}


	run() {
		this.addLastSlideStart();
		this.addEventClick_BtnsSliderPush();

		this.sliderTrack.style.transform = `translate3d(-${this.slider.clientWidth}px, 0px, 0px)`;
	}
};