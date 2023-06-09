<details>
<summary>
Best Practices
</summary>

### Do

- Prefer using an `InfoLabel` if the `InfoButton` is intended to be associated with a label.
- Set `aria-label` to an appropriate value if the `InfoButton` is not associated with a label.
- Add `aria-owns` to the trigger's parent element using the id of the `info` slot. This is done automatically by `InfoLabel`.

### Don't

- Because the Popover isn't always visible, don't include information that people must know in order to complete the field.

</details>
