import { SliderWithoutFight } from "./_LibralyOfGoodieJS/sliders/sliderWithoutFight.js";
import { SliderWithFight } from "./_LibralyOfGoodieJS/sliders/sliderWithFight.js";
import { SliderEndless } from "./_LibralyOfGoodieJS/sliders/sliderEndless.js";
import { SliderSelfScrolling } from "./_LibralyOfGoodieJS/sliders/sliderSelfScrolling.js";

import { PopupDisposable } from "./_LibralyOfGoodieJS/popups/popupDisposable.js";
import { PopupMuliple } from "./_LibralyOfGoodieJS/popups/popupMultiple.js";


// SLIDERS
const blockSliderWithoutFight = document.querySelector(".slider-without-fight");

if (blockSliderWithoutFight) {
    const newSliderWithoutFight = new SliderWithoutFight(blockSliderWithoutFight, {
        scrollAfterAbruptStop: true
    });
    newSliderWithoutFight.run();
};


const blockSliderWithFight = document.querySelector(".slider-with-fight");

if (blockSliderWithFight) {
    const newSliderWitFight = new SliderWithFight(blockSliderWithFight, {
        percentageForSuccessfulScrolling: 35,
        infinity: false
    });
    newSliderWitFight.run();
};


const blockSliderEndless = document.querySelector(".slider-endless");

if (blockSliderEndless) {
    const newSliderEndless = new SliderEndless(blockSliderEndless, {
        speed: 400,
        timerAdvance: [
            true,
            2500
        ],
        freezeSliderMouseHover: false
    });
    newSliderEndless.run();
};


const blockSliderSelfScrolling = document.querySelector(".slider-self-scrolling");

if (blockSliderSelfScrolling) {
    const newSliderSelfScrolling = new SliderSelfScrolling(blockSliderSelfScrolling, {
        duration: 10,
        temporaryFunction: "linear",
        delay: 2,
        delayBeforeStartingAfterHiding: 2,
        repeatSlider: false,
    });
    newSliderSelfScrolling.run();
};


// POPUPS
const blockPopupMuliple = document.querySelector(".popup-multiple");

if (blockPopupMuliple) {
    const templatePopup = `
        <div class="popup">
            <h4 class="popup-title">{{ title }}</h4>
            <div class="popup-back-img">
                <img src="{{ img.srcImg }}" alt="{{ img.altImg }}" class="popup-img">
            </div>
            <div class="popup-text">
                <p>{{ text }}</p>
            </div>
        </div>
    `;
    const newPopupMuliple = new PopupMuliple(blockPopupMuliple, templatePopup, {
        numberOfPopup: 3,
        popups: {
            one: {
                title: "Popup 1",
                text: "Popup text at number 1",
                img: {
                    srcImg: "../../doc/popupExample-1.png",
                    altImg: "popup 1"
                }
            },
            two: {
                title: "Popup 2",
                text: "Popup text at number 2",
                img: {
                    srcImg: "../doc/popupExample-2.png",
                    altImg: "popup 2"
                }
            },
            three: {
                title: "Popup 3",
                text: "Popup text at number 3",
                img: {
                    srcImg: "../doc/popupExample-3.png",
                    altImg: "popup 3"
                }
            }
        }
    });
    newPopupMuliple.run();
};

const blockPopupDisposable = document.querySelector(".popup-disposable");

if (blockPopupDisposable) {
    const newPopupDisposable = new PopupDisposable(blockPopupDisposable);
    newPopupDisposable.run();
};
