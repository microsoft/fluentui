- In this step, we add a scaling motion to the photos.
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
