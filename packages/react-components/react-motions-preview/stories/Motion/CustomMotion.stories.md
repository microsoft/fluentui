You can create completely custom motions, this is applicable to both `createMotionComponent()` and `createPresenceComponent()` factories.

Atoms are defined by `AtomMotion` interface and presence animations are defined by `PresenceMotion` interface.
`AtomMotion` contains definitions for `keyframes` and its options that are used internally to create [`KeyframeEffect`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect) for an animation.

```tsx
import type { AtomMotion } from '@fluentui/react-motions-preview';

const AtomMotion: AtomMotion = {
  // opacity will be animated from 0 to 1
  keyframes: { opacity: [0, 1] },
  // duration of the animation will be "1000ms"
  duration: 1000,
};
```

`PresenceMotion` contains definitions for `enter` and `exit` atoms.

```tsx
import type { PresenceMotion } from '@fluentui/react-motions-preview';

const enterAtom = {
  // opacity will be animated from 0 to 1
  keyframes: { opacity: [0, 1] },
  // duration of the animation will be "1000ms"
  duration: 1000,
};

const exitAtom = {
  // opacity will be animated from 1 to 0
  keyframes: { opacity: [1, 0] },
  // duration of the animation will be "500ms"
  duration: 500,
};

const presense: PresenceMotion = {
  enter: enterAtom,
  exit: exitAtom,
};
```
