Use `Stagger.In` with custom motion components to create various spinner animations. These examples demonstrate how to combine stagger choreography with continuous animations using `createMotionComponent` and infinite iterations.

Each spinner consists of multiple small elements that:

1. **Stagger in** - Elements appear in sequence using `Stagger.In`
2. **Animate continuously** - Each element runs an infinite animation loop using `createMotionComponent`

```tsx
import { Stagger, createMotionComponent, motionTokens } from '@fluentui/react-motion-components-preview';

// Create a custom spinning motion component
const SpinMotion = createMotionComponent({
  keyframes: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  duration: motionTokens.durationUltraSlow * 4,
  iterations: Infinity, // Continuous animation
  easing: motionTokens.curveLinear,
});

// Use with Stagger.In for coordinated entrance
<Stagger.In itemDelay={motionTokens.durationFast}>
  <SpinMotion>
    <div className="arc1" />
  </SpinMotion>
  <SpinMotion>
    <div className="arc2" />
  </SpinMotion>
  <SpinMotion>
    <div className="arc3" />
  </SpinMotion>
</Stagger.In>;
```

## Spinner Types

### Circular Spinners

- **Nested Arcs**: Concentric rotating arcs with different sizes and colors
- **Dot Orbit**: Dots that orbit around a central point in sequence

### Linear Spinners

- **Bouncing Dots**: Horizontal dots that bounce up and down with wave timing
- **Growing Bars**: Vertical bars that scale up and down rhythmically
- **Sliding Blocks**: Blocks that slide horizontally back and forth

## Key Features

- **Infinite Iterations**: Uses `iterations: Infinity` for continuous animation
- **Staggered Entrance**: Elements appear in sequence using `Stagger.In`
- **Custom Timing**: Different `itemDelay` values control stagger speed
- **Replay Control**: Reset animations by changing the React `key` prop
- **Web Animations API**: Powered by `createMotionComponent` for smooth performance
