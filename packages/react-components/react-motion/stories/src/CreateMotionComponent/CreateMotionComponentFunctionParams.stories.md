Atoms definitions can be also defined as functions that accept an animated element as an argument. This allows to define more complex animations that depend on the animated element's properties, for example:

```ts
const Grow = createMotionComponent(({ element }) => ({
  duration: 300,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],
  iterations: Infinity,
}));
```
