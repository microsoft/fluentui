In this step, we add a sliding motion to the title.

- We wrap the text in a `TitleMotion` component.

<div style="font-weight: bold;">

```tsx
// Wrap the text in a motion component with a slide in and out
<TitleMotion>
  <div>Album A</div>
</TitleMotion>
```

</div>

The `TitleMotion` component can be created from scratch with 4 keyframes:

<div style="font-weight: bold;">

```tsx
const TitleMotion = createMotionComponent({
  keyframes: [
    { transform: 'translateY(-100px)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'translateY(0)', opacity: 1, offset: 0.2 },
    { transform: 'translateY(0)', opacity: 1, offset: 0.8, easing: motionTokens.curveAccelerateMin },
    { transform: 'translateY(100px)', opacity: 0 },
  ],
  duration: 2000,
});
```

</div>
