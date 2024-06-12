`createMotionComponent()` supports arrays of `AtomMotion` objects. This is useful when you want to animate properties with _different_ durations, easings, etc.

```ts
const FadeFastGrowSlow = createMotionComponent([
  {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 200,
    easing: 'easeIn',
  },
  {
    keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    duration: 500 /* 💡 note the different duration */,
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)' /* 💡 note the different easing */,
  },
]);
```
