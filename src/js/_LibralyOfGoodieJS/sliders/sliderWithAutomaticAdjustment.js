export class SliderWithAutomaticAdjustment {
    /**
	Слайдер с автоматической регулировкой и с боем.
	* @param slider -> block "slider-automatic-adjustment"
	* @param options -> custom setting
    */

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.currentSlide = 0;
		this.numberSlides = this.sliderTrack.querySelectorAll(".slide");

        this.positionPressedX;
        this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider;
        this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		this._swipeStart = () => { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => { this.swipeEnd(); };

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


	// Вспомогательные методы.
	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

    checksOutOfBounds() {
        /* Если палец будет заходить за границы слайдера то запрещаем его двигать.  */

        if (
            (this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
            (this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
            ) {

            this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
            this.swipeEnd();
        };
    }

	removeEventsSliderTrack() {
		this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
		this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
		this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.removeEventListener("touchend", this._swipeEnd);
	}



	// Функционал слайдера.
	pushingSlider() {

	}

	swipeStart() {

		this.sliderTrack.addEventListener("mousemove", this._swipeAction);
		this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });
		this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });
	}

	swipeAction() {
        if (event.type === "touchmove") {
            this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
            this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);
            this.checksOutOfBounds();
        };
	}

	swipeEnd() {
		this.removeEventsSliderTrack();
	}


	run() {
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
	}
};
