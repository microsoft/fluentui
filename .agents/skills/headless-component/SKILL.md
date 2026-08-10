---
name: headless-component
description: Author or extend unstyled Fluent UI v9 primitives in @fluentui/react-headless-components-preview, including stable hooks, render functions, state data attributes, compound context wiring, tests, exports, and CSS Module stories. Use for any change that adds a headless component or component family to the preview library.
argument-hint: <ComponentName>
disable-model-invocation: true
allowed-tools: Bash Read Write Edit Grep Glob
---

# Author a Headless Component

Author **$ARGUMENTS** in:

- `packages/react-components/react-headless-components-preview/library`
- `packages/react-components/react-headless-components-preview/stories`

Headless components provide Fluent behavior, accessibility, semantic slots, and
stable state selectors without Fluent styling. They must remain usable with plain
CSS, CSS Modules, Tailwind, or another styling system.

## Source Of Truth And References

This skill is the operational source of truth for authoring a headless
component. Do not require the RFC to be loaded for routine work: the normative
package contract, state-attribute rules, packaging requirements, stacked-PR
workflow, and validation bar are fully stated here.

Always inspect current code before editing:

1. The corresponding styled v9 package under
   `packages/react-components/react-<name>/library/src/`
2. The nearest headless implementation with the same shape:
   - simple primitive: `library/src/components/Button/`
   - compound primitive using upstream base hooks:
     `library/src/components/Accordion/`
   - composite/context/positioning primitive: `library/src/components/Menu/`
3. The current package manifests, export barrels, API reports, bundle fixtures,
   tests, and stories touched by the change

Consult these documents only when changing the package-wide contract, resolving
an ambiguity not answered here, or updating their documentation:

- `packages/react-components/react-headless-components-preview/library/docs/Spec.md`
- `packages/react-components/react-headless-components-preview/stories/README.md`
- `docs/react-v9/contributing/rfcs/react-components/convergence/headless-components.md`

The RFC provides decision history and rationale; it is not a per-component
checklist and may describe the intended stable package name rather than the
current preview package.

Use current implementations as structural references, not as permission to copy
legacy violations. Repository instructions override existing code.

## Preflight

Before writing code:

1. Search the headless library and stories for the component and its family.
   Extend an existing implementation instead of creating a competing one.
2. Inspect the corresponding styled v9 package and its public API docs. Inventory:
   - public components and subcomponents
   - slots, props, state, refs, and polymorphic `as` behavior
   - controlled and uncontrolled state
   - context values
   - ARIA semantics and keyboard/focus behavior
   - positioning, portals, and mount-node behavior
3. Verify the upstream package's actual exports before reimplementing logic.
   Search for `use<Name>Base_unstable`, `render<Name>_unstable`,
   `use<Name>ContextValues_unstable`, context hooks, and shared utilities.
4. Classify the work:
   - **simple** — one hook, renderer, component, and state attributes
   - **compound** — parent plus child primitives and context-value wiring
   - **composite** — substantial focus, selection, positioning, portal, or
     nested-component behavior
5. Define the stable `data-*` contract before implementation. Include only
   behavior/base state, never visual design state.
6. Record every inventory row as implemented, intentionally excluded with a
   source-backed reason, or unresolved. Trace implemented rows through:
   `types/exports -> hook/context -> rendered DOM/slots -> test or story`.
7. Plan the change as two stacked PRs before editing:
   - **bottom PR — component package:** base hook/types/renderer/context exports
     and their package-local tests, API docs, bundle-size coverage, manifest
     updates, and change file
   - **top PR — headless package:** stable headless primitive, `data-*`
     contract, headless tests, stories, public subpath, headless bundle-size
     coverage, API docs, manifest updates, and change file

If extracting a base hook needs a regression test to lock down existing behavior,
use a three-PR stack instead: a test-only bottom PR, the component-package PR,
and then the headless PR. Keep the regression test independent so the base API
change still has a passing test baseline. Use the shorter two-PR stack when no
new regression layer is needed.

Do not mix component-package and headless-package changes in one PR. The
headless layer depends on the base APIs introduced or confirmed by the component
package, so the component-package PR is always below the headless PR.

