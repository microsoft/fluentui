# @fluentui/react-slider Draft Component Spec

# Slider

## Epic Issue

https://github.com/microsoft/fluentui/issues/18886

## Slider Issues

https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen++is%3A+Component%3A+Slider+

## Background

The Slider component allows users to quickly select a value by dragging an icon across a bar. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## Prior Art

### Open UI Research

https://open-ui.org/components/slider.research.parts
https://open-ui.org/components/slider.research

#### Research Summary

**Marks**: Amongst other component libraries marks/ticks/notches are used to help visibly differ the current location of the thumb. Marks are also used to create custom steps through providing an array of values to jump too.

**Ranged Slider**
Since the `RangedSlider` and `Slider` have very different use cases and accessibility concerns they are planned to be separated into different components.

## Sample Code

```jsx=
// Slider can be uncontrolled
<Slider defaultValue={3} />

// Slider can be controlled
<Slider value={3} />

// Marks can be a Boolean (default marks)
<Slider marks />

// Marks can be a number array (specific marks)
<Slider marks={[2, 5]} />

// Marks can be an array of mark definitions
<Slider
  marks={ [
    { value: 2, label: "hello" },
    { value: 5, label: "test" }
  ] }
/>

// Marks can be used as the step values using `step`
<Slider step="marks" marks={[25, 50, 75]} />
```

## Variants

- `vertical` displayed vertically.
- `disabled` read-only and does not update state.

## API

https://hackmd.io/VUpPADJ7Ry-ZXTrtffD7Sg

### Common props

| Name      | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="100"/> | Description                                   |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------- |
| className | &check;                                                                                 | &check;                                                                               | CSS class name to attach to the root element. |
| as        | x                                                                                       | x                                                                                     | The root element type of this component.      |

### Value behavior props

| Name         | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue | &check;                                                                                 | &check;                                                                               |                                                                                                                                                                              |
| value        | &check;                                                                                 | &check;                                                                               | The current value of the `controlled` **Slider**.                                                                                                                            |
| origin       | x                                                                                       | x                                                                                     | The starting origin point for the **Slider**. @defaultValue (renders at 0)                                                                                                   |
| min          | &check;                                                                                 | &check;                                                                               | The min value of the **Slider**.                                                                                                                                             |
| max          | &check;                                                                                 | &check;                                                                               | The max value of the **Slider**.                                                                                                                                             |
| step         | &check;                                                                                 | &check;                                                                               | The number of steps that the **Slider's** `value` will increment upon change. When passing the string "marks" **Slider** will step to adjacent values from the `marks` prop. |
| stepToMarks  | x                                                                                       | x                                                                                     | Whether the **Slider** should step to adjacent `marks`. If `true` and the `marks` prop is not provided, then `marks` will be set to `true`.                                  |

### Visual behavior props

| Name     | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                                   |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| disabled | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** as disabled. @defaultvalue `false` (render enabled)                          |
| vertical | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** vertically. @default `false` (render horizontally)                           |
| marks    | x                                                                                       | x                                                                                     | Whether the **Slider** will have marks to visibly display its steps. @default `false` (renders without marks) |
| size     | x                                                                                       | x                                                                                     | The size of the Slider.                                                                                       |

### Event handlers props

| Name     | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                        |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| onChange | &check;                                                                                 | &check;                                                                               | Triggers a callback when the value has been changed. This will be called on every individual step. |

## Migration

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| Name                        | Description                                                                                            | Reason                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| inputRef                    | Ref for input DOM node.                                                                                | Replaced with ref.                                                   |
| getA11yValueMessageOnChange | Callback that creates custom accessibility message a screen reader narrates when the value changes.    | Replaced with ariaValueLabel                                         |
| fluid                       | A **Slider** can take the width of its container. @default `false` (width does not fill the container) | Can be done by applying custom styles.                               |
| label                       | The description label of the **Slider**.                                                               | Can be handled by a form component and is a rare use case for Slider |

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| Name              | Description                                                                                                                                            | Reason                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ariaLabel         | A description of the Slider for the benefit of screen readers.                                                                                         | Will be replaced by aria-label                                                       |
| valueLabel        | The current value or unique format to be shown for the **Slider's** `value label`.                                                                     | Not a core part of the Slider control. It can be implemented separately.             |
| defaultLowerValue | The lower default value of the uncontrolled ranged slider.                                                                                             | The Ranged Slider's defaultValue will accept an array for the left and right values. |
| lowerValue        | The lower value of the controlled ranged slider.                                                                                                       | The Ranged Slider's value will accept an array for the left and right values.        |
| showValue         | Whether to show the value on the right of the Slider.                                                                                                  | Renamed to showValueLabel                                                            |
| onChanged         | Callback on mouse up, touch end, or after key presses have stopped.                                                                                    | Replaced with onChange                                                               |
| snapToStep        | Whether to decide that thumb will snap to closest value while moving the slider                                                                        | The control should keep a consistent visual behavior.                                |
| buttonProps       | Additional props for the actual `role="slider"` (slider box) element. (Note that this element is not actually a button in the current implementation.) | Unsure if it is an essential API feature.                                            |
| valueFormat       | Custom formatter for the slider value. value                                                                                                           | Label will handle custom formats                                                     |
| originFromZero    | Whether to attach the origin of slider to zero. Helpful when the range include negatives. @defaultvalue false                                          | Replaced with origin to allow for more control over the component.                   |
| ranged            | Whether to render a **Ranged Slider**. Ranged Sliders display two `thumbs` that allow for lower and upper bounds to be easily selected.                | Ranged will be separated into a different component.                                 |
| label             | The description label of the **Slider**.                                                                                                               | Can be handled by a form component.                                                  |

## Structure

- _**Public**_
  ```jsx
  <Slider defaultValue={3} marks={marks} />
  ```
- _**Internal**_

  ```jsx
  <slots.root {...slotProps.root}>
    {state.marks && <slots.marksContainer {...slotProps.marksContainer} />}
    <slots.sliderWrapper {...slotProps.sliderWrapper}>
      <slots.rail {...slotProps.rail} />
      <slots.trackWrapper {...slotProps.trackWrapper}>
        <slots.track {...slotProps.track} />
      </slots.trackWrapper>
      <slots.thumbWrapper {...slotProps.thumbWrapper}>
        <slots.thumb {...slotProps.thumb} />
      </slots.thumbWrapper>
      <slots.activeRail {...slotProps.activeRail} />
      <slots.input {...slotProps.input} />
    </slots.sliderWrapper>
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
<div className="ms-Slider-root">
  <div className="ms-Slider-markContainer">
    <div className="ms-Slider-markItemContainer">
      <div className="ms-Slider-mark" />
      <div className="ms-Slider-markLabel" />
    </div>
  </div>
  <div className="ms-Slider-wrapper">
    <div className="ms-Slider-rail" />
    <div className="ms-Slider-trackWrapper">
      <div className="ms-Slider-track" />
    </div>
    <div className="thumbWrapper">
      <div className="ms-Slider-thumb" />
    </div>
    <div className="ms-Slider-activeRail" />
    <div className="ms-Slider-input" />
  </div>
</div>
```

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_

  - **Disabled**
    - When disabled, all touch and mouse events are ignored, and the Slider's value never updates.
    - Does not allow focus and is read only.
  - **Focused**
    - Focus indicators only appear when keyboard tabbing/directional keystrokes and disappears when the mouse/touch interactions occur.

- _Interaction_
  - _Keyboard_
    | Key | Description |
    | - | - |
    | `Up`/`Right` | Increments the value of the slider by the `step` prop. |
    | `Down`/`Left` | Decrements the value of the slider by the `step` prop.|
    | `PageUp`/`Up/Right & Shift`| Increments the value of the slider by 10 _ `step`. |
    | `PageDown` /`Down/Left & Shift`| Decrements the value of the slider by 10 _ `step`. |
    | `Home` | Sets value to the `min` prop. |
    | `End` | Sets value to the `max` prop. |
  - _Cursor_
    `pointerdown` sets the current value immediately.
    `pointermove` is attached to the window element on `pointerdown` and watches for move events. Value is updated accordingly.
    `pointerup` removes the `mousemove` event.
  - _Touch_
    Handles the same events as the _Cursor_
  - _Screen readers_
    - **`root`:**
      - renders `as` div
      - handles native props expected from the element type in `as`
    - **`hidden input element`:**
      - Handles aria for the Slider.

## Accessibility

`Slider` design pattern: [W3 Slider](https://www.w3.org/TR/wai-aria-1.1/#slider)

# RangedSlider

## Research Summary

Amongst other libraries that support multi thumb Slider's two common and different approaches are:

1. **RangedSlider** is implemented in a standard **Slider** component.
2. It uses an array of values for thumb positions and renders the individual thumbs.

### Separating the component

This approach separates the component due to vast differences in accessibility, conflicts with props like origin, and complications of internal state management for the value (value would need to handle an object and number).

### Using an array

```jsx
<Slider value={[0, 100]} />
```

This approach strays away from an array due to:

1. It implies an arbitrary number of thumb's can be rendered.
2. If we choose to support and arbitrary number of ranges in the future it would be best to have it as an object still to allow for multiple tracks instead of thumbs (three thumbs on one track is not helpful):

```jsx
<RangedSlider
  defaultValue={[
    { lowerValue: 40, upperValue: 50 },
    { lowerValue: 60, upperValue: 80 },
  ]}
/>
```

## Sample Code

```jsx=
export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const [rangedSliderValue, setRangedSliderValue] = React.useState({ lowerValue: 10, upperValue: 20 });

  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: { lowerValue: number; upperValue: number } },
  ) => setRangedSliderValue(data.value);

  return (
    <div>
      <RangedSlider defaultValue={{ lowerValue: 40, upperValue: 80 }} />
      <RangedSlider value={rangedSliderValue} onChange={sliderOnChange} />
    </div>
  );
};
```

## API

The API is the same as **Slider** with two differences:

1. The value changes to an object.
2. The `origin` prop is omitted from the api.

| Name         | V0  | V8  | Description                                                                                        |
| ------------ | --- | --- | -------------------------------------------------------------------------------------------------- | --- |
| defaultValue | -   | -   | The starting value for an uncontrolled RangedSlider. Mutually exclusive with `value` prop.         |
| value        | -   | -   | The current value of the controlled RangedSlider. Mutually exclusive with `defaultValue` prop.     |     |
| onChange     | -   | -   | Triggers a callback when the value has been changed. This will be called on every individual step. |

## Migration

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| v8 `Slider`         | Converged `RangedSlider` |
| ------------------- | ------------------------ |
| `lowerValue`        | `value`                  |
| `defaultLowerValue` | `defaultValue`           |
| `ranged`            | X                        |

### v8

```jsx
export const SliderRangedExample: React.FunctionComponent = () => {
  const [sliderLowerValue, setSliderLowerValue] = React.useState(0);
  const [sliderValue, setSliderValue] = React.useState(10);

  const onChange = (_: unknown, range: [number, number]) => {
    setSliderLowerValue(range[0]);
    setSliderValue(range[1]);
  };

  return (
    <>
      <Slider ranged defaultValue={8} defaultLowerValue={2} />
      <Slider ranged value={sliderValue} lowerValue={sliderLowerValue} onChange={onChange} />
    </>
  );
};
```

### Converged

```jsx
export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const [rangedSliderValue, setRangedSliderValue] = React.useState({ lowerValue: 0, upperValue: 10 });

  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: { lowerValue: number, upperValue: number } },
  ) => setRangedSliderValue(data.value);

  return (
    <div>
      <RangedSlider defaultValue={{ lowerValue: 2, upperValue: 8 }} />
      <RangedSlider value={rangedSliderValue} onChange={sliderOnChange} />
    </div>
  );
};
```

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| Name       | Description                                        | Reason                           |
| ---------- | -------------------------------------------------- | -------------------------------- |
| lowerValue | Optional callback to access the IToggle interface. | Not used in converged components |

## Structure

- _**Public**_
  ```jsx
  <RangedSlider defaultValue={{ lowerValue: 0, upperValue: 100 }} />
  ```
- _**Internal**_

  ```jsx
  <slots.root {...slotProps.root}>
    {state.marks && <slots.marksWrapper {...slotProps.marksWrapper} />}
    <slots.sliderWrapper {...slotProps.sliderWrapper}>
      <slots.rail {...slotProps.rail} />
      <slots.trackWrapper {...slotProps.trackWrapper}>
        <slots.track {...slotProps.track} />
      </slots.trackWrapper>
      <slots.lowerThumbWrapper {...slotProps.lowerThumbWrapper}>
        // The hidden input element is moved inside the thumbWrapper for styling purposes regarding focus
        <slots.inputLower {...slotProps.inputLower} />
        <slots.lowerThumb {...slotProps.lowerThumb} />
      </slots.lowerThumbWrapper>
      <slots.upperThumbWrapper {...slotProps.upperThumbWrapper}>
        <slots.inputUpper {...slotProps.inputUpper} />
        <slots.upperThumb {...slotProps.upperThumb} />
      </slots.upperThumbWrapper>
      <slots.activeRail {...slotProps.activeRail} />
    </slots.sliderWrapper>
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
<div className="ms-RangedSlider-root">
  <div className="ms-RangedSlider-markContainer">
    <div className="ms-RangedSlider-markItemContainer">
      <div className="ms-RangedSlider-mark" />
      <div className="ms-RangedSlider-markLabel" />
    </div>
  </div>
  <div className="ms-RangedSlider-wrapper">
    <div className="ms-Slider-rail" />
    <div className="ms-Slider-trackWrapper">
      <div className="ms-Slider-track" />
    </div>
    <div className="ms-RangedSlider-lowerThumbWrapper">
      <div className="ms-RangedSlider-inputLower" />
      <div className="ms-Slider-lowerThumb" />
    </div>
    <div className="ms-RangedSlider-upperThumbWrapper">
      <div className="ms-RangedSlider-inputUpper" />
      <div className="ms-RangedSlider-upperThumb" />
    </div>
    <div className="ms-RangedSlider-activeRail" />
  </div>
</div>
```

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_

  - **Disabled**
    - When disabled, all touch and mouse events are ignored, and the RangedSlider's value never updates.
    - Does not allow focus and is read only.
  - **Focused**
    - Focus indicators only appear when keyboard tabbing/directional keystrokes and disappears when the mouse/touch interactions occur. The individual thumb hidden input elements maintain focus.

- _Interaction_
  - _Keyboard_
    Handles the same keyboard increment/decrement values from the `Slider` component. When the active thumb surpasses the lower or upper thumb, focus and the set value both switch to the other thumb.
  - _Touch_
    When the _rail_ is pressed the nearest thumb will be selected
  - _Cursor_
    `pointerdown` Finds the nearest thumb and sets the current value immediately.
    `pointermove` is attached to the window element on `pointerdown` and watches for move events. The selected thumb's value is updated accordingly. When the active thumb surpasses the lower or upper thumb, the set value switches to the other thumb.
    `pointerup` removes the `mousemove` event.
  - _Touch_
    Handles the same events as the _Cursor_
  - _Screen readers_
    Functions the same as `Slider`
