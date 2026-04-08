# Testing Guide

## Test Types

| Type              | Tool                         | Command                                        | Purpose                          |
| ----------------- | ---------------------------- | ---------------------------------------------- | -------------------------------- |
| Unit              | Jest + React Testing Library | `yarn nx run <project>:test`                    | Component behavior, hooks, utils |
| Visual Regression | Storybook + StoryWright      | `yarn nx run vr-tests-react-components:test-vr` | Screenshot diffs (CI only)       |
| E2E               | Cypress                      | `yarn nx run react-components:e2e`              | Integration flows                |
| SSR               | Custom                       | `yarn nx run ssr-tests-v9:test-ssr`             | Server-side rendering safety     |
| Cross-React       | Custom                       | `yarn nx run rit-tests-v9:test-rit`             | React version compatibility      |
| Conformance       | isConformant                 | Part of unit tests                             | Consistent component API         |

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
