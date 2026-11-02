## Best practices

### Accessibility

- By default, each card is of role="group".
- If the Card is focusable (any `focusMode` aside from `off`), provide a meaningful `aria-label` or `aria-labelledby` and `aria-describedby` that includes all relevant internal text content.
- For larger Cards that have a single title, use a heading tag to wrap the title text. The specific heading level should be determined by the specific context in which it is used.
