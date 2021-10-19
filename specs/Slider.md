# Slider component specification

The `Slider` component allows a user to slide a single thumb along a horizontal or vertical axis, representing a min/max range.

## Related variant considerations

`2DSlider` - allows 2-dimensional sliding, used for color picking or 2d panning.

## Reference implementations

https://codesandbox.io/s/sliders-xi0zw

Fabric Slider [docs](https://developer.microsoft.com/en-us/fabric#/controls/web/slider)

Stardust Slider [docs](https://fluentsite.z22.web.core.windows.net/components/slider/definition)

Material UI Slider [docs](https://material-ui.com/components/slider/)

BaseUI Slider [docs](https://baseweb.design/components/slider/)

Chakra Slider [docs](https://chakra-ui.com/slider)

Carbon Slider [docs](https://www.carbondesignsystem.com/components/slider/code)

AntD Slider [docs](https://ant.design/components/slider/)

FastDNA Slider [docs](https://github.com/microsoft/fast-dna/tree/master/packages/fast-components-@fluentui/base/src/slider), [example](https://explore.fast.design/components/slider)

## Props

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value |
| ---- | ---- | ------------- |

### Recommended props

| Name           | Type                                                        |
| -------------- | ----------------------------------------------------------- |
| as             | string                                                      |
| className      | string                                                      |
| defaultValue   | number \| number[]                                          |
| disabled       | boolean                                                     |
| marks          | { value: number; label: string; size: 's' \| 'm' \| 'l' }[] |
| max            | number                                                      |
| min            | number                                                      |
| name           | The form name, is injected on the hidden `input` element.   |
| onChange       | (ev: Event, value: number) => void                          |
| originFromZero | boolean                                                     |
| step           | number                                                      |
| value          | number \| number[]                                          |
| vertical       | boolean                                                     |

To be discussed:

| Name                                  | Concern                            |
| ------------------------------------- | ---------------------------------- |
| label/errorDescription                | Should be a concern of Form        |
| ariaLabel/getA11yValueMessageOnChange | Should this be in `accessibility`? |

### Fabric Slider props

https://developer.microsoft.com/en-us/fabric#/controls/web/slider

| Name           | Type                                                     | Notes                                                                                                    |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ariaLabel      | string                                                   |                                                                                                          |
| ariaValueText  | (value: number) => string                                |                                                                                                          |
| buttonProps    | React.HTMLAttributes<HTMLButtonElement>                  |                                                                                                          |
| className      | string                                                   |                                                                                                          |
| componentRef   | RefObject<ISlider>                                       |                                                                                                          |
| defaultValue   | number                                                   |                                                                                                          |
| disabled       | boolean                                                  |                                                                                                          |
| label          | string                                                   |                                                                                                          |
| max            | number                                                   |                                                                                                          |
| min            | number                                                   |                                                                                                          |
| onChange       | (value: number) => void                                  | This is the wrong signature and should be resolved to be (ev, number)                                    |
| onChanged      | (ev, number) => void                                     | This is the correct signature but the wrong prop name. Should be removed                                 |
| originFromZero | boolean                                                  | Deprecate in favor of `marks`.                                                                           |
| showValue      | boolean                                                  | Note it defaults to true, which should violate a naming convention. `valueHidden` might be a better name |
| snapToStep     | boolean                                                  | Consider deprecating; this has no value.                                                                 |
| step           | number                                                   | The difference between the two adjacent values of the Slider                                             |
| styles         | IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles> | Should be deprecated in favor of recomposition.                                                          |
| theme          | ITheme                                                   | Should not show up in the public props contract.                                                         |
| value          | number                                                   |                                                                                                          |
| valueFormat    | (value: number) => string                                | Could be depreacted; consider slots override?                                                            |
| vertical       | boolean                                                  |                                                                                                          |

### Stardust Slider props

| Name                        | Type                                   | Notes                                                                                                                                                         |
| --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibility               | "sliderBehavior" any                   | Why would a user need this as a prop?                                                                                                                         |
| animation                   | AnimationProp                          | Why would a user need this as a prop on slider?                                                                                                               |
| as                          | React.ElementType                      |                                                                                                                                                               |
| className                   | string                                 |                                                                                                                                                               |
| defaultValue                | string \| number                       |                                                                                                                                                               |
| design                      | ComponentDesign                        | What is the use case for this?                                                                                                                                |
| fluid                       | boolean                                | Stretching should be the default, this is unneeded.                                                                                                           |
| getA11yValueMessageOnChange | "getA11yValueMessageOnChange" function | This is for specify "aria-valuetext", <br> when value cannot be meaningfully represented by a number. <br> https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext |
| input                       | ShorthandValue<BoxProps>               | Prop polution.                                                                                                                                                |
| inputRef                    | Ref                                    | When you can't use an input what then?                                                                                                                        |
| max                         | string \| number                       |                                                                                                                                                               |
| min                         | string \| number                       |                                                                                                                                                               |
| onChange                    | ComponentEventHandler                  | Great, this is what we want :)                                                                                                                                |
| step                        | string \| number                       |                                                                                                                                                               |
| styles                      | ComponentSlotStyle                     | Consider only recomposition                                                                                                                                   |
| value                       | string \| number                       |                                                                                                                                                               |
| variables                   | any                                    | Consider only recomposition                                                                                                                                   |
| vertical                    | boolean                                |                                                                                                                                                               |

### Differences of Fabric/Stardust to resolve

| Name                        | Fx  | Recommendation                                                                                                                                                                              |
| --------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessibility               | S   | Discuss: In its current state it's unclear why a user would ever pass an accessibility behavior in. This is different from every framework. How does this help developers?                  |
| animation                   | S   | Remove: Why would a user need this as a prop on Slider? Also ambiguous; animation for slider movement or just css on the root?                                                              |
| ariaLabel                   | F   | Discuss: Without having the user read aria specs, can we abstract this into `screenReaderDescription` or `accessibility.description`? At minimum we need an example of what should go here. |
| ariaValueText               | F   | `ariaLabel` set label for the slider, the ariaValueText set string instead of slider number value                                                                                           |
| buttonProps                 | F   | Replace: Use slotProps/slots.                                                                                                                                                               |
| componentRef                | F   | Discuss: Slider imperative API to set focus and read value. Do we need these?                                                                                                               |
| design                      | S   | Remove: What is the use case for this?                                                                                                                                                      |
| fluid                       | S   | Replace: Stretch/fill continer should be the default no?                                                                                                                                    |
| getA11yValueMessageOnChange | S   | Discuss: Unclear what this specifically does; aria-live polite?                                                                                                                             |
| input                       | S   | Replace with slotProps/slots and/or specific props.                                                                                                                                         |
| inputRef                    | S   | Use case unclear. Can we remove this?                                                                                                                                                       |
| label                       | F   | Potentially we could remove this if there is a viable alternative; Form, for example.                                                                                                       |
| originFromZero              | F   | Add: valuable use case.                                                                                                                                                                     |
| showValue                   | F   | Note it defaults to true, which should violate a naming convention. `valueHidden` might be a better name                                                                                    |
| styles                      | F   | Remove: this causes perf problems. Replace with recomposition.                                                                                                                              |
| theme                       | F   | Remove: makes API surface muddy.                                                                                                                                                            |
| valueFormat                 | F   | Discuss: Could be replaced with slot/slot props.                                                                                                                                            |
| variables                   | S   | Remove: this causes perf problems. Replace with recomposition.                                                                                                                              |

### Conversion process from Fabric 7 to Fluent UI Slider

Props being changed:

> TODO

Props being removed:

> TODO

## Slots

| Name      | Considerations                             |
| --------- | ------------------------------------------ |
| root      |                                            |
| thumb     |                                            |
| rail      | The line behind the slider thumb and rail. |
| track     | The selected area of the slider.           |
| mark      | Optional mark.                             |
| markLabel |                                            |
| tooltip   | The tooltip rendered above a thumb.        |

## DOM structure

General considerations:

- Default should fill container horizontally; the track should touch the edges.
  - The thumb may extend beyond the boundaries, but should be compensated for in the container to avoid clipping.
- Focus is set on the thumb, allows for mult range slider selection.

### Recommended DOM

```html
<div class="root">
  <div class="rail"></div>

  <div class="mark">
    <label class="markLabel"></label>
  </div>

  <div class="track"></div>

  <div class="thumb" tabindex="0" role="slider" aria-valuenow="0" aria-valuemin="0" aria-valuemax="10"></div>
  <input name="{name}" type="hidden" value="0" />
</div>
```

### Fabric Slider example DOM

- Focus is on the container
- Unneeded extra `div` wrapping the rail
- Current impl missing "marks"
- No tooltip support
- no input

```html
<div
  aria-valuenow="0"
  aria-valuemin="0"
  aria-valuemax="10"
  aria-label="Controlled example"
  aria-disabled="false"
  class="ms-Slider-slideBox ms-Slider-showValue ms-Slider-showTransitions"
  id="Slider187"
  role="slider"
  tabindex="0"
  data-is-focusable="true"
>
  <div class="ms-Slider-line">
    <span class="ms-Slider-thumb" style="left: 0%;"></span>
    <span class="ms-Slider-active activeSection-243" style="width: 0%;"></span>
    <span class="ms-Slider-inactive inactiveSection-244" style="width: 100%;"></span>
  </div>
</div>
```

### Stardust Slider example DOM

- Extra wrapper div
- input element to receive focus
- No tooltip on thumb

```html
<div class="ui-slider" aria-disabled="false">
  <div class="ui-slider__input-wrapper">
    <span class="ui-slider__rail"></span>
    <span class="ui-slider__track" style="width: 50%;"></span>
    <input
      aria-orientation="horizontal"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="50"
      aria-valuetext="50"
      min="0"
      max="100"
      step="1"
      type="range"
      class="ui-box ui-slider__input"
      value="50"
    />
    <span class="ui-slider__thumb" style="left: 50%;"></span>
  </div>
</div>
```

### MUI Slider

- focus on thumb, allows for multi range slider
- input element purpose unclear; (type=hidden?) could be for form support

```html
<span class="MuiSlider-root MuiSlider-colorPrimary">
  <span class="MuiSlider-rail"></span>
  <span class="MuiSlider-track" style="left: 0%; width: 20%;"></span>
  <input type="hidden" value="20" />
  <span
    class="MuiSlider-thumb MuiSlider-thumbColorPrimary"
    tabindex="0"
    role="slider"
    data-index="0"
    aria-label="custom thumb label"
    aria-orientation="horizontal"
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow="20"
    style="left: 20%;"
  ></span>
</span>
```

## Behaviors

Aria spec:
https://www.w3.org/TR/wai-aria-1.1/#slider

Fluent UI HIG:
https://microsoft.sharepoint-df.com/:w:/t/OPGUXLeads/EWgxpDSGgEVInkHf9qIT8tEB9ukfQaYzXbLqc97M_3wDqw?e=d8rC23

### Disabled state

A disabled slider does not allow the user to change the value. All events will be ignored.

Typically disabled browser elements do now allow focus. This makes the control difficult for a blind user to know about it, or why it's disabled, without scanning the entire page. Therefore it is recommended to allow focus on disabled components and to make them readonly. This means we use `aria-disabled` attributes, and not `disabled` attributes, for defining a disabled state. This may sometimes require special attention to ignoring input events in the case a browser element might do something.

### Focus indicators

Focus indicators should not show in mouse or touch interaction; they should only appear when keyboard tabbing/directional keystrokes are pressed, and should disappear when mouse/touch interactions occur.

### Keyboarding

Assume left/right keyboard handling flips in RTL, unless specified.

| Key       | Description                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Up/Right  | Increments the value of the slider by the amount specified by the `step` prop. If the `shift` modifier is pressed, increases by 10x the `step` value. |
| Down/Left | Decrements the value of the slider by the amount specified by the `step` prop. If the `shift` modifier is pressed, increases by 10x the `step` value. |
| PageUp    | Increments by 10x `step`. Behaves as shift up/right.                                                                                                  |
| PageDown  | Decrements by 10x `step`. Behaves as shift down/left.                                                                                                 |
| Home      | Reduces the value to the amount specified by the `min` prop.                                                                                          |
| End       | Increases the value to the amount specified in the `max` prop.                                                                                        |

### Mouse input

Test: Possible to use this to capture mouse, though Safari does not have compatibility:
https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

- `mousedown` should immediately attempt to set value to the appropriate value.
- `mousemove` should be attached to the window during mousedown to track window-wise move events. Value should be updated appropriately. Note; if a `mousemove` occurs
  without the primary button pressed, tracking should cancel and treat the even as a `mouseup`. (Edge case: mouse down, move cursor out of window, release mouse)
- `mouseup` should remove the `mousemove` event.

### Touch

The same behavior as above, except that the events should concern

### Screen reader accessibility

#### `Fluent UI & Fluent UI Northstar comparison`:

From accessibility point of view the main difference is in type of element used for Slider itself:

- Fluent UI has `<div>` element with role="slider"
- Fluent UI Northstar has `<input>` element

The difference above high probably causing different results during [screen reader verification](https://jurokapsiar.github.io/open-a11y/components/slider.research#test-runs):

- Fluent UI slider behaves sometimes not predictable with JAWS in virtual cursor mode
- Fluent UI slider doesn't interact with VoiceOver and Safari browser. Neither common keyboard keys, nor VoiceOver keys.
- Fluent UI slider doesn't interact with VoiceOver and Chrome while using VoiceOver keys, but this difference is not huge with comparing Fluent UI Northstar

#### `Accessibility variants`:

- horizontal
- vertical
- no numeric slider
- disabled

#### `root`:

- should render the native element using the `as` prop, defaulting to `div`
- should mix in native props expected for the element type defined in `as`.

The `thumb` slot:

- should be focusable via `tabindex=0`
- role set to `slider`
- receives `aria-valuemin` and `aria-valuemax` representing min/max
- receives `aria-valuenow` representing the current value
- receives `aria-orientation="vertical"` representing vertical slider
- receives `aria-disabled="true"` representing disabled slider
- receives callback function which sets `aria-valuetext=STRING`

### Accessibility concerns for the user

[Follow generic hints.](https://hackmd.io/k2eJKI_JRs2Gew9dbrz00A?view#Component-labeling)

## Themability and customization

### Composition

The `Slider` uses `react-texture` to provide a recomposable implementation that has no runtime performance penalties. The `BaseSlider` implementation can be used to provide new `slots` and default `props`:

```tsx
const FooSlider = BaseSlider.compose({
  tokens: {},
  styles: {},
  slots: {}
});

render() {
  <FooSlider min={-100} max={100} centerValue={0}>
}
```

## Class names

1 per slot
1 per state, tagged on root

### Component design tokens

> Tokens represent the general look and feel of the various visual slots. Tokens feed into the styling at the right times in the right slot.
>
> Regarding naming conventions, use a camelCased name following this format:
> `{slot}{property}{state (or none for default)}`. For example: `thumbSizeHovered`.
>
> Common property names: `size`, `background`, `color`, `borderRadius`
>
> Common states: `hovered`, `pressed`, `focused`, `checked`, `checkedHovered`, `disabled`

| Name               | Considerations |
| ------------------ | -------------- |
| railBorderColor    |                |
| railBorderRadius   |                |
| railBorderWidth    |                |
| railColor          |                |
| railColorDisabled  |                |
| railColorFocused   |                |
| railColorHovered   |                |
| railColorPressed   |                |
| railSize           |                |
| thumbBorderColor   |                |
| thumbBorderRadius  |                |
| thumbBorderWidth   |                |
| thumbColor         |                |
| thumbColorDisabled |                |
| thumbColorFocused  |                |
| thumbColorHovered  |                |
| thumbColorPressed  |                |
| thumbSize          |                |
| trackBorderColor   |                |
| trackBorderRadius  |                |
| trackBorderWidth   |                |
| trackColor         |                |
| trackColorDisabled |                |
| trackColorFocused  |                |
| trackColorHovered  |                |
| trackColorPressed  |                |
| trackSize          |                |

NOTE! Stardust does not follow this convention. Slider currently uses these tokens:

```
activeThumbColor: string
activeThumbHeight: string
activeThumbWidth: string
disabledRailColor: string
disabledThumbColor: string
disabledTrackColor: string
height: string
length: string
railColor: string
railHeight: string
thumbBorderPadding: string
thumbColor: string
thumbHeight: string
thumbWidth: string
trackColor: string
```
