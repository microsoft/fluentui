# Fluent UI v8 to v9 Component Migration Handbook Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a docsite-visible v8-to-v9 migration inventory and complete migration guide families for Dialog, Drawer, Input/Textarea, Menu, MessageBar, Popover, RadioGroup, Dropdown, SpinButton, and DetailsList.

**Architecture:** Extend the existing `FromV8` Storybook documentation rather than adding a parallel handbook. `ComponentMapping.mdx` is the canonical inventory; each guide page owns its migration narrative and imports typed v8/v9 examples from a discovered `index.stories.tsx`; one Jest test validates inventory membership, Storybook routes, backlinks, and cross-guide links.

**Tech Stack:** React 19, TypeScript, Storybook MDX/CSF, Jest, Fluent UI React v8 (`@fluentui/react`), Fluent UI React v9 (`@fluentui/react-components`), Nx, Yarn 4.

**Design spec:** `docs/superpowers/specs/2026-08-14-v8-v9-component-migration-handbook-design.md`

---

## File Structure

### Foundation

- Modify `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
  - Owns the canonical v8 inventory, aggregate guide-family statuses, priorities, and links.
- Create `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`
  - Extracts canonical v8 keys from `AppDefinition.tsx`, validates inventory rows, MDX Meta routes, backlinks, and internal doc links.

### Existing guide families

- Modify `.../Components/Input.mdx` and create `.../Components/examples/Input/index.stories.tsx`.
- Modify `.../Components/Textarea.mdx` and create `.../Components/examples/Textarea/index.stories.tsx`.
- Modify `.../Components/Menu.mdx` and create `.../Components/examples/Menu/index.stories.tsx`.
- Modify `.../Components/RadioGroup.mdx` and create `.../Components/examples/RadioGroup/index.stories.tsx`.
- Modify `.../Components/SpinButton.mdx` and create `.../Components/examples/SpinButton/index.stories.tsx`.

### New guide families

- Create `.../Components/Dialog.mdx` and `.../Components/examples/Dialog/index.stories.tsx`.
- Create `.../Components/Drawer.mdx` and `.../Components/examples/Drawer/index.stories.tsx`.
- Create `.../Components/MessageBar.mdx` and `.../Components/examples/MessageBar/index.stories.tsx`.
- Create `.../Components/Popover.mdx` and `.../Components/examples/Popover/index.stories.tsx`.
- Create `.../Components/Dropdown.mdx` and `.../Components/examples/Dropdown/index.stories.tsx`.
- Create `.../Components/DetailsList.mdx` and `.../Components/examples/DetailsList/index.stories.tsx`.

Each guide page independently contains: Overview, Component mapping, What changed, Architecture and behavior, Prop mapping, Styling and theming, Accessibility, Examples, Unsupported scenarios and known gaps, Major-change checklist, and Evidence. Sections that do not apply say `Not applicable`.

---

## Chunk 1: Handbook Foundation and Inventory

### Task 1: Add migration inventory and route validation

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`
- Read: `apps/public-docsite-resources/src/AppDefinition.tsx`
- Read: `apps/public-docsite-v9/.storybook/main.js`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Write the failing canonical-inventory test**

Create a Node-environment Jest test that parses `AppDefinition.tsx` with TypeScript rather than regex. Put `/** @jest-environment node */` on line 1 before running any test:

```ts
import * as fs from 'node:fs';
import * as path from 'node:path';
import ts from 'typescript';
import { globSync } from 'glob';
import { getPackageStoriesGlob } from '@fluentui/scripts-storybook';
import { toId } from 'storybook/internal/csf';

const fromV8Root = __dirname;
const repoRoot = path.resolve(fromV8Root, '../../../../../../');
const appDefinitionPath = path.join(repoRoot, 'apps/public-docsite-resources/src/AppDefinition.tsx');
const componentMappingPath = path.join(fromV8Root, 'ComponentMapping.mdx');
const componentsRoot = path.join(fromV8Root, 'Components');

const read = (filePath: string): string => fs.readFileSync(filePath, 'utf8');

const getProperty = (node: ts.ObjectLiteralExpression, name: string): ts.PropertyAssignment | undefined => {
  return node.properties.find(
    (property): property is ts.PropertyAssignment =>
      ts.isPropertyAssignment(property) &&
      ((ts.isIdentifier(property.name) && property.name.text === name) ||
        (ts.isStringLiteral(property.name) && property.name.text === name)),
  );
};

const getStringValue = (node: ts.ObjectLiteralExpression, name: string): string | undefined => {
  const property = getProperty(node, name);
  return property && ts.isStringLiteral(property.initializer) ? property.initializer.text : undefined;
};

const getCanonicalV8Keys = (source: string): string[] => {
  const sourceFile = ts.createSourceFile('AppDefinition.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = sourceFile.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(item => ts.isIdentifier(item.name) && item.name.text === 'AppDefinition');

  if (!declaration?.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
    throw new Error('AppDefinition object literal was not found');
  }

  const examplePages = getProperty(declaration.initializer, 'examplePages');
  if (!examplePages || !ts.isArrayLiteralExpression(examplePages.initializer)) {
    throw new Error('AppDefinition.examplePages array was not found');
  }

  const keys: string[] = [];
  for (const category of examplePages.initializer.elements) {
    if (!ts.isObjectLiteralExpression(category)) {
      continue;
    }
    const links = getProperty(category, 'links');
    if (!links || !ts.isArrayLiteralExpression(links.initializer)) {
      continue;
    }
    for (const entry of links.initializer.elements) {
      if (!ts.isObjectLiteralExpression(entry) || !getProperty(entry, 'component')) {
        continue;
      }
      const key = getStringValue(entry, 'key');
      const url = getStringValue(entry, 'url');
      if (key && url && /^#\/examples\/[^/]+$/.test(url)) {
        keys.push(key);
      }
    }
  }

  return keys.sort();
};

const getInventoryKeys = (source: string): string[] =>
  [...source.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map(match => match[1]).sort();

test('inventory has exactly one row for every canonical v8 component key', () => {
  const canonicalKeys = getCanonicalV8Keys(read(appDefinitionPath));
  const inventoryKeys = getInventoryKeys(read(componentMappingPath));

  expect(new Set(inventoryKeys).size).toBe(inventoryKeys.length);
  expect(inventoryKeys).toEqual(canonicalKeys);
});
```

