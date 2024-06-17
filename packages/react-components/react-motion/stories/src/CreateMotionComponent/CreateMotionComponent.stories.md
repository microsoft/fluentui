You can create completely custom motion that are defined by `AtomMotion` interface. `AtomMotion` contains definitions for `keyframes` and its options that are used internally to create [`KeyframeEffect`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect) for an animation.

```tsx
import { type AtomMotion, createMotionComponent } from '@fluentui/react-components';

const customAtom: AtomMotion = {
  // opacity will be animated from 0 to 1
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  // duration of the animation will be "1000ms"
  duration: 1000,
};
const CustomMotion = createMotionComponent(customAtom);
```
