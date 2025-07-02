The `Slide` component supports multiple CSS units for `fromX` and `fromY` parameters, including pixels, percentages, rem, and viewport units.

## Common Units

**Percentage (%)**: Ideal for full-screen panels and responsive designs

```tsx
// Panel slides in from completely off-screen
<Slide visible={visible} fromX="-100%" fromY="0%">
  <div>Full-width side panel</div>
</Slide>
```

**Pixels (px)**: Precise positioning for small adjustments

```tsx
// Small slide animation
<Slide visible={visible} fromX="-30px" fromY="-20px">
  <div>Subtle slide effect</div>
</Slide>
```

**Relative units (rem)**: Font-size relative positioning

```tsx
// Scales with font size
<Slide visible={visible} fromX="2rem" fromY="-1.5rem">
  <div>Typography-relative slide</div>
</Slide>
```

**Viewport units (vw/vh)**: Screen-size relative positioning

```tsx
// Viewport-relative slide
<Slide visible={visible} fromX="-10vw" fromY="5vh">
  <div>Screen-size relative slide</div>
</Slide>
```

## Mixed Units

You can mix different unit types for different axes:

```tsx
<Slide visible={visible} fromX="2rem" fromY="-50%">
  <div>Horizontal rem, vertical percentage</div>
</Slide>
```
