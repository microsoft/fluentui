A showcase demonstrating multiple Slide components with different directions and positions.

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function MultipleSlides() {
  return (
    <>
      <Slide visible={true} fromX={0} fromY={-80}>
        <div>Slides from top</div>
      </Slide>
      <Slide visible={true} fromX={-80} fromY={0}>
        <div>Slides from left</div>
      </Slide>
      <Slide visible={true} fromX={60} fromY={-60}>
        <div>Slides from top-right</div>
      </Slide>
    </>
  );
}
```

This example shows how multiple Slide components can create a coordinated entrance effect with different slide directions and positions.
