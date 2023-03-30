# @fluentui/react-infobutton Spec

Convergence epic issue: [#25062](https://github.com/microsoft/fluentui/issues/25062)

## Background

An InfoButton provides a way for users to get more information about a particular UI element. It is a button containing an icon that, when clicked, displays a Popover with the additional information. InfoButton may contain focusable items inside the Popover.

Because the Popover isn't always visible, it should not contain information that people must know in order to complete the field.

### Anatomy

![Anatomy](./etc/images/anatomy.png)

## Prior Art

| Name                                                | library                                                                               | Notes                                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| IconButtonTooltip                                   | [Carbon Design System](https://www.carbondesignsystem.com/components/tooltip/usage)   | This is an example within the tooltip component.                                                         |
| Tooltip with card appearance and general tooltip    | [EverGreen](https://evergreen.segment.com/components/tooltip)                         | This are examples within the tooltip component. This library doesn't use a button, instead just an icon. |
| Input and guidance to add info button               | [Salesforce](https://www.lightningdesignsystem.com/components/input/)                 | This component lives within Input and shows how to build an info button instead.                         |
| TextField with example on how to add an info button | [v8](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield)          | This is just an example and on how to implement it.                                                      |
| ContextualHelp                                      | [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/ContextualHelp.html) | It's a full component and uses a Popover instead of tooltip.                                             |

#### Comparison with v0 and v8

- v0 does not have an InfoButton component.
- v8 does not have an InfoButton component, but does have a TextField component that has an example of how to add an info button to a TextField, see "Prior Art" section above for more details.

## Sample Code

```jsx
<InfoButton info="This is some additional information." />
```

## API

#### Props

See (InfoButton.types.ts)[../src/components/InfoButton/InfoButton.types.ts] for more API details.

## Structure

_**Public**_

```jsx
<InfoButton
  info={
    <>
      Popover above-start lorem ipsum dolor sit amet consectetur.
      <Link href="https://react.fluentui.dev">Learn more</Link>
    </>
  }
/>
```

_**Internal**_

```jsx
return (
  <slots.popover {...(slotProps.popover as PopoverProps)}>
    <PopoverTrigger>
      <slots.root {...slotProps.root} />
    </PopoverTrigger>
    <slots.info {...slotProps.info} />
  </slots.popover>
);
```

_**DOM**_

```html
<button type="button" class="fui-InfoButton">
  <!-- icon -->
</button>

<!-- on document.body -->
<div role="tooltip" class="fui-PopoverSurface fui-InfoButton__info">
  Popover above-start lorem ipsum dolor sit amet consectetur.
  <a href="https://react.fluentui.dev">Learn more</a>
</div>
```

## Migration

There's no migration guide as `v0` and `v8` do not have an InfoButton component.

## Behaviors

> Note: The behavior will change when used in conjunction with the `Field` component. It is mentioned that when a form has many InfoButtons, it may be better to not make a full tab stop in the button. The idea is to have each field have a "shortcut" that will let you focus on the infobutton. This will be implemented by Field if needed.

- _Component States_
  - Popover open: The Popover is open and content visible.
- _Interaction_
  - _Keyboard_
    - `Enter` or `Space` key: Opens the Popover.
      - Focusable items in Popover: Focus is moved to the `PopoverSurface` and focusable items can be accessed by tabbing.
      - No focusable items in Popover: Focus is moved to the `PopoverSurface`.
      - `Escape` key: Closes the Popover.
  - _Cursor_
    - `Click`: Opens the Popover.
    - `Click` outside of Popover: Closes the Popover.
  - _Touch_
    - `Tap`: Opens the Popover.
    - `Tap` outside of Popover: Closes the Popover.
  - _Screen readers_
    - When focusing on the button, the screen reader should announce "{label associated to} information button collapsed".
    - When the Popover is opened, the focus moves to the `PopoverSurface` and the screen reader announces the content of the `PopoverSurface` and "note" at the end.

## Accessibility

- `PopoverSurfaces`'s role is `note` and its `tabIndex` is set to `-1`.
- The button's `aria-label` is `information`.
- Tab order
  - When tabbing through the page, the button should be a tab stop.
  - When focused on the button, pressing `Enter` or `Space` should open the Popover.
  - When the Popover is open, focus is moved to the `PopoverSurface`.
  - When focused on the `PopoverSurface` or content within it, pressing `Escape` should close the Popover.
