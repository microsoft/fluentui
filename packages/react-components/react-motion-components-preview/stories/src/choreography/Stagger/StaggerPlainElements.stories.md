Plain elements can be revealed and hidden in sequence with a stepped `visibility` atom — running entirely on the Web Animations API with no timer loop or per-frame React state updates.

```tsx
const StaggeredVisibility = createStaggerPresenceComponent({
  enter: { keyframes: [{ visibility: 'hidden' }, { visibility: 'visible' }], duration: 1, easing: 'step-end' },
  exit: { keyframes: [{ visibility: 'visible' }, { visibility: 'hidden' }], duration: 1, easing: 'step-end' },
});

<StaggeredVisibility visible={isVisible}>
  <div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</StaggeredVisibility>;
```
