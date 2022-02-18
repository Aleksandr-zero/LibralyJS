import Navigation from "./components/navigation.js";
import Pagination from "./components/pagination.js";


export default class Slider {
	/**
	Является посредником между классами: Navigation и Pagination, для нового вида слайдера
	При наследовании класса должны быть методы:
	* @method -> swipeEnd
	* @method -> removeEventsSliderTrack
	Свойства:
	* @property slider -> type( HTMLElement )
	* @property sliderTrack -> type( HTMLElement )
	* @property maximumSwipingAtSlider -> type( int )
	* @property positionPressedX -> type( int )
	* @property positionPressedY -> type( int )
	* @property positionFingerPressSliderX -> type( int )
	* @property positionFingerPressSliderY -> type( int )
	* @property positionX_FingetCurrentMoment_OnSlider -> type( int )
	* @property positionY_FingetCurrentMoment_OnSlider -> type( int )
	* @property allowSwipe -> type( boolean )
	* @property isScrollingSlider -> type( boolean )
	*
	* @property _swipeStart = () => { this.swipeStart(); };
    * @property _swipeAction = () => { this.swipeAction(); };
    * @property _swipeEnd = () => { this.swipeEnd(); };
	*/

	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

	measuresMaximumSwipeOfSlider() {
		this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
			this.maximumSwipingAtSlider += slide.offsetWidth;
		});

		this.maximumSwipingAtSlider -= this.sliderWidth;
	}

	removeEventsSliderTrack() {
		this.sliderTrack.removeEventListener("touchmove", this._swipeAction);
		this.sliderTrack.removeEventListener("touchend", this._swipeEnd);

		this.sliderTrack.removeEventListener("mousemove", this._swipeAction);
		this.sliderTrack.removeEventListener("mouseout", this.goingOutBoundsSlider);
		this.sliderTrack.removeEventListener("mouseup", this._swipeEnd);

		this.slider.classList.remove("slider-active");
	}

	addEventsSliderTrack() {
		this.sliderTrack.addEventListener("mouseup", this._swipeEnd);
		this.sliderTrack.addEventListener("touchend", this._swipeEnd, { passive: true });

		this.sliderTrack.addEventListener("mousemove", this._swipeAction);
		this.sliderTrack.addEventListener("touchmove", this._swipeAction, { passive: true });

		this.sliderTrack.addEventListener("mouseout", this.goingOutBoundsSlider);
		this.slider.classList.add("slider-active");
	}

	getPaginationSlider() {
		return this.slider.querySelector(".slider-pagination");
	}

	checkIsPaginationSlider() {
		const pagination = this.getPaginationSlider();
		if ( pagination ) this.addPagination();
	}

	watchSwipeSliderTrack_Pagination() {
		this.newPagination.changeBtnPagination(this.currentSlide)
	}

	addPagination() {
		this.isPagination = true;
		this.newPagination = new Pagination(this.slider);
	}

	addNavigation() {
		this.isNavigation = true;
		this.newNavigation = new Navigation(this.slider, this.speed);

    const btnPrev = this.slider.querySelector(".btn-slider-push-last");
    const btnNext = this.slider.querySelector(".btn-slider-push-next");
    btnPrev.addEventListener("click", () => {this.pressedBtnPushSlider(); });
    btnNext.addEventListener("click", () => { this.pressedBtnPushSlider(); });
	}

	pressedBtnPushSlider() {
		if ( !this.allowSwipe ) {
			return;
		};

		const direction = event.currentTarget.dataset.direction;
		const dataset = this.newNavigation.pushingSliderTrack(direction, this.currentSlide);

		if ( dataset ) {
			this.currentSlide = dataset.current_slide;
			this.positionFinal = dataset.position;
			this.positionSliderTrack = dataset.position;

			if ( this.className == "SliderWithPreviews" ) {
				this.changeDataForSLiderPreviews();
				this.pushingSliderPreviews();
			};

			if ( this.isPagination ) {
				this.watchSwipeSliderTrack_Pagination();
			};
		};

		this.allowSwipe = false;

		setTimeout(() => {
			this.allowSwipe = true;
		}, 500);
	}

	checkSliderCanBeMoved(evt) {
		/**
		* @param evt -> fun "getEvent"
		Проверяет: если мы будем одновременно скролить страницу и сам слайдер, то блокируем слайдер.
		*/

		if ( Math.abs(evt.clientY - this.positionPressedY) >= 5 && event.type === "touchmove" ) {
			if ( !this.isScrollingSlider ) {
				this.allowSwipe = false;
				this.removeEventsSliderTrack();

			} else if ( this.isScrollingSlider ) {
				this.allowSwipe = true;
			};
		};
	}

	checksOutOfBounds() {
		if (
			(this.positionX_FingetCurrentMoment_OnSlider >= this.positionFingerPressSliderX && this.positionSliderTrack - this.positionFinal > 0) ||
			(this.positionX_FingetCurrentMoment_OnSlider >= (this.sliderWidth - this.positionFingerPressSliderX)) && this.positionSliderTrack - this.positionFinal < 0
			) {

			this.swipeEnd();
		};
	}

	calculatesTouchCoordinates_SwipeStart(evt) {
		/**
		Вычисляет координаты при первом касании слайдера.
		* @param evt -> fun "getEvent"
		* @slider -> SliderWithFight
		* @slider -> SliderWithoutFight
		* @slider -> SliderWithAutomaticAdjustment
		* @slider -> SliderWithPreviews
		*/
		this.positionPressedX = evt.clientX;
		this.positionPressedY = evt.clientY;
		this.positionFingerPressSliderX = this.positionPressedX - this.slider.getBoundingClientRect().x;
		this.positionFingerPressSliderY = this.positionPressedY - this.slider.getBoundingClientRect().y;
	}

	checkNavigation() {
		const navigation = this.slider.querySelector(".slider-navigation");
		if ( navigation ) this.addNavigation();
	}
};
