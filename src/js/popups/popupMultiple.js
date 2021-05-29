class PopupMuliple {
    /*
	Многоразовай попап.
    */

	constructor(popup, options) {
		this.popup = popup;
		this.options = options;
	}


	run() {

	}
};


const blockPopupMuliple = document.querySelector(".PopupMuliple");

const newPopupMuliple = new PopupMuliple(blockPopupMuliple);
newPopupMuliple.run();