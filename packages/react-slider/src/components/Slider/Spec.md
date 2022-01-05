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

**Marks**: Amongst other component libraries marks/ticks/notches are used to help visibly differ the current location of the thumb. Marks are also used to create custom steps through providing an array of values to jump too. Marks will be excluded from initial release of the Slider to reduce complexity and await guidance for marks from design and partners.

**Ranged Slider**
Since the `RangedSlider` and `Slider` have very different use cases and accessibility concerns they are planned to be separated into different components. Slider component will be the focus of initial release with the multi-thumb slider being a focus after launch.

## Sample Code

```jsx=
// Slider can be uncontrolled
<Slider defaultValue={3} />

// Slider can be controlled
<Slider value={3} />

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

| Name     | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                          |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| disabled | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** as disabled. @defaultvalue `false` (render enabled) |
| vertical | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** vertically. @default `false` (render horizontally)  |
| size     | x                                                                                       | x                                                                                     | The size of the Slider.                                                              |

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
    <slots.rail {...slotProps.rail} />
    <slots.track {...slotProps.track} />
    <slots.thumb {...slotProps.thumb} />
    <slots.input {...slotProps.input} />
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
<div className="fui-Slider">
  <div className="fui-Slider-rail" />
  <div className="fui-Slider-track" />
  <div className="fui-Slider-thumb" />
  <div className="fui-Slider-input" />
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
    - **`hidden input element`:**
      - Handles aria for the Slider.

## Accessibility

`Slider` design pattern: [W3 Slider](https://www.w3.org/TR/wai-aria-1.1/#slider)
