## Best practices

### Do

- Dialog boxes consist of a header (`DialogTitle`), content (`DialogContent`), and footer (`DialogActions`), which should all be included inside a body (`DialogBody`).
- Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
- Modal dialogs should be used very sparingly—only when it’s critical that people make a choice or provide information before they can proceed. These dialogs are generally used for irreversible or potentially destructive tasks. They’re typically paired with a backdrop without a light dismiss.
- Add a `aria-describedby` attribute on `DialogSurface` pointing to the dialog content on short confirmation like dialogs.
- Add a `aria-label` or `aria-labelledby` attribute on `DialogSurface` if there is no `DialogTitle`

### Don't

- Don't use more than three buttons between `DialogActions`.
- Don't open nested `Dialog`s. They are an anti-pattern and should be avoided. Nested dialogs create complex focus restoration logic and confuse users. If your design requires stacking dialogs, consider using a multi-step wizard within a single dialog, sequential dialogs, or a different UI component (panels, sidebars, popovers).
- Don't use a `Dialog` with no focusable elements
