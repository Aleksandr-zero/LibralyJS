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

        this.positionPressedX;
        this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider;
        this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		this.intervals = [];
		this.timeouts = [];

		this._swipeStart = () => { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => { this.swipeEnd(); };

		this.addOptions();

        this.goingOutBoundsSlider = () => {
            /* Выход за границы слайдера мышкой. */

            this.swipeEnd();
            this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        };
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


	// Навешивание событий.
	addEventsSliderTrack() {
        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
	}

    removeEventsSliderTrack() {
        /* Удаляет события у блока - sliderTrack и у самого слайдер  */

        this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
        this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

        this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);

        this.slider.classList.remove("slider-active");
    }


	pushingSlider() {
		/* Продвигет слайдер.  */

		const direction = (this.positionSliderTrack > this.widthSlide) ? "next" : "last";

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

	startPushSliderEndLess() {
		this.allowSwipe = false;

		this.clearnsSetIntervals();

		this.pushingSlider();

		setTimeout(() => {

			if (!this.freezeSliderMouseHover) {
				this.createSetInterval_For_Slider();
			};

			this.allowSwipe = true;

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
			this.allowSwipe = false;

			if (this.movesSlider_If_OnlyTwoSlides()) return;

			setTimeout(() => {
				this.movesFirstSlide_TheEnd();
				this.allowSwipe = true;
			}, this.speed * 1.5);

		}, this.timerAdvance[1]);

		this.intervals.push(this.timeInterval);
	}


	// Функционал слайдера.
    pushingSwipeSlider() {
        this.singleSwipe = this.positionSliderTrack;

    	this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

        if (Math.abs(this.singleSwipe) >= 5) {
            this.isScrollingSlider = true;
        };
    }

	swipeStart() {
        this.allowSwipe = true;

		const evt = super.getEvent();

        super.calculatesTouchCoordinates_SwipeStart(
            this.evt = evt
        );

		this.clearnsSetIntervals();

        this.addEventsSliderTrack();
	}

	swipeAction() {
    	const evt = super.getEvent();

        super.checkSliderCanBeMoved(
            this.evt = evt
        );

        if (!this.allowSwipe) {
            return
        };

        this.positionSliderTrack = this.positionPressedX - evt.clientX + this.widthSlide;

        if (event.type === "touchmove") {
            this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
            this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);
            super.checksOutOfBounds();
        };

		this.pushingSwipeSlider();
	}

	swipeEnd() {
		this.isScrollingSlider = false;
		this.removeEventsSliderTrack();

		this.startPushSliderEndLess();
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

		this.sliderTrack.addEventListener("touchstart", this._swipeStart);
		this.sliderTrack.addEventListener("mousedown", this._swipeStart, { passive: true });

		this.sliderTrack.style.transform = `translate3d(-${this.slider.clientWidth}px, 0px, 0px)`;
	}
};