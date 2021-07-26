import Slider from "./slider.js";


export class SliderWithoutFight extends Slider {
	/**
	Слайдер без боя.
	* @param slider -> block "slider-without-fight" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
	*/

	constructor(slider, options) {
		super();

		this.slider = slider;
		this.options = options;
		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.sliderWidth = this.slider.offsetWidth;

		this.maximumSwipingAtSlider = 0;

		this.positionSliderTrack = 0;
		this.positionFinal = 0;
		this.singleSwipe = 0;

		this.positionPressedX;
		this.positionPressedY;
		this.positionFingerPressSliderX;
		this.positionFingerPressSliderY;
		this.positionX_FingetCurrentMoment_OnSlider;
		this.positionY_FingetCurrentMoment_OnSlider;

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		super.measuresMaximumSwipeOfSlider();
		this.addOptions();

		this._swipeStart = () => { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => { this.swipeEnd(); };

		this.goingOutBoundsSlider = () => {
			/* Выход за границы слайдера мышкой. */

			this.swipeEnd();
			this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		};
	}

	addOptions() {
		/* Добавляет пользовательские настройки для слайдера.  */
		this.scrollAfterAbruptStop = (this.options) ? this.options.scrollAfterAbruptStop : true;
	}


	// Вспомогательные методы.
	checksOutOfBounds() {
		/* Если палец будет заходить за границы слайдера то запрещаем его двигать.  */

		if (
			(this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
			(this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
			) {

			this.measuresSpeedTrafficSliderTrack();
			this.removeEventsSliderTrack();
		};
	}


	// Автоматическая прокрутка.
	measuresSpeedTrafficSliderTrack() {
		/* Измеряет скорость движение трека.  */

		const speedSlider = (this.singleSwipe / this.swipeSlider_Time).toFixed(2);

		this.autoPushingSlider(speedSlider);
	}

	autoPushingSlider(speedSlider) {
		/* Автоматически пролистывает слайдер  */

		if (speedSlider <= 0.6 || this.positionSliderTrack > this.maximumSwipingAtSlider) {
			return;
		};

		let newPosition = speedSlider * this.positionSliderTrack;

		if (newPosition < this.positionSliderTrack) {
		   newPosition = this.positionSliderTrack;
		};

		if (this.directionSliderTrack === "right") {
			newPosition = Math.round(newPosition - (newPosition - (this.positionSliderTrack / 1.45)));
		};

		if (newPosition > this.maximumSwipingAtSlider) {
			newPosition = this.maximumSwipingAtSlider;
		} else if (newPosition < 0) {
			newPosition = 0;
		};

		this.setsStyle_For_autoPushingSlider(newPosition);
	}

	setsStyle_For_autoPushingSlider(newPosition) {
		/* Устанавливает стили для автоматической прокрутки.  */

		this.sliderTrack.style.transform = `translate3d(-${newPosition}px, 0px, 0px)`;
		this.sliderTrack.style.transition = `transform 1s ease-out`;

		this.sliderTrack.addEventListener("transitionend", () => {
			this.sliderTrack.style.transition = `none`;
			this.positionFinal = this.positionSliderTrack = newPosition;
		});
	}

	stopsAutoScrolling() {
		/* Останавливает автоматическую прокрутку при захвата слайдера.  */

		const curretnPositionSliderTrack = Math.abs(
			Math.round(this.sliderTrack.getBoundingClientRect().x) - Math.round(this.slider.getBoundingClientRect().x)
		);
		this.positionFinal = this.positionSliderTrack = curretnPositionSliderTrack;

		this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`
	}


	// Функционал слайдера.
	pushingSlider() {
		this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

		if (this.singleSwipe >= 5) {
			this.isScrollingSlider = true;
		};

		if ( (this.positionSliderTrack <= this.maximumSwipingAtSlider ) && (this.positionSliderTrack > 0)) {
			this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
		};
	};

	swipeStart() {
		this.stopsAutoScrolling();

		this.allowSwipe = true;
		this.time_1 = performance.now();

		const evt = super.getEvent();
        super.calculatesTouchCoordinates_SwipeStart(evt)

		this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;
		this.sliderTrack.style.transition = `none`;

		super.addEventsSliderTrack();
	}

	swipeAction() {
		const evt = super.getEvent();
		this.directionSliderTrack = (this.positionPressedX < evt.clientX) ? "right" : "left";

		super.checkSliderCanBeMoved(evt);

		if (!this.allowSwipe) {
			return
		};

		if (event.type === "touchmove") {
			this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
			this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);

			this.checksOutOfBounds();
		};

		if (this.allowSwipe) {
			this.positionSliderTrack = this.positionPressedX - evt.clientX + this.positionFinal;
			this.pushingSlider();
		};
	};

	swipeEnd() {
		if (!this.allowSwipe) {
			this.allowSwipe = true;
			return;
		};

		this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

		this.positionFinal = this.positionSliderTrack;

		// если мы будем тянуть слайдер, когда уже начало или конец слайдер, то мы будем
		// перезаписыать переменню "positionFinal" на максимальную или минималбную позицию.
		if (this.positionFinal > this.maximumSwipingAtSlider) {
			this.positionFinal = this.maximumSwipingAtSlider;

		} else if (this.positionFinal < 0) {
			this.positionFinal = 0;
		};

		this.allowSwipe = true;
		this.isScrollingSlider = false;

		if (this.scrollAfterAbruptStop) {
			this.swipeSlider_Time = performance.now() - this.time_1;
			this.measuresSpeedTrafficSliderTrack();
		};

		super.removeEventsSliderTrack();
	}


	run() {
		this.sliderTrack.addEventListener("touchstart", () => { this.swipeStart(); }, { passive: true });
		this.sliderTrack.addEventListener("mousedown", () => { this.swipeStart(); });

		this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
	}
};
