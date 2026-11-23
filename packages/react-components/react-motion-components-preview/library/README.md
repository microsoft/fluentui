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
| **Stagger**  | Choreography for sequential list animations                |

Fade, Scale, Collapse, and Slide include **Snappy** and **Relaxed** timing variants (and Collapse also includes **Delayed**).

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
    <Slide visible={open} fromX="20px">
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

General `fade`, `scale`, `slide`, `rotate`, and `blur` accept `from`, `to`, or both
to describe their starting and ending poses. An omitted endpoint defaults to the
property's neutral value: opacity `1`, scale `1`, zero translation (`0px`), `0` degrees
(default axis `'z'`), or blur `'0px'`. All helpers require `duration`; `easing` defaults
to linear and `delay` to `0`. Fade helpers use `fill: 'both'` so delayed entrances remain
hidden; the other atoms do not add opacity or fill.

Directional `*In` helpers arrive at the property's neutral value (`to` is forbidden),
and `*Out` helpers depart from it (`from` is forbidden). `fadeIn`/`fadeOut` and
`scaleIn`/`scaleOut` accept an optional outer endpoint that defaults to `0`;
`slideIn`/`slideOut`, `rotateIn`/`rotateOut`, and `blurIn`/`blurOut` require an
authored outer endpoint because they have no universal displaced value.

The `fadeAtom`, `scaleAtom`, `slideAtom`, `rotateAtom`, and `blurAtom` exports are
deprecated but remain available for compatibility. The pre-built `Fade`, `Scale`, `Slide`,
`Rotate`, and `Blur` presence components use `from*`, `in*`, and `to*` pose props while
retaining their Fluent timing and variant defaults.

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
