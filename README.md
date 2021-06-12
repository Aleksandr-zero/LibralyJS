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

const newSliderEndless = new SliderEndless(blockSliderEndless);
newSliderEndless.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `speed`						 | Slider scrolling speed.     | `200`	 |
| `timerAdvance`		 | Automatic slider advancement by timer. **Parameters**: `[true / false, float(Msec)]`. | `[false]` |
| `freezeSliderMouseHover`  | Freeze slider on mouse hover   (`timerAdvance` must be `true`). | `false` |
| `freezeSliderOnLossFocus` | Freeze slider on loss of focus (`timerAdvance` must be `true`). | `false` |

```js
new SliderEndless(blockSliderEndless, {
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
<div class="slider-automatic-adjustment">
  <div class="slider-list">
    <div class="slider-track">
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
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
