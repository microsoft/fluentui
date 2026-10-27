# @fluentui/react-provider

**React Provider component for [Fluent UI React](https://react.fluentui.dev)**

## CSS Modules alternative

FluentProvider includes a layered CSS Modules style hook alongside its default Griffel hook.
To opt in consistently with other components, prioritize `.css.ts` for extensionless
TypeScript source imports and alias explicit `.styles.js` imports to
`['.styles.css.js', '.styles.js']` in your bundler. The original Griffel hook remains the fallback.
Configure your CSS Modules loader to expose named class exports.

The alternative preserves theme classes, caller classes, body typography, and LTR/RTL text
alignment. Theme variable generation, nested providers, and portal style propagation are unchanged.
The stylesheet is shipped in both `lib` and `lib-commonjs` and uses `@layer fluentui`.
