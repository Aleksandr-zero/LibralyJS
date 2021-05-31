import { SliderWithoutFight } from "./sliders/sliderWithoutFight.js";
import { SliderEndless } from "./sliders/sliderEndless.js";
import { SliderSelfScrolling } from "./sliders/sliderSelfScrolling.js";

import { PopupMuliple } from "./popups/popupMultiple.js";


const blockSliderWithoutFight = document.querySelector(".slider-without-fight");
if (blockSliderWithoutFight) {
    const newSliderWithoutFight = new SliderWithoutFight(blockSliderWithoutFight, {
        speed: 400,
        scrollAfterAbruptStop: true
    });
    newSliderWithoutFight.run();
};


const blockSliderEndless = document.querySelector(".slider-endless");
if (blockSliderEndless) {
    const newSliderEndless = new SliderEndless(blockSliderEndless, {
        speed: 450,
        timerAdvance: [
            true,
            2500
        ],
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
        repeatSlider: true,
    });
    newSliderSelfScrolling.run();
};


const blockPopupMuliple = document.querySelector(".popup-multiple");

if (blockPopupMuliple) {
    const templatePopup = `
        <div class="popup">
            <h4 class="popup-title">{{ title }}</h4>
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
                text: "Popup text at number 1"
            },
            two: {
                title: "Popup 2",
                text: "Popup text at number 2"
            },
            three: {
                title: "Popup 3",
                text: "Popup text at number 3"
            }
        }
    });
    newPopupMuliple.run();
};
