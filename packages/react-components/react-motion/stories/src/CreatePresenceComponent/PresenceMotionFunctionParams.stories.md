Functions in presence definitions also can be used to define motion parameters, this is useful when motion has different variations.

```tsx
const Scale = createPresenceComponent<{ startFrom?: number }>(({ startFrom = 0.5 }) => {
  const keyframes = [
    { opacity: 0, transform: `scale(${startFrom})` },
    { opacity: 1, transform: 'scale(1)' },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationUltraSlow,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
    },
  };
});
```
