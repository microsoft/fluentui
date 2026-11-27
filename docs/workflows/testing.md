# Testing Guide

## Test Types

| Type              | Tool                         | Command                                         | Purpose                          |
| ----------------- | ---------------------------- | ----------------------------------------------- | -------------------------------- |
| Unit              | Jest + React Testing Library | `yarn nx run <project>:test`                    | Component behavior, hooks, utils |
| Visual Regression | Storybook + StoryWright      | `yarn nx run vr-tests-react-components:test-vr` | Screenshot diffs (CI only)       |
| E2E               | Cypress                      | `yarn nx run react-components:e2e`              | Integration flows                |
| SSR               | Custom                       | `yarn nx run ssr-tests-v9:test-ssr`             | Server-side rendering safety     |
| Cross-React       | Custom                       | `yarn nx run rit-tests-v9:test-rit`             | React version compatibility      |
| Conformance       | isConformant                 | Part of unit tests                              | Consistent component API         |

## V9 Icon Regression Coverage

The v9 VRT project shares SVG/font icon examples between StoryWright screenshot
capture and Playwright browser assertions:

```bash
yarn nx run vr-tests-react-components:test-vr
yarn nx run vr-tests-react-components:e2e
```

See the [project README](../../apps/vr-tests-react-components/README.md) for build
modes and coverage, and the [Storybook tooling README](../../scripts/storybook/README.md#configurereacticons)
for shared icon configuration.

## Writing Unit Tests

Tests live adjacent to the component they test:

```
components/Button/
├── Button.tsx
├── Button.test.tsx          ← here
└── ...
```

### What to Test

- Default rendering (snapshot)
- All prop variants
- User interactions (click, keyboard, focus)
- Accessibility (ARIA attributes, roles, keyboard navigation)
- Controlled and uncontrolled patterns
- Edge cases (null children, empty arrays, etc.)

### Repository-only DOM focus tests

The workspace's root Yarn resolution supplies a local Tabster patch with
`visibilityMode: 'non-layout'` for focus-discovery tests in JSDOM. This option is
not available in the unmodified published Tabster package. Published Fluent
packages keep their normal npm-compatible dependency range.

Initialize Tabster before mounting `FluentProvider`, with the complete Fluent
configuration from `react-tabster/src/hooks/useTabster.ts`. Only `getParent` is
merged on reuse; an incomplete first initialization loses focus-trap callbacks
and configured Shadow DOM traversal.

```ts
import { getParent } from '@fluentui/react-utilities';
import { createTabster, disposeTabster } from 'tabster';
import type { Types } from 'tabster';

const view: (Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }) | null = testContainer.ownerDocument.defaultView;
if (!view) {
  throw new Error('The focus test requires a DOM window.');
}

const tabster = createTabster(view, {
  autoRoot: {},
  controlTab: false,
  getParent,
  checkUncontrolledCompletely: element =>
    element.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper') === true || undefined,
  DOMAPI: view.__tabsterShadowDOMAPI,
  visibilityMode: 'non-layout',
});

// Mount and exercise the component, then unmount it before disposing Tabster.
disposeTabster(tabster);
```

The mode is fixed by the window's first instance. Later calls without a mode
reuse that policy; explicitly requesting a conflicting mode throws. Dispose all
instances between tests that use different policies.

Non-layout discovery rejects disconnected and CSS-hidden candidates, as well
as physical and assigned-slot ancestors with `display: none` or hidden contents.
Disabled, ARIA-hidden and modal filtering still applies. It does not synthesize
layout or establish browser-equivalent visibility, keyboard navigation, or
screen-reader behavior. Use browser component tests for geometry-dependent
cases, including hidden iframes and closed disclosure widgets.

The default remains the layout-aware browser policy.

### Updating Snapshots

If your change intentionally alters rendered output:

```bash
yarn nx run <project>:test -u
```

Review the snapshot diff to verify the change is correct before committing.

### Motion Preferences in Browser Tests

When asserting animation lifecycles, explicitly emulate `prefers-reduced-motion: no-preference` rather than relying on the runner's operating-system setting. Emulate `reduce` for reduced-motion cases and clear media emulation in `afterEach` so settings do not leak between tests.

## Conformance Tests

Every component package has a `testing/isConformant.ts` file that validates:

- Component renders without crashing
- Ref forwarding works
- className merging works
- `as` prop (if applicable) works
- Accessibility basics

## SSR Safety

Components must work in server-side rendering. Never access browser APIs without guards:

```tsx
// WRONG — crashes on server
const width = window.innerWidth;

// RIGHT — guarded access
const width = typeof window !== 'undefined' ? window.innerWidth : 0;

// BETTER — use useIsSSR or check canUseDOM
import { canUseDOM } from '@fluentui/react-utilities';
if (canUseDOM()) {
  // safe to use window/document
}
```
