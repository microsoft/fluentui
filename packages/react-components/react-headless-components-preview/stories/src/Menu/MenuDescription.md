Headless `Menu` for the `react-headless-components-preview` package.

Composes the new `useMenu*Base_unstable` hooks from `@fluentui/react-menu` (introduced in #36087) without
Tabster, Griffel, or motion. The popover surface is rendered in the browser top
layer using the native HTML `popover="auto"` attribute, so no React Portal is
required and light dismiss (Escape, click-outside, popover-stack peer dismissal)
is owned by the platform.

Consumers bring their own styles and — if needed — their own arrow-key
navigation; the hook surface exposes ARIA wiring, controlled `open` state,
positioning, character-search, and selection state.