Do not broaden the component API with styled-only props such as `appearance`,
`size`, `shape`, or other visual variants.

Use an existing repository generator for the component family when one is
available. Otherwise, follow the file structure and validation requirements
below rather than creating a parallel scaffold.

## Package Contract

Every public headless primitive exposes stable, unsuffixed names:

```text
Component
useComponent
renderComponent
ComponentProps
ComponentSlots
ComponentState
```

Compound families additionally expose their public children, context types, and
context hooks when consumers need them for advanced composition.

Internally, these APIs normally wrap the corresponding package's `_unstable`
base hook and renderer:

```text
useComponentBase_unstable
        ↓
useComponent
        ↓
renderComponent
        ↓
Component
```

The headless layer must not add styling, design props, motion, default icons, or
new interaction behavior.

## File Structure

For a simple component:

```text
library/src/components/ComponentName/
  ComponentName.tsx
  ComponentName.types.ts
  ComponentName.test.tsx
  index.ts
  renderComponentName.ts
  useComponentName.ts

library/src/component-name.ts

stories/src/ComponentName/
  ComponentNameDescription.md
  ComponentNameDefault.stories.tsx
  component-name.module.css
  index.stories.tsx
```

For a compound family, place child primitives beneath the root folder:

```text
library/src/components/ComponentName/
  ComponentName.tsx
  ...
  ComponentPart/
    ComponentPart.tsx
    ComponentPart.types.ts
    ComponentPart.test.tsx
    index.ts
    renderComponentPart.ts
    useComponentPart.ts
```

Add `*.cy.tsx` integration coverage when behavior depends on real browser focus,
Tabster, positioning, portals, native popovers, or nested trigger composition.

## Implementation

### Component

- Add `'use client';` to component and hook modules that use React client APIs.
- Use `ForwardRefComponent<Props>` with `React.forwardRef` for ref-capable
  primitives. Never use `React.FC`.
- For provider-only components with no meaningful DOM ref, use a normally typed
  function returning `JSXElement`; do not invent a fake ref and do not use
  `React.FC`.
- Keep the component thin: state hook, optional context-values hook, renderer.
- Set `displayName` on every exported React component.
- Add concise JSDoc describing purpose and any required accessibility contract.
- Do not import icons or add default icons in base hooks or headless renderers.
  If an icon is needed in a styled wrapper or story, import it there and define
  `bundleIcon` at module scope, never inside a hook or render function.

```tsx
'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const ComponentName: ForwardRefComponent<ComponentNameProps> = React.forwardRef((props, ref) => {
  const state = useComponentName(props, ref);
  return renderComponentName(state);
});

ComponentName.displayName = 'ComponentName';
```

For compound roots, derive and pass context values between the state hook and
renderer.

### Hook

- Prefer the upstream `useComponentNameBase_unstable` hook.
- When adding a new v9 base hook, follow the repository-enforced signature:
  `useComponentNameBase_unstable(props, ref?)`, with an explicitly typed
  `props` parameter and `ref` typed as `React.Ref<...>`.
- Keep base hooks free of Tabster and other forbidden focus/keyboard runtimes.
  Logic requiring those runtimes stays in the styled package's wrapping
  `useComponentName_unstable` hook. Run the component-package lint target so
  `base-hook-signature` and `base-hook-no-forbidden-runtime` validate the split.
- Preserve upstream behavior rather than copying the styled component's main
  hook, which may include design defaults and styling concerns.
- Reuse exported context-value hooks and utilities. Do not reconstruct their
  return objects manually.
- Reimplement behavior only after proving the required base API is not exported.
  In that case, port only behavior/accessibility logic and preserve parity with
  the styled package's tests.
- Use `useFluent_unstable()` for `targetDocument` and its `defaultView`; never
  access `window`, `document`, or `navigator` directly.

### Stable `data-*` Attributes

State attributes are the supported CSS targeting contract.

- Boolean and presence state: emit `''` when true and omit when false.
  Reserve explicit string values for enum or tri-state contracts.
- Enum or tri-state: emit the documented string value.
- Put attributes on the root slot unless a documented exception makes another
  slot the semantic state owner.
- Type every attribute on `ComponentState` so it appears in generated API docs.
- Apply reserved attributes after the base hook resolves consumer root props.
  The headless state must win if a consumer supplies a conflicting reserved
  attribute.
- Removal or rename is breaking. Additions require tests and documentation.

Use `stringifyDataAttribute` from `library/src/utils` for presence and string
attributes:

```tsx
const state: ComponentNameState = useComponentNameBase_unstable(props, ref);

// Applied after consumer props so base state cannot be misrepresented.
state.root['data-disabled'] = stringifyDataAttribute(state.disabled);

return state;
```

Good attributes describe behavior: `data-disabled`, `data-open`,
`data-expanded`, `data-checked`, `data-selected`, `data-orientation`,
`data-icon-only`.

Do not expose design attributes such as `data-appearance`, `data-size`,
`data-shape`, or styling-specific class names.

### Types

- Derive props, slots, and state from the upstream base types, not the styled
  public types when those include design props.
- Alias unchanged base types directly.
- Extend state only for public headless additions such as typed `data-*`
  attributes.
- Keep exact attribute value unions when known instead of widening to `string`.
- Export event and context types required by consumers of compound components.
- Do not use `any` or unnecessary type assertions to hide an API mismatch.

### Renderer and Context

- Re-export or alias the upstream unstable renderer when its slot structure is
  already correct.
- Prefer a named wrapper export when it improves discoverability or generated
  documentation:

  ```ts
  import { renderComponentName_unstable } from '@fluentui/react-component';

  /** Renders a ComponentName component. */
  export const renderComponentName = renderComponentName_unstable;
  ```

- Do not add wrappers solely for styling.
- Compound renderers must provide the same behavior contexts as the styled
  component while omitting style contexts.
- Keep portal and positioning behavior semantic. Inline rendering is allowed
  only when it is the intended headless contract, not as a test shortcut.

## Public Exports

### Component-Package PR

When the headless primitive needs new base APIs from the corresponding
`@fluentui/react-*` component package, update all applicable surfaces in the
bottom PR:

1. Export base types from the component implementation barrel, for example
   `ComponentBaseProps`, `ComponentBaseState`, and the existing slots type.
2. Export `useComponentBase_unstable` from the component implementation barrel.
3. Export the renderer and context/context-values hooks needed by the headless
   composition. Reuse existing exports; do not create a second equivalent API.
4. Re-export every new public symbol from the component package root
   `library/src/index.ts`.
5. Run `generate-api` and commit the updated `library/etc/*.api.md` files.
6. Update the component package `library/package.json` when runtime imports or
   public entry points change:
   - add every new runtime package to `dependencies`
   - use the version range already established for that dependency in the
     workspace; when it is new, derive it from the dependency package's current
     `package.json` rather than inventing a range
   - add type-only tooling/test packages to the existing appropriate dependency
     section only when the repository convention requires it
   - keep dependency keys alphabetized
   - do not add headless-package dependencies to a component package
   - do not introduce dependencies between Tier 3 component packages; move
     genuinely shared behavior to the appropriate utility/shared-context layer
   - preserve the existing root export map unless adding an intentional new
     package subpath
   - if a new subpath is added, add matching `types`, `node`, `import`, and
     `require` entries and ensure its built files are included by `files`
   - do not hand-edit package versions
7. If `package.json` changes, run Yarn through the repository workflow and
   commit `yarn.lock` only when Yarn updates it. Never hand-edit `yarn.lock`.

Adding only a base hook/type export to an existing root entry normally does not
require a new `package.json` export-map entry. It does require root barrel and
generated API updates.

### Headless-Package PR

Update every required surface in the top PR:

1. `library/src/components/ComponentName/index.ts`
2. `library/src/component-name.ts`
3. Parent-family indexes for all public subcomponents, types, events, contexts,
   hooks, and renderers
4. `library/package.json`:
   - add the corresponding `@fluentui/react-*` package to `dependencies` if it
     is not already present
   - add any other new runtime dependency used by library source
   - use the dependency version range established elsewhere in the workspace;
     for a newly referenced workspace package, derive it from that package's
     current version
   - keep dependency keys alphabetized
   - add `exports["./component-name"]` with matching `types`, `node`, `import`,
     and `require` paths
   - keep component subpath export keys alphabetized, with
     `"./package.json"` retained in the package's established position
   - preserve `exports["./package.json"]`
   - confirm the generic `files` entries still publish the generated
     declaration and JavaScript files; update `files` only if the new artifact
     falls outside those patterns
   - preserve `sideEffects: false` only while the new modules remain free of
     import-time side effects
   - do not add story-only packages, icons, or styling dependencies to the
     library manifest
   - do not hand-edit the package version
5. Run `generate-api` and commit the new or updated `library/etc/component-name.api.md`
   plus any aggregate API report changed by the export.
6. If `package.json` changes, run Yarn through the repository workflow and
   commit `yarn.lock` only when Yarn updates it. Never hand-edit `yarn.lock`.

The stories package is private and normally needs no `package.json` change.
Change it only when the story runtime truly needs a new direct dependency or
script; do not duplicate dependencies that are already supplied by the
workspace's established Storybook setup.

The package intentionally uses kebab-case subpath exports. Keep
`library/src/index.ts` unchanged unless the package's root-export policy changes.

The colocated conformance helper verifies the top-level source file and export
map for components that run `isConformant`.

## Bundle-Size Requirements

Bundle-size coverage is required in both PR layers and must be reviewable in the
PR that introduces the relevant public API.

### Component-Package PR

- Inspect `packages/react-components/react-<name>/library/bundle-size/`.
- Bundle fixtures are component-level. For a newly public styled component, add
  a focused
  `<ComponentName>.fixture.js` that imports the component from the package root,
  references it (normally with `console.log`), and exports a stable fixture
  name.
- Do not create standalone fixtures for base hooks, renderers, context helpers,
  or type-only exports.
- For a new public member of an existing family, add a fixture when it can be
  consumed independently or when the existing family fixture does not import
  it. Do not assume a nearby fixture covers a new export.
- Type-only exports do not need a bundle fixture because they are erased.
- Keep fixtures focused on public imports. Never import private source paths to
  make a bundle check pass.
- Run the component package's Nx `bundle-size` target and inspect the generated
  report for unexpected growth.

### Headless-Package PR

Update
`library/bundle-size/AllComponents.fixture.js` for every new public component
subpath:

1. Add `import * as ComponentName from
'@fluentui/react-headless-components-preview/component-name';`.
2. Add `ComponentName` to the logged object.
3. Keep both lists alphabetized and exactly in sync.

The namespace import intentionally measures the complete public subpath:
component, hook, renderer, types erased at compile time, and compound-family
exports. A `package.json` subpath without a matching fixture entry is
incomplete, even when build and tests pass.

Run:

```bash
yarn nx run react-<name>:bundle-size
yarn nx run react-headless-components-preview:bundle-size
```

Use `yarn nx show project <project>` to confirm the component project name.
Commit source fixtures, not generated `dist/bundle-size` or
`dist/bundle-analyze` output.

## Tests

Add focused tests beside every public primitive.

### Required Coverage

- `isConformant` for every ref-capable component
- default semantic render and native element behavior
- ref, `className`, `style`, `as`, and slot forwarding where applicable
- every stable `data-*` attribute:
  - positive state
  - false/absent state
  - exact string value for enum/tri-state attributes
  - consumer override cannot misrepresent reserved state
- ARIA role, state, relationships, and accessible name
- controlled and uncontrolled behavior
- primary interaction and its inverse: open/close, expand/collapse,
  select/deselect, check/uncheck
- compound context and parent-child coordination
- disabled and disabled-focusable behavior
- keyboard and focus behavior at the appropriate unit or Cypress layer

Prefer Testing Library role/name queries and assert observable behavior. A count
or snapshot alone does not prove the contract.

Use the real browser Cypress layer for behavior that jsdom cannot validate
reliably, such as focus restoration, arrow navigation, Escape dismissal,
positioning, native popovers, and portal composition.

## Stories

Stories demonstrate that the unstyled primitive can support an independent
design system. Styling belongs only in the stories package.

1. Import from the public package subpath, never a relative library path.
2. Add a short, behavior-accurate `ComponentNameDescription.md`.
3. Put metadata and exports in `index.stories.tsx`.
4. Import every CSS Module used by the story family from a story or
   `index.stories.tsx`, and import the primary module in `index.stories.tsx` so
   the custom "Show code" panel includes the CSS source. No manual source-panel
   configuration is needed.
5. Include the component family as `subcomponents` for compound APIs.
6. Add a default story plus stories for important behavioral states.
7. Exercise the primary interaction instead of rendering only static variants.
   Keep stories demonstrable and cover the resulting role, ARIA, and data state
   in unit or Cypress tests. Cover the inverse action too; use Cypress when the
   behavior requires a real browser primitive unavailable to the unit test
   environment.
8. Use CSS Modules only: no Griffel, inline styles, or Tailwind.
9. Use variables from `stories/.storybook/tokens.css`; do not hardcode colors,
   spacing, sizing, typography, radii, shadows, or motion values.
10. Style state through documented `data-*` selectors and semantic ARIA/native
    selectors.
11. Preserve native inputs and semantic DOM. Visual indicators may be layered
    around them, but must not replace them.
12. Use logical properties and verify RTL-sensitive layout; avoid physical
    left/right properties unless the behavior is intentionally physical.
13. If the story adds transitions or animation, use motion tokens and provide a
    `prefers-reduced-motion` override.
14. Preserve visible focus and state affordances in forced-colors mode when the
    component needs custom borders, indicators, or overlays.
15. Verify focus-visible, disabled-focusable, light theme, and dark theme.

Before finishing story CSS, search the changed modules for raw color functions
and un-tokenized pixel/rem values. Reuse an existing token; if a component-local
calculation is unavoidable, derive a named CSS custom property from tokens
instead of repeating a magic value.

Stories are visual consumers, not part of the headless behavior implementation.
Never move story styles or design defaults into `library/`.

Build both Storybooks, open the new story in a browser, verify the primary
interaction and focus behavior, switch light/dark themes, and confirm the custom
"Show code" panel displays both the TSX and every referenced CSS Module.

## Documentation

Update the component's Storybook description with:

- purpose and composition model
- required parent/child relationships
- accessibility naming requirements
- stable `data-*` attributes and their values
- any important semantic-slot exception

If the package-level attribute contract changes, update both:

- `library/docs/Spec.md`
- `docs/react-v9/contributing/rfcs/react-components/convergence/headless-components.md`

Do not edit an accepted RFC merely to document one component that follows the
existing contract.

## Two-PR Workflow With `gh stack`

Use `gh stack` so reviewers see package-layer changes separately while the
headless PR can build against the component base APIs below it.

### Stack Shape

```text
master
 └── <prefix>/<component>-base
  └── <prefix>/<component>-headless
```

- **`<component>-base` PR (base: `master`)** — only the corresponding
  `@fluentui/react-*` component package, its tests/API/bundle fixture, its
  manifest/lockfile changes, and its Beachball change file.
- **`<component>-headless` PR (base: `<component>-base`)** — only
  `react-headless-components-preview` library/stories/docsite-facing changes,
  its manifest/lockfile changes, its bundle fixture, generated API docs, and its
  Beachball change file.

If no component-package code change is required because every needed base API
is already published, do not create an empty bottom PR. Use a one-PR stack for
the headless change and state in the PR that the upstream export inventory was
verified.

### Stack Remote

Select `<stack-remote>` before initializing: the Git remote whose GitHub
repository should host the PRs. Do not assume `origin` is correct. In a fork
checkout, `origin` often points to the fork while review belongs in
`microsoft/fluentui`. `gh stack submit` creates PRs in the selected remote's
repository and has no separate `--repo`/base-repository flag.

Verify the selected remote URL and push permission before initializing the
stack. If the intended repository is upstream but the contributor can push
only to a fork, surface that limitation rather than silently creating PRs in
the fork; use the repository's approved cross-fork PR workflow instead.

