export class SliderWithoutFight {
    /*
    Слайдер без боя.
    */

    constructor(slider, options) {
        this.slider = slider;
        this.options = options;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.sliderWidth = this.slider.offsetWidth;
        this.sliderHeight = this.slider.offsetHeight;

        this.maximumSwipingAtSlider = 0;

        this.positionFinal = 0;
        this.singleSwipe = 0;

        this.positionPressedX;
        this.positionPressedY;
        this.positionSliderTrack = 0;
        this.positionFingerPressSliderX;
        this.positionFingerPressSliderY;
        this.positionX_FingetCurrentMoment_OnSlider = 0;
        this.positionY_FingetCurrentMoment_OnSlider = 0;

        this.allowSwipe = true;
        this.isScrollingSlider = false;

        this.measuresMaximumSwipeOfSlider();
        this.addOptions();


        this.swipeAction = () => {
            /* Получает координаты продвижения слайдера и вызывает функцию "pushingSlider".  */

            const evt = this.getEvent();

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
                this.pushingSlider(
                    this.positionFingerMovement = this.positionSliderTrack
                );
            };
        };

        this.goingOutBoundsSlider = () => {
            /* Выход за границы слайдера мышкой. */

            this.swipeEnd();
            this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        };
    }

    addOptions() {
        /* Добавляет пользовательские настройки для слайдера.  */

        if (this.options) {
            this.setsSpeed_For_slider();
        };
    }

    getEvent() {
        /* Получаем события (чтобы наш слайдер работал и на десктопах, и на мобилках).  */
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
        /* Если мышка или палец будет заходить за границы слайдера то запрещаем его двигать.  */

        if (
            (this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
            (this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
            ) {

            this.sliderTrack.removeEventListener("touchmove", this.swipeAction);
        };
    };

    checkSliderCanBeMoved() {
        /* Проверяет: если мы будем одновременно скролить страницу и сам слайдер, то блокируем слайдер.  */

        const evt = this.getEvent();
        const positionPressedY = evt.clientY;

    }

    measuresSpeedTrafficSliderTrack() {
        /* Измеряет скорость движение трека.  */

        const speedSlider = (this.singleSwipe / this.swipeSlider_Time).toFixed(2);
    }

    autoPushingSlide(speedSlider) {
        /* Автоматически пролистывает слайдер  */

    }

    pushingSlider() {
        /* Продвигает слайдер.  */

        this.singleSwipe = Math.abs(this.positionSliderTrack - this.positionFinal);

        if (this.singleSwipe >= 5) {
            this.isScrollingSlider = true;
        };

        if (this.positionSliderTrack <= this.maximumSwipingAtSlider && this.allowSwipe) {
            this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
        };
    };

    swipeStart() {
        /* 
        При касании слайдера, записыает прошлое значение позиции, на котором остановился пользователь.
        */

        const evt = this.getEvent();

        this.time_1 = new Date().getTime();

        this.sliderTrack.addEventListener("mousemove", this.swipeAction);
        this.sliderTrack.addEventListener("touchmove",   this.swipeAction, { passive: true });

        this.positionPressedX = evt.clientX;
        this.positionPressedY = evt.clientY;
        this.positionFingerPressSliderX = evt.clientX - this.slider.getBoundingClientRect().x;
        this.positionFingerPressSliderY = evt.clientY - this.slider.getBoundingClientRect().y;

        this.sliderTrack.style.transform = `translate3d(${-this.positionFinal}px, 0px, 0px)`;

        this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.add("slider-active");
    }

    swipeEnd() {
        /* Записывает конечную позицию слайдера.  */

        const auxiliaryVal_For_LastSwipe = this.positionFinal;

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

        this.swipeSlider_Time = new Date().getTime() - this.time_1;
        this.measuresSpeedTrafficSliderTrack();
        this.removeEventsSliderTrack();
    }

    removeEventsSliderTrack() {
        /* Удаляет события у блока - sliderTrack и у самого слайдер  */

        this.sliderTrack.removeEventListener("mousemove", this.swipeAction);
        this.sliderTrack.removeEventListener("touchmove", this.swipeAction);
        this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
        this.slider.classList.remove("slider-active");
    }

    // Устанавливает пользовательские настройки
    setsSpeed_For_slider() {
        /* Устанвливает скорость для слайдера.  */
        this.speed = (this.options.speed) ? this.options.speed : 200;
    }

    run() {
        /* Запускает слайдер */

        this.sliderTrack.addEventListener("touchstart",  () => { this.swipeStart(); },  { passive: true });
        this.sliderTrack.addEventListener("touchend",    () => { this.swipeEnd(); },    { passive: true });

        this.sliderTrack.addEventListener("mousedown", () => { this.swipeStart(); });
        this.sliderTrack.addEventListener("mouseup",   () => { this.swipeEnd(); });
    }
};
