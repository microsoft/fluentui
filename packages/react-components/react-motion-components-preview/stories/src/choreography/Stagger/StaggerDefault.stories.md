`Stagger` wraps presence components and triggers their transitions in sequence.
It has a `visible` prop to trigger enter and exit transitions, so `Stagger` behaves like a presence component itself.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

<Stagger visible={isVisible}>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
  // etc.
</Stagger>;
```
