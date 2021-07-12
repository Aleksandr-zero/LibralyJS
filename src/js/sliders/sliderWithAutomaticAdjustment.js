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
		this.singleSwipe;

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
		super.checkNavigation();
		super.checkIsPaginationSlider();
		super.measuresMaximumSwipeOfSlider();

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
	checkIsNavigation_Pagination() {
		if ( this.isPagination ) {
			super.watchSwipeSliderTrack_Pagination();
		};
	}

	setsTransition_For_PushingWithFight() {
		/* Устанавливает плавную прокрутку для передвижения слайдера с боем.  */

		this.checks_In_WhichDirectionMoveSlider();

		const newPosition = this.calculatesPositionSliderTrack();
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

    	if ( this.directionSliderTrack === "right" && this.currentSlide !== this.numberSlides ) {
    		this.currentSlide++;
    	} else if ( this.directionSliderTrack === "left" && this.currentSlide !== 0 ) {
    		this.currentSlide--;
    	};

		this.checkIsNavigation_Pagination();
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

    calculatesPositionSliderTrack() {
    	let newPosition = 0;

        for(let i = 0; this.currentSlide > i; i++){
        	const widthSlide =  Math.round(this.slides[i].getBoundingClientRect().width);
        	newPosition += widthSlide;
        };

        newPosition = (newPosition > this.maximumSwipingAtSlider) ? this.maximumSwipingAtSlider : newPosition;

        return newPosition;
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
			let finalPosition = this.calculatesPositionSliderTrack();

			finalPosition = (this.directionSliderTrack === "right") ?
							finalPosition + (this.slides[this.currentSlide].offsetWidth - this.sliderWidth) :
							finalPosition;

			this.sliderTrack.style.transform = `translate3d(${-finalPosition}px, 0px, 0px)`;

			this.positionSliderTrack = finalPosition;

			this.swipeEnd();
			this.isPushSliderWithFight = true;
		};
	}

	swipeStart() {
		if (!this.allowSwipe) {
			this.allowSwipe = true;
            return;
        };

		const evt = super.getEvent();

		super.calculatesTouchCoordinates_SwipeStart(
			this.evt = evt
		);

		if ( this.currentSlide === this.numberSlides - 1 ) {
			this.isReturnSlider = true;
		};

		this.isSliderWithFight = (this.sliderWidth >= this.slides[this.currentSlide].offsetWidth) ?
								 true : false;
		this.isSliderWithoutFight = (this.sliderWidth <= this.slides[this.currentSlide].offsetWidth) ?
									true : false;

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;

		super.addEventsSliderTrack();
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

		this.isScrollingSlider = (Math.abs(this.singleSwipe) >= 5) ? true : false;

		if ( this.isPushSliderWithFight ) {
			this.isPushSliderWithFight = false;

			if (this.positionSliderTrack <= this.calculatesPositionSliderTrack() ||
				this.positionSliderTrack >= this.calculatesPositionSliderTrack() + (this.slides[this.currentSlide].offsetWidth - this.sliderWidth) ) {
				this.isPushSliderWithFight = true;
			};
		};

		this.isReturnSlider = (this.singleSwipe < 0 && this.isReturnSlider) ? false : this.isReturnSlider;

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
		super.removeEventsSliderTrack();
		this.isScrollingSlider = false;

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

		this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
	}
};