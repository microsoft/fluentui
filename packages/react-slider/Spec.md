# @fluentui/react-slider Draft Component Spec

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
- `fluid` takes up the entire width of the container.
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

### Visual behavior props

| Name              | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| label             | x                                                                                       | &check;                                                                               | The description label of the **Slider**.                                                                      |
| valueLabel        | x                                                                                       | &check;                                                                               | The current value or unique format to be shown for the **Slider's** `value label`.                            |
| disabled          | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** as disabled. @defaultvalue `false` (render enabled)                          |
| vertical          | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** vertically. @default `false` (render horizontally)                           |
| marks             | x                                                                                       | x                                                                                     | Whether the **Slider** will have marks to visibly display its steps. @default `false` (renders without marks) |
| fluid             | x                                                                                       | &check;                                                                               | A **Slider** can take the width of its container. @default `false` (width does not fill the container)        |
| disabledFocusable | X                                                                                       | X                                                                                     | A **Slider** can be disabled and focusable at the same time.                                                  |

### Event handlers props

| Name     | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                        |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| onChange | &check;                                                                                 | &check;                                                                               | Triggers a callback when the value has been changed. This will be called on every individual step. |

### Accessibility props

| Name           | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="120"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/> | Description                                                           |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ariaValueLabel | x                                                                                       | &check;                                                                               | The **Slider's** current value label to be read by the screen reader. |

## Migration

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| Name                        | Description                                                                                         | Reason                       |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| inputRef                    | Ref for input DOM node.                                                                             | Replaced with ref.           |
| getA11yValueMessageOnChange | Callback that creates custom accessibility message a screen reader narrates when the value changes. | Replaced with ariaValueLabel |

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| Name              | Description                                                                                                                                            | Reason                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ariaLabel         | A description of the Slider for the benefit of screen readers.                                                                                         | Will be replaced by aria-label                                                       |
| defaultLowerValue | The lower default value of the uncontrolled ranged slider.                                                                                             | The Ranged Slider's defaultValue will accept an array for the left and right values. |
| lowerValue        | The lower value of the controlled ranged slider.                                                                                                       | The Ranged Slider's value will accept an array for the left and right values.        |
| showValue         | Whether to show the value on the right of the Slider.                                                                                                  | Renamed to showValueLabel                                                            |
| onChanged         | Callback on mouse up, touch end, or after key presses have stopped.                                                                                    | Replaced with onChange                                                               |
| buttonProps       | Additional props for the actual `role="slider"` (slider box) element. (Note that this element is not actually a button in the current implementation.) | Unsure if it is an essential API feature.                                            |
| valueFormat       | Custom formatter for the slider value. value                                                                                                           | Label will handle custom formats                                                     |
| originFromZero    | Whether to attach the origin of slider to zero. Helpful when the range include negatives. @defaultvalue false                                          | Replaced with origin to allow for more control over the component.                   |
| ranged            | Whether to render a **Ranged Slider**. Ranged Sliders display two `thumbs` that allow for lower and upper bounds to be easily selected.                | Ranged will be separated into a different component.                                 |

## Structure

- _**Public**_
  ```jsx
  <Slider label={label} marks={marks} />
  ```
- _**Internal**_

  ```jsx
  <slots.root {...slotProps.root}>
    {state.label && <slots.label {...slotProps.label} />}
    <slots.sliderContainer {...slotProps.sliderContainer}>
      <slots.rail {...slotProps.rail} />
        {state.marks && (
            <slots.markContainer {...slotProps.markContainer}>
              <slots.mark {...slotProps.mark} />
              {state.markLabel && <slots.markLabel {...slotProps.markLabel} />}
           </slots.markContainer>
      <slots.track {...slotProps.track} />
      <slots.thumb {...slotProps.thumb} />
    </slots.sliderContainer>
    {state.valueLabel && <slots.valueLabel {...slotProps.valueLabel} />}
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
    <div className="ms-Slider-root">
        // Label is up for discussion
        <div className="ms-Slider-label">
            {...label children}
        </div>
        <div className="ms-Slider-container">
            <div className="ms-Slider-rail" />
            <div className="ms-Slider-markContainer">
                <div className="ms-Slider-mark" />
                <div className="ms-Slider-markLabel" />
            </div>
            <div className="ms-Slider-track" />
            <div className="ms-Slider-thumb" />
        </div>
        <div className="ms-Slider-valueLabel" />
    </div>
```

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_

  - **Disabled**
    - When disabled, all touch and mouse events are ignored, and the Slider's value never updates.
    - Allows focus but is read only. This helps quickly reveal information to blind users why the slider is disabled without needing to scan the entire page. `aria-disabled` is used instead of `disabled.`
  - **Focused**
    - Focus indicators only appear when keyboard tabbing/directional keystrokes and disappears when the mosue/touch interactions occur.

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
    `mousedown` sets the current value immediately.
    `mousemove` is attached to the window element on `mousedown` and watches for move events. Value is updated accordingly.
    `mouseup` removes the `mousemove` event.
  - _Touch_
    Handles the same events as the _Cursor_
  - _Screen readers_
    - **`root`:**
      - renders `as` div
      - handles native props expected from the element type in `as`
    - **`thumb`:**
      - `tabindex = 0`
      - `role = "slider"`
      - `aria-valuemin = min` and `aria-valuemax = max`
      - `aria-valuenow` represents the current value.

## Accessibility

`Slider` design pattern: [W3 Slider](https://www.w3.org/TR/wai-aria-1.1/#slider)

## Topics for Discussion

### Removing Fluid

Having the `Slider` fit the width of the screen could possibly be done by the user by applying custom styling to the `Slider`.

### RangedSlider Separated

It may be more readable and potentially better to split the `RangedSlider` and `Slider` components apart from each other as they have very different use cases and accessibility concerns.

### Removing Label and ValueLabel

If there is a way to remove the Label and ValueLabel while preserving accessibility it could greatly benefit the render structure (Removes container, label, and valueLabel slots).
