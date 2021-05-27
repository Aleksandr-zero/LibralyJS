# [Libraly JS](https://aleksandr-zero.github.io/LibralyJS/app/)
Library of goodies for your site ;)</br>
There is everything that your heart desires!

## Sliders

#### Slider without fight

```xml
<div class="slider-without-fight">
  <div class="slider-list">
    <div class="slider-track">
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
      <div class="slide">6</div>
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

#### Endless slider

```xml
<div class="slider-endless">
  <div class="back-btn-slider-push back-btn-slider-push-left">
    <a data-direction="last" role="button" class="btn-slider-push btn-slider-push-last">Button</a>
  </div>
  <div class="slider-list">
    <div class="slider-track">
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
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
| `timer_advance`		 | Automatic slider advancement by timer. Parameters: `[true / false, int(Msec)]` | `[false]` |

```js
new SliderEndless(blockSliderEndless, {
  speed: 250,
  timer_advance: [
  	true,
  	3000
  ]
});
```

## Pop up
