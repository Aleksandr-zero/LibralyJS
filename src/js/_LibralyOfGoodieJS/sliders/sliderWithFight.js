export class SliderWithFight {
    /**
	Слайдер с боем.
    * @param slider -> block "slider-with-fight"
    * @param options -> custom settings
    */

	constructor(slider, options) {
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

		this._swipeStart = () =>  { this.swipeStart(); };
		this._swipeAction = () => { this.swipeAction(); };
		this._swipeEnd = () => 	  { this.swipeEnd(); };

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

    checkSliderCanBeMoved(evt) {
        /* Проверяет: если мы будем одновременно скролить страницу и сам слайдер, то блокируем слайдер.  */

        if ( Math.abs(evt.clientY - this.positionPressedY) >= 5 && event.type === "touchmove" ) {
            // Если пользователь будет  скроллить страницу.

            this.isScrolledPage = true;

            if ( this.isScrolledPage && !this.isScrollingSlider ) {
                this.allowSwipe = false;
                this.removeEventsSliderTrack();

            } else if ( this.isScrolledPage && this.isScrollingSlider ) {
                this.allowSwipe = true;
            };
        };
    }

    removeEventsSliderTrack() {
        /* Удаляет события у блока - sliderTrack и у самого слайдер  */

        this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
        this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

        this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);

        this.slider.classList.remove("slider-active");
        this.allowSwipe = true;
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
    }


    // Функционал слайдера.
    pushingSlider() {
    	this.sliderTrack.style.transform = `translate3d(${-this.positionSliderTrack}px, 0px, 0px)`;

        if (this.singleSwipe >= 5) {
            this.isScrollingSlider = true;
        };
    }

	swipeStart() {
		if (!this.allowSwipe) {
			return;
		};

		const evt = this.getEvent();

		this.percentForSuccessfulScrolling = Math.round((this.sliderWidth / 100) * this.percentageForSuccessfulScrolling);

		this.positionPressedX = evt.clientX;
		this.positionPressedY = evt.clientY;
        this.positionFingerPressSliderX = this.positionPressedX - this.slider.getBoundingClientRect().x;
        this.positionFingerPressSliderY = this.positionPressedY - this.slider.getBoundingClientRect().y;

        this.sliderTrack.style.transform = `translate3d(-${this.positionFinal}px, 0px, 0px)`;

        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });
        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
		this.slider.classList.add("slider-active");
	}

    swipeAction() {
    	const evt = this.getEvent();

        this.checkSliderCanBeMoved(
            this.evt = evt
        );

        if (!this.allowSwipe) {
            return
        };

    	this.singleSwipe = this.positionPressedX - evt.clientX;
    	this.positionSliderTrack = this.positionPressedX - evt.clientX + this.positionFinal;

        if (event.type === "touchmove") {
            this.positionX_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedX - evt.clientX);
            this.positionY_FingetCurrentMoment_OnSlider = Math.abs(this.positionPressedY - evt.clientY);
            this.checksOutOfBounds();
        };

    	this.pushingSlider();
    }

	swipeEnd() {
		this.isScrollingSlider = false;
		this.allowSwipe = true;
		this.removeEventsSliderTrack();

		if ((Math.abs(this.singleSwipe) <= this.percentForSuccessfulScrolling)) {
			this.returnsSliderBack();
			return;
		};

		this.checksIfSliderNeedsPromoted();
	}


    // Пользовательские настройки.


	run() {
		this.sliderTrack.addEventListener("mousedown", this._swipeStart);
		this.sliderTrack.addEventListener("touchstart", this._swipeStart, { passive: true });
	}
};
