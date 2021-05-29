class SliderSelfScrolling {
    /*
	Самопрокручиваемый слайдер.
    */

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.maximumSwipingAtSlider = 0;
		this.positionSliderTrack = this.numberSecondsAfterStartingSlider;
		this.numberSecondsAfterStartingSlider = 0;
		this.isVisible;

		this.measuresMaximumSwipeOfSlider();

		if (this.options) {
			this.addOptions();
		};
	}

	addOptions() {
		/* Устанавливает пользовательские настройки.  */

		this.duration = (this.options.duration) ? this.options.duration : 300;
		this.temporaryFunction = (this.options.temporary_function) ? this.options.temporary_function : "linear";
		this.delay = (this.options.delay) ? this.options.delay : 0;
	}

    getSpeedSliderTrack() {
    	/* Вычисляет скорость прокрутки слайдера (px/s).  */
    	this.speedSliderTrack = this.maximumSwipingAtSlider / (this.duration / 1000);
    }

	measuresMaximumSwipeOfSlider() {
        /* Измеряет сколько можно пролистывать слайдер.  */

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth;
        });

        this.maximumSwipingAtSlider -= this.slider.querySelector(".slider-list").offsetWidth;
    }

    setsTransition_For_SliderTrack() {
    	/* Устанавливает плавную прокрутку для слайдера.  */
    	
    	if (this.isVisible) {
    		this.time_1 = performance.now()
    	};

    	this.sliderTrack.style.transition = `transform ${this.duration}ms ${this.temporaryFunction} ${this.delay}s`;

    	this.sliderTrack.addEventListener("transitionstart", () => {
    		this.getSpeedSliderTrack();
    	});
    	this.sliderTrack.addEventListener("transitioncancel", () => {
    		this.positionSliderTrack = (this.numberSecondsAfterStartingSlider * this.speedSliderTrack).toFixed(2);
    		this.numberSecondsAfterStartingSlider = 0;
    	});
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

		if (positionWindow.top - this.slider.clientHeight <= positionSlider.top &&
			positionSlider.top < positionWindow.bottom) {

			this.isVisible = true;

		} else {
			this.isVisible = false;
			this.deleteStyleSlider();
		};

		this.blocking_UnblockingSlider();
	}

	blocking_UnblockingSlider() {
		/* Производит блокировку и разблокировку слайдрера.  */

		if (this.isVisible) {
			this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
			return;
		};

		this.time_2 = performance.now();
		this.numberSecondsAfterStartingSlider = ((this.time_2 - this.time_1) / 1000 - 2).toFixed(2);

		this.time_1 = 0;
		this.time_2 = 0;

		console.log(this.numberSecondsAfterStartingSlider);
	}

	deleteStyleSlider() {
		/* Удаляет анимацию для слайдера.  */
		this.sliderTrack.removeAttribute("style");
	}

	resumesSliderAfterHidingIt() {
		/* Возобновляет слайдер сразу как он появится, после его скрытия.  */
	}


	run() {
		this.countsPositionSlider_Window();

		this.setsTransition_For_SliderTrack();
		this.addEventScrollWindow();

		this.sliderTrack.style.transform = `translate3d(-${this.maximumSwipingAtSlider}px, 0px, 0px)`;
	}
};


const blockSliderSelfScrolling = document.querySelector(".slider-self-scrolling");

const newSliderSelfScrolling = new SliderSelfScrolling(blockSliderSelfScrolling, {
	duration: 10000,
	temporary_function: "",
	delay: 2
});
newSliderSelfScrolling.run();
