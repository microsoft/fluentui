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

## Running Tests Through the Root Jest Configuration

Use the root Nx entry point rather than invoking root Jest directly. It enables
Node's VM modules, which the workspace-plugin generator tests need for Nx's
dynamic formatter imports. Pass Jest options after `--`:

```bash
yarn nx run fluentui-repo:test-workspace -- --selectProjects=workspace-plugin --runInBand
```

Omit `--selectProjects` to run all projects discovered by the root Jest configuration.
For project-scoped testing, continue using `yarn nx run <project>:test`.

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

## Cross-platform tooling regressions

Run tooling tests through Nx without accepting snapshots or API report changes. Use
Node 22 and the repository-pinned Yarn release, and unset `NODE_OPTIONS`,
`NX_PREFER_TS_NODE`, `__FORCE_SNAPSHOT_UPDATE__`, and `__FORCE_API_MD_UPDATE__`
before running:

```bash
yarn nx run workspace-plugin:test --skipNxCache --output-style=static --runInBand --ci
yarn nx run react-integration-tester:test --skipNxCache --output-style=static --runInBand --ci
yarn nx run scripts-monorepo:test --skipNxCache --output-style=static --runInBand --ci
```

Use `path.win32` and `path.posix` fixtures for path parsing and JSON serialization
coverage on every host. Generated JavaScript/TypeScript configs also need executable
renderer tests: serialize complete string literals and verify their loaded runtime
paths, rather than normalizing invalid generated source. Filesystem teardown tests
must also run natively: leave a temporary working directory before deleting it,
restore the Nx workspace root even
if deletion fails, and keep cleanup errors visible. Compare unordered file inventories
using sorted copies and filesystem paths using native path operations; do not normalize
package export keys, which use POSIX separators.

The `check-tooling` workflow runs selected tooling smoke tests on Windows and Linux.
Its forced snapshot/API update settings are not strict regression validation, and
it does not run this full set of tests on macOS. Path fixtures do not replace native
Windows, macOS, and Linux execution.

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