Keep extraction constrained to entries with a `component`, exact `key`, and one-segment `#/examples/<slug>` URL. Add a fixture assertion for `Announced`: include `Announced`, exclude `Announced - Quick Actions`.

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
yarn nx run public-docsite-v9:test --runTestsByPath \
  src/Concepts/Migration/FromV8/migrationGuides.test.ts --runInBand
```

Expected: FAIL because the current mapping table has duplicate/missing/non-canonical rows.

- [ ] **Step 3: Add MDX route and link extraction helpers**

Extend the test with:

```ts
const walkMdx = (directory: string): string[] =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const resolved = path.join(directory, entry.name);
    return entry.isDirectory() ? walkMdx(resolved) : entry.name.endsWith('.mdx') ? [resolved] : [];
  });

const getMetaTitle = (source: string): string | undefined => source.match(/<Meta\s+title="([^"]+)"\s*\/>/)?.[1];

const toStorybookDocsId = (title: string): string => toId(title, 'docs');

const getInternalDocsLinks = (source: string): string[] =>
  [...source.matchAll(/\]\((\/docs\/[^)]+)\)/g)].map(match => match[1]);
```

Add tests that:

1. Every MDX file below `FromV8/Components/` has one `<Meta title>`.
2. Every inventory guide link resolves to a discovered MDX docs ID.
3. Every existing P0 guide links back to `/docs/concepts-migration-from-v8-component-mapping--docs`; a `missing` P0 row has no guide link yet.
4. Every internal `/docs/` link in every MDX guide under `FromV8/Components/` resolves to a discovered docsite MDX/CSF ID. Build the ID set by expanding the same story globs as `apps/public-docsite-v9/.storybook/main.js`:
   - `apps/public-docsite-v9/src/**/*.mdx`;
   - `apps/public-docsite-v9/src/**/index.stories.@(ts|tsx)`;
   - the exact arrays returned by `getPackageStoriesGlob()` for `@fluentui/react-components` and `@fluentui/public-docsite-v9`, using the same exclusions;
   - the explicit Nav glob as a separate pattern.
5. `Dropdown.mdx` links to both v9 Dropdown and Select docs and to the ComboBox/Combobox migration destination.

Use:

```ts
const storybookDirectory = path.join(repoRoot, 'apps/public-docsite-v9/.storybook');
const configuredStoryGlobs = [
  'apps/public-docsite-v9/src/**/*.mdx',
  'apps/public-docsite-v9/src/**/index.stories.@(ts|tsx)',
  ...getPackageStoriesGlob({
    packageName: '@fluentui/react-components',
    callerPath: storybookDirectory,
    excludeStoriesInsertionFromPackages: [
      '@fluentui/react-icons-compat',
      '@fluentui/react-tabster',
      '@fluentui/react-utilities',
      '@fluentui/react-alert',
      '@fluentui/react-infobutton',
      '@fluentui/react-virtualizer',
    ],
  }),
  ...getPackageStoriesGlob({
    packageName: '@fluentui/public-docsite-v9',
    callerPath: storybookDirectory,
    excludeStoriesInsertionFromPackages: [
      '@fluentui/react-storybook-addon',
      '@fluentui/react-storybook-addon-export-to-sandbox',
      '@fluentui/theme-designer',
      '@fluentui/react',
      '@fluentui/react-nav',
    ],
  }),
  'packages/react-components/react-nav/stories/src/Nav/index.stories.@(ts|tsx)',
];
```

Normalize helper-returned absolute or relative globs before passing them to `globSync`. For MDX, extract `<Meta title>`. For CSF, extract the literal metadata `title` and call `toId(title, 'docs')`. Fail with the source path if a file has a non-literal title needed by a P0 link.

- [ ] **Step 4: Run the test and verify the route assertions fail**

Run the Task 1 test command again.

Expected: FAIL for the current non-canonical inventory and missing backlinks on existing P0 pages. Missing P0 pages do not fail until their inventory cells become links.

- [ ] **Step 5: Commit the failing validation test**

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts
git commit -m "test(docsite): validate v8 migration guide inventory"
```

### Task 2: Establish the inventory schema and P0 rows

**Files:**

- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Replace the current mapping table schema**

Use this exact header:

```md
| v8 key | v9 destination | Guide pages | Status | Complexity | Priority | Notes |
| ------ | -------------- | ----------- | ------ | ---------- | -------- | ----- |
```

Populate one row for each canonical key produced by Task 1. Use only:

- Status: `missing`, `in progress`, `complete`, `no direct counterpart`, `out of scope`.
- Complexity: `low`, `medium`, `high`, `N/A`.
- Priority: `P0`, `P1`, `P2`, `N/A`.

Apply the design-spec classification rules mechanically. Preserve existing useful destination links, remove duplicate `CommandBar`, and correct clearly invalid destinations such as `OverflowSet -> Dialog`.

- [ ] **Step 2: Add the authoritative P0 rows**

Use these guide-family destinations. Every Notes cell must include `Evidence: v8 <public type path>; v9 <public type/spec path>; complexity <trigger>`.

```md
| `Dialog` | `Dialog` | Dialog | `missing` | `high` | `P0` | New compound-component guide |
| `Panel` | `Drawer` | Drawer | `missing` | `high` | `P0` | Covers OverlayDrawer and InlineDrawer |
| `TextField` | `Input`, `Textarea` | Input; Textarea | `in progress` | `high` | `P0` | Both pages required |
| `ContextualMenu` | `Menu` | Menu | `in progress` | `high` | `P0` | Existing page requires audit |
| `MessageBar` | `MessageBar` | MessageBar | `missing` | `high` | `P0` | New compound-component guide |
| `Callout` | `Popover` | Popover | `missing` | `high` | `P0` | Covers focus and positioning |
| `ChoiceGroup` | `RadioGroup`, `Radio` | RadioGroup | `in progress` | `medium` | `P0` | Existing page requires audit |
| `Dropdown` | `Dropdown`, `Select` | Dropdown | `missing` | `high` | `P0` | ComboBox scenarios cross-link separately |
| `SpinButton` | `SpinButton` | SpinButton | `in progress` | `medium` | `P0` | Existing page requires audit |
| `DetailsList` | `Table`, `DataGrid` | DetailsList | `missing` | `high` | `P0` | Scenario-based migration |
```

For `missing` rows, render `Guide pages` as plain text prefixed with `Planned:` (for example `Planned: Dialog`) and do not add a Markdown link. For `in progress` or `complete` rows, use actual Storybook route links. The route test treats only Markdown links as published pages.

- [ ] **Step 3: Add canonical non-P0 placeholder rows**

