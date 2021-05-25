import { TIMEOUT } from "./constants/constants.js";


class SliderEndless {
    /*
	Бесконенчный слайдер.
    */

	constructor(slider) {
		this.slider = slider;

		this.sliderTrack = this.slider.querySelector(".slider-track");
		this.positionSliderTrack = 0;

		this.slides = this.sliderTrack.children;
		this.numberSlides = this.slides.length;
		this.widthSlide = this.slides[0].offsetWidth;

		this.sliderBtnPushLast = this.slider.querySelector(".btn-slider-push-last");
		this.sliderBtnPushNext = this.slider.querySelector(".btn-slider-push-next");
	}

	addEventClick_BtnsSliderPush() {
		/* Добавление событий на кнопки передвижения слайдера.  */

		this.sliderBtnPushLast.addEventListener("click", () => { this.pressedBtnPushSlider(); });
		this.sliderBtnPushNext.addEventListener("click", () => { this.pressedBtnPushSlider(); });
	}

	pushingSlider() {
		/* Продвигет слайдер.  */

		const direction = event.currentTarget.dataset.direction;

		const positionSliderTrack = (direction === "next") ? -this.widthSlide * 2 : 0;
		this.sliderTrack.style.transform = `translate3d(${positionSliderTrack}px, 0px, 0px)`;

		this.addCssSliderTrack();

		setTimeout(() => {
			(direction === "next") ? this.movesFirstSlide_TheEnd() : this.movesLastSlide_Start();
		}, TIMEOUT * 1.5);
	}

	pressedBtnPushSlider() {
		/* Передвигает слайдер при клике на кнопку.  */

		this.blocking_unlockingBtnsSliders("none");

		this.pushingSlider();

		setTimeout(() => {
			this.blocking_unlockingBtnsSliders("auto");
		}, TIMEOUT * 1.5);
	}

	movesFirstSlide_TheEnd() {
		/* Перемещает первый слайд в конец слайдера.  */

		const firstSlide = this.slides[0];
		firstSlide.remove();

		this.sliderTrack.append(firstSlide);
		this.nullifiesCssSliderTrack();
	}

	movesLastSlide_Start() {
		/* Перемещает последний слайд в начало слайдера.  */

		const lastSlide = this.slides[this.numberSlides - 1];
		lastSlide.remove();

		this.sliderTrack.prepend(lastSlide);
		this.nullifiesCssSliderTrack();
	}

	addLastSlideStart() {
		/* Добавляет последний слайд в самое начало, ну прям в самое.  */

		const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);
		this.sliderTrack.prepend(lastSlide);

		this.slides[this.slides.length - 1].remove()
	}

	addCssSliderTrack() {
		/* Добавляет анимацю для продвижение слайдера.  */
		this.sliderTrack.style.transition = `transform 0.${TIMEOUT * 1.5}s`;
	}

	blocking_unlockingBtnsSliders(pointer) {
		/* Блокирует и производит разблокировку кнопок продвижения слайдера.  */

		this.sliderBtnPushLast.style.pointerEvents = `${pointer}`;
		this.sliderBtnPushNext.style.pointerEvents = `${pointer}`;
	}

	nullifiesCssSliderTrack() {
		/* Обнуляет все стили у блока - sliderTrack  */
		this.sliderTrack.style.transition = "none";
		this.sliderTrack.style.transform = `translate3d(-250px, 0px, 0px)`;
	}


	run() {
		this.addLastSlideStart();
		this.addEventClick_BtnsSliderPush();

		this.sliderTrack.style.transform = `translate3d(-250px, 0px, 0px)`;
	}
};


const blockSliderEndless = document.querySelector(".slider-endless");

const newSliderEndless = new SliderEndless(blockSliderEndless);
newSliderEndless.run();