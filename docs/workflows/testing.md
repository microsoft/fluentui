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

## Build-Time ID Namespace Integration

Run `yarn nx run react-provider:test-build-prefix` to build the packages and test the published
ESM/CommonJS ID namespace contract with esbuild, Webpack, and Vite. These are Node-only publication
and production-code-elimination checks; no Playwright browser is launched.

Run `yarn nx run react-provider:e2e --spec=src/components/FluentProvider/FluentProviderIdNamespace.cy.tsx`
for browser coverage. Cypress mounts the shared demonstration harness, not the two app roots.
Each scenario puts two independently bundled React/Fluent applications in one iframe document.
The harness uses source- and origin-checked messages, so Cypress can drive the shared controls
without disabling browser security or directly accessing the iframe's globals.
It covers the unconfigured collision, full theme tokens, both lifecycle orders, theme updates,
SSR/hydration, and browser execution of Webpack/Vite output without a process shim.

Use `react-provider:test-rit--17--e2e` and `react-provider:test-rit--18--e2e` for the same Cypress
spec on the existing RIT matrix, after installing that version's RIT dependencies as documented by
the tool. The fixture builder reads the RIT webpack React alias so both independent app bundles use
that version too. Tests assert each inner runtime's version and independence; testing a React 17
wrapper around React 19 fixture apps would not count. React 17 uses legacy render/hydrate APIs.
Build shared package outputs before parallel version runs to avoid concurrent output cleanup.

`react-provider:prepare-id-namespace-demo` builds the same fixtures for the public FluentProvider
Storybook story. Local package Storybook (`react-provider-stories:storybook`, or `:start`) prepares
and serves the assets. The published site is compiled by `public-docsite-v9:build-storybook`;
component story packages do not compile a separate site through their inherited no-op build target.
Generated files live under ignored build output directories, not committed bundles. The public
Storybook uses workspace React; the Cypress RIT matrix verifies the shared scenarios on 17/18.

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
