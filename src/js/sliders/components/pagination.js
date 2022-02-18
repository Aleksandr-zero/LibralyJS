export default class Pagination {
  /**
    * @param slider -> block "slider" ( type -> HTMLElement )
		Создаёт пагинацию для слайдера.
	*/
	constructor(slider) {
		this.slider = slider;
		this.btnsPagination = this.slider.querySelectorAll(".pagination-btn");
	}

	changeBtnPagination(currentSlide) {
		this.btnsPagination.forEach(btn => btn.classList.remove("pagination-btn-active"));
		this.btnsPagination[currentSlide].classList.add("pagination-btn-active");
	};
};
