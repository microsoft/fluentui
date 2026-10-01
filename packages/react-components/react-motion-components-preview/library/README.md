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

`fade`, `fadeIn`, `fadeOut`, `slide`, `slideIn`, and `slideOut` return ordinary
motion atoms accepted by `createPresenceComponent` and `createMotionComponent`.
They produce absolute keyframes, without Prism scene binding or runtime state.

```ts
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeIn, fadeOut, slideIn, slideOut } from '@fluentui/react-motion-components-preview';

const duration = motionTokens.durationNormal;
const CustomFade = createPresenceComponent({
  enter: fadeIn({ duration }),
  exit: fadeOut({ duration }),
});
const CustomSlide = createPresenceComponent({
  enter: slideIn({ from: { y: '24px' }, duration }),
  exit: slideOut({ to: { y: '-12px' }, duration }),
});
```

General `fade` and `slide` accept `from`, `to`, or both to describe their starting
and ending poses. Omitted opacity poses default to 1; omitted translation poses
and axes default to zero. Translation
uses CSS length strings, including percentages, and does not add opacity. All
helpers require duration; easing defaults to linear and delay to zero. Fade
helpers use `fill: 'both'` so delayed entrances remain hidden. Directional fades
always use 0-to-1 or 1-to-0 opacity; directional slides require an authored outer
pose and use zero translation as the present pose.

Existing `fadeAtom` and `slideAtom` exports remain available. The pre-built Fade
and Slide components retain their existing pose, timing, and variant defaults.

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
