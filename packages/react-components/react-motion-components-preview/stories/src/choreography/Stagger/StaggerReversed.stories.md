The `reversed` prop animates the stagger from the last item to the first.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

<Stagger visible={isVisible} reversed>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
  // etc.
</Stagger>;
```
