# @fluentui/react-switch Spec

**GitHub Epic issue** - [Switch Convergence #19409](https://github.com/microsoft/fluentui/issues/19409)

## Background

Previously called `Toggle` in v8 and `Checkbox` in v0, the `Switch` component introduces a quick way of switching between on/off states by clicking/tapping the thumb.

## Prior Art

### Open UI

The Open UI [Switch Research](https://open-ui.org/components/switch) page shows that the component is used in UI platforms across the web, with the `Switch` moniker being the most prominently used across major component libraries.

### Comparison of v8 and v0

The existing components are:

- v8 - [Toggle](https://developer.microsoft.com/en-us/fluentui#/controls/web/toggle)
- v0 - [Checkbox](https://fluentsite.z22.web.core.windows.net/0.52.2/components/checkbox/definition)

### [Toggle in v8/Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/toggle)

The v8 `Toggle` component

supports both `indeterminate` and `checked` states. In this case, an input tag is used and its opacity is set to 0. This allows for the logic to be performed by the native element while a div is rendered to show the styled checkbox.

Example

```tsx
<Checkbox
  label="Indeterminate checkbox (controlled)"
  indeterminate={isIndeterminate}
  checked={isChecked}
  onChange={onChange}
/>
```

Component props:

| Prop             | Description                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`      | Text for screen-reader to announce as the name of the toggle.                                                                                |
| `as`             | Render the root element as another type.                                                                                                     |
| `checked`        | Checked state of the toggle. If you are maintaining state yourself, use this property. Otherwise use `defaultChecked`.                       |
| `componentRef`   | Optional callback to access the IToggle interface. Use this instead of ref for accessing the public methods and properties of the component. |
| `defaultChecked` | Initial state of the toggle. If you want the toggle to maintain its own state, use this. Otherwise use `checked`.                            |
| `disabled`       | Optional disabled flag.                                                                                                                      |
| `inlineLabel`    | Whether the label (not the onText/offText) should bbe positioned inline with the toggle control.                                             |
| `label`          | A label for the toggle.                                                                                                                      |
| `offText`        | Text to display when toggle is OFF.                                                                                                          |
| `onChange`       | Callback issued when the value changes.                                                                                                      |
| `onText`         | Text to display when toggle is ON.                                                                                                           |
| `role`           | Whether to use the 'switch' role (ARIA 1.1) or the 'checkbox' role (ARIA 1.0).                                                               |
| `styles`         | Optional styles for the component.                                                                                                           |
| `theme`          | Theme provided by HOC.                                                                                                                       |

### [Checkbox in v0/Northstar](https://fluentsite.z22.web.core.windows.net/0.56.0/components/checkbox/definition)

The v0 `Checkbox` component

supports a mixed state, which is the same as indeterminate in v8. It is rendered as a `div` with `role="checkbox"` and does not use the native input element.

```tsx
// string
<Checkbox label="Make my profile visible" />

// jsx
<Checkbox
  label={
    <span>
      Long labels will wrap and the indicator <br /> should remain top-aligned.
    </span>
  }
/>
```

Component props:

| Prop             | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `accessibility`  | Accessibility behavior if overridden by the user.                  |
| `as`             | Render as given string or component.                               |
| `checked`        | Checkbox's checked state.                                          |
| `className`      | Additional styles.                                                 |
| `defaultChecked` | Whether the checkbox should be set to checked by default.          |
| `design`         | ...                                                                |
| `disabled`       | Whether the checkbox is disabled or not.                           |
| `indicator`      | Checkbox's icon indicator.                                         |
| `label`          | Label text or jsx to be rendered in the label.                     |
| `labelPosition`  | Whether the label is rendered on left or right (`start` or `end`). |
| `onChange`       | Event handler to be called after checked state has changed.        |
| `onClick`        | Event handler to be called after the checkbox is clicked.          |
| `styles`         | Additional styles.                                                 |
| `toggle`         | Render a toggle style checkbox with on and off choices.            |
| `variables`      | Additional styles.                                                 |

## Sample Code

```tsx
<Switch checked />
<Switch checked disabled/>
<Switch checked onChange={onChange}/>
```

https://github.com/microsoft/fluentui/blob/master/packages/react-checkbox/src/components/Checkbox/Checkbox.types.ts

## API

### Switch Props

See API at [Switch.types.ts](./src/components/Switch/Switch.types.ts).

## Structure

### Slots

- `root` - The outer `<div>` wrapping the `indicator`, `input` and `label` to provide the correct layout styling.
- `indicator` - The track and the thumb sliding over it indicating the on and off status of the Switch.
- `input` - The visually hidden `<input type="checkbox">` that handles the `Switch`'s functionality. This is the **primary** slot: it receives all of the native props passed to the `Switch` component. It has opacity 0 and overlaps the entire `root` slot, for hit testing.
- `label` - (optional) The `<label>` describing this `Switch`.

### Public

```tsx
<Switch checked={true} />
```

### Internal

```tsx
<slots.root {...slotProps.root}>
  <slots.input {...slotProps.input} />
  {labelPosition !== 'after' && slots.label && <slots.label {...slotProps.label} />}
  <slots.indicator {...slotProps.indicator} />
  {labelPosition === 'after' && slots.label && <slots.label {...slotProps.label} />}
</slots.root>
```

### DOM

_With label before the track thumb indicator:_

```tsx
<div class="fui-Switch">
  <input class="fui-Switch__input" id="switch-1" role="switch" type="checkbox" />
  <label class="fui-Switch__label" for="switch-1" />
  <div aria-hidden="true" class="fui-Switch__indicator">
    <CircleFilled />
  </div>
</div>
```

_With label after the track thumb indicator:_

```tsx
<div class="fui-Switch">
  <input class="fui-Switch__input" id="switch-1" role="switch" type="checkbox" />
  <div aria-hidden="true" class="fui-Switch__indicator">
    <CircleFilled />
  </div>
  <label class="fui-Switch__label" for="switch-1" />
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Behaviors

### States

The following section describes the different states in which a `Switch` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Switch` communicates interaction by having styling that invites the user to click/tap on it to toggle between on/off states.

#### Disabled state

A disabled `Switch` is non-interactive, ignoring all events and never updating its value. It does not allow focus and changes its styling to indicates this lack of interaction.

#### Hovered state

A hovered `Switch` changes styling to communicate that the user has placed a cursor above it.

#### Pressed state

A pressed `Switch` changes styling to communicate that the user is currently pressing it.

#### Unchecked state

An unchecked `Switch` has the thumb on the left (right in RTL) and styling to indicate that it is off.

#### Checked state

A checked `Switch` has the thumb on the right (left in RTL) and styling to indicate that it is on.

### Interaction

### Keyboard interaction

The following is a set of keys that interact with the `Switch` component:

| Key     | Description                     |
| ------- | ------------------------------- |
| `Space` | Switches between on/off states. |

### Cursor interaction

- `click`: Triggers a toggle between on and off values. The thumb animates from left to right [off > on] and right to left [on > off] to reflect this change (the directions are reversed in RTL).

### Touch interaction

The same behavior as above is traslated for touch events.

## Accessibility

### Relevant documents

- [WAI-ARIA 1.1 Spec](https://www.w3.org/TR/wai-aria-1.1/#switch)
- [WAI-ARIA 1.2 Spec](https://www.w3.org/TR/wai-aria-1.2/#switch)
- [WAI-ARIA 1.2 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#switch)

### Expected behavior

- Switch uses a standard HTML `<input type="checkbox">` with `role="switch"` set and does not require any additional handling for aria on the input element.
- The track and thumb indicator has `aria-hidden="true"` as it is a purely visual representation of the state of the underlying input.
