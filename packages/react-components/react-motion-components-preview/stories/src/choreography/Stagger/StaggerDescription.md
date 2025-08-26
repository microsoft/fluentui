> **⚠️ Preview components are considered unstable**

`Stagger` choreography is a rippled enter or exit transition across its child elements.

- `Stagger` can wrap presence motion components (`Slide`, `Fade`, `Collapse`, etc.) and then animate them by triggering their `visible` props in sequence.
- Its own `visible` prop gives interactive control over the staggered enter and exit transitions.
- This allows `Stagger` to be treated like a presence component, and thus be nested within another `Stagger`.
- `Stagger` can also transition plain HTML elements by adding and removing them from the DOM.

```tsx
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';

// wrapping presence motion components
<Stagger visible={isVisible}>
  <Slide>{/* item 1 */}</Slide>
  <Slide>{/* item 2 */}</Slide>
  <Slide>{/* item 3 */}</Slide>
</Stagger>

// wrapping plain elements
<Stagger visible={isVisible}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Stagger>
```

## Stagger Modes

|              | **'presence' mode**                                                                                                               | **'mount' mode**                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **children** | Presence components like `Fade` with a `visible` prop                                                                             | DOM elements or self-playing motion components like `Fade.In`  |
| **flow**     | Components occupy space in the DOM while hidden. When triggered, `Stagger` transitions them without necessarily affecting layout. | As `Stagger` adds elements to the DOM, they can affect layout. |
| **example**  | A hidden dropdown menu occupying space and ready to animate in on click                                                           | Cards that stagger in as soon as a page loads                  |
