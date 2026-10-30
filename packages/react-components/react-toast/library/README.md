# @fluentui/react-toast

**React Toast components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## CSS Modules alternative

Layered CSS Modules style hooks (`*.styles.css.ts`) are available as opt-in alternatives.
Configure the bundler to resolve `.styles` to `.styles.css.ts` before `.styles.ts`, and
`.styles.js` to `.styles.css.js` before `.styles.js`, and enable CSS Modules loading.
The default component imports continue to use Griffel. Browser styling parity, SSR,
and alternate-style VRT coverage must be validated before switching defaults.
