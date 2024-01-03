## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `InteractionTag`.

- `InteractionTagSecondary` should provide information to screen readers about the secondary action using `aria-label` or `aria-labelledby`.

  - Recommended: use a brief `aria-label`, such as 'remove'. By default, the InteractionTagSecondary component includes an `aria-labelledby` attribute. This attribute combines the id values from both the InteractionTagPrimary and InteractionTagSecondary components, allowing for a complete accessible name for InteractionTagSecondary.

    ⚠️ If you assign a custom id to InteractionTagPrimary, you'll need to also specify a custom aria-labelledby for InteractionTagSecondary.

  - Another option: If you want to provide a custom accessible name on InteractionTagSecondary that already contains the necessary information from InteractionTagPrimary, you can use the `aria-label` attribute and set `aria-labelledby` to `null`.

### Don't

- Don't use `InteractionTag` for tags without a primary action. Use `Tag` in such cases.

- Don't use `media` together with `icon` on one InteractionTag.
