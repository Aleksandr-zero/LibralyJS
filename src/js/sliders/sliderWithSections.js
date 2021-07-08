import Slider from "./slider.js";


class BreakpointControls {
    /**
    * @set breakpoints -> Передвёт обьект с брекпоинтами ( type <Object> )
	Класс для управления брейкпоинтами для класса <SliderWithSections>.
    */

    set breakpoints(value) {
    	this.breakpointsObj = value;
    	this.createBreakpoint();
    }

    addEventResizeWindow(width, data) {
    	/* Создаёт для каждого брейкпоинта отдельный обработчик.  */

    	window.addEventListener("resize", () => {
    		if ( window.innerWidth <= width && !this.applicationBreakpoints.width ) {
    			this.applicationBreakpoints.width = true;
    			SliderWithSections.prototype.newDataBreakpoints = data;
    		};
    	});
    }

    createBreakpoint() {
    	this.applicationBreakpoints = {};

		const keys = Object.keys(this.breakpointsObj);
		keys.forEach((key) => {
			this.applicationBreakpoints[key] = false;
		});

		Object.entries(this.breakpointsObj).forEach((breakpoint) => {
			const width = breakpoint[0];
			const data = breakpoint[1];

			this.addEventResizeWindow(width, data);
		});
    }
};


export class SliderWithSections {
    /**
	* @param slider - block "slider-with-sections" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с секциями
    */

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.btnPrev = this.slider.querySelector(".btn-slider-push-last");
		this.btnNext = this.slider.querySelector(".btn-slider-push-next");

		this.allowSwipe = true;

		this.positionSliderTrack = 0;
		this.slides = this.slider.querySelectorAll(".slide");

		this._aaa = undefined;

		this.addOptions();
		this.createBreakpoints();
	}

	addOptions() {
		this.constructor.prototype.scrollSlidesAtTime = (this.options.scrollSlidesAtTime) ? this.options.scrollSlidesAtTime : 1;
		this.constructor.prototype.slidesPerView = this.options.slidesPerView;
		this.constructor.prototype.lastVisibleSlide = this.slidesPerView;

		this.speed = (this.options.speed) ? this.options.speed : 250;
		this.breakpoints = (this.options.breakpoints) ? this.options.breakpoints : {};


		if ( !this.constructor.prototype.slidesPerView ) {
			throw "You did not specify a parameter <slidesPerView>"
		};
	}

	changeOptionsValue(value) {
		let d = this.changeOptionsValue.d || (
			this.changeOptionsValue.d = {
				enumerable: false,
				writable: false,
				configurable: false,
				value: null
			}
			);
		d.value = value;
		return d;
	}

	set newDataBreakpoints(newData) {
		this.constructor.prototype.slidesPerView = (newData.slidesPerView) ? newData.slidesPerView : this.slidesPerView;
		this.constructor.prototype.scrollSlidesAtTime = (newData.scrollSlidesAtTime) ? newData.scrollSlidesAtTime : this.options.scrollSlidesAtTime;
		this.constructor.prototype.lastVisibleSlide = (newData.slidesPerView) ? newData.slidesPerView : this.slidesPerView;
	}


	// Вспомогательные методы
	getNewPositionSliderTrack(numberSlide) {
		/* Выщитывает новую позицию при текущем слайде.  */

		let newPosition = 0;

		for (let slide = 0; slide < numberSlide; slide++) {
			newPosition += this.slides[slide].offsetWidth + parseFloat(getComputedStyle(this.slides[slide]).marginRight);
		};

		newPosition = (this.constructor.prototype.lastVisibleSlide !== this.slides.length) ?
					   newPosition - ( this.slider.offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight)) :
					   newPosition - this.slider.offsetWidth;
		return newPosition;
	}

	checksIfLimitIsExceeded() {
		if ( this.constructor.prototype.lastVisibleSlide > this.slides.length ) {
			this.constructor.prototype.lastVisibleSlide = this.slides.length;
		} else if ( this.constructor.prototype.lastVisibleSlide < this.constructor.prototype.slidesPerView ) {
			this.constructor.prototype.lastVisibleSlide = this.constructor.prototype.slidesPerView;
		};
	}


	// Создание брейкпоинтов
	getBreakpoints() {
		return Object.entries(this.breakpoints).length === 0 && this.breakpoints.constructor === Object ? false : true;
	}

	createBreakpoints() {
		if ( !this.getBreakpoints() ) {
			return;
		};

		BreakpointControls.prototype.breakpoints = this.breakpoints;
	}

	// Добавление событий
	addEventClickBtnPushSlider() {
		this.btnPrev.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
		this.btnNext.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
	}

	// Функционал передвижения
	pushSliderOnClickBtn() {
		/* Передвигает слайдер при клике на кнопку.  */
		// console.log(this.constructor.prototype.slidesPerView);
		const direction = event.currentTarget.dataset.direction;

		if ( ( this.constructor.prototype.lastVisibleSlide === this.constructor.prototype.slidesPerView && direction === "last") || !this.allowSwipe ) {
			return;
		};

		this.constructor.prototype.lastVisibleSlide += (direction === "next") ?
			this.constructor.prototype.scrollSlidesAtTime :
			-this.constructor.prototype.scrollSlidesAtTime

		this.checksIfLimitIsExceeded();

		const newPosition = this.getNewPositionSliderTrack(this.constructor.prototype.lastVisibleSlide);
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


	run() {
		this.addEventClickBtnPushSlider();
	}
};