Add every remaining canonical key once. Until its audit batch runs, use:

```md
| `CanonicalKey` | Pending audit | None | `out of scope` | `N/A` | `N/A` | Inventory audit pending in Task 3, 4, or 5 |
```

This temporary state is allowed only inside Chunk 1 and must be eliminated by Task 5. Add a test that fails if any final inventory contains `Inventory audit pending`.

- [ ] **Step 4: Add backlinks to existing P0 pages**

Add this sentence immediately after the H1 in `Input.mdx`, `Textarea.mdx`, `Menu.mdx`, `RadioGroup.mdx`, and `SpinButton.mdx`:

```md
See the [v8 component migration inventory](/docs/concepts-migration-from-v8-component-mapping--docs).
```

- [ ] **Step 5: Update introduction and legends**

Document:

- how canonical keys are sourced;
- status, complexity, and priority definitions;
- how one-to-many guide families aggregate status;
- that v9-only components stay in `New Components in v9`;
- that compat/preview-only destinations are `out of scope`.

- [ ] **Step 6: Run the inventory test**

Run the Task 1 command.

Expected: canonical inventory and existing-P0 backlink assertions PASS; test FAIL for non-P0 placeholders and any broken links in unaudited non-P0 guide pages.

- [ ] **Step 7: Commit the inventory foundation**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Input.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Textarea.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Menu.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/RadioGroup.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/SpinButton.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts
git commit -m "docs: add v8 migration guide inventory"
```

### Task 3: Audit non-P0 inventory keys A through I

**Files:**

- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Modify as needed: audited A-I guide MDX files under `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Audit each A-I canonical key**

For each row whose key starts with A-I:

1. Record v8 evidence as the public type file or v8 component index path.
2. Verify the v9 destination through an export in `packages/react-components/react-components/library/src/index.ts`; record the v9 type/spec path or `No stable export`.
3. Apply the clear/conditional/no-direct/out-of-scope counterpart rules and cite both evidence paths in Notes.
4. Apply the mechanical complexity rule and record the triggering rule, for example `high: conditional destination`.
5. Determine whether required guide pages exist.
6. If pages exist, list exact failed completion checks in Notes from this fixed vocabulary:
   - `missing handbook section: <name>`;
   - `missing typed shared examples`;
   - `missing inventory backlink`;
   - `unresolved API mapping`;
   - `unresolved documentation gap`.
7. Assign status and priority using the spec rules.
8. Correct any broken internal `/docs/` links in the audited guide pages without otherwise rewriting their content.

- [ ] **Step 2: Run the inventory test**

Run the Task 1 test command.

Expected: FAIL only for J-Z placeholder rows or broken links in unaudited J-Z guide pages.

- [ ] **Step 3: Commit the A-I audit**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components
git commit -m "docs: audit v8 migration inventory A through I"
```

### Task 4: Audit non-P0 inventory keys J through R

**Files:**

- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Modify as needed: audited J-R guide MDX files under `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Audit each J-R canonical key**

Apply the exact evidence, missing-check, and broken-link correction steps from Task 3.

- [ ] **Step 2: Run the inventory test**

Expected: FAIL only for S-Z placeholder rows or broken links in unaudited S-Z guide pages.

- [ ] **Step 3: Commit the J-R audit**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components
git commit -m "docs: audit v8 migration inventory J through R"
```

### Task 5: Audit non-P0 inventory keys S through Z

**Files:**

- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Modify as needed: audited S-Z guide MDX files under `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Audit each S-Z canonical key**

Apply the exact evidence, missing-check, and broken-link correction steps from Task 3. Confirm no row contains `Inventory audit pending`.

- [ ] **Step 2: Run the full Chunk 1 validation**

Run:

```bash
yarn nx run public-docsite-v9:test --runTestsByPath \
  src/Concepts/Migration/FromV8/migrationGuides.test.ts --runInBand
yarn nx run public-docsite-v9:type-check
yarn nx run public-docsite-v9:lint
yarn nx run public-docsite-v9:build-storybook:docsite
```

Expected: all four commands PASS. Missing P0 pages have plain-text planned labels; all published links and routes resolve.

- [ ] **Step 3: Commit the S-Z audit**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts
git commit -m "docs: complete v8 migration inventory audit"
```

## Chunk 2: Complete Existing P0 Guide Families

### Task 6: Enforce the complete-guide page contract

**Files:**

- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Write failing contract assertions**

Extract a pure `validateCompleteGuide(source, pageName)` helper. First test it with one invalid inline MDX fixture and assert it returns these errors: missing section, missing Meta title, missing v8/v9 basic pair, missing shared story import, missing Evidence, and missing backlink. Then test a complete inline fixture and expect no errors.

The validator requires:

```ts
const requiredSections = [
  'Overview',
  'Component mapping',
  'What changed',
  'Architecture and behavior',
  'Prop mapping',
  'Styling and theming',
  'Accessibility',
  'Examples',
  'Unsupported scenarios and known gaps',
  'Major-change checklist',
  'Evidence',
];
```

Also assert:

- exact Meta prefix `Concepts/Migration/from v8/Components/`;
- the page imports `Canvas` and `Source` from `@storybook/addon-docs/blocks`;
- the page imports its `Components/examples/<GuidePageName>/index.stories`;
- the page renders both `Examples.V8Basic` and `Examples.V9Basic` with Canvas and Source;
- every required section contains non-whitespace content or the literal `Not applicable`;
- every `MC-\d+` in the checklist appears in an example heading or unsupported-scenario paragraph;
- the Evidence table has exact columns `ID | Source | Date | Conclusion`, one row for each major-change ID, an ISO `YYYY-MM-DD` date, and non-empty source/conclusion cells;
- the page links back to component mapping.

After the helper tests, apply it to every page in each P0 row whose aggregate status is `complete`.

- [ ] **Step 2: Run the targeted test**

Run the Chunk 1 Jest command.

Expected: PASS because the invalid inline fixture is rejected, the valid fixture passes, and no P0 family is marked complete yet.

- [ ] **Step 3: Build Storybook**

Run `yarn nx run public-docsite-v9:build-storybook:docsite`.

Expected: PASS.

- [ ] **Step 4: Commit the contract**

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts
git commit -m "test(docsite): enforce migration guide page contract"
```

