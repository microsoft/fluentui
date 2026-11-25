# @fluentui/react-motion

**React Motion components for [Fluent UI React](https://react.fluentui.dev/)**

A lightweight, performant animation library for React that brings Fluent UI experiences to life using the Web Animations API (WAAPI).

## Features

- ⚡ **Performance** — Animations run on the compositor thread for smooth 60fps motion
- 📦 **Lightweight** — ~3KB gzipped, leverages native browser capabilities
- 🎯 **Simple by default** — Common UI animations with minimal code
- 🔧 **Powerful on demand** — Full customization with keyframes, timing, and callbacks

## Installation

```bash
npm install @fluentui/react-motion
# or
yarn add @fluentui/react-motion
```

## Quick Start

```tsx
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';

// Create a custom fade presence component
const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationNormal,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationFast,
  },
});

// Use it in your app
function App() {
  const [visible, setVisible] = useState(true);

  return (
    <Fade visible={visible}>
      <div>Animated content</div>
    </Fade>
  );
}
```

## Documentation

📚 **[Full documentation](https://react.fluentui.dev/?path=/docs/motion-introduction--docs)**

- [Introduction](https://react.fluentui.dev/?path=/docs/motion-introduction--docs) — Overview and key concepts
- [createPresenceComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs) — Two-way enter/exit animations
- [createMotionComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createmotioncomponent--docs) — One-way animations
- [Motion Tokens](https://react.fluentui.dev/?path=/docs/motion-tokens--docs) — Duration and easing values
- [Migration Guide](https://react.fluentui.dev/?path=/docs/motion-migration--docs) — Coming from Framer Motion, GSAP, etc.

## Pre-built Components

For ready-to-use motion components (Fade, Scale, Slide, Collapse, etc.), see **[@fluentui/react-motion-components-preview](https://www.npmjs.com/package/@fluentui/react-motion-components-preview)**.
