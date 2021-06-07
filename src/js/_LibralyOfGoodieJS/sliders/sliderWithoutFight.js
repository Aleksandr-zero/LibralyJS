export class SliderWithoutFight {
    /**
    Слайдер без боя.
    * @param slider -> block "slider-without-fight"
    * @param options -> custom settings
    */

    constructor(slider, options) {
        this.slider = slider;
        this.options = options;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.sliderWidth = this.slider.offsetWidth;

        this.maximumSwipingAtSlider = 0;

        this.positionFinal = 0;
        this.singleSwipe = 0;

        this.positionPressedX;
        this.positionPressedY;
        this.positionSliderTrack = 0;
        this.positionFingerPressSliderX;
        this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider;
        this.positionY_FingetCurrentMoment_OnSlider;

        this.allowSwipe = true;
        this.isScrollingSlider = false;

        this.measuresMaximumSwipeOfSlider();
        this.addOptions();

        this._swipeAction = () => { this.swipeAction(); }
        this._swipeEnd = () => { this.swipeEnd(); }

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
    getEvent() {
        return (event.type.search('touch') != -1) ? event.touches[0] : event;
    };

    measuresMaximumSwipeOfSlider() {
        /* Измеряет сколько можно пролистывать слайдер.  */

        this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
            this.maximumSwipingAtSlider += slide.offsetWidth;
        });

        this.maximumSwipingAtSlider -= this.slider.querySelector(".slider-list").offsetWidth;
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
    };

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


    // Автоматическая прокрутка.
    measuresSpeedTrafficSliderTrack() {
        /* Измеряет скорость движение трека.  */

        const speedSlider = (this.singleSwipe / this.swipeSlider_Time).toFixed(2);

        this.autoPushingSlider(speedSlider);
    }

    autoPushingSlider(speedSlider) {
        /* Автоматически пролистывает слайдер  */

        if (speedSlider <= 0.6) {
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

        this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
        setTimeout(() => {
            this.sliderTrack.style.transform = `translate3d(-${newPosition}px, 0px, 0px)`;
            this.sliderTrack.style.transition = `transform 1s ease-out`;

            this.sliderTrack.addEventListener("transitionend", () => {
                this.sliderTrack.style.transition = "none";
                this.positionFinal = newPosition;
            });
        }, 0);
    }

    stopsAutoScrolling() {
        /* Останавливает автоматическую прокрутку при захвата слайдера.  */
        this.sliderTrack.style.transition = `none`;
    }


    // Функционал слайдера.
    pushingSlider() {
        /* Продвигает слайдер.  */

        this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

        if (this.singleSwipe >= 5) {
            this.isScrollingSlider = true;
        };

        if ( (this.positionSliderTrack <= this.maximumSwipingAtSlider && this.allowSwipe) &&
             (this.positionSliderTrack > 0 && this.allowSwipe)) {

            this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
        };
    };

    swipeStart() {
        /*
        При касании слайдера, записыает прошлое значение позиции, на котором остановился пользователь.
        */

        this.stopsAutoScrolling();

        const evt = this.getEvent();

        this.time_1 = performance.now();

        this.positionPressedX = evt.clientX;
        this.positionPressedY = evt.clientY;
        this.positionFingerPressSliderX = evt.clientX - this.slider.getBoundingClientRect().x;
        this.positionFingerPressSliderY = evt.clientY - this.slider.getBoundingClientRect().y;

        this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;

        this.sliderTrack.addEventListener("mousemove", this._swipeAction);
        this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });
        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
    }

    swipeAction() {
        /* Получает координаты продвижения слайдера и вызывает функцию "pushingSlider".  */

        const evt = this.getEvent();
        this.directionSliderTrack = (this.positionPressedX < evt.clientX) ? "right" : "left";

        this.checkSliderCanBeMoved(
            this.evt = evt
        );

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
        /* Записывает конечную позицию слайдера.  */

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

        this.removeEventsSliderTrack();
    }

    removeEventsSliderTrack() {
        /* Удаляет события у блока - sliderTrack и у самого слайдер  */

        this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
        this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.remove("slider-active");
    }


    run() {
        this.sliderTrack.addEventListener("touchstart", () => { this.swipeStart(); }, { passive: true });
        this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

        this.sliderTrack.addEventListener("mousedown", () => { this.swipeStart(); });
        this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
    }
};
