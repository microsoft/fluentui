## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `InteractionTag`.

- `InteractionTagSecondary` should provide information to screen readers about the secondary action using `aria-label` or `aria-labelledby`.
  - Recommended: You can use a short `aria-label`, for example 'remove'. Because by default `InteractionTagSecondary` has an `aria-labelledby` attribute with the id values of both the InteractionTagPrimary and InteractionTagSecondary components. This will compute the full accessible name for InteractionTagSecondary.
  - Another option: If you want to provide a custom accessible name on InteractionTagSecondary that already contains the necessary information from InteractionTagPrimary, you can use the `aria-label` attribute and set `aria-labelledby` to `null`.

### Don't

- Don't use `InteractionTag` for tags without a primary action. Use `Tag` in such cases.

- Don't use `media` together with `icon`.
