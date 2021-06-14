# [Libraly JS](https://aleksandr-zero.github.io/LibralyJS/app/)

Library of goodies for your site ;)</br>
There is everything that your heart desires!

## Getting started

Connect common CSS:

```xml
<link rel="stylesheet" href="https://aleksandr-zero.github.io/LibralyJS/LibralyOfGoodieJS/css/libralyOfGoodieJS.css">
```

## Sliders

### Slider without fight

Connect:
```xml
<script src="https://aleksandr-zero.github.io/LibralyJS/LibralyOfGoodieJS/scripts/sliders/sliderWithoutFight.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-without-fight">
  <div class="slider-list">
    <div class="slider-track">
      <!-- Your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <div class="slide">6</div>
      <!-- Your slides -->
    </div>
  </div>
</div>
```

```js
const blockSliderWithoutFight = document.querySelector(".slider-without-fight");

const newSliderWithoutFight = new SliderWithoutFight(blockSliderWithoutFight);
newSliderWithoutFight.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `scrollAfterAbruptStop`        | Auto scroll after abrupt stop. |  `true`  |

```js
new SliderWithoutFight(blockSliderWithoutFight, {
  scrollAfterAbruptStop: false
});
```

### Slider with fight

Connect:
```xml
<script src="https://aleksandr-zero.github.io/LibralyJS/LibralyOfGoodieJS/scripts/sliders/sliderWithFight.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-with-fight">
  <div class="slider-list">
    <div class="slider-track">
      <!-- Your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- Your slides -->
    </div>
  </div>
</div>
```

```js
const blockSliderWithFight = document.querySelector(".slider-with-fight");

const newSliderWithFight = new SliderWithFight(blockSliderWithFight);
newSliderWithoutFight.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `percentageForSuccessfulScrolling` | The percentage of slider scrolling to advance.| `35` |

```js
new SliderWithFight(blockSliderWithFight, {
  percentageForSuccessfulScrolling: 50
});
```

### Endless slider

Connect:
```xml
<script src="https://aleksandr-zero.github.io/LibralyJS/LibralyOfGoodieJS/scripts/sliders/sliderEndLess.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-endless">
  <div class="back-btn-slider-push back-btn-slider-push-left">
    <a data-direction="last" role="button" class="btn-slider-push btn-slider-push-last">Button</a>
  </div>
  <div class="slider-list">
    <div class="slider-track">
      <!-- Your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- Your slides -->
    </div>
  </div>
  <div class="back-btn-slider-push back-btn-slider-push-right">
    <a data-direction="next" role="button" class="btn-slider-push-next">Button</a>
  </div>
</div>
```

```js
const blockSliderEndless = document.querySelector(".slider-endless");

const newSliderEndless = new SliderEndLess(blockSliderEndless);
newSliderEndless.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `speed`						 | Slider scrolling speed.     | `200`	 |
| `timerAdvance`		 | Automatic slider advancement by timer. **Parameters**: `[true / false, float(Msec)]`. | `[false]` |
| `freezeSliderMouseHover`  | Freeze slider on mouse hover   (`timerAdvance` must be `true`). | `false` |
| `freezeSliderOnLossFocus` | Freeze slider on loss of focus (`timerAdvance` must be `true`). | `false` |

```js
new SliderEndLess(blockSliderEndless, {
  speed: 250,
  timerAdvance: [
    true,
    3000
  ],
  freezeSliderMouseHover: true,
  freezeSliderOnLossFocus: true
});
```

### Self scrolling slider

Connect:
```xml
<script src="https://aleksandr-zero.github.io/LibralyJS/LibralyOfGoodieJS/scripts/sliders/sliderSelfScrolling.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-self-scrolling">
  <div class="slider-list">
    <div class="slider-track">
      <!-- Your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- Your slides -->
    </div>
  </div>
</div>
```

```js
const blockSliderSelfScrolling = document.querySelector(".slider-self-scrolling");

const newSliderSelfScrolling = new SliderSelfScrolling(blockSliderSelfScrolling);
newSliderSelfScrolling.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `duration`         | Slider duration. Parameters: `int(sec)`  | `10` |
| `temporaryFunction`| Temporary function for **transition**.   | `linear` |
| `delay`            | Delay for **transition**.                | `0` |
| `delayBeforeStartingAfterHiding`| Delay the slider before starting it after hiding it. **Parameters**: `float(sec)`. | `1.5` |
| `repeatSlider`     | Repeating the scrolling of the slider after it has finished. | `false` |

```js
new SliderSelfScrolling(blockSliderSelfScrolling, {
  duration: 12000,
  temporaryFunction: "linear",
  delay: 2,
  delayBeforeStartingAfterHiding: 2,
  repeatSlider: false,
});
```

### Slider with automatic adjustment

```xml
<!-- Slider main container -->
<div class="slider-automatic-adjustment">
  <div class="slider-list">
    <div class="slider-track">
      <!-- Your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- Your slides -->
    </div>
  </div>
</div>
```

```js
const blockSliderAutomaticAdjustment = document.querySelector(".slider-automatic-adjustment");

const newSliderWithAutomaticAdjustment = new SliderWithAutomaticAdjustment(blockSliderAutomaticAdjustment, {
  speed: 250
});
newSliderWithAutomaticAdjustment.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `speed`            | Slider scrolling speed.     | `200`   |

```js
new SliderWithAutomaticAdjustment(blockSliderAutomaticAdjustment, {
  speed: 250
});
```

## Pop up

### Disposable popup

```xml
<!-- Pop-up main container -->
<div class="popup-disposable">
  <button type="button" class="popup-disposable-btn-open btn-open-popup">Open popup</button>
  <div class="popup-disposable__container popup-container">
    <div class="popup-disposable__container-content">
      <!-- Your pop-up -->
      <div class="pop-up">
        <h2 class="pop-up__title">Hello</h2>
        <div class="pop-up__description">
          <p>
            One-time popup demo
          </p>
        </div>
      </div>
      <!-- Your pop-up -->  
    </div>
  </div>
</div>
```

```js
const blockPopupDisposable = document.querySelector(".popup-disposable");

const newPopupDisposable = new PopupDisposable(blockPopupDisposable);
newPopupDisposable.run();
```

### Reusable pop up

```xml
<!-- Pop-up main container -->
<div class="popup-multiple">
  <!--  -->
  <button data-popup-number="one" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 1</button>
  <button data-popup-number="two" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 2</button>
  <button data-popup-number="three" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 3</button>
  <div class="popup-multiple__container popup-container">
     <!-- This is where the generation will take place -->
    <div class="popup-multiple__container-content">

    </div>
  </div>
</div>
```

```js
const blockPopupMuliple = document.querySelector(".popup-multiple");

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
```