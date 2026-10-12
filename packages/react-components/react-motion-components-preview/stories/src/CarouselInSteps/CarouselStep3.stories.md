In this step, we add a scaling motion to the photos.

- We wrap each photo in a `PhotoMotion` component.

<div style="font-weight: bold;">

```tsx
// Add the same scaling motion to the 3 photos
// by wrapping each <Image> in the motion component
<div>
  <PhotoMotion>
    <Image ... />
  </PhotoMotion>

  <PhotoMotion>
    <Image ... />
  </PhotoMotion>

  <PhotoMotion>
    <Image ... />
  </PhotoMotion>
</div>
```

</div>

The `PhotoMotion` component can be created from scratch with 4 keyframes:

<div style="font-weight: bold;">

```tsx
const PhotoMotion = createMotionComponent({
  keyframes: [
    { transform: 'scale(0.5)', opacity: 0, easing: motionTokens.curveDecelerateMin },
    { transform: 'scale(1)', opacity: 1, offset: 0.1 },
    { transform: 'scale(1)', opacity: 1, offset: 0.9, easing: motionTokens.curveAccelerateMin },
    { transform: 'scale(0.5)', opacity: 0 },
  ],
  duration: 2000,
});
```

</div>
