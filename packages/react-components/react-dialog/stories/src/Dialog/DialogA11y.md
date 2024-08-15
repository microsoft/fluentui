## Accessibility

Here are some accessibility edge cases scenarios we identified and users should keep in mind while using the `Dialog` components.

1. NVDA reads dialog information twice
2. Talkback doesn't support dialog name/description
3. Talkback doesn't support `alertdialog`
4. Whenever including a `Menu`, `Combobox`, `Dropdown` or `Popover` inside a dialog the property `aria-modal` should be false otherwise VoiceOver on IOS will not be able to access the popup. This is needed as well for VoiceOver on macOS, otherwise these components are not narrated. Apply `aria-modal=false` on the `DialogSurface` slot.
5. `DialogSurface` by default has `aria-describedby="dialog-content-id"`, which might not be ideal with complex `DialogContent`, on those scenarios (for example on [with form](#with-form)), it is recommended to set `aria-describedby={undefined}`
