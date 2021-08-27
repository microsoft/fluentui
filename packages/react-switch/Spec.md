# @fluentui/react-switch Spec

## Background

Previously called Toggle in OUFR and Checkbox in Stardust, the Switch component
introduces a quick way of switching between Boolean values by pressing the thumb.

## Prior Art

Upon investigating other component libraries, it was decided to:

1. Change the name to Switch

Amongst other major component libraries (`Material UI`, `Ant Design`, `Evergreen`, and `Fast`) Switch appears to be a more prominently used name.

[Open UI](https://open-ui.org/components/switch)
[Epic Issue](https://github.com/microsoft/fluentui/issues/19409)

## Sample Code

```jsx=
<Switch checked />
<Switch checked disabled/>
<Switch checked onChange={onChange}/>
```

## API

| Name           | V0      | V8      | Description                                                                 |
| -------------- | ------- | ------- | --------------------------------------------------------------------------- |
| checked        | &check; | &check; | The value of the Switch. If `true` then the Switch will be enabled.         |
| defaultChecked | &check; | &check; | The default value of the Switch. If `true` then the Switch will be enabled. |
| disabled       | &check; | &check; | Whether the Switch should be disabled.                                      |
| onChange       | &check; | &check; | Callback to be called when the checked state value changes.                 |

## Migration

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| Name          | Description                                                                   | Reason                                                             |
| ------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| indicator     | A checkbox's indicator icon can be customized.                                | Toggle will have a slot for the thumb.                             |
| label         | A checkbox can render a label next to its indicator.                          | To be decided on how it is handled                                 |
| labelPosition | Determines whether the label should be positioned before or after the Switch. | To be decided on how it is handled                                 |
| onClick       | Called after a checkbox is clicked.                                           | The native input element handles onClick.                          |
| toggle        | A checkbox can be formatted to show an "on or off" choice.                    | Toggle is separated from checkbox due to vast styling differences. |

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| Name          | Description                                                                                     | Reason                              |
| ------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| componentRef  | Optional callback to access the IToggle interface.                                              | Not used in converged components    |
| label         | A label for the toggle.                                                                         | To be decided on how it is handled. |
| labelPosition | Determines whether the label should be positioned before or after the Switch.                   | To be decided on how it is handled  |
| onText        | Text to display when toggle is ON.                                                              | To be decided.                      |
| offText       | Text to display when toggle is OFF.                                                             | To be decided.                      |
| ariaLabel     | Text for screen-reader to announce as the name of the toggle.                                   | Toggle has a hidden input element.  |
| onAriaLabel   | @deprecated Use `ariaLabel` for name, and let the metadata convey state                         | deprecated                          |
| offAriaLabel  | @deprecated Use `ariaLabel` for name, and let the metadata convey state                         | deprecated                          |
| inlineLabel   | Whether the label (not the onText/offText) should be positioned inline with the toggle control. | It can be manually styled           |
| onChanged     | @deprecated Use `onChange` instead.                                                             | deprecated                          |
| theme         | Theme provided by HOC.                                                                          | Not used in converged components    |
| styles        | Optional styles for the component.                                                              | Not used in converged components    |
| role          | Whether to use the 'switch' role (ARIA 1.1) or the 'checkbox' role (ARIA 1.0).                  | Toggle has a hidden input element.  |

## Structure

- _**Public**_

```jsx=
<Switch checked={true}/>
```

- _**Internal**_

```jsx=
<slots.root {...slotProps.root}>
  <slots.track {...slotProps.track} />
  <slots.thumbWrapper {...slotProps.thumbWrapper}>
    <slots.thumb {...slotProps.thumb} />
  </slots.thumbWrapper>
  <input type="checkbox" />
</slots.root>;
```

- _**DOM**_

```jsx=
<div className="ms-switch-root">
  <div className="ms-switch-track" />
  <div className="ms-switch-thumbWrapper">
    <div className="ms-switch-thumb" />
  </div>
  <input type="checkbox" />
</div>;
```

## Behaviors

### Component States

- **Disabled**
  - When disabled, all events are ignored, and the Switch's value never updates.
  - Does not allow focus.
  - The cursor changes to `not-allowed`.
- **Checked**
  - Switch is off when the “thumb” is indicated on the left.
  - Switch is on when the thumb is indicated on the right.
  - This is switched in RTL.
  - When toggling switches on and off, the on state should change using the checked state appearance styles.

### Hover

The cursor changes to the hand icon. The outline of the Switch and thumb should also darken. This helps reinforce that the area is interactive.

### Keyboard

Since the Switch is an interactive component, it must be focusable and keyboard accessible.
The expected keyboard shortcut for activating a Switch is the spacebar key.

1. Use the spacebar to switch off
2. Use the spacebar to switch on

### Cursor

Clicking triggers toggling the state change. The thumb animates from right to left [on > off] and left to right [off > on]

### Touch

Touch follows the same behavior as the cursor.

## Accessibility

Accessibility will be handled by the hidden `<input type="checkbox" />` element and follows the same pattern.
