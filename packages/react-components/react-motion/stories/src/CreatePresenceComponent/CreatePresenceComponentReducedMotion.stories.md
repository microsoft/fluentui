By default, when [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) is enabled the duration of the animation is set to `1ms`. `reducedMotion` allows to customize a reduced motion version of the animation:

```ts
const Motion = createPresenceComponent({
  enter: {
    keyframes: [
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    duration: 300,

    /* 💡reduced motion will not have scale animation */
    reducedMotion: {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 1000,
    },
  },
  exit: {
    /* ... */
  },
});
```

> 💡Note, if `keyframes` are provided, they will be used instead of the regular keyframes.
