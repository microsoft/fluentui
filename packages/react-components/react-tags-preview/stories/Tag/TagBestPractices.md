## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `Tag`.

### Don't

- Don't change the interaction on a `Tag` because it should only be dismissible. Instead, use `InteractionTag` if you need a different type of interaction.

- Don't use `media` together with `icon`.