### Task 7: Complete TextField to Input and Textarea

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Input/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Textarea/index.stories.tsx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Input.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Textarea.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/TextField/TextField.types.ts`
- Read: `packages/react-components/react-input/library/src/components/Input/Input.types.ts`
- Read: `packages/react-components/react-textarea/library/src/components/Textarea/Textarea.types.ts`
- Read: `packages/react-components/react-field/library/src/components/Field/Field.types.ts`

- [ ] **Step 1: Add typed Input migration stories**

Every Chunk 2 story file uses this complete CSF template:

```tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Concepts/Migration/from v8/Examples/<Guide> Migration',
  parameters: { docs: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const V8Basic: Story = {
  render: () => <div>{/* typed v8 example */}</div>,
};

export const V9Basic: Story = {
  render: () => <div>{/* typed v9 example */}</div>,
};
```

Replace `<Guide>` and the render bodies per page. Every additional export is also typed as `Story`.

Export:

- `V8Basic`: `TextField` with label, required, disabled, and error message.
- `V9Basic`: `Field` wrapping `Input` with label, required, validation message, and validation state.
- `V8PrefixSuffix`: `TextField` with `prefix`, `suffix`, and `iconProps`.
- `V9ContentSlots`: `Input` with `contentBefore` and `contentAfter`.
- `V8Controlled`: `onChange(event, newValue)`.
- `V9Controlled`: `onChange(event, data)` using `data.value`.

Use tokens for any layout styles and no `React.FC`.

- [ ] **Step 2: Add typed Textarea migration stories**

Export:

- `V8Basic`: multiline `TextField`.
- `V9Basic`: `Field` plus `Textarea`.
- `V8ResizeAndRows`: `multiline`, `rows`, `resizable={false}`.
- `V9ResizeAndRows`: `rows`, `resize="none"`.
- `V8ControlledTextarea` and `V9ControlledTextarea`.

- [ ] **Step 3: Run type-check**

Run `yarn nx run public-docsite-v9:type-check`.

Expected: PASS; fix every v8 and v9 import or prop mismatch before writing prose.

- [ ] **Step 4: Rewrite Input.mdx to the contract**

Use:

```md
## Major-change checklist

| ID   | Change                                                                     |
| ---- | -------------------------------------------------------------------------- |
| MC-1 | Label, validation, hint, and required state move to `Field` composition    |
| MC-2 | Prefix, suffix, and icon APIs move to `contentBefore`/`contentAfter` slots |
| MC-3 | `onChange` now reads `data.value`                                          |
| MC-4 | Multiline `TextField` migrates to `Textarea`, not `Input`                  |
```

The prop table must cover at least: `label`, `description`, `errorMessage`, `required`, `multiline`, `rows`, `autoAdjustHeight`, `canRevealPassword`, `iconProps`, `prefix`, `suffix`, `onRenderLabel`, `onChange`, `componentRef`, `styles`, `theme`, `underlined`, and `borderless`.

Render the typed stories with `<Canvas of={...}>` and `<Source of={...}>`. Remove stale hardcoded spacing examples and syntax errors.

- [ ] **Step 5: Rewrite Textarea.mdx to the contract**

Use:

```md
| MC-1 | Multiline input is a separate v9 component |
| MC-2 | Resize behavior uses the `resize` string union |
| MC-3 | Controlled changes use `data.value` |
| MC-4 | v8 auto-height and password scenarios do not map to Textarea |
```

Correct the current `v0` table label to `v8`, remove stale future-tense claims, and cover `multiline`, `rows`, `resizable`, `autoAdjustHeight`, `onChange`, `onRenderLabel`, `styles`, and `theme`.

- [ ] **Step 6: Add evidence and mark the family complete**

Evidence rows cite the four type files above and the current Field/Input/Textarea stories. Each row contains: major-change ID, file and symbol/test, resolution date `2026-08-17`, and a one-sentence conclusion. Change the `TextField` inventory row to `complete`, `N/A` priority, and linked Input/Textarea pages.

- [ ] **Step 7: Validate and commit**

Run:

```bash
yarn nx run public-docsite-v9:test --runTestsByPath \
  src/Concepts/Migration/FromV8/migrationGuides.test.ts --runInBand
yarn nx run public-docsite-v9:type-check
yarn nx run public-docsite-v9:lint
yarn nx run public-docsite-v9:build-storybook:docsite
```

Expected: PASS.

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8
git commit -m "docs: complete TextField migration guides"
```

### Task 8: Complete ContextualMenu to Menu

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Menu/index.stories.tsx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Menu.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/ContextualMenu/ContextualMenu.types.ts`
- Read: `packages/react/src/components/ContextualMenu/ContextualMenuItem.types.ts`
- Read: `packages/react-components/react-menu/library/src/components/*/*.types.ts`

- [ ] **Step 1: Add typed v8/v9 Menu stories**

Export these pairs:

- `V8Basic` / `V9Basic`: items array versus `Menu` + `MenuTrigger` + `MenuPopover` + `MenuList`.
- `V8ItemTypes` / `V9ItemTypes`: divider, header/group, and checkbox items. Document v9 radio-item grouping as a new capability, not a v8 mapping.
- `V8ControlledVisibility` / `V9ControlledOpen`: `hidden`/conditional rendering versus `open` and `onOpenChange`.
- `V8Submenu` / `V9Submenu`: nested items versus nested `Menu`.

- [ ] **Step 2: Run type-check**

Expected: PASS.

- [ ] **Step 3: Rewrite Menu.mdx**

Major changes:

```md
| MC-1 | `items` arrays become declarative child components |
| MC-2 | `itemType` and `canCheck` become dedicated item components |
| MC-3 | visibility and dismissal become controlled `open` state |
| MC-4 | target and callout positioning move to trigger composition and `positioning` |
| MC-5 | render callbacks become slots or composed children |
```

Split prop tables into `IContextualMenuProps` and `IContextualMenuItem`. Every blank cell in the current page must become a concrete replacement category or `Unsupported`; do not leave unexplained blanks.

- [ ] **Step 4: Mark complete, validate, and commit**

Add Evidence rows from both v8 type files and v9 Menu type files. Update the inventory row to `complete` and `N/A`.

Use the full CSF template from Task 7. Evidence rows include ID, file and symbol/test, date `2026-08-17`, and conclusion. Run targeted Jest, type-check, lint, and Storybook build; expect PASS.

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8
git commit -m "docs: complete ContextualMenu migration guide"
```

### Task 9: Complete ChoiceGroup to RadioGroup

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/RadioGroup/index.stories.tsx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/RadioGroup.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/ChoiceGroup/ChoiceGroup.types.ts`
- Read: `packages/react/src/components/ChoiceGroup/ChoiceGroupOption/ChoiceGroupOption.types.ts`
- Read: `packages/react-components/react-radio/library/src/components/RadioGroup/RadioGroup.types.ts`
- Read: `packages/react-components/react-radio/library/src/components/Radio/Radio.types.ts`

- [ ] **Step 1: Add typed stories**

Export:

- `V8Basic` / `V9Basic`.
- `V8ControlledSelection` / `V9ControlledSelection`.
- `V8CustomOptionRender` / `V9ComposedRadioLabel`.
- `V8Horizontal` using `styles={{ flexContainer: { display: 'flex' } }}` / `V9Horizontal` using `layout="horizontal"`.

- [ ] **Step 2: Run type-check**

Expected: PASS.

- [ ] **Step 3: Rewrite RadioGroup.mdx**

Major changes:

```md
| MC-1 | `options` data becomes child `Radio` components |
| MC-2 | `selectedKey`/`defaultSelectedKey` become `value`/`defaultValue` |
| MC-3 | change callbacks return `data.value` |
| MC-4 | group label and validation compose with `Field` or explicit ARIA labeling |
| MC-5 | option render callbacks become normal React composition |
```

Correct syntax errors in the existing examples and map both group and option props.

- [ ] **Step 4: Mark complete, validate, and commit**

Use the full CSF template from Task 7. Add Evidence rows with ID, file and symbol/test, date `2026-08-17`, and conclusion. Update inventory to `complete`; run targeted Jest, type-check, lint, and Storybook build; then commit:

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8
git commit -m "docs: complete ChoiceGroup migration guide"
```

### Task 10: Complete SpinButton

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/SpinButton/index.stories.tsx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/SpinButton.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/SpinButton/SpinButton.types.ts`
- Read: `packages/react-components/react-spinbutton/library/src/components/SpinButton/SpinButton.types.ts`

- [ ] **Step 1: Add typed stories**

Export:

- `V8Basic` / `V9Basic`.
- `V8StringValue` / `V9NumericAndDisplayValue`.
- `V8FormattedStringCallbacks` / `V9DisplayValueFormatting`.
- `V8ControlledChange` / `V9ControlledChange`.

- [ ] **Step 2: Run type-check**

Expected: PASS.

- [ ] **Step 3: Rewrite SpinButton.mdx**

Major changes:

```md
| MC-1 | v8 string `value` becomes numeric `value` plus optional `displayValue` |
| MC-2 | typed edits and step actions use `SpinButtonOnChangeData` |
| MC-3 | formatting encoded in the v8 string value and callbacks moves to numeric `value` plus consumer-managed `displayValue` |
| MC-4 | labels compose with `Field`; increment/decrement semantics are built in |
```

Cover `value`, `defaultValue`, `min`, `max`, `step`, `onChange`, `onIncrement`, `onDecrement`, formatted string values, `label`, `labelPosition`, `incrementButtonAriaLabel`, `decrementButtonAriaLabel`, `styles`, and `theme`.

- [ ] **Step 4: Mark complete and run Chunk 2 validation**

Use the full CSF template from Task 7. Add Evidence rows with ID, file and symbol/test, date `2026-08-17`, and conclusion; update inventory. Run:

```bash
yarn nx run public-docsite-v9:test --runTestsByPath \
  src/Concepts/Migration/FromV8/migrationGuides.test.ts --runInBand
yarn nx run public-docsite-v9:type-check
yarn nx run public-docsite-v9:lint
yarn nx run public-docsite-v9:build-storybook:docsite
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/public-docsite-v9/src/Concepts/Migration/FromV8
git commit -m "docs: complete SpinButton migration guide"
```

## Chunk 3: Add Dialog, Drawer, and MessageBar Guides

All Chunk 3 story files use the complete CSF template from Task 7, including `V8Basic`, `V9Basic`, a default export, and `StoryObj<typeof meta>`. Every Evidence table uses `ID | Source | Date | Conclusion` with date `2026-08-17`.

### Task 11: Add Dialog migration guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Dialog/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Dialog.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/Dialog/Dialog.types.ts`
- Read: `packages/react/src/components/Dialog/DialogContent.types.ts`
- Read: `packages/react/src/components/Dialog/DialogFooter.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/Dialog/Dialog.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/DialogBody/DialogBody.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/DialogContent/DialogContent.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/DialogSurface/DialogSurface.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/DialogTitle/DialogTitle.types.ts`
- Read: `packages/react-components/react-dialog/library/src/components/DialogActions/DialogActions.types.ts`
- Read: `packages/react-components/react-dialog/library/docs/Spec.md`

- [ ] **Step 1: Publish the planned Dialog link and verify failure**

Change the inventory `Guide pages` cell from `Planned: Dialog` to the Dialog Storybook docs link, keep status `missing`, and run targeted Jest.

Expected: FAIL because `Dialog.mdx` does not exist.

- [ ] **Step 2: Add typed stories**

Export:

- `V8Basic`: `DefaultButton`, `Dialog hidden`, `dialogContentProps`, and `DialogFooter`.
- `V9Basic`: `Dialog`, `DialogTrigger`, `DialogSurface`, `DialogBody`, `DialogTitle`, `DialogContent`, and `DialogActions`.
- `V8ControlledVisibility` / `V9ControlledOpen`.
- `V8ModalAndBlocking` / `V9ModalTypes`.
- `V8CustomHeaderFooter` / `V9ComposedBodyActions`.

Use interactive state only where necessary; use accessible trigger and action labels.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write Dialog.mdx**

Use Meta title:

```tsx
<Meta title="Concepts/Migration/from v8/Components/Dialog Migration" />
```

Major changes:

```md
| MC-1 | `hidden` inverse state becomes `open`/`defaultOpen` |
| MC-2 | `dialogContentProps`, `modalProps`, and `DialogFooter` become compound children |
| MC-3 | `onDismiss` becomes `onOpenChange` with event data |
| MC-4 | blocking/modal behavior becomes `modalType` |
| MC-5 | title, subtext, close button, top buttons, and footer content move from content props/components to explicit compound children |
```

Prop tables cover `hidden`, `onDismiss`, `dialogContentProps`, `modalProps`, `minWidth`, `maxWidth`, `isBlocking`, `isDarkOverlay`, `containerClassName`, `title`, `subText`, `showCloseButton`, `topButtonsProps`, `DialogFooter`, `styles`, and `theme`. Explain focus restoration, alert-dialog behavior, Escape/backdrop dismissal, and trigger ownership.

- [ ] **Step 5: Add Evidence and mark complete**

Cite exact v8/v9 type symbols plus `packages/react-components/react-dialog/library/src/components/Dialog/Dialog.test.tsx` and `packages/react-components/react-dialog/stories/src/Dialog/DialogControllingOpenAndClose.stories.tsx` for open state, modal type, and focus behavior. Set inventory status to `complete` and priority `N/A`.

- [ ] **Step 6: Validate and commit**

Run targeted Jest, type-check, lint, and Storybook build; expect PASS.

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Dialog.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Dialog/index.stories.tsx
git commit -m "docs: add Dialog migration guide"
```

### Task 12: Add Panel to Drawer migration guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Drawer/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Drawer.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/Panel/Panel.types.ts`
- Read: `packages/react-components/react-drawer/library/src/shared/DrawerBase.types.ts`
- Read: `packages/react-components/react-drawer/library/src/components/OverlayDrawer/OverlayDrawer.types.ts`
- Read: `packages/react-components/react-drawer/library/src/components/InlineDrawer/InlineDrawer.types.ts`
- Read: `packages/react-components/react-drawer/library/src/components/DrawerHeaderTitle/DrawerHeaderTitle.types.ts`
- Read: `packages/react-components/react-drawer/library/src/components/DrawerBody/DrawerBody.types.ts`
- Read: `packages/react-components/react-drawer/library/src/components/DrawerFooter/DrawerFooter.types.ts`
- Read: `packages/react-components/react-drawer/library/docs/Spec.md`

- [ ] **Step 1: Publish the planned Drawer link and verify failure**

Link the planned page, keep `missing`, run targeted Jest, and expect missing-page failure.

- [ ] **Step 2: Add typed stories**

Export:

- `V8Basic`: controlled `Panel isOpen` with `headerText` and close action.
- `V9Basic`: controlled `OverlayDrawer` with `DrawerHeader`, `DrawerHeaderTitle`, `DrawerBody`, and close button.
- `V8Modeless` / `V9NonModalOverlayDrawer`.
- `V8EmbeddedPanelAlternative` / `V9InlineDrawer` to explain that InlineDrawer is an embedded layout primitive rather than the direct `isBlocking={false}` mapping.
- `V8PanelType` / `V9PositionAndSize`.
- `V8CustomHeaderFooter` / `V9ComposedHeaderFooter`.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write Drawer.mdx**

Major changes:

```md
| MC-1 | `Panel` splits into `OverlayDrawer` and `InlineDrawer` |
| MC-2 | Overlay `isOpen`/`onDismiss` become `open`/`onOpenChange`; InlineDrawer exposes `open` without Dialog dismissal semantics |
| MC-3 | header, navigation, body, and footer props become compound children |
| MC-4 | `PanelType` becomes `position` plus supported `size` values |
| MC-5 | blocking, focus, and portal behavior differ between overlay and inline drawers |
```

Map `isOpen`, `onDismiss`, `type`, `headerText`, `hasCloseButton`, `isBlocking`, `isLightDismiss`, `onLightDismissClick`, `onRenderHeader`, `onRenderNavigation`, `onRenderFooterContent`, `customWidth`, `closeButtonAriaLabel`, `layerProps`, `styles`, and `theme`.

- [ ] **Step 5: Add Evidence, mark complete, validate, and commit**

Cite Panel and Drawer types plus `packages/react-components/react-drawer/library/src/components/OverlayDrawer/OverlayDrawer.test.tsx` and `packages/react-components/react-drawer/stories/src/Drawer/OverlayDrawerNoModal.stories.tsx`. Update inventory to `complete`, run targeted Jest/type-check/lint/Storybook build, then:

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Drawer.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Drawer/index.stories.tsx
git commit -m "docs: add Panel to Drawer migration guide"
```

### Task 13: Add MessageBar migration guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/MessageBar/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/MessageBar.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/MessageBar/MessageBar.types.ts`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.types.ts`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBarActions/MessageBarActions.types.ts`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBarGroup/MessageBarGroup.types.ts`
- Read: `packages/react-components/react-message-bar/library/src/contexts/messageBarContext.ts`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBar/useMessageBar.ts`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBar/useMessageBar.test.tsx`
- Read: `packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.test.tsx`
- Read: `packages/react-components/react-message-bar/library/docs/Spec.md`

- [ ] **Step 1: Publish the planned MessageBar link and verify failure**

Link the page, keep `missing`, run targeted Jest, and expect missing-page failure.

- [ ] **Step 2: Add typed stories**

Export:

- `V8Basic`: warning `MessageBar` with text and link.
- `V9Basic`: `MessageBar`, `MessageBarBody`, `MessageBarTitle`, and link.
- `V8IntentTypes` / `V9IntentValues`.
- `V8ActionsAndDismiss` / `V9ComposedActionsAndDismiss`.
- `V8Multiline` / `V9Layout`.
- `V8MultipleMessages` / `V9MessageBarGroup`.
- `V8Truncated` / `V9CustomTruncation`.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write MessageBar.mdx**

Major changes:

```md
| MC-1 | supported `messageBarType` values become string `intent`; `blocked` and `severeWarning` require a documented fallback choice |
| MC-2 | body, title, actions, and container action become compound children |
| MC-3 | `onDismiss` and dismiss-button creation move to consumer state/composition |
| MC-4 | `isMultiline` becomes `layout` |
| MC-5 | groups of messages can use `MessageBarGroup` |
| MC-6 | v8 `truncated` and overflow behavior require custom composition |
```

Map `messageBarType`, including explicit fallback guidance for `blocked` and `severeWarning`; `isMultiline`, `actions`, `onDismiss`, `dismissButtonAriaLabel`, `messageBarIconProps`, `onRenderIcon`, `truncated`, `overflowButtonAriaLabel`, `styles`, and `theme`. Explain that v9 renders `role="group"` and intent controls announcement politeness (`info` polite; other intents assertive). Cover accessible dismiss labeling.

- [ ] **Step 5: Add Evidence and run Chunk 3 validation**

Cite v8/v9 types, the existing internal migration table, `useMessageBar.ts`, `MessageBar.test.tsx`, and `useMessageBar.test.tsx`. Update inventory to `complete`.

Run targeted Jest, type-check, lint, and Storybook build; expect PASS.

- [ ] **Step 6: Commit**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/MessageBar.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/MessageBar/index.stories.tsx
git commit -m "docs: add MessageBar migration guide"
```

## Chunk 4: Add Popover, Dropdown, DetailsList, and Finalize

All Chunk 4 story files use the complete CSF template from Task 7. Evidence tables use `ID | Source | Date | Conclusion` with date `2026-08-17`.

### Task 14: Add Callout to Popover migration guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Popover/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Popover.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/Callout/Callout.types.ts`
- Read: `packages/react/src/components/Callout/FocusTrapCallout.types.ts`
- Read: `packages/react-components/react-popover/library/src/components/Popover/Popover.types.ts`
- Read: `packages/react-components/react-popover/library/src/components/PopoverSurface/PopoverSurface.types.ts`
- Read: `packages/react-components/react-popover/library/src/components/PopoverTrigger/PopoverTrigger.types.ts`
- Read: `packages/react-components/react-popover/library/docs/Spec.md`

- [ ] **Step 1: Publish the planned Popover link and verify failure**

Link the planned page, keep status `missing`, run targeted Jest, and expect missing-page failure.

- [ ] **Step 2: Add typed stories**

Export:

- `V8Basic`: button ref plus conditionally rendered `Callout target`.
- `V9Basic`: `Popover`, `PopoverTrigger`, and `PopoverSurface`.
- `V8ControlledDismiss` / `V9ControlledOpen`.
- `V8DirectionalHint` / `V9Positioning`.
- `V8FocusTrapCallout` / `V9TrapFocus`.
- `V8Beak` / `V9WithArrow`.
- `V8LayeringAndHiddenMount` / `V9InlineAndMountNode`.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write Popover.mdx**

Major changes:

```md
| MC-1 | external `target` and conditional rendering become `PopoverTrigger` composition |
| MC-2 | `onDismiss` and hidden state become `open`/`onOpenChange` |
| MC-3 | `DirectionalHint` and Callout positioning props become v9 `positioning` |
| MC-4 | `FocusTrapCallout` becomes Popover focus configuration |
| MC-5 | beak configuration becomes `withArrow` |
| MC-6 | layering and mount behavior use v9 portal/inline configuration rather than Callout props |
```

Map `target`, `hidden`, `onDismiss`, `directionalHint`, `directionalHintForRTL`, `gapSpace`, `beakWidth`, `isBeakVisible`, `doNotLayer`, `setInitialFocus`, `preventDismissOnScroll`, `preventDismissOnResize`, `preventDismissOnLostFocus`, `shouldUpdateWhenHidden`, `coverTarget`, `bounds`, `styles`, and `theme`. Include RTL, focus restoration, outside-click/Escape, and trigger accessibility guidance.

- [ ] **Step 5: Add Evidence, mark complete, validate, and commit**

Cite Callout types, Popover types, `packages/react-components/react-popover/library/src/components/Popover/Popover.test.tsx`, `packages/react-components/react-popover/stories/src/Popover/PopoverTrappingFocus.stories.tsx`, and `packages/react-components/react-popover/stories/src/Popover/PopoverWithArrow.stories.tsx`. Update inventory to `complete`; run targeted Jest/type-check/lint/Storybook build.

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Popover.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Popover/index.stories.tsx
git commit -m "docs: add Callout to Popover migration guide"
```

### Task 15: Add Dropdown migration decision guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Dropdown/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Dropdown.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/Dropdown/Dropdown.types.ts`
- Read: `packages/react-components/react-combobox/library/src/components/Dropdown/Dropdown.types.ts`
- Read: `packages/react-components/react-combobox/library/src/components/Option/Option.types.ts`
- Read: `packages/react-components/react-select/library/src/components/Select/Select.types.ts`
- Read: `packages/react-components/react-combobox/library/docs/Migration.md`

- [ ] **Step 1: Publish the planned Dropdown link and verify failure**

Link the planned page, keep `missing`, run targeted Jest, and expect missing-page failure.

- [ ] **Step 2: Add typed decision stories**

Export:

- `V8Basic`: single-select v8 Dropdown with `options`.
- `V9Basic`: v9 Dropdown with child `Option` elements.
- `V9NativeSelectAlternative`: v9 Select with native `option` elements.
- `V8MultiSelect` / `V9MultiSelect`.
- `V8ControlledSelection` / `V9ControlledSelection`.
- `V8CustomOptionRender` / `V9OptionComposition`.

The v9 basic story is the primary replacement. The Select story explicitly demonstrates the narrower native single-select alternative.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write Dropdown.mdx**

Start with a decision table:

| v8 scenario                        | v9 destination                              |
| ---------------------------------- | ------------------------------------------- |
| custom-rendered single select      | `Dropdown`                                  |
| multiselect                        | `Dropdown` with `multiselect`               |
| native single select is sufficient | `Select`                                    |
| editable/freeform/filtering        | separate `ComboBox` to `Combobox` migration |

Major changes:

```md
| MC-1 | `options` data becomes child `Option` elements |
| MC-2 | `selectedKey(s)` become `selectedOptions`; `value` separately controls displayed text; changes use `onOptionSelect` data |
| MC-3 | multiselect is explicit and returns selected option values |
| MC-4 | custom option/title render callbacks become Option/slot composition |
| MC-5 | native-select scenarios may choose `Select`; editable/filtering scenarios belong to Combobox |
```

Map `options`, `selectedKey`, `defaultSelectedKey`, `selectedKeys`, `defaultSelectedKeys`, `value`, `defaultValue`, `selectedOptions`, `defaultSelectedOptions`, `multiSelect`, `onChange`, `onOptionSelect`, `placeholder`, `label`, `errorMessage`, `onRenderOption`, `onRenderTitle`, `onRenderCaretDown`, `dropdownWidth`, `responsiveMode`, `styles`, and `theme`. Explain `text` requirements for complex option content and accessible labels.

- [ ] **Step 5: Add links, Evidence, and mark complete**

Link to:

- `/docs/components-dropdown--docs`;
- `/docs/components-select--docs`;
- the central ComboBox/Combobox migration page if present.

If no ComboBox guide exists, add `<a id="combobox-migration"></a>` plus a short `### ComboBox to Combobox status` paragraph beneath the inventory table and link to `/docs/concepts-migration-from-v8-component-mapping--docs#combobox-migration`. Do not invent a guide route.

Cite v8 Dropdown types, v9 Dropdown/Option/Select types, `packages/react-components/react-combobox/library/src/components/Dropdown/Dropdown.test.tsx`, `packages/react-components/react-combobox/stories/src/Dropdown/DropdownControlled.stories.tsx`, and `packages/react-components/react-combobox/stories/src/Dropdown/DropdownMultiselect.stories.tsx`. Update inventory to `complete`.

- [ ] **Step 6: Validate and commit**

Run targeted Jest, type-check, lint, and Storybook build; expect PASS.

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/Dropdown.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/Dropdown/index.stories.tsx
git commit -m "docs: add Dropdown migration guide"
```

### Task 16: Add DetailsList to Table/DataGrid migration guide

**Files:**

- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/DetailsList/index.stories.tsx`
- Create: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/DetailsList.mdx`
- Modify: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Read: `packages/react/src/components/DetailsList/DetailsList.types.ts`
- Read: `packages/react/src/components/DetailsList/DetailsHeader.types.ts`
- Read: `packages/react/src/components/DetailsList/DetailsRow.types.ts`
- Read: `packages/react-components/react-table/library/src/components/Table/Table.types.ts`
- Read: `packages/react-components/react-table/library/src/components/DataGrid/DataGrid.types.ts`
- Read: `packages/react-components/react-table/library/src/hooks/useTableFeatures.ts`
- Read: `packages/react-components/react-table/library/docs/Spec.md`

- [ ] **Step 1: Publish the planned DetailsList link and verify failure**

Link the planned page, keep `missing`, run targeted Jest, and expect missing-page failure.

- [ ] **Step 2: Add typed scenario stories**

Export:

- `V8Basic`: items/columns `DetailsList`.
- `V9Basic`: semantic `Table` with explicit rows/cells.
- `V9DataGridAlternative`: `DataGrid` with `createTableColumn`.
- `V8Selection` / `V9DataGridSelection`.
- `V8Sorting` / `V9DataGridSorting`.
- `V8CustomCell` / `V9RenderCell`.
- `V8LayoutAndColumnSizing` / `V9TableFeatureHooks`.

Keep datasets small and deterministic.

- [ ] **Step 3: Run type-check**

Expected: PASS.

- [ ] **Step 4: Write DetailsList.mdx**

Lead with a decision table:

| Need                                                                  | Destination                                                                                      |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| semantic display table with consumer-owned behavior                   | `Table`                                                                                          |
| selection, sorting, or sizing with maximum composition control        | `Table` plus `useTableFeatures` plugins                                                          |
| composite keyboard navigation with a composed Table                   | `useTableCompositeNavigation` in addition to Table state                                         |
| integrated selection, sorting, keyboard navigation, and column sizing | `DataGrid`                                                                                       |
| virtualization                                                        | compose Table/DataGrid with a virtualization library; not a built-in DetailsList-equivalent prop |
| grouped hierarchical rows                                             | custom composition or another component; document current gap                                    |

Major changes:

```md
| MC-1 | `items`/`columns` data becomes explicit Table children or DataGrid column definitions |
| MC-2 | v8 `Selection` object becomes controlled selection state and callbacks |
| MC-3 | sorting becomes controlled column definitions/callbacks |
| MC-4 | cell/header render callbacks become `renderCell`, `renderHeaderCell`, or child composition |
| MC-5 | layout, column sizing, and keyboard behavior differ between Table and DataGrid |
| MC-6 | grouping, shimmer integration, and virtualization are not one-to-one built-ins |
```

Organize prop mappings by data/columns, selection, sorting, rendering, layout, and unsupported features. Cover `items`, `columns`, `selection`, `selectionMode`, `setKey`, `layoutMode`, `compact`, `checkboxVisibility`, `onColumnHeaderClick`, `onRenderItemColumn`, `onRenderDetailsHeader`, `onRenderRow`, `groupProps`, `enableShimmer`, `styles`, and `theme`.

- [ ] **Step 5: Add Evidence and mark complete**

Cite exact v8/v9 types, `packages/react-components/react-table/library/src/hooks/useTableFeatures.test.ts`, `useTableSelection.test.ts`, `useTableSort.test.ts`, `useTableColumnSizing.test.ts`, `useTableCompositeNavigation.ts`, `packages/react-components/react-table/stories/src/Table/Virtualization.stories.tsx`, `packages/react-components/react-table/stories/src/DataGrid/SingleSelectControlled.stories.tsx`, `MultipleSelectControlled.stories.tsx`, and `SortControlled.stories.tsx`. Update inventory to `complete`.

- [ ] **Step 6: Validate and commit**

Run targeted Jest, type-check, lint, and Storybook build; expect PASS.

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/DetailsList.mdx \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8/Components/examples/DetailsList/index.stories.tsx
git commit -m "docs: add DetailsList migration guide"
```

### Task 17: Run the cross-guide consistency pass

**Files:**

- Modify as needed: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/ComponentMapping.mdx`
- Modify as needed: all P0 MDX and `Components/examples/*/index.stories.tsx`
- Test: `apps/public-docsite-v9/src/Concepts/Migration/FromV8/migrationGuides.test.ts`

- [ ] **Step 1: Verify all P0 aggregate statuses**

Confirm every P0 row is `complete`, priority `N/A`, and has linked required pages. Confirm TextField aggregates both Input and Textarea.

- [ ] **Step 2: Normalize terminology**

Use only the replacement categories from the spec: Rename, Native replacement, Composition replacement, Separate component, Behavioral change, Unsupported, Conditional mapping.

Ensure:

- all pages use `v8` and `v9`, not `v0` or `converged`;
- all prop tables distinguish unsupported APIs from composition replacements;
- every MC ID maps to a focused story or unsupported explanation;
- every Evidence row has an exact source, date, and conclusion;
- every example uses tokens for styling and avoids `React.FC`.

- [ ] **Step 3: Run complete validation**

Run:

```bash
yarn nx run public-docsite-v9:test
yarn nx run public-docsite-v9:type-check
yarn nx run public-docsite-v9:lint
yarn nx run public-docsite-v9:build-storybook:docsite
```

Expected: all commands PASS.

- [ ] **Step 4: Confirm release-file scope**

Run:

```bash
git diff --name-only 203c5b8d8e...HEAD
```

Expected: changes are limited to `apps/public-docsite-v9/`, `docs/superpowers/`, and the `yarn.lock` update required by Task 1's private docsite devDependencies. Because no published package changes, do not create a Beachball change file.

- [ ] **Step 5: Commit final consistency fixes**

```bash
git add \
  apps/public-docsite-v9/src/Concepts/Migration/FromV8 \
  docs/superpowers/plans/2026-08-17-v8-v9-component-migration-handbook.md
git commit -m "docs: finalize v8 to v9 migration handbook"
```
