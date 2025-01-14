Presence definitions can be also defined as functions that accept an animated element as an argument. This allows to define more complex animations that depend on the animated element's properties, for example:

```ts
const Collapse = createPresenceComponent(({ element }) => {
  const duration = 500;
  const keyframes = [
    { opacity: 0, maxHeight: '0px', overflow: 'hidden' },
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
  ];

  return {
    enter: { duration, keyframes },
    exit: { duration, keyframes: [...keyframes].reverse() },
  };
});
```
