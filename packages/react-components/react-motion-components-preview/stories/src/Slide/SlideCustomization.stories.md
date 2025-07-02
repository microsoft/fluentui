The `Slide` component can be customized with different slide directions and opacity settings.

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Slide visible={visible} fromX="-40px" fromY="0px" animateOpacity={true}>
      <div>Slides in from the left with opacity animation</div>
    </Slide>
  );
}
```

## Parameters

- `fromX`: The X translate value with units to slide from (default: '0px'). Supports pixels, percentages, and other CSS units.
- `fromY`: The Y translate value with units to slide from (default: '-20px'). Supports pixels, percentages, and other CSS units.
- `animateOpacity`: Whether to include fade animation (default: true)
- `duration`: Animation duration for enter transition (default: 250ms)
- `exitDuration`: Animation duration for exit transition (default: 200ms)

## Examples with Different Units

```tsx
// Pixel-based sliding
<Slide visible={visible} fromX="-40px" fromY="0px">
  <div>Slides 40 pixels from the left</div>
</Slide>

// Percentage-based sliding (useful for full-screen slides)
<Slide visible={visible} fromX="-100%" fromY="0%">
  <div>Slides in from completely off-screen left</div>
</Slide>

// Mixed units
<Slide visible={visible} fromX="2rem" fromY="-50%">
  <div>Slides with mixed units</div>
</Slide>
```
