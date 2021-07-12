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
		this.className = "SliderWithPreviews";

		this.currentSlide = 0;
		this.currentSlidePreview = 0;

		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.sliderTrack = this.slider.querySelector(".slider-track");
		this.slides = this.slider.querySelectorAll(".slide");
		this.sliderTrackPreviews = this.slider.querySelector(".slider-track-previews");
		this.slidesPreviews = this.slider.querySelectorAll(".slide-preview");

		this.slidePreviewsMarRight = parseInt(getComputedStyle(this.slidesPreviews[this.currentSlidePreview]).marginRight);

    	this.positionPressedX;
    	this.positionPressedY;
    	this.positionFingerPressSliderX;
    	this.positionFingerPressSliderY;
    	this.positionX_FingetCurrentMoment_OnSlider;
    	this.positionY_FingetCurrentMoment_OnSlider;

    	this.positionSliderTrack = 0;
    	this.positionFinal = 0;

    	this.positionSliderTrackPreview = 0;

		this.allowSwipe = true;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

    	this._swipeStart = () => { this.swipeStart(); };
    	this._swipeAction = () => { this.swipeAction(); };
    	this._swipeEnd = () => { this.swipeEnd(); };

		this.addOptions();
		this.addNavigation();

		this.lastVisibleSlidePreviews = this.slidesPreviewPerView;

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.speed = (this.options.speed) ? this.options.speed : 200;
		this.movementClickingOnPreview = (this.options.movementClickingOnPreview) ? this.options.movementClickingOnPreview : false;
		this.slidesPreviewPerView = this.options.slidesPreviewPerView;

		if ( !this.slidesPreviewPerView ) {
			throw "You did not specify a parameter <slidesPreviewPerView>"
		};
	}

	addNavigation() {
		const navigation = this.slider.querySelector(".slider-navigation");

		if ( navigation ) {
			super.addNavigation();
		};
	}

	// Навешивание событий.
	addEvent_SliderPreviews() {
		/* Добавляет прослушку на слайдер с првьюхами.  */

		this.slidesPreviewsArr = Array.prototype.slice.call(this.slidesPreviews);

		this.sliderTrackPreviews.addEventListener("click", () => {
			if ( event.target.classList.contains("slide-preview") ) {
				const pressedSlidePreview = this.slidesPreviewsArr.indexOf(event.target) + 1;

				// this.lastVisibleSlidePreviews = pressedSlidePreview;
				// this.currentSlidePreview = pressedSlidePreview - 1;

				this.pushingSliderPreviews();
			};
		});
	}


	// Передвижение слайдера с превьюхами.
	pushingSliderPreviews() {
		/* Передвижение слайдера с превьюхами.  */

		if ( this.lastVisibleSlidePreviews > this.slidesPreviews.length ) {
			this.lastVisibleSlidePreviews = this.slidesPreviews.length;
			this.currentSlidePreview = this.slidesPreviews.length - this.slidesPreviewPerView;
		};

		this.sliderTrackPreviews.style.transition = `transform 0.${this.speed}s ease`;

		this.positionSliderTrackPreview = this.currentSlidePreview * this.slidesPreviews[0].offsetWidth;
		this.positionSliderTrackPreview += ( this.currentSlidePreview === 1 ) ?
			this.slidePreviewsMarRight : this.slidePreviewsMarRight * this.currentSlidePreview;

		setTimeout(() => {
			this.sliderTrackPreviews.style.transform = `translate3d(${-this.positionSliderTrackPreview}px, 0px, 0px)`;
		}, 0);
	}


	// Передвижение обычного слайдера.
	pushingSlider() {
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		if (Math.abs(this.singleSwipe) >= 5) {
			this.isScrollingSlider = true;
		};
	}

	swipeStart() {
		super.addEventsSliderTrack();

		const evt = super.getEvent();
		super.calculatesTouchCoordinates_SwipeStart(evt);

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
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

	changeDataForSLiderPreviews() {
		this.currentSlidePreview = this.currentSlide;
		this.lastVisibleSlidePreviews = this.currentSlidePreview + this.slidesPreviewPerView;

		if ( this.currentSlidePreview !== 0 ) {
			this.currentSlidePreview--;
			this.lastVisibleSlidePreviews--;
		};
		this.pushingSliderPreviews();
	}

	addTransitionSliderTrack() {
		this.currentSlide += ( this.singleSwipe > 0 ) ? 1 : -1;

		if ( this.currentSlide < 0 ) {
			this.currentSlide = 0;
		} else if ( this.currentSlide > this.slides.length - 1 ) {
			this.currentSlide = this.slides.length - 1;
		};

		this.changeDataForSLiderPreviews();

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
		}, this.speed);
	}

	swipeEnd() {
		super.removeEventsSliderTrack();
		this.addTransitionSliderTrack();

		this.isScrollingSlider = false;
		this.allowSwipe = true;
		this.singleSwipe = 0;
	}


	run() {
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);

		if ( this.movementClickingOnPreview ) {
			this.addEvent_SliderPreviews();
		};
	}
};
