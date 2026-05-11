## Best practices

### Do

- Dialog boxes consist of a header (`DialogTitle`), content (`DialogContent`), and footer (`DialogActions`), which should all be included inside a body (`DialogBody`).
- Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
- Modal dialogs should be used very sparingly—only when it’s critical that people make a choice or provide information before they can proceed. Thee dialogs are generally used for irreversible or potentially destructive tasks. They’re typically paired with an backdrop without a light dismiss.
- Add a `aria-describedby` attribute on `DialogSurface` pointing to the dialog content on short confirmation like dialogs.
- Add a `aria-label` or `aria-labelledby` attribute on `DialogSurface` if there is no `DialogTitle`

### Don't

- Don't use more than three buttons between `DialogActions`.
- Don't open nested `Dialog`s without proper focus management. If you need nested dialogs, use `DialogTrigger` for automatic focus restoration or `useRestoreFocusSource()` and `useRestoreFocusTarget()` hooks for programmatic control. See the [Nested Dialogs](/docs/components-dialog--nested-dialogs) example for details.
- Don't use a `Dialog` with no focusable elements
