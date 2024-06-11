You can create completely custom motions with `createPresenceComponent()` factory. `PresenceMotion` contains definitions for `enter` and `exit` atoms defined by `AtomMotion` interface:

```tsx
import { type AtomMotion, createPresenceComponent, type PresenceMotion } from '@fluentui/react-components';

const enterAtom: AtomMotion = {
  // opacity will be animated from 0 to 1
  keyframes: { opacity: [0, 1] },
  // duration of the animation will be "1000ms"
  duration: 1000,
};

const exitAtom: AtomMotion = {
  // opacity will be animated from 1 to 0
  keyframes: { opacity: [1, 0] },
  // duration of the animation will be "500ms"
  duration: 500,
};

const presense: PresenceMotion = {
  enter: enterAtom,
  exit: exitAtom,
};

const Fade = createPresenceComponent(presense);
```
