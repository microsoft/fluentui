## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `InteractionTag`.

### Don't

- Don't use `InteractionTag` for tags without a primary action. Use `Tag` in such cases.

- Don't use `media` together with `icon`.
