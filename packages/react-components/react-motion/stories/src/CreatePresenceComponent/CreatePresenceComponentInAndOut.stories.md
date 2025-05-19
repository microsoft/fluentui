Every presence component has two halves, the `enter` and `exit` motions, which can be played in isolation using the static `.In` and `.Out` methods.

For example, a presence called `MyFade` will contain `<MyFade.In>` and `<MyFade.Out>` motion components, which play the `enter` and `exit` as one-off motions:

```tsx
// Create the presence component

const MyFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 4000,
  },

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 2000,
  },
});
```

In the render, each of the 2 motions can be played separately:

```tsx
// plays the enter animation (4000 ms fade-in)
<MyFade.In>
  {/* Content */}
</MyFade.In>

// plays the exit animation (2000 ms fade-out)
<MyFade.Out>
  {/* Content */}
</MyFade.Out>
```

This can be useful when choreographing a series of motions, or mixing and matching the enter and exit animations from different presence components.
