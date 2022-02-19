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
		this.countSlides = this.slides.length;
		this.sliderBtns = this.slider.querySelectorAll(".slider-split-btn");

		this.sliderWidth = this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.percentageForChangingSlides = Math.round(this.sliderWidth / this.countSlides);

		this._mouseMovement_On_Slider = () => this.mouseMovement_On_Slider();

		this.setOptions();
		this.setsZIndex_For_Slides();
		this.setsInitialSlide();
	}

	setOptions() {
		this.sliderActivationOnHover = ( "sliderActivationOnHover" in this.options ) ?
			this.options.sliderActivationOnHover : false;
		this.changeSlidesByButtons = ( "changeSlidesByButtons" in this.options ) ?
			this.options.changeSlidesByButtons : true;
			
		if ( !this.changeSlidesByButtons ) {
			this.changeSlidesByButtons = true;
			this.sliderActivationOnHover = true;
		} else {
			this.changeSlidesByButtons = true;
		};

		this.activeClass = ( "activeClass" in this.options ) ? this.options.activeClass : "slide--active";
		this.activeClassBtn = ( "activeClassBtn" in this.options ) ? this.options.activeClassBtn : "split-btn--active";
		this.initial = ( "initial" in this.options ) ? this.options.initial : 1;
		this.currentSlide = this.initial - 1;
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
		this.slides.forEach(slide => slide.classList.remove(this.activeClass));
		if ( this.currentSlide >= 0 ) this.slides[this.currentSlide].classList.add(this.activeClass);
	}

	setsActiveBtn() {
		this.sliderBtns.forEach(btn => btn.classList.remove(this.activeClassBtn));
		if ( this.currentSlide >= 0 ) this.sliderBtns[this.currentSlide].classList.add(this.activeClassBtn);
	}

	setsZIndex_For_Slides() {
		let zIndex = 5 * this.countSlides;

		this.slides.forEach((slide) => {
			slide.style.zIndex = `${zIndex}`;
			zIndex -= 5;
		});
	}

	setsInitialSlide() {
		this.slides[this.initial - 1].classList.add(this.activeClass);
		this.sliderBtns[this.initial - 1].classList.add(this.activeClassBtn);
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
