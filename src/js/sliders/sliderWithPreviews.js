import Slider from "./slider.js";


export class SliderWithPreviews extends Slider {
    /**
	* @param slider - block "slider-with-previews" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	Слайдер с превьюхами
	*/

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;

		this.currentSlide = 0;

		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.sliderTrack = this.slider.querySelector(".slider-track");

    	this.positionPressedX;
    	this.positionPressedY;
    	this.positionFingerPressSliderX;
    	this.positionFingerPressSliderY;
    	this.positionX_FingetCurrentMoment_OnSlider;
    	this.positionY_FingetCurrentMoment_OnSlider;

    	this.positionSliderTrack = 0;
    	this.positionFinal = 0;

		this.allowSwipe = true;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

    	this._swipeStart = () => { this.swipeStart(); };
    	this._swipeAction = () => { this.swipeAction(); };
    	this._swipeEnd = () => { this.swipeEnd(); };

		this.addNavigation();
		this.addOptions();

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.speed = (this.options.speed) ? this.options.speed : 200;
	}

	addNavigation() {
		const navigation = this.slider.querySelector(".slider-navigation");

		if ( navigation ) {
			super.addNavigation();
		};
	}


	// Передвижение
	pushingSlider() {
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		if (Math.abs(this.singleSwipe >= 5) && !this.isScrollingSlider) {
			this.isScrollingSlider = true;
		};
	}

	swipeStart() {
		super.addEventsSliderTrack();

		const evt = super.getEvent();

		super.calculatesTouchCoordinates_SwipeStart(
			this.evt = evt
		);

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
	}

	swipeAction() {
		const evt = super.getEvent();

		super.checkSliderCanBeMoved(
			this.evt = evt
		);

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

	addTransitionSliderTrack() {
		this.currentSlide += ( this.singleSwipe > 0 ) ? 1 : -1;

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;
		this.positionSliderTrack = this.currentSlide * this.sliderWidth;
		this.positionFinal = this.positionSliderTrack;
		this.allowSwipe = false;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;
		}, 0)

		setTimeout(() => {
			this.sliderTrack.style.transition = "none";
			this.allowSwipe = true;
		}, this.speed)
	}

	swipeEnd() {
		super.removeEventsSliderTrack();
		this.addTransitionSliderTrack(500);
	}


	run() {
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
	}
};
