import Slider from "./slider.js";
import HandlerFight from "./handlers/handlerFight.js";


export class SliderWithFight extends Slider {
	/**
	Слайдер с боем.
	* @param slider -> block "slider-with-fight" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	*/

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;

		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.currentSlide = 0;
		this.numberSlides = this.sliderTrack.querySelectorAll(".slide").length;

		this.positionSliderTrack = 0;
		this.positionFinal = 0;
		this.singleSwipe = 0;

		this.positionPressedX;
		this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
		this.positionX_FingetCurrentMoment_OnSlider;
		this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		this.addOptions();
		super.checkIsPaginationSlider();
		super.checkNavigation();

		this._swipeStart = () =>  { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => 	  { this.swipeEnd(); };

		this.percentForSuccessfulScrolling = Math.round((this.sliderWidth / 100) * this.percentageForSuccessfulScrolling);

		this.newHandlerFight = new HandlerFight(
			this.slider,
			this.sliderTrack
		);

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.speed = (this.options.speed) ? this.options.speed : 200;
		this.percentageForSuccessfulScrolling = (this.options.percentageForSuccessfulScrolling) ?
												 this.options.percentageForSuccessfulScrolling : 35;
	}


	// Вспомогательные методы.
	checkIsNavigation_Pagination() {
		if ( this.isPagination ) {
			super.watchSwipeSliderTrack_Pagination();
		};
	}


	checksIfSliderNeedsPromoted() {
		/* Проверяет надо ли продвигать слайдер.  */

		this.currentSlide += (this.singleSwipe >= this.percentForSuccessfulScrolling && this.currentSlide !== this.numberSlides.length - 1) ?
			1 : -1;

		if ( this.currentSlide < 0 ) {
			this.currentSlide = 0;
		} else if ( this.currentSlide > this.numberSlides - 1 ) {
			this.currentSlide = this.numberSlides - 1;
		};

		const newPositionFinal = this.newHandlerFight.addTransitionSliderTrack(
			this.currentSlide,
			this.speed
		);
		this.positionFinal = newPositionFinal;

		this.checkIsNavigation_Pagination();
	}


	// Функционал слайдера.
	pushingSlider() {
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		if (Math.abs(this.singleSwipe) >= 5) {
			this.isScrollingSlider = true;
		};
	}

	swipeStart() {
		if ( !this.allowSwipe ) {
			setTimeout(() => {
				this.allowSwipe = true;
			});
			return;
		};

		const evt = super.getEvent();

		this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`;

		super.calculatesTouchCoordinates_SwipeStart(evt);
		super.addEventsSliderTrack();
	}

	swipeAction() {
		const evt = super.getEvent();

		super.checkSliderCanBeMoved(evt);

		if (!this.allowSwipe) {
			return
		};

		this.positionSliderTrack = this.positionPressedX - evt.clientX + this.positionFinal;

		if (event.type === "touchmove") {
			this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
			this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);

			super.checksOutOfBounds();
		};

		this.pushingSlider();
	}

	swipeEnd() {
		super.removeEventsSliderTrack();
		this.isScrollingSlider = false;
		this.allowSwipe = true;

		if ((Math.abs(this.singleSwipe) <= this.percentForSuccessfulScrolling)) {
			this.newHandlerFight.returnsSliderBack(this.currentSlide, this.speed);
			return;
		};

		this.checksIfSliderNeedsPromoted();
		this.singleSwipe = 0;
	}


	run() {
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });

		this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
	}
};