Drive `gh stack` non-interactively: always pass explicit branch names, use
`gh stack submit --auto` and `gh stack view --json`, and pass
`--remote <stack-remote>` to submit/push/sync because this repository normally
has more than one remote configured.

### Change Files

Each layer generates its own change file against the trunk with an explicit
`--package`, so an inherited down-stack change never leaks into the wrong file:

```bash
# bottom branch, after editing only the component package
yarn beachball change --no-commit --branch master \
  --package @fluentui/react-<name> --type minor \
  --message "feat(react-<name>): expose headless base APIs"

# top branch, after editing only the headless library and stories
yarn beachball change --no-commit --branch master \
  --package @fluentui/react-headless-components-preview --type patch \
  --message "feat: add <ComponentName>"
```

Commit each change file with the files it describes, plus `yarn.lock` only when
Yarn updated it.

### Change-File Ownership

- Each published package gets its own Beachball change file in the PR that
  changes that package.
- The bottom PR must not include the headless package change file.
- The top PR must not include the component package change file.
- Story-only files need no separate change file, but when shipped with a
  headless library addition they stay in the headless PR.
- Generate change files with `yarn change` or the non-interactive
  `yarn beachball change` form; never create or edit them manually.
- After generation, inspect the new JSON file and verify it contains exactly the
  owning package and no inherited package from another stack layer.
- New public base exports in stable component packages are normally `minor`
  changes. The headless preview package follows zero-semver, so additive
  headless primitives and exports use `patch` until that package is stable.
  Use `patch` for corrections without new public API as well, and never use
  `major` without explicit approval.

## Validation

Run tasks through Nx and use the narrowest checks that cover the change:

```bash
# bottom PR
yarn nx run react-<name>:test
yarn nx run react-<name>:lint
yarn nx run react-<name>:type-check
yarn nx run react-<name>:build
yarn nx run react-<name>:generate-api
yarn nx run react-<name>:bundle-size

# top PR
yarn nx run react-headless-components-preview:test --runTestsByPath \
  packages/react-components/react-headless-components-preview/library/src/components/ComponentName/ComponentName.test.tsx

yarn nx run react-headless-components-preview:lint
yarn nx run react-headless-components-preview:type-check
yarn nx run react-headless-components-preview:build
yarn nx run react-headless-components-preview:generate-api
yarn nx run react-headless-components-preview:bundle-size
yarn nx run react-headless-components-preview:e2e
yarn nx run react-headless-components-preview:test-rit
yarn nx run react-headless-components-preview-stories:lint
yarn nx run react-headless-components-preview-stories:type-check
yarn nx run react-headless-components-preview-stories:build-storybook
yarn nx run react-headless-components-preview-stories:test-ssr
yarn nx run public-docsite-v9-headless:build-storybook
```

Run `e2e` when adding or changing browser-dependent interaction tests. Run
cross-version React and SSR targets when the component, renderer, portal, or
story composition changes. Use `yarn nx show project <project>` to confirm
target names before invoking a target not listed above.

Inspect generated API files and confirm the new stable subpath, hook, renderer,
types, context exports, and `data-*` attributes are present.

## Final Checklist

- The implementation contains behavior and accessibility, but no styles,
  design props, motion, or default icons.
- Upstream base hooks/renderers/context helpers were reused where available.
- Public APIs use stable unsuffixed names.
- Every behavior state intended for styling has a typed, tested, documented
  `data-*` attribute.
- Reserved attributes cannot be overridden into a false representation.
- Compound context, refs, controlled state, focus, and keyboard behavior match
  the styled v9 counterpart.
- Component, family, top-level subpath, package export map, and API docs agree.
- Component-package and headless-package manifest updates are complete,
  alphabetized, and owned by the correct stacked PR.
- Every newly measured public styled export has component-package bundle
  coverage, and every new headless subpath is present in
  `AllComponents.fixture.js`.
- Unit tests, applicable browser tests, and Storybook stories cover the primary
  interaction in both directions.
- Story styling uses CSS Modules and token variables only, includes reduced
  motion/forced-colors handling where applicable, and appears in "Show code".
- The stack contains separate component-package and headless-package PRs unless
  the component package required no change.
- Each published package has a Beachball change file in its owning PR.
