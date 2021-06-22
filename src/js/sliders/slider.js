import { Navigation } from "./components/navigation.js";
import { Pagination } from "./components/pagination.js";


export default class Slider {
	/**
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
	*/

	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

	measuresMaximumSwipeOfSlider() {
		/* Измеряет максимальную длину прокрутки слайдера.  */

		this.sliderTrack.querySelectorAll(".slide").forEach((slide) => {
			this.maximumSwipingAtSlider += slide.offsetWidth;
		});

		this.maximumSwipingAtSlider -= this.sliderWidth;
	}


	checkSliderCanBeMoved(evt) {
		/**
		* @param evt -> fun "getEvent"
		Проверяет: если мы будем одновременно скролить страницу и сам слайдер, то блокируем слайдер.
		*/

		if ( Math.abs(evt.clientY - this.positionPressedY) >= 5 && event.type === "touchmove" ) {
			// Если пользователь будет  скроллить страницу.

			if ( !this.isScrollingSlider ) {
				this.allowSwipe = false;
				this.removeEventsSliderTrack();

			} else if ( this.isScrollingSlider ) {
				this.allowSwipe = true;
			};
		};
	}

	checksOutOfBounds() {
		/* Если палец будет заходить за границы слайдера то запрещаем его двигать.  */

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
		*/

		this.positionPressedX = evt.clientX;
		this.positionPressedY = evt.clientY;
		this.positionFingerPressSliderX = this.positionPressedX - this.slider.getBoundingClientRect().x;
		this.positionFingerPressSliderY = this.positionPressedY - this.slider.getBoundingClientRect().y;
	}


	addPagination() {

	}

	addNavigation() {

	}
};
