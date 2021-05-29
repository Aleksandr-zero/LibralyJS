# [Libraly JS](https://aleksandr-zero.github.io/LibralyJS/app/)

Library of goodies for your site ;)</br>
There is everything that your heart desires!

## Sliders

### Slider without fight

```xml
<div class="slider-without-fight">
  <div class="slider-list">
    <div class="slider-track">
      <!-- your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <div class="slide">6</div>
      <!-- your slides -->
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
| `speed`            | Slide scrolling speed.      | `200`   |

```js
new SliderWithoutFight(blockSliderWithoutFight, {
  speed: 250
});
```

### Endless slider

```xml
<div class="slider-endless">
  <div class="back-btn-slider-push back-btn-slider-push-left">
    <a data-direction="last" role="button" class="btn-slider-push btn-slider-push-last">Button</a>
  </div>
  <div class="slider-list">
    <div class="slider-track">
      <!-- your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- your slides -->
    </div>
  </div>
  <div class="back-btn-slider-push back-btn-slider-push-right">
    <a data-direction="next" role="button" class="btn-slider-push btn-slider-push-next">Button</a>
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
| `speed`						 | Slide scrolling speed.      | `200`	 |
| `timerAdvance`		 | Automatic slider advancement by timer. **Parameters**: `[true / false, int(Msec)]` | `[false]` |

```js
new SliderEndless(blockSliderEndless, {
  speed: 250,
  timerAdvance: [
    true,
    3000
  ]
});
```

### Self scrolling slider

```xml
<div class="slider-self-scrolling">
  <div class="slider-list">
    <div class="slider-track">
      <!-- your slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <!-- your slides -->
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
| `duration`         | Slider duration. Parameters: `int(Msec)` | `10000` |
| `temporaryFunction`| Temporary function for **transition**.   | `linear` |
| `delay`            | Delay for **transition**.                | `0` |
| `delayBeforeStartingAfterHiding`| Delay the slider before starting it after hiding it. | `linear` |
| `repeatSlider`     | Repeating the scrolling of the slider after it has finished. | `false` |

```js
const blockSliderSelfScrolling = document.querySelector(".slider-self-scrolling");

const newSliderSelfScrolling = new SliderSelfScrolling(blockSliderSelfScrolling, {
  duration: 12000,
  temporaryFunction: "linear",
  delay: 2,
  delayBeforeStartingAfterHiding: 2,
  repeatSlider: false,
});
newSliderSelfScrolling.run();
```

## Pop up
