export class SliderBeforeAfter {
  /**
		Слайдер до-после.
		* @param slider -> block "slider-before-after" ( type -> HTMLElement )
		* @param options -> custom settings ( type -> Object )
  */
	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderSwitch = this.slider.querySelector(".slider-switch");
		this.slideBefore = this.slider.querySelector(".slide-before");
		this.slideBeforeBody = this.slideBefore.querySelector(".slide-before-body")

		this.sliderWidth = this.slider.offsetWidth;

		this.positionSliderSwitch;
		this.positionFinal = 0;

		this.positionPressedX;

		this._pushingSliderSwitch = () => { this.pushingSliderSwitch(); };

		this.goingOutBoundsSlider = () => {
			this.swipeEnd();
			this.sliderSwitch.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

	removeEventsSliderSwitch() {
		this.sliderSwitch.removeEventListener("mousemove", this._pushingSliderSwitch);
		this.sliderSwitch.removeEventListener("touchmove", this._pushingSliderSwitch);
	}

	pushingSliderSwitch() {
		const evt = this.getEvent();

		this.positionSliderSwitch = this.positionPressedX - evt.clientX + this.positionFinal;

		const newWidthSlideBefore = this.sliderWidth + this.positionSliderSwitch;
		const positionSlideBeforeBody = Math.abs(this.positionSliderSwitch) / 2;

		this.sliderSwitch.style.left = `${Math.abs(this.positionSliderSwitch)}px`;
		// this.slideBefore.style.left = `${this.positionSliderSwitch}px`;
		this.slideBefore.style.width = `${newWidthSlideBefore}px`;
		this.slideBeforeBody.style.minWidth = `${this.sliderWidth}px`;
		this.slideBeforeBody.style.left = `${-positionSlideBeforeBody}px`;
	}

	swipeStart() {
		const evt = this.getEvent();

		this.positionPressedX = evt.clientX;

		this.sliderSwitch.style.left = `${-this.positionFinal}px`;

		this.sliderSwitch.addEventListener("mousemove", this._pushingSliderSwitch);
		this.sliderSwitch.addEventListener("touchmove", this._pushingSliderSwitch, { passive: true });
		this.sliderSwitch.addEventListener("mouseout", this.goingOutBoundsSlider);
	}

	swipeEnd() {
		this.removeEventsSliderSwitch();
		this.positionFinal = this.positionSliderSwitch;
	}

	run() {
		this.sliderSwitch.addEventListener("mousedown", () => { this.swipeStart(); });
		this.sliderSwitch.addEventListener("touchstart", () => { this.swipeStart(); }, { passive: true });

		this.sliderSwitch.addEventListener("mouseup", () => { this.swipeEnd(); });
		this.sliderSwitch.addEventListener("touchend", () => { this.swipeEnd(); });
	}
};
