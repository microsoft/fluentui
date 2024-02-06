`@fluentui/react-motions` implements definitions for motion animations that can be used in Fluent UI components. These animations are used to provide visual feedback to users when they interact with components.

This implementation is based on [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) and defines atoms & presence animations that can be used to create animation components.

- Atoms are the smallest building blocks of animations
- Presences are the combination of atoms that define the in/out animation

The package provides a set of predefined atoms and presence animations that can be used in Fluent UI components. You can also create your own atoms and presence animations.

<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview packages are considered unstable:**
>
> ```jsx
>
> import { createAtom, createPresense } from '@fluentui/react-motions-preview';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product
