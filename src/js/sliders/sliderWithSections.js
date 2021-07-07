import Slider from "./slider.js";


export class SliderWithSections extends Slider {
    /**
	* @param slider - block "slider-with-sections" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с секциями
    */

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.btnPrev = this.slider.querySelector(".btn-slider-push-last");
		this.btnNext = this.slider.querySelector(".btn-slider-push-next");

		this.allowSwipe = true;

		this.positionSliderTrack = 0;
		this.slides = this.slider.querySelectorAll(".slide");

		this.addOptions();

		this.lastVisibleSlide = this.visibleSlides;
	}

	addOptions() {
		this.scrollSlidesAtTime = (this.options.scrollSlidesAtTime) ? this.options.scrollSlidesAtTime : 1;
		this.visibleSlides = this.options.visibleSlides;
		this.speed = (this.options.speed) ? this.options.speed : 250;

		if ( !this.visibleSlides ) {
			throw "You did not specify a parameter <visibleSlides>"
		};
	}


	// Вспомогательные методы
	getNewPositionSliderTrack(numberSlide) {
		/* Выщитывает новую позицию при текущем слайде.  */

		let newPosition = 0;

		for (let slide = 0; slide < numberSlide; slide++) {
			newPosition += this.slides[slide].offsetWidth + parseFloat(getComputedStyle(this.slides[slide]).marginRight);
		};

		return newPosition - ( this.slider.offsetWidth + parseFloat(getComputedStyle(this.slides[0]).marginRight));
	}


	// Добавление событий
	addEventClickBtnPushSlider() {
		this.btnPrev.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
		this.btnNext.addEventListener("click", () => { this.pushSliderOnClickBtn(); });
	}

	pushSliderOnClickBtn() {
		/* Передвигает слайдер при клике на кнопку.  */

		const direction = event.currentTarget.dataset.direction;

		if ( ( this.lastVisibleSlide === this.visibleSlides && direction === "last") || !this.allowSwipe ) {
			return;
		};

		this.lastVisibleSlide += (direction === "next") ? this.scrollSlidesAtTime : -this.scrollSlidesAtTime

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


	run() {
		this.addEventClickBtnPushSlider();
	}
};
