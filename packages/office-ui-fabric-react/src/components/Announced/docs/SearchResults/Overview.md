One common usage of Announced is for appearance of search-like results, such as in contact fields or search boxes.

### Examples

Search boxes, "To" line in mail clients

### Scenarios

**User types the letter 'b' into a picker**: The component should announce the number of search results found.

With the code snippet below, the screen reader should announce "3 items found."

```tsx
public render(): JSX.Element {
  return (
    <Announced
      id={announcedId}
      message='3 items found'
    />
  );
}
```
