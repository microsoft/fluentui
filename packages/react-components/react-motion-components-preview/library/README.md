# @fluentui/react-motion-components-preview

**Pre-built Motion Components for [Fluent UI React](https://react.fluentui.dev/)**

> ⚠️ **Preview Package**: These components are in beta and APIs may change before stable release.

Ready-to-use presence components for common UI animation patterns, built on top of `@fluentui/react-motion`.

## Components

| Component    | Description                                                |
| ------------ | ---------------------------------------------------------- |
| **Fade**     | Opacity transitions for tooltips, notifications, overlays  |
| **Scale**    | Size animations for popovers, menus, emphasis              |
| **Collapse** | Height/width expansion for accordions, expandable sections |
| **Slide**    | Directional movement for drawers, panels, carousels        |
| **Blur**     | Focus/defocus effects for backgrounds, depth               |
| **Rotate**   | 3D rotation for card flips, reveals                        |

Each component (except Blur and Rotate) comes with **Snappy** (150ms) and **Relaxed** (250ms) timing variants.

## Installation

```bash
npm install @fluentui/react-motion-components-preview
# or
yarn add @fluentui/react-motion-components-preview
```

## Quick Start

```tsx
import { Fade, Scale, Slide, Collapse } from '@fluentui/react-motion-components-preview';

// Simple fade
function Tooltip({ visible, children }) {
  return (
    <Fade visible={visible}>
      {children}
    </Fade>
  );
}

// Slide from the right
function Drawer({ open, children }) {
  return (
    <Slide visible={open} outX="20px">
      {children}
    </Slide>
  );
}

// Use timing variants
import { FadeSnappy, ScaleRelaxed } from '@fluentui/react-motion-components-preview';

<FadeSnappy visible={show}>Quick feedback</FadeSnappy>
<ScaleRelaxed visible={show}>Smooth entrance</ScaleRelaxed>
```

### The `.In` and `.Out` Pattern

Every presence component includes one-way sub-components:

```tsx
// One-way enter animation (plays on mount)
<Fade.In>
  <div>Fades in once</div>
</Fade.In>

// One-way exit animation (plays on mount)
<Fade.Out>
  <div>Fades out once</div>
</Fade.Out>
```

## Pose-Based Helpers

`fade`, `scale`, `slide`, `rotate`, and `blur` — along with their neutral-boundary
directional helpers (`fadeIn`/`fadeOut`, `scaleIn`/`scaleOut`, `slideIn`/`slideOut`,
`rotateIn`/`rotateOut`, and `blurIn`/`blurOut`) — return ordinary motion atoms accepted
by `createPresenceComponent` and `createMotionComponent`.

```ts
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import {
  fadeIn,
  fadeOut,
  scaleIn,
  scaleOut,
  slideIn,
  slideOut,
  rotateIn,
  rotateOut,
  blurIn,
  blurOut,
} from '@fluentui/react-motion-components-preview';

const duration = motionTokens.durationNormal;
const CustomFade = createPresenceComponent({
  enter: fadeIn({ duration }),
  exit: fadeOut({ duration }),
});
const CustomScale = createPresenceComponent({
  enter: scaleIn({ from: 0.9, duration }),
  exit: scaleOut({ to: 0.9, duration }),
});
const CustomSlide = createPresenceComponent({
  enter: slideIn({ from: { y: '24px' }, duration }),
  exit: slideOut({ to: { y: '-12px' }, duration }),
});
const CustomRotate = createPresenceComponent({
  enter: rotateIn({ from: -90, duration }),
  exit: rotateOut({ to: 90, duration }),
});
const CustomBlur = createPresenceComponent({
  enter: blurIn({ from: '10px', duration }),
  exit: blurOut({ to: '10px', duration }),
});
```

General `fade`, `scale`, `slide`, `rotate`, and `blur` require explicit `from` and `to`
endpoints (within a `slide` pose, an omitted `x` or `y` axis defaults to `'0px'`). All
helpers require `duration`; `easing` defaults to linear and `delay` to `0`. Fade helpers
use `fill: 'both'` so delayed entrances remain hidden; the other atoms do not add opacity
or fill.

Directional `*In` helpers arrive at the property's neutral value (opacity `1`, scale `1`,
zero translation `0px`, `0` degrees around axis `'z'`, or blur `'0px'`) with `to`
forbidden, and `*Out` helpers depart from that neutral value with `from` forbidden.
`fadeIn`/`fadeOut` and `scaleIn`/`scaleOut` accept an optional outer endpoint that
defaults to `0`; `slideIn`/`slideOut`, `rotateIn`/`rotateOut`, and `blurIn`/`blurOut`
require an authored outer endpoint because they have no universal displaced value.

