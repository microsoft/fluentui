## Best practices

### Do

- Use Field to provide a visible label, required state, hints, and localized validation messages.
- Pair custom `formatDate` and `parseDate` functions when allowing text input.
- Configure Calendar-only options through the `calendar` slot.
- Use `null` for an empty controlled date and update controlled state from event/data callbacks.
- Localize the dialog and icon names, Calendar formatters, and action content.

### Don't

- Do not use placeholder text as the only accessible label.
- Do not supply independent text state through the nested Input slot.
- Do not treat `today` or `calendar.defaultDisplayedDate` as a selected value.
- Do not add a second validation message or live region inside DatePicker.
