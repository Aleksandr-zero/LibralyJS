import Slider from "./slider.js";
import Pagination from "./components/pagination.js";


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
		this.numberSlides = this.sliderTrack.querySelectorAll(".slide");

		this.positionSlider = 0;
		this.positionFinal = 0;

		this.positionPressedX;
		this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
		this.positionX_FingetCurrentMoment_OnSlider;
		this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		this.addOptions();
		super.checkIsPaginationSLider();

		this._swipeStart = () =>  { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => 	  { this.swipeEnd(); };

		this.percentForSuccessfulScrolling = Math.round((this.sliderWidth / 100) * this.percentageForSuccessfulScrolling);

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		this.percentageForSuccessfulScrolling = (this.options.percentageForSuccessfulScrolling) ?
												 this.options.percentageForSuccessfulScrolling : 35;
	}


	// Вспомогательные методы.
	removeEventsSliderTrack() {
		/* Удаляет события у блока - sliderTrack и у самого слайдер  */

		this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
		this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

		this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
		this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);

		this.slider.classList.remove("slider-active");
	}

	addEventsSliderTrack() {
		this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

		this.sliderTrack.addEventListener("mousemove", this._swipeAction);
		this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

		this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
		this.slider.classList.add("slider-active");
	}

	addTransitionSliderTrack(duration) {
		this.sliderTrack.style.transition = `transform 0.${duration}s ease`;
		this.positionFinal = this.currentSlide * this.sliderWidth;
		this.allowSwipe = false;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
		}, 0)

		setTimeout(() => {
			this.sliderTrack.style.transition = "none";
			this.allowSwipe = true;
		}, duration)
	}

	returnsSliderBack() {
		/* Возвращает слайдер на место если не проскролил нужно количество.  */

		this.addTransitionSliderTrack(500);
	}

	checksIfSliderNeedsPromoted() {
		/* Проверяет надо ли продвигать слайдер.  */

		if (this.singleSwipe >= this.percentForSuccessfulScrolling && this.currentSlide !== this.numberSlides.length - 1) {
			this.currentSlide++;
			this.addTransitionSliderTrack(500);
		} else if (this.singleSwipe <= this.percentForSuccessfulScrolling && this.currentSlide !== 0) {
			this.currentSlide--;
			this.addTransitionSliderTrack(500);
		} else {
			this.returnsSliderBack();
		};

		if ( this.isPagination ) {
			super.watchSwipeSliderTrack();
		};
	}


	// Функционал слайдера.
	pushingSlider() {
		this.singleSwipe = this.positionSliderTrack - this.positionFinal;

		this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

		if (Math.abs(this.singleSwipe >= 5) && !this.isScrollingSlider) {
			this.isScrollingSlider = true;
		};
	}

	swipeStart() {
		this.allowSwipe = true;

		const evt = super.getEvent();

		super.calculatesTouchCoordinates_SwipeStart(
			this.evt = evt
		);

		this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`;

		this.addEventsSliderTrack();
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

	swipeEnd() {
		this.removeEventsSliderTrack();
		this.isScrollingSlider = false;
		this.allowSwipe = true;

		if ((Math.abs(this.singleSwipe) <= this.percentForSuccessfulScrolling)) {
			this.returnsSliderBack();
			return;
		};

		this.checksIfSliderNeedsPromoted();
	}


	run() {
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
	}
};
