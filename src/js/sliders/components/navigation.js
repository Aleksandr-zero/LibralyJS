export default class Navigation {
	/**
	* @param slider -> block "slider" ( type -> HTMLElement )
	Создаёт навигацию для слайдера.
	*/
	constructor(slider, speed) {
		this.slider = slider;
		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.speed = speed;

		this.slides = this.slider.querySelectorAll(".slide");

		this.maximumSwipingAtSlider = 0;

		this.measuresMaximumSwipeOfSlider();
	}

	measuresMaximumSwipeOfSlider() {
		this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
			this.maximumSwipingAtSlider += slide.offsetWidth;
		});

		this.maximumSwipingAtSlider -= this.slider.clientWidth;
	}

	getNewPositionSliderTrack(currentSlide) {
		let newPosition = 0;

		for (let indexSlide = 0; indexSlide < currentSlide; indexSlide++) {
			newPosition +=  Math.round(this.slides[indexSlide].getBoundingClientRect().width);
		};

		const checkNewPosition = this.checkNewPosition(newPosition);
		newPosition = checkNewPosition;

		return newPosition;
	}

	addTransitionSliderTrack(newPosition) {
		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-newPosition}px, 0px, 0px)`;
		}, 0);

		setTimeout(() => {
			this.sliderTrack.style.transition = `transform 0s ease`;
		}, this.speed);
	}

	checkNewPosition(newPosition) {
		if ( newPosition > this.maximumSwipingAtSlider ) {
			newPosition = this.maximumSwipingAtSlider;
		} else if ( newPosition < 0 ) {
			newPosition = 0;
		};

		return newPosition
	}

	pushingSliderTrack(direction, currentSlide) {
		if ( ( currentSlide === this.slides.length - 1 && direction !== "last" ) ||
			 ( currentSlide === 0 && direction !== "next" ) ) {
			return;
		};

		const newCurrentSlide = (direction === "next") ? currentSlide + 1 : currentSlide - 1;
		const newPosition = this.getNewPositionSliderTrack(newCurrentSlide);

		this.addTransitionSliderTrack(newPosition);

		return {
			"position": newPosition,
			"current_slide": newCurrentSlide
		};
	}
};
