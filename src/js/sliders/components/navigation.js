export default class Navigation {
	/**
	* @param slider -> block "slider" ( type -> HTMLElement )
	Создаёт навигацию для слайдера.
	*/

	constructor(slider) {
		this.slider = slider;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.slides = this.slider.querySelectorAll(".slide");
	}

	addTransitionSliderTrack(duration, newPosition) {
		this.sliderTrack.style.transition = `transform 0.${duration}s ease`;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(-${newPosition}px, 0px, 0px)`;
		}, 0);

		setTimeout(() => {
			this.sliderTrack.style.transition = `transform 0s ease`;
		}, duration);
	}

	pushingSliderTrack(direction, currentSlide) {
		if ( currentSlide === this.slides.length - 1 || currentSlide === 0 ) {
			return;
		};

		const newCurrentSlide = (direction === "next") ? currentSlide + 1 : currentSlide - 1;

		const widthNextSlide = Math.round(this.slides[currentSlide].getBoundingClientRect().width);
		const positionSliderTrack = Math.abs(getComputedStyle(this.sliderTrack).transform.split(",")[4]);

		const newPosition = (direction === "next") ?
							positionSliderTrack + widthNextSlide :
							positionSliderTrack - widthNextSlide;

		this.addTransitionSliderTrack(500, newPosition);

		return {
			"position": newPosition,
			"current_slide": newCurrentSlide
		};
	}
};
