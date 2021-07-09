import Slider from "./slider.js";


export class SliderWithSections {
	/**
	* @param slider - block "slider-with-sections" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с секциями
	*/

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		if ( this.slider ) {
			this.sliderTrack = this.slider.querySelector(".slider-track");

			this.btnPrev = this.slider.querySelector(".btn-slider-push-last");
			this.btnNext = this.slider.querySelector(".btn-slider-push-next");

			this.slides = this.slider.querySelectorAll(".slide");
		}

		this.allowSwipe = true;

		this.positionSliderTrack = 0;

		this.addOptions();
		this.createBreakpoints();
	}

	addOptions() {
		this.options = this.options;

		this.scrollSlidesAtTime = (this.options.scrollSlidesAtTime) ? this.options.scrollSlidesAtTime : 1;
		this.slidesPerView = this.options.slidesPerView;
		this.lastVisibleSlide = this.slidesPerView;

		this.speed = (this.options.speed) ? this.options.speed : 250;
		this.breakpoints = (this.options.breakpoints) ? this.options.breakpoints : {};


		if ( !this.slidesPerView ) {
			throw "You did not specify a parameter <slidesPerView>"
		};
	}

	// Вспомогательные методы
	getNewPositionSliderTrack(numberSlide) {
		/* Выщитывает новую позицию при текущем слайде.  */

		let newPosition = 0;

		for (let slide = 0; slide < numberSlide; slide++) {
			newPosition += this.slides[slide].offsetWidth + parseFloat(getComputedStyle(this.slides[slide]).marginRight);
		};

		newPosition = (this.lastVisibleSlide !== this.slides.length) ?
					   newPosition - ( this.slider.offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight)) :
					   newPosition - this.slider.offsetWidth;
		return newPosition;
	}

	checksIfLimitIsExceeded() {
		if ( this.lastVisibleSlide > this.slides.length ) {
			this.lastVisibleSlide = this.slides.length;
		} else if ( this.lastVisibleSlide < this.slidesPerView ) {
			this.lastVisibleSlide = this.slidesPerView;
		};
	}

	updateApplicationBreakpoints() {
		const keys = Object.keys(this.breakpoints).map(Number);
		keys.forEach((key) => {
			this.applicationBreakpoints[key] = false;
		});
	}


	// Создание брейкпоинтов
	getBreakpoints() {
		return Object.entries(this.breakpoints).length === 0 && this.breakpoints.constructor === Object ? false : true;
	}

	createBreakpoints() {
		if ( !this.getBreakpoints() ) {
			return;
		};

		this.createBreakpoint();
		this.checkResizeWindow_FisrtStart();
	}

	// Добавление событий
	addEventClickBtnPushSlider() {
		this.btnPrev.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
		this.btnNext.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
	}

	// Функционал передвижения
	pushSliderOnClickBtn() {
		/* Передвигает слайдер при клике на кнопку.  */

		const direction = event.currentTarget.dataset.direction;

		if ( ( this.lastVisibleSlide === this.slidesPerView && direction === "last") || !this.allowSwipe ) {
			return;
		};

		this.lastVisibleSlide += (direction === "next") ? this.scrollSlidesAtTime : -this.scrollSlidesAtTime

		this.checksIfLimitIsExceeded();

		const newPosition = this.getNewPositionSliderTrack(this.lastVisibleSlide);
		this.addTransitionSliderTrack(newPosition);
	}

	addTransitionSliderTrack(newPosition) {
		/* Добавляет плавную прокрутку для слайдера.  */

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.positionSliderTrack = newPosition;
			this.sliderTrack.style.transform = `translate3d(${-newPosition}px, 0px, 0px)`;
		}, 0);
	}


	// брейкпоинты
	checkResizeMaxWidthBreakpoint() {
		window.addEventListener("resize", () => {
			if ( window.innerWidth > this.maxWidth && this.applicationBreakpoints[this.maxWidth] ) {
				this.updateApplicationBreakpoints();

				this.setsNewDataBreakpoints(false);
			};
		});
	}

	updateApplication_ForBreakpoints(currentWidth) {
		const keys = Object.keys(this.applicationBreakpoints).map(Number);

		keys.forEach((key) => {
			if ( key !== currentWidth ) {
				this.applicationBreakpoints[key] = false;
			};
		});
	};

	addEventResizeWindow(width, data, secondaryWidth) {
		/* Создаёт для каждого брейкпоинта отдельный обработчик.  */

		const checkResizeWindow = () => {
			return ( secondaryWidth ) ?
				window.innerWidth <= width && window.innerWidth > secondaryWidth :
				window.innerWidth <= width;
		};

		window.addEventListener("resize", () => {
			if ( checkResizeWindow() && !this.applicationBreakpoints[width] ) {
				this.applicationBreakpoints[width] = true;
				this.setsNewDataBreakpoints(data);

				this.updateApplication_ForBreakpoints(width);
			};
			this.checkResizeMaxWidthBreakpoint();
		});
	}

	createBreakpoint() {
		/* Создаёт данные для прослушки изменения ширины экрана.  */

		this.applicationBreakpoints = {};

		this.updateApplicationBreakpoints();

		const keys = Object.keys(this.breakpoints).map(Number);
		this.maxWidth = Math.max(...keys);

		Object.entries(this.breakpoints).forEach((breakpoint, index) => {
			let secondaryWidth = keys[index - 1];
			const width = parseInt(breakpoint[0]);
			const data = breakpoint[1];

			this.addEventResizeWindow(width, data, secondaryWidth);
		});
	}

	checkResizeWindow_FisrtStart() {
		/* Проверяет ширину экрана при первом запуске слайдера.  */

		const checkResizeWindow = (width, secondaryWidth) => {
			return ( secondaryWidth ) ?
				window.innerWidth <= width && window.innerWidth > secondaryWidth :
				window.innerWidth <= width;
		};

		const keys = Object.keys(this.breakpoints).map(Number);

		keys.forEach((key, index) => {
			if ( checkResizeWindow(key, keys[index - 1]) ) {
				this.applicationBreakpoints[key] = true;

				const newData = this.breakpoints[key];
				this.setsNewDataBreakpoints(newData);
			};
		});
	}

	setsNewDataBreakpoints(newData) {
		this.slidesPerView = (newData.slidesPerView) ? newData.slidesPerView : this.options.slidesPerView;
		this.scrollSlidesAtTime = (newData.scrollSlidesAtTime) ? newData.scrollSlidesAtTime : this.options.scrollSlidesAtTime;
		this.lastVisibleSlide = (newData.slidesPerView) ? newData.slidesPerView : this.options.slidesPerView;
	}


	run() {
		this.addEventClickBtnPushSlider();
	}
};
