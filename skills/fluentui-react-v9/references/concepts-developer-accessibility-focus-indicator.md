## Focus indicator

Fluent UI components use [tabster](https://github.com/microsoft/tabster) for focus handling functionality, so that they can be easily integrated with application-level tabster functionality such as delooser and cross-iframe focusing.

Fluent UI `@fluentui/react-tabster` package defines `useKeyboardNavAttribute`, `createCustomFocusIndicatorStyle` and `createFocusOutlineStyle` to integrate tabster keyboard navigation mechanism seemlesly within Fluent UI.

### useKeyboardNavAttribute

Instantiates [keyborg](https://github.com/microsoft/keyborg) and adds `data-keyboard-nav` attribute to a referenced element to ensure keyboard navigation awareness synced to keyborg logic without having to cause a re-render on react tree.

### Styling focus indicators

The default focus indicator used in Fluent UI is an outline. However, in some cases more specific focus indicators are necessary depending on the use case and component design. In order to accommodate these requirements, Fluent UI exports two different utilities to style focus indicators:

1.  `createFocusOutlineStyle`
2.  `createCustomFocusIndicatorStyle`

Both of the helper functions are powered using the method described above.

#### createFocusOutlineStyle

The [AccordionHeader](?path=/docs/components-accordion--default) component uses `createFocusOutlineStyle` to style the default outline style when focus is detected

#### createCustomFocusIndicatorStyle

> ⚠️ A bad focus indicator can have serious accessibility consequences and can render your experience unusable by certain user. Please ensure before creating a custom focus indicator that you have gotten the necessary feedback from designers and accessibility experts.

The [Link](?path=/docs/components-link--default) component uses `createCustomFocusIndicatorStyle` to add a double underlined focus indication style
