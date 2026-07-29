`Dialog`'s `surfaceMotion` slot accepts `Scale` params directly, such as `duration`, `outScale`, `easing`, and `animateOpacity`. `DialogSurface`'s `backdropMotion` slot accepts `Fade` params.

Both slots also support the `children` render function, which allows replacing the default motion with a custom implementation. This story demonstrates the simpler direct prop approach:

```tsx
<Dialog surfaceMotion={{ duration, outScale, easing, animateOpacity }}>
  <DialogSurface backdropMotion={{ duration: backdropDuration }}>…</DialogSurface>
</Dialog>
```
