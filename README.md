# Library JS

Actually, here are some interesting solutions when I stumbled upon <br>
website development. I also added my own improvements and changes to these solutions.

## Getting started
Connect common CSS:
```xml
<link rel="stylesheet" href="LibraryOfGoodieJS/css/libraryOfGoodieJS.css">
```

Connect all library:
```xml
<script src="LibraryOfGoodieJS/scripts/libraryOfGoodieJS.js"></script>
```

## Sliders
### Components

#### Navigation
Adding navigation for the slider

```xml
<!-- Your slider -->
<div class="slider class">
  ...
  <!-- Navigation -->
  <div class="slider-navigation">
    <div class="back-btn-slider-push back-btn-slider-push-left">
      <button data-direction="last" type="button" class="btn-slider-push btn-slider-push-last">Button</button>
    </div>
    <div class="back-btn-slider-push back-btn-slider-push-right">
      <button data-direction="next" type="button" class="btn-slider-push btn-slider-push-next">Button</button>
    </div>
  </div>
  <!-- Navigation -->
</div>
```

#### Pagination

Adding pagination for the slider

```xml
<!-- Your slider -->
<div class="slider class">
  ...
  <!-- Pagination -->
  <div class="slider-pagination">
    <!-- There are as many buttons as there are slides -->
    <button type="button" class="pagination-btn">Button 1</button>
    <button type="button" class="pagination-btn">Button 2</button>
    <button type="button" class="pagination-btn">Button 3</button>
    <button type="button" class="pagination-btn">Button 4</button>
    <button type="button" class="pagination-btn">Button 5</button>
  </div>
  <!-- Pagination -->
</div>
```

### Slider without fight
*Component `Navigation` and `Pagination` is not typical for this slider.*

Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderWithoutFight.js"></script>
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
new SliderWithoutFight(..., {
  scrollAfterAbruptStop: false
});
```

### Self scrolling slider
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderSelfScrolling.js"></script>
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
| `duration`         | Slider duration. **Parameters**: `<int>(sec)`  | `10` |
| `temporaryFunction`| Temporary function for *style* **transition**.   | `linear` |
| `delay`            | Delay for *style* **transition**.                | `0` |
| `delayBeforeStartingAfterHiding`| Delay the slider before starting it after hiding it. **Parameters**: `<float>(sec)`. | `1.5` |

```js
new SliderSelfScrolling(..., {
  duration: 12000,
  temporaryFunction: "linear",
  delay: 2,
  delayBeforeStartingAfterHiding: 2,
});
```

### Slider with automatic adjustment
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderWithAutomaticAdjustment.js"></script>
```

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
| `speed`            | Slider scrolling speed. **Parameters**: `<int>(ms)` | `200`   |

```js
new SliderWithAutomaticAdjustment(..., {
  speed: 250
});
```

### Slider before-after

Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderBeforeAfter.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-before-after">
  <div class="slider-list">
    <div class="slider-track">
      <!-- Yout slide before -->
      <div class="slide-before">
        <div class="slide-before-body">
          BEFORE
        </div>
      </div>
      <!-- Yout slide after -->
      <div class="slide-after">
        AFTER
      </div>
      <div class="slider-switch">
        <span>Switch</span>
      </div>
    </div>
  </div>
</div>
```

```js
const blockSliderBeforeAfter = document.querySelector(".slider-before-after");

const newSliderBeforeAfter = new SliderBeforeAfter(blockSliderBeforeAfter);
newSliderBeforeAfter.run();
```

### Slider split
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderSplit.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-split">
  <div class="slider-list">
    <!-- Your slides -->
    <div class="slide">1</div>
    <div class="slide">2</div>
    <div class="slide">3</div>
    <!-- Your slides -->
  </div>
  <div class="slider-split-back-btns">
    <button type="button" class="slider-split-btn">Btn slider 1</button>
    <button type="button" class="slider-split-btn">Btn slider 2</button>
    <button type="button" class="slider-split-btn">Btn slider 3</button>
  </div>
</div>
```

```js
const blockSliderSplit = document.querySelector(".slider-split");

const newSliderSplit = new SliderSplit(blockSliderSplit, {
  sliderActivationOnHover: true,
  changeSlidesByButtons: false,
  initial: 2,
  activeClass: "slide--active",
  activeClassBtn: "split-btn--active"
});
newSliderSplit.run();
```

| Option                         | Description     | Default   |
|--------------------------------|-----------------|-----------|
| `blockSliderSplit` | Main container for slider. **Parameters**: `HTMLElement` | `undefined` ||
| `options` | Custom settings. **Parameters**: `Object` | `{}` |
| `options.sliderActivationOnHover` | When you hover over the slide area, it is activated. | `false` |
| `options.changeSlidesByButtons` | Change buttons only by button clicks. **Parameter `sliderActivationOnHover` is ignored.** | `true` |
| `options.initial` | Initial slide index. **Parameters**: `int` | `1` |
| `options.activeClass` | Active class for current slide. **Parameters**: `String` | `slide--active` |
| `options.activeClassBtn` | Active class for current button. **Parameters**: `String` | `split-btn--active` |


### Slider with previews
*Component `Pagination` is not typical for this slider.*

```xml
<script src="LibraryOfGoodieJS/scripts/sliders/sliderWithPreviews.js"></script>
```