## Choreography, Sequence & Stagger

Multi-target stagger, serial sequences, and holds are defined as plain motion POJOs rather than nested
React motion components:

- `layer(target, motion, options?)` binds a choreography motion to a DOM element or CSS selector with an optional additive `delay`.
- `cloneMotionToTargets(targets, motion, options?)` creates one `MotionLayer` per target in input order without mutating `motion`.
- `hold(duration)` inserts an explicit pause in milliseconds within a sequence while preserving prior animated state.
- `sequence(children, { gap? })` plays ordered children serially on a shared cursor (positive `gap` pauses, negative `gap` overlaps), automatically normalizing WAAPI `fill` on repeated `(target, property)` steps.
- `stagger(members, { startInterval, order? })` preserves ordered layer participants and adds `index * startInterval` to each member's existing delay.
- `resolveChoreography(motion, rootOrOptions?)` lowers choreography POJOs into target-bound `AtomMotion[]` for WAAPI playback.
- `createChoreographyComponent` / `createChoreographyPresenceComponent` turn choreography POJOs into motion or presence components controlled by one `AnimationHandle`.
- `createSequenceComponent` creates a persistent-target sequenced motion component from ordered steps with an optional `gap` prop.
- `createStaggerComponent` / `createStaggerPresenceComponent` create homogeneous staggered components over matched targets (default `':scope > *'`).

```tsx
import { motionTokens } from '@fluentui/react-motion';
import {
  createChoreographyPresenceComponent,
  createStaggerPresenceComponent,
  fadeIn,
  fadeOut,
  layer,
  scaleIn,
  scaleOut,
  slideIn,
  slideOut,
  stagger,
} from '@fluentui/react-motion-components-preview';

// Homogeneous staggered list (one component, plain children)
const StaggeredSlide = createStaggerPresenceComponent({
  enter: [
    fadeIn({ duration: motionTokens.durationNormal }),
    slideIn({ from: { y: '20px' }, duration: motionTokens.durationNormal }),
  ],
  exit: [
    fadeOut({ duration: motionTokens.durationNormal }),
    slideOut({ to: { y: '20px' }, duration: motionTokens.durationNormal }),
  ],
});

// Heterogeneous non-sibling choreography with additive layer delays
const CardChoreography = createChoreographyPresenceComponent({
  enter: stagger(
    [
      layer('[data-part="media"]', scaleIn({ from: 0.94, duration: motionTokens.durationSlow })),
      layer('[data-part="title"]', fadeIn({ duration: motionTokens.durationNormal })),
      layer('[data-part="actions"]', slideIn({ from: { y: '12px' }, duration: motionTokens.durationNormal }), {
        delay: 40,
      }),
    ],
    { startInterval: 60 },
  ),
  exit: stagger(
    [
      layer('[data-part="media"]', scaleOut({ to: 0.94, duration: motionTokens.durationFast })),
      layer('[data-part="title"]', fadeOut({ duration: motionTokens.durationFast })),
      layer('[data-part="actions"]', slideOut({ to: { y: '12px' }, duration: motionTokens.durationFast })),
    ],
    { startInterval: 40, order: 'reverse' },
  ),
});
```

## Documentation

📚 **[Full documentation](https://react.fluentui.dev/?path=/docs/motion-components-preview-introduction--docs)**

- [Introduction](https://react.fluentui.dev/?path=/docs/motion-components-preview-introduction--docs) — Overview of all components
- [Fade](https://react.fluentui.dev/?path=/docs/motion-components-preview-fade--docs)
- [Scale](https://react.fluentui.dev/?path=/docs/motion-components-preview-scale--docs)
- [Collapse](https://react.fluentui.dev/?path=/docs/motion-components-preview-collapse--docs)
- [Slide](https://react.fluentui.dev/?path=/docs/motion-components-preview-slide--docs)
- [Blur](https://react.fluentui.dev/?path=/docs/motion-components-preview-blur--docs)
- [Rotate](https://react.fluentui.dev/?path=/docs/motion-components-preview-rotate--docs)
- [Stagger](https://react.fluentui.dev/?path=/docs/motion-choreography-preview-stagger--docs)
- [Motion Atoms](https://react.fluentui.dev/?path=/docs/motion-components-preview-atoms--docs) — Building blocks for custom components

## Related

- **[@fluentui/react-motion](https://www.npmjs.com/package/@fluentui/react-motion)** — Core motion APIs for creating custom animations
