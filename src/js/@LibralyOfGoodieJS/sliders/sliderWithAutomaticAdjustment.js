import Slider from "./slider.js";


export class SliderWithAutomaticAdjustment extends Slider {
	/**
	Слайдер с автоматической регулировкой и с боем.
	* @param slider -> block "slider-automatic-adjustment" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	*/

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");
		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);

		this.currentSlide = 0;
		this.slides = this.sliderTrack.querySelectorAll(".slide");
		this.numberSlides = this.slides.length;

		this.directionSliderTrack;

		this.maximumSwipingAtSlider = 0;
		this.positionSliderTrack = 0;
		this.positionFinal = 0;

		this.positionPressedX;
		this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
		this.positionX_FingetCurrentMoment_OnSlider;
		this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;
		this.isSliderWithFight;
		this.isSliderWithoutFight;
		this.isPushSliderWithFight;
		this.isReturnSlider;

		this._swipeStart = () => { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => { this.swipeEnd(); };

		this.addOptions();
		this.measuresMaximumSwipeOfSlider();

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.speed = (this.options.speed) ? this.options.speed : 200;
	}


	// Вспомогательные методы.
	removeEventsSliderTrack() {
		this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
		this.sliderTrack.removeEventListener("touchmove", this._swipeAction);

		this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

		this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);

		this.sliderTrack.classList.remove("slider-active");
	}

	setsTransition_For_PushingWithFight() {
		/* Устанавливает плавную прокрутку для передвижения слайдера с боем.  */

		const newPosition = this.checks_In_WhichDirectionMoveSlider();
		this.positionSliderTrack = newPosition;

		this.allowSwipe = false;
		this.isPushSliderWithFight = false;

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;
		}, 0);

		setTimeout(() => {
			this.allowSwipe = true;
			this.sliderTrack.style.transition = `none`;
		}, this.speed);
	}

    checks_In_WhichDirectionMoveSlider() {
    	/* Проверяет, в каком направлении перемещать слайдер.  */

    	const lastSlide = Math.round(this.slides[this.currentSlide].getBoundingClientRect().width);
    	let nextSlide;

    	if (this.currentSlide) {
    		nextSlide = Math.round(this.slides[this.currentSlide - 1].getBoundingClientRect().width);
    	};

    	let newPosition = ( lastSlide > this.sliderWidth ) ?
    						this.positionFinal + this.sliderWidth :
    						this.positionFinal + lastSlide;

    	newPosition = ( this.directionSliderTrack === "left" ) ? newPosition - nextSlide : newPosition;

    	if ( this.directionSliderTrack === "right" && this.currentSlide !== this.numberSlides ) {
    		this.currentSlide++;
    	} else if ( this.directionSliderTrack === "left" && this.currentSlide !== 0 ) {
    		this.currentSlide--;
    	};

    	return newPosition;
    }

    returnsSliderBack() {
    	/* Возвращает слайдер на место если есть предел.  */

    	this.allowSwipe = false;
    	this.positionSliderTrack = this.positionFinal = this.maximumSwipingAtSlider;

		this.sliderTrack.style.transition = `transform 0.${this.speed}s ease`;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;
		}, 0);

		setTimeout(() => {
			this.allowSwipe = true;
			this.sliderTrack.style.transition = `none`;
		}, this.speed);
    }


	// Функционал слайдера.
	pushingSliderWithFight() {
		/* Продвигает слайдер с боем.  */
		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;
	}

	pushingSliderWithoutFight() {
		/* Продвигает слайдер без боя.  */

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		let positionCurrentSlide = this.slider.getBoundingClientRect().x - this.slides[this.currentSlide].getBoundingClientRect().x;
		positionCurrentSlide = Math.round(positionCurrentSlide);

		if ( (this.slides[this.currentSlide].offsetWidth - this.sliderWidth) <= positionCurrentSlide || positionCurrentSlide < 0) {
			this.swipeEnd();
			this.isPushSliderWithFight = true;
		};
	}

	swipeStart() {
		if (!this.allowSwipe) {
            return;
        };

		const evt = super.getEvent();

		super.calculatesTouchCoordinates_SwipeStart(
			this.evt = evt
		);

		if ( this.currentSlide === this.numberSlides - 1 ) {
			this.isReturnSlider = true;
		};

		if ( this.sliderWidth >= this.slides[this.currentSlide].offsetWidth ) {
			this.isSliderWithFight = true;
			this.isSliderWithoutFight = false;
		} else if ( this.sliderWidth <= this.slides[this.currentSlide].offsetWidth ) {
			this.isSliderWithoutFight = true;
			this.isSliderWithFight = false;
		};

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;

		this.sliderTrack.addEventListener("mousemove", this._swipeAction);
		this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });
		this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });
		this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);

		this.sliderTrack.classList.add("slider-active");
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
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;
		this.directionSliderTrack = (this.singleSwipe < 0) ? "left" : "right";

		// if ( this.singleSwipe < 0 && this.isPushSliderWithFight && this.directionSliderTrack === "left" ) {
		// 	this.isPushSliderWithFight = false;
		// };

		if ( this.singleSwipe < 0 && this.isReturnSlider ) {
			this.isReturnSlider = false;
		};

		if ( this.isSliderWithFight || this.isPushSliderWithFight ) {
			this.pushingSliderWithFight();
		} else if ( this.isSliderWithoutFight && !this.isPushSliderWithFight ) {
			this.pushingSliderWithoutFight();
		};

		if ( event.type === "touchmove" ) {
			this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
			this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);
			super.checksOutOfBounds();
		};
	}

	swipeEnd() {
		this.removeEventsSliderTrack();

		if ( this.isReturnSlider ) {
			this.returnsSliderBack();
			return;
		};

		if ( this.isSliderWithFight || this.isPushSliderWithFight ) {
			this.setsTransition_For_PushingWithFight();
		};

		this.positionFinal = this.positionSliderTrack;
	}


	run() {
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
	}
};