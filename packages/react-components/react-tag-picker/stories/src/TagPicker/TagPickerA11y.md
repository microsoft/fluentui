## Accessibility

Here are some accessibility edge cases scenarios we identified and users should keep in mind while using the `TagPicker` components.

### Narrator/Microsoft Edge

1. Narrator correctly disables the scan mode automatically once `TagPicker` combobox is focused, but switches scan mode back to the enabled state when trying to navigate dropdown using the `Down` or `Up` arrow key. The only way to correctly navigate the dropdown is to disable scan mode manually. This is a Narrator bug which affects not only custom combobox elements but also the `<select>` element.

### VoiceOver/Safari on macOS

1. When navigating the `TagPicker` dropdown using the `Down` or `Up` arrow keys, VoiceOver does not narrate the currently selected item in the dropdown, providing no feedback at all. This is a known VoiceOver/Safari bug related to the missing support for `aria-activedescendant`, because with VoiceOver/Google Chrome it works correctly.
2. It is neither possible using the VoiceOver keys to navigate item by item the dropdown items after expanding the dropdown. This is also a VoiceOver/Safari only related bug.

### VoiceOver/Safari on iOS

1. `TagPicker` dropdown items are not navigable at all using VoiceOver/Safari on iOS. This problem is present also in our `Combobox` component, but the example combobox by W3C enables item navigation and selection. The difference there is probably that in W3C example, the dropdown popup gets inserted after the combobox edit field, while in our components it is inserted at the end of the DOM.
