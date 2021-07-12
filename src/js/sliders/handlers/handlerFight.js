export default class HandlerFight {
	/**
	* @param slider -> block <slider> ( type -> HTMLElement )
	* @param sliderTrack -> block <slider.querySelector(".slider-track")>
	Обработчик для боя.
	*/

	constructor(slider, sliderTrack) {
		this.slider = slider;
		this.sliderTrack = sliderTrack;

		this.sliderWidth = Math.round(this.slider.getBoundingClientRect().width);
	}

	addTransitionSliderTrack(currentSlide, speed) {
		/**
		* @param currentSlide -> new current slider.
		* @param speed -> duration of movement.
		* @return positionFinal -> new end position for the slider.
		*/

		this.sliderTrack.style.transition = `transform 0.${speed}s ease`;
		const positionFinal = currentSlide * this.sliderWidth;

		setTimeout(() => {
			this.sliderTrack.style.transform = `translate3d(${-positionFinal}px, 0px, 0px)`;
		}, 0)

		setTimeout(() => {
			this.sliderTrack.style.transition = "none";
		}, speed);

		return positionFinal;
	}

	returnsSliderBack(currentSlide, speed) {
		/**
		* @param currentSlide -> new current slider.
		* @param speed -> duration of movement.
		Возвращает слайдер на место если не проскролил нужно количество.
		*/
		this.addTransitionSliderTrack(currentSlide, speed);
	}
};