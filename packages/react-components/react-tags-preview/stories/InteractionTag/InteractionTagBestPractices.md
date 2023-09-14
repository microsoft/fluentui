## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `InteractionTag`.

- `InteractionTagSecondary` should provide information to screen readers about the secondary action using `aria-label` or `aria-labelledby`. To label the`InteractionTagSecondary`component with the added context from`InteractionTagPrimary`, follow these steps:
  1. Apply an `id` attribute to both the InteractionTagPrimary and InteractionTagSecondary components.
  2. Add an `aria-label` attribute to the InteractionTagSecondary component, with a value that describes the secondary action (e.g. "remove").
  3. Add an `aria-labelledby` attribute to the InteractionTagSecondary component, with the id values of both the InteractionTagPrimary and InteractionTagSecondary components. This will compute the accessible name of the InteractionTagSecondary component.

### Don't

- Don't use `InteractionTag` for tags without a primary action. Use `Tag` in such cases.

- Don't use `media` together with `icon`.
