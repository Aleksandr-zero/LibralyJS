export class SliderSplit {
  /**
    * @param slider -> block "slider-split" ( type -> HTMLElement )
    * @param options -> custom settings ( type -> Object )
		Разделённый слайдер в одной плоскости.
  */
	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.slides = this.slider.querySelectorAll(".slide");
		this.slidesNumbers = this.slides.length;
		this.sliderBtns = this.slider.querySelectorAll(".slider-split-btn");

		this.currentSlide = 0;

		this.sliderWidth = this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.percentageForChangingSlides = Math.round(this.sliderWidth / this.slidesNumbers);

		this._mouseMovement_On_Slider = () => { this.mouseMovement_On_Slider(); };

		this.addOptions();
		this.setsZIndex_For_Slides();
	}

	addOptions() {
		this.sliderActivationOnHover = (this.options.sliderActivationOnHover) ?
			this.options.sliderActivationOnHover : false;

		if ( !this.changeSlidesByButtons && this.options.changeSlidesByButtons ) {
			this.changeSlidesByButtons = true;
			this.sliderActivationOnHover = false;
		} else {
			this.changeSlidesByButtons = false;
		};
	}

	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

	findSlide_CurrentLocationsCursor(evt) {
		const positionCurrentCursor = parseFloat(Math.abs(evt.clientX - this.slider.getBoundingClientRect().x).toFixed(2));
		const currentSlide = Math.floor(positionCurrentCursor / this.percentageForChangingSlides);

		if ( this.currentSlide !== currentSlide ) {
			this.currentSlide = currentSlide;

			this.setsActiveSlide();
			this.setsActiveBtn();
		};
	}

	setsActiveSlide() {
		this.slides.forEach(slide => slide.classList.remove("slide-split-active"));
		if ( this.currentSlide >= 0 ) this.slides[this.currentSlide].classList.add("slide-split-active");
	}

	setsActiveBtn() {
		this.sliderBtns.forEach(btn => btn.classList.remove("split-btn-active"));
		if ( this.currentSlide >= 0 ) this.sliderBtns[this.currentSlide].classList.add("split-btn-active");
	}

	setsZIndex_For_Slides() {
		let zIndex = 5 * this.slidesNumbers;

		this.slides.forEach((slide) => {
			slide.style.zIndex = `${zIndex}`;
			zIndex -= 5;
		});
	}

	mouseMovement_On_Slider() {
		this.findSlide_CurrentLocationsCursor(
			this.evt = this.getEvent()
		);
	}

	addEventClickBtns() {
		this.sliderBtns.forEach((btn) => {
			btn.addEventListener("click", () => { this.changeSlides(); });
		});
	}

	changeSlides() {
		this.currentSlide = this.sliderBtns_Arr.indexOf(event.currentTarget);
		this.setsActiveBtn();
		this.setsActiveSlide();
	}

	run() {
		if ( this.sliderActivationOnHover ) {
			this.slider.addEventListener("mousemove", this._mouseMovement_On_Slider);
		} else if ( this.changeSlidesByButtons ) {
			this.sliderBtns_Arr = Array.from(this.sliderBtns);
			this.addEventClickBtns();
		};
	}
};
