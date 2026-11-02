`AccordionPanel`'s `collapseMotion` slot can directly take `Collapse` props, such as `duration`, `easing`, `animateOpacity` and others.

The `collapseMotion` slot also supports the `children` render function, which allows replacing the default `Collapse` with a custom implementation. This story demonstrates the simpler direct prop approach:

```tsx
<AccordionPanel collapseMotion={{ duration, easing, animateOpacity }}>
```
