The `Slide` component manages content presence, using translation and opacity transitions.

The root component enters from `(fromX, fromY)` to `(inX, inY)` and exits from `(inX, inY)` to `(toX, toY)`. Entrance and present axes default to `'0px'`. If both exit axes are omitted, the exit returns to the entrance position. Within an authored endpoint, omitted axes use `'0px'`.

`Slide.In` and `Slide.Out` play once on mount, both from `(fromX, fromY)` to `(toX, toY)`. Both endpoints default to zero translation. `inX`, `inY`, and `visible` belong only to the root component.

By default, entering also fades from 0 to 1 opacity, and exiting fades from 1 to 0. Set `animateOpacity={false}` for translation-only animation, including on `.In` and `.Out`. Supply an offset to produce visible movement.

> **⚠️ Preview components are considered unstable**

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Slide visible={visible} fromY="20px">
      <div>Content</div>
    </Slide>
  );
}
```
