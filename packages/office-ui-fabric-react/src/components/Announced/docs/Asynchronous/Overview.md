One common usage of Announced is with page sections that are "lazy loaded" and do not appear all at once.

### Examples

Pages, custom lists and libraries

### Scenarios

**User waits for a page to load and the progress of the page loading is known**:
There should only be one announced message per group of sections loaded, unless it has been over a specified period of time.
The component author can decide on a reasonable period of time after which to announce a status message.

With the code snippet below, the screen reader should announce "50% complete".

```tsx
public render(): JSX.Element {
  return (
    <Announced
      id={announcedId}
      message='50% complete'
    />
  );
}
```

Announced should also be used to handle the "completed" status.
