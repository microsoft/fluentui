# @fluentui/react-slider Spec

## Epic Issue

https://github.com/microsoft/fluentui/issues/18886

## Background

The Slider component allows users to quickly select a value (or range) by dragging an icon across a bar. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## Prior Art

### Open UI Research

https://open-ui.org/components/slider.research.parts
https://open-ui.org/components/slider.research

Amongst other component libraries I discovered that it is common to see marks/ticks/notches to help visibly differ the current location of the thumb. It also common and useful to have a way of jumping to user defined marks to create unique Sliders.

## Sample Code

```jsx=
<Slider />
<Slider value=3 />
<Slider ranged value=[3,2] />

const marks1 = [{value: 2, label: "hello"},{value: 5, label: "test"}]
const marks2 = [{value: 2},{value: 5}]
<Slider marks={marks1} stepToMarks />
<Slider marks2={marks1} />
<Slider marks />
```

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

### Common props

| Name      | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="100"/> | Description                                   |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------- |
| className | &check;                                                                                 | &check;                                                                               | CSS class name to attach to the root element. |

### Value behavior props

| Name         | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue | &check;                                                                                 | &check;                                                                               | For **Ranged Sliders** `defaultValue` accepts accepts an array for the `[leftThumb, rightThumb]`.                                            |
| value        | &check;                                                                                 | &check;                                                                               | The current value of the `controlled` **Slider**. For **Ranged Sliders** `value` accepts accepts an array for the `[leftThumb, rightThumb]`. |
| origin       | x                                                                                       | x                                                                                     | The starting origin point for the **Slider**. @defaultValue (renders at 0)                                                                   |
| min          | &check;                                                                                 | &check;                                                                               | The min value of the **Slider**.                                                                                                             |
| max          | &check;                                                                                 | &check;                                                                               | The max value of the **Slider**.                                                                                                             |
| step         | &check;                                                                                 | &check;                                                                               | The number of steps that the **Slider's** `value` will increment upon change.                                                                |

### Visual behavior props

| Name           | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ranged         | x                                                                                       | &check;                                                                               | Whether to render a **Ranged Slider**. Ranged Sliders display two `thumbs` that allow for lower and upper bounds to be easily selected. |
| label          | x                                                                                       | &check;                                                                               | The description label of the **Slider**.                                                                                                |
| valueLabel     | x                                                                                       | &check;                                                                               | The current value or unique format to be shown for the **Slider's** `value label`.                                                      |
| showValueLabel | x                                                                                       | &check;                                                                               | Whether to show the value on the right of the **Slider**. @defaultvalue `true` (render value label)                                     |
| disabled       | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** as disabled. @defaultvalue `false` (render enabled)                                                    |
| vertical       | &check;                                                                                 | &check;                                                                               | Whether to render the **Slider** vertically. @default `false` (render horizontally)                                                     |
| snapToStep     | x                                                                                       | &check;                                                                               | Whether the thumb will snap to the closest value while moving the **Slider**. @default `false` (renders)                                |
| marks          | x                                                                                       | x                                                                                     | Whether the **Slider** will have marks to visibly display its steps. @default `false` (renders without marks)                           |
| stepToMarks    | x                                                                                       | x                                                                                     | Whether the **Slider's** thumb will step too provided `Marks`. @default `false` (renders based on `steps` prop)                         |

### Event handlers props

| Name     | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="200"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="200"/> | Description                                                                                        |
| -------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| onChange | &check;                                                                                 | &check;                                                                               | Triggers a callback when the value has been changed. This will be called on every individual step. |

### Accesibility props

| Name           | <img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="120"/> | <img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/> | Description                                                           |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ariaValueLabel | x                                                                                       | &check;                                                                               | The **Slider's** current value label to be read by the screen reader. |

:::danger

## Dropped Props

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| Name                        | Description                                                                                         | Reason                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| inputRef                    | Ref for input DOM node.                                                                             | Replaced with ref.                                           |
| getA11yValueMessageOnChange | Callback that creates custom accessibility message a screen reader narrates when the value changes. | Replaced with ariaValueLabel                                 |
| fluid                       | A slider can take the width of its container.                                                       | Personally not sure if it is essential but up for discussion |

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| Name              | Description                                                                                                                                            | Reason                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ariaLabel         | A description of the Slider for the benefit of screen readers.                                                                                         | Will be replaced by aria-label                                                       |
| defaultLowerValue | The lower default value of the uncontrolled ranged slider.                                                                                             | defaultValue will accept an array for the left and right values in ranged scenarios. |
| lowerValue        | The lower value of the controlled ranged slider.                                                                                                       | Value will accept an array for the left and right values in ranged scenarios.        |
| showValue         | Whether to show the value on the right of the Slider.                                                                                                  | Renamed to showValueLabel                                                            |
| onChanged         | Callback on mouse up, touch end, or after key presses have stopped.                                                                                    | Replaced with onChange                                                               |
| buttonProps       | Additional props for the actual `role="slider"` (slider box) element. (Note that this element is not actually a button in the current implementation.) | Personally not sure if it is essential but up for discussion                         |
| valueFormat       | Custom formatter for the slider value. value                                                                                                           | Label will handle custom formats                                                     |
| originFromZero    | Whether to attach the origin of slider to zero. Helpful when the range include negatives. @defaultvalue false                                          | Replaced with origin to allow for more control over the component.                   |

:::

## Structure

- _**Public**_
  `Focus`

- _**Internal**_

- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
