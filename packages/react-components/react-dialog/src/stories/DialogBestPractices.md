<details>
<summary>
 Best Practices
</summary>

### Do

- Dialog boxes consist of a header (`DialogTitle`), body (`DialogBody`), and footer (`DialogActions`).
- Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
- Modal dialogs should be used very sparingly—only when it’s critical that people make a choice or provide information before they can proceed. Thee dialogs are generally used for irreversible or potentially destructive tasks. They’re typically paired with an overlay without a light dismiss.
- `DialogSurface` by default has `aria-describedby="dialog-body-id"`, which might not be ideal with complex `DialogBody`, on those scenarios, it is recommended to set `aria-describedby={null}`

### Don't

- Don't use more than three buttons between `DialogActions`.
- Don't open a Dialog from a Dialog
- Don't use a Dialog with no focusable elements

</details>
