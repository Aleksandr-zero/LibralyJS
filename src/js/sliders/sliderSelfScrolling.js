class SliderSelfScrolling {
    /*
	Самопрокручиваемый слайдер.
    */

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.maximumSwipingAtSlider = 0;
		this.positionSliderTrack = 0;
		this.numberSecondsAfterStartingSlider = 0;

		this.isVisible = false;
		this.isHideSlider_For_FirstTime = false;

		this.isSwiping = true;

		if (this.options) {
			this.addOptions();
		};
	}

	addOptions() {
		/* Устанавливает пользовательские настройки.  */

		this.duration = (this.options.duration) ? this.options.duration : 10000;
		this.temporaryFunction = (this.options.temporaryFunction) ? this.options.temporaryFunction : "linear";
		this.delay = (this.options.delay) ? this.options.delay : 0;
		this.delayBeforeStartingAfterHiding = (this.options.delayBeforeStartingAfterHiding) ? this.options.delay_before_starting_after_hiding : 1.5;
		this.repeatSlider = (this.options.repeatSlider) ? this.options.repeatSlider : false;
	}

    getSpeedSliderTrack() {
    	/* Вычисляет скорость прокрутки слайдера (px/s).  */
    	this.speedSliderTrack = this.maximumSwipingAtSlider / (this.duration / 1000);
    }

	measuresMaximumSwipeOfSlider() {
        /* Измеряет сколько можно пролистывать слайдер.  */

        this.maximumSwipingAtSlider = 0;

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth;
        });

        this.maximumSwipingAtSlider -= this.slider.querySelector(".slider-list").offsetWidth;
        this.positionSliderTrack = this.maximumSwipingAtSlider;
    }

    addEventScrollWindow() {
    	/* Добавляет события скролла на всё окно для измерения области видимиости слайдера.  */

    	window.addEventListener("scroll", () => {
			this.countsPositionSlider_Window();
		});
    }

   	countsPositionSlider_Window() {
		/* Выщитывает кординты блоков и вызвает проверку на зону видимости слайдера.  */

		const positionSlider = {
			top: window.pageYOffset + this.slider.getBoundingClientRect().top,
			bottom: window.pageXOffset + this.slider.getBoundingClientRect().bottom,
		};

		const positionWindow = {
			top: window.pageYOffset,
			bottom: window.pageYOffset + document.documentElement.clientHeight
		};

		this.checks_If_SliderVisible(positionSlider, positionWindow);
	}

	checks_If_SliderVisible(positionSlider, positionWindow) {
		/* Проверяет находится ли слайдер в зоне видимости.  */

		if (!this.isSwiping) {
			return;
		};

		if (positionWindow.top - this.slider.clientHeight <= positionSlider.top &&
			positionSlider.top < positionWindow.bottom) {

			if (!this.isVisible) {
				this.time_1 = performance.now();
				this.unblockingSlider();

				if (!this.isHideSlider_For_FirstTime) {
					this.sliderTrack.addEventListener("transitionend", () => {  this.prohibitsMovingSliderAfter_TheEndTransition(); });
				};
			};

			this.isVisible = true;

		} else {

			if (this.isVisible) {
				this.time_2 = performance.now();
				this.blockingSlider();

				if (!this.isHideSlider_For_FirstTime) {
					this.isHideSlider_For_FirstTime = true;
				};
			};

			this.isVisible = false;
		};
	}

	blockingSlider() {
		/* Производит блокировку слайдера.  */

		this.deleteStyleSlider();

		this.countsTimeSinceStartOfSlider();
		this.countsDistanceAfterStartingSlider();
	}

	unblockingSlider() {
		/* Производит разблокировку слайдера  */

		if (!this.isHideSlider_For_FirstTime) {
			this.sliderTrack.style.transition = `transform ${this.duration}ms ${this.temporaryFunction} ${this.delay}s`;
		};
		this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;

		if (this.isHideSlider_For_FirstTime) {
			setTimeout(() => {
				this.sliderTrack.style.transition = `transform ${this.duration}ms ${this.temporaryFunction}`;
				this.sliderTrack.style.transform = `translate3d(-${this.maximumSwipingAtSlider}px, 0px, 0px)`;
			}, this.delayBeforeStartingAfterHiding * 1000);
		};
	}

	countsTimeSinceStartOfSlider() {
		/* Считает время после запуска слайдера.  */

		this.numberSecondsAfterStartingSlider = 
			(!this.isHideSlider_For_FirstTime) ?
			((this.time_2 - this.time_1) / 1000 - this.delay) :
			((this.time_2 - this.time_1) / 1000) - this.delayBeforeStartingAfterHiding;
		this.numberSecondsAfterStartingSlider = this.numberSecondsAfterStartingSlider.toFixed(2);

		this.duration -= this.numberSecondsAfterStartingSlider  * 1000;

		this.resetTimers();
	}

	countsDistanceAfterStartingSlider() {
		/* Выщитывает пройденное расстояние от начала запуска слайдера.  */

		this.positionSliderTrack = (!this.isHideSlider_For_FirstTime) ?
				this.numberSecondsAfterStartingSlider * this.speedSliderTrack :
				this.positionSliderTrack + this.numberSecondsAfterStartingSlider * this.speedSliderTrack;
		this.positionSliderTrack = Math.round(this.positionSliderTrack);
	}

	prohibitsMovingSliderAfter_TheEndTransition() {
		/* Зарпещает двигать слайдер после окончании transition.  */

		this.isSwiping = false;
		this.resetTimers();
	}

	resetTimers() {
		/* Сбрасывает таймеры.  */

		this.time_1 = 0;
		this.time_2 = 0;
	}

	deleteStyleSlider() {
		/* Удаляет стили (transform и transition) для слайдера.  */
		this.sliderTrack.removeAttribute("style");
	}


	run() {
		this.measuresMaximumSwipeOfSlider();
		this.getSpeedSliderTrack();

		this.countsPositionSlider_Window();

		this.addEventScrollWindow();
	}
};


const blockSliderSelfScrolling = document.querySelector(".slider-self-scrolling");

const newSliderSelfScrolling = new SliderSelfScrolling(blockSliderSelfScrolling, {
	duration: 10000,
	temporaryFunction: "linear",
	delay: 2,
	delayBeforeStartingAfterHiding: 2,
	repeatSlider: false,
});
newSliderSelfScrolling.run();
