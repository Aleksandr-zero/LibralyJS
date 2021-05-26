import { TIMEOUT } from "../constants/constants.js";


class SliderWithoutFight {
    /*
    Слайдер без боя.
    */

    constructor(slider) {
        this.slider = slider;
        this.sliderTrack = this.slider.querySelector(".slider-track");

        this.sliderWidth = this.slider.offsetWidth;

        this.maximumSwipingAtSlider = 0;

        this.positionFinal = 0;
        this.singleSwipe = 0;

        this.positionPressed;
        this.positionPressedY;
        this.positionSliderTrack = 0;
        this.positionFingerPressSlider;
        this.positionFingetCurrentMoment_OnSlider = 0;

        this.allowSwipe = true;
        this.aaa = true;

        this.measuresMaximumSwipeOfSlider();


        this.swipeAction = () => {
            /* Получает координаты продвижения слайдера  и вызывает функцию "pushingSlider".  */

            const evt = this.getEvent();

            if (Math.abs(evt.clientY - this.positionPressedY) >= 11 && event.type === "touchmove") {
                this.removeEventsSliderTrack();
                this.allowSwipe = false;
            };

            this.positionFingetCurrentMoment_OnSlider = this.positionPressed - evt.clientX;
            this.positionSliderTrack = this.positionPressed - evt.clientX + this.positionFinal;

            this.checksOutOfBounds();

            if (this.allowSwipe) {
                this.pushingSlider(
                    this.positionFingerMovement = this.positionSliderTrack
                );
            };
        };

        this.goingOutBoundsSlider = () => {
            /* Выход за границы слайдера мышкой. */

            this.swipeEnd(true);
            this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
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

        if ( this.positionFingetCurrentMoment_OnSlider >= this.positionFingerPressSlider ||
            -this.positionFingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSlider)) {

            this.allowSwipe = false;
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

        this.singleSwipe = this.positionSliderTrack - this.positionFinal;

        if (this.positionSliderTrack <= this.maximumSwipingAtSlider && this.allowSwipe) {
            this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;
        };
    };

    swipeStart() {
        /* 
        При касании слайдера, записыает прошлое значение позиции, на котором остановился пользователь.
        */

        this.time_1 = new Date().getTime();

        const evt = this.getEvent();

        this.sliderTrack.addEventListener("mousemove", this.swipeAction);
        this.sliderTrack.addEventListener("touchmove",   this.swipeAction, { passive: true });

        this.positionPressed = evt.clientX;
        this.positionPressedY = evt.clientY;
        this.positionFingerPressSlider = evt.clientX - this.slider.getBoundingClientRect().x;

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
        this.aaa = true;

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

    run() {
        /* Запускает слайдер */

        this.sliderTrack.addEventListener("touchstart",  () => { this.swipeStart(); },  { passive: true });
        this.sliderTrack.addEventListener("touchend",    () => { this.swipeEnd(); },    { passive: true });

        this.sliderTrack.addEventListener("mousedown", () => { this.swipeStart(); });
        this.sliderTrack.addEventListener("mouseup",   () => { this.swipeEnd(); });
    }
};

const blockSliderWithoutFight = document.querySelector(".slider-without-fight");

const newSliderWithoutFight = new SliderWithoutFight(blockSliderWithoutFight);
newSliderWithoutFight.run();
