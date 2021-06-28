export default class Pagination {
    /**
	Создаёт пагинацию для слайдера.
	*/

	constructor(slider) {
		this.slider = slider;

		this.btnsPagination = this.slider.querySelectorAll(".pagination-btn");
	}

	changeBtnPagination(currentSlide) {
		/* Изменяет кнопку пагинации на активную в зависимости слайдера.  */

		this.btnsPagination.forEach((btn) => {
			btn.classList.remove("pagination-btn-active");
		});

		this.btnsPagination[currentSlide].classList.add("pagination-btn-active");
	};
};
