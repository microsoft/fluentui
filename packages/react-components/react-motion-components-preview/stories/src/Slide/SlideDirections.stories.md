The `Slide` component supports different slide directions using `fromX` and `fromY` parameters.

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component() {
  return (
    <Slide visible={true} fromX="-40px" fromY="0px">
      <div>Slides in from the left</div>
    </Slide>
  );
}
```

## Direction Parameters

- `fromX`: The X translate value with units to slide from (default: '0px'). Supports pixels, percentages, and other CSS units.
- `fromY`: The Y translate value with units to slide from (default: '-20px'). Supports pixels, percentages, and other CSS units.

## Examples with Different Directions

```tsx
// Slide from left
<Slide visible={true} fromX="-40px" fromY="0px">
  <div>Slides 40 pixels from the left</div>
</Slide>

// Slide from top
<Slide visible={true} fromX="0px" fromY="-40px">
  <div>Slides 40 pixels from the top</div>
</Slide>

// Diagonal slide
<Slide visible={true} fromX="-30px" fromY="-30px">
  <div>Slides diagonally from top-left</div>
</Slide>

// Full-width slide
<Slide visible={true} fromX="-100%" fromY="0%">
  <div>Slides in from completely off-screen left</div>
</Slide>
```