```xml
<!-- Slider main container -->
<div class="slider-with-previews">
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
  <div class="slider-list-previews">
    <div class="slider-track-previews">
      <!-- Your slides preview -->
      <div class="slide-preview">1</div>
      <div class="slide-preview">2</div>
      <div class="slide-preview">3</div>
      <div class="slide-preview">4</div>
      <div class="slide-preview">5</div>
      <!-- Your slides preview -->
    </div>
  </div>
</div>
```

```js
const blockSliderWithPreviews = document.querySelector(".slider-with-previews");

const newSliderWithPreviews = new SliderWithPreviews(blockSliderWithPreviews, {
  speed: 300,
  movementClickingOnPreview: true,
  slidesPreviewPerView: 3
});
newSliderWithPreviews.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `speed`            | Slider scrolling speed. **Parameters**: `<int>(ms)` | `200`   |
| `movementClickingOnPreview` | When you click on the preview, they will move to this slide. | `false` |
| `slidesPreviewPerView` | Visible slides on the preview. (**Required parameter**). (*`Recommendation`*): The most appropriate value is *`3`*! | `undefined` |

```js
new SliderWithPreviews(..., {
  speed: 300,
  movementClickingOnPreview: true,
  slidesPreviewPerView: 3
});
```

## Pop up
### Disposable popup
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/popups/popupDisposable.js"></script>
```

```xml
<button type="button" class="popup-disposable-btn-open btn-open-popup">Open popup</button>
<!-- Pop-up main container -->
<div class="popup-disposable">
  <div class="popup-disposable__container popup-container">
    <!-- Content -->
  </div>
</div>
```

```js
const blockPopupDisposable = document.querySelector(".popup-disposable");
const btnOpenPopupDisposable = document.querySelector(".popup-disposable-btn-open");

const newPopupDisposable = new PopupDisposable(
  blockPopupDisposable,
  btnOpenPopupDisposable,
  {
    activeClass: "popup-disposable--active"
  }
);
newPopupDisposable.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `popup` | Main container for Popup. (**Required**). **Parameters**: `HTMLElement`  |  `undefined`  |
| `btnOpen` | Button to open popup. (**Required**). **Parameters**: `HTMLElement`  |  `undefined`  |
| `options` | Custom settigs. **Parameters**: `Object` | `{}` |
| `options.activeClass` | Active class for popup. **Parameters**: `String` | `popup-disposable--active` |

### Reusable pop up
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/popups/popupMultiple.js"></script>
```

```xml
<!-- Pop-up main container -->
<div class="popup-multiple">
  <!-- Buttons for opening pop-ups -->
  <button data-popup-number="1" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 1</button>
  <button data-popup-number="2" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 2</button>
  <button data-popup-number="3" type="button" class="popup-multiple-btn-open btn-open-popup">Open popup 3</button>
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
  popups: {
    1: {
      title: "Popup 1",
      text: "Popup text at number 1",
      img: {
        srcImg: "../../doc/popupExample-1.png",
        altImg: "popup 1"
      }
    },
    2: {
      title: "Popup 2",
      text: "Popup text at number 2",
      img: {
        srcImg: "../doc/popupExample-2.png",
        altImg: "popup 2"
      }
    },
    3: {
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

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `blockPopupMuliple` | Main container for popup. (**Required**). **Parameters**: `HTMLElement`  |  `undefined`  |
| `templatePopup` | The main template, *popup* is generated based on it. **Parameters**: `String` | `undefined` |
| `options` | Custom settigs. **Parameters**: `Object` | `{}` |
| `options.popups.<int>` | Number popup. **Parameters**: `int` | `undefined` |

### Identical popup
Connect:
```xml
<script src="LibraryOfGoodieJS/scripts/popups/popupIdentical.js"></script>
```

```xml
<!-- Pop-up main container -->
<button type="button" data-number-popup="1" class="popup-identical-btn-open btn-open-popup">Open popup 1</button>
<button type="button" data-number-popup="2" class="popup-identical-btn-open btn-open-popup">Open popup 2</button>
<button type="button" data-number-popup="3" class="popup-identical-btn-open btn-open-popup">Open popup 3</button>
<div id="popup-identical-1" class="popup-identical">
  <div class="popup-identical__container popup__container">
    <div class="popup-identical-content">
      <!-- Content -->
    </div>
  </div>
</div>
<div id="popup-identical-2" class="popup-identical">
  <div class="popup-identical__container popup__container">
    <div class="popup-identical-content">
      <!-- Content -->
    </div>
  </div>
</div>
<div id="popup-identical-3" class="popup-identical">
  <div class="popup-identical__container popup__container">
    <div class="popup-identical-content">
      <!-- Content -->
    </div>
  </div>
</div>
```

```js
const btnsOpenPopupIdentical = document.querySelectorAll(".popup-identical-btn-open");

const newPopupIdentical = new PopupIdentical(btnsOpenPopupIdentical, {
  activeClass: "popup-identical--active",
  idPopupSearch: "popup-identical-"
});
newPopupIdentical.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `btnsOpen` | Buttons to open popups. (**Required**). **Parameters**: `HTMLElement`  |  `undefined`  |
| `options` | Custom settigs. **Parameters**: `Object` | `{}` |
| `options.activeClass` | Active class for popup. **Parameters**: `String` | `popup-identical--active` |
| `options.idPopupSearch` | Id for search popup. **Parameters**: `String` | `popup-identical-` |
