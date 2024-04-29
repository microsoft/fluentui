## Best practices

### Do

- To group multiple tags together, use `TagGroup`. `TagGroup` can handle dismiss of multiple `Tag`.

- Dismissible `Tag` should provide information to screen readers about the dismiss action. There are two ways to label the tag:
  - option 1 - add aria-label on dismiss icon, for example `dismissIcon={{ 'aria-label': 'remove' }}`. The accessible name of the Tag will be computed.
  - option 2 - add aria-label with the information about dismiss on Tag itself, and the dismiss icon should be hidden from accessibility tree using `dismissIcon={{ role: 'presentation' }}`

### Don't

- Don't change the interaction on a `Tag` because it should only be dismissible. Instead, use `InteractionTag` if you need a different type of interaction.

- Don't use `media` together with `icon` on one Tag.
