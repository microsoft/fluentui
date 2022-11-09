<details>
<summary>
 Best Practices
</summary>

### Do

- Dialog boxes consist of a header (`DialogTitle`), content (`DialogContent`), and footer (`DialogActions`), which should all be included inside a body (`DialogBody`).
- Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
- Modal dialogs should be used very sparingly—only when it’s critical that people make a choice or provide information before they can proceed. Thee dialogs are generally used for irreversible or potentially destructive tasks. They’re typically paired with an backdrop without a light dismiss.
- `DialogSurface` by default has `aria-describedby="dialog-content-id"`, which might not be ideal with complex `DialogContent`, on those scenarios (for example on [with form](#with-form)), it is recommended to set `aria-describedby={undefined}`

### Don't

- Don't use more than three buttons between `DialogActions`.
- Don't open a `Dialog` from a `Dialog`
- Don't use a `Dialog` with no focusable elements

</details>
