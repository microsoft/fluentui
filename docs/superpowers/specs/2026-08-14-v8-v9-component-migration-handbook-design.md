# Fluent UI v8 to v9 Component Migration Handbook Design

## Summary

Fluent UI v9 has migration guidance for only a subset of components. Some packages have standalone migration guides, some contain partial migration notes inside internal specifications, and others have no migration guidance.

This project creates a central, docsite-visible v8-to-v9 component migration handbook. It includes a maintained coverage inventory and an initial batch of ten high-impact component guides. Each guide explains component and API changes, provides prop mappings, and includes working v8 and v9 code examples.

## Goals

- Give v8 consumers a discoverable path to the appropriate v9 component and API.
- Inventory all stable v9 components with a clear v8 counterpart.
- Publish ten high-impact migration guides as the initial handbook batch.
- Standardize the structure and evidence requirements for future guides.
- Clearly distinguish renamed, removed, replaced, unsupported, and newly introduced APIs.
- Explain structural, behavioral, styling, theming, and accessibility differences that cannot be represented by a prop table alone.

## Non-goals

- Document preview, compatibility, utility, or deprecated packages in the pilot.
- Create guides for v9 components without a meaningful v8 counterpart.
- Generate migration guidance automatically from TypeScript types.
- Preserve every v8 behavior when v9 intentionally uses a different composition or interaction model.
- Rewrite existing correct package-local migration guides during the pilot.

## Information Architecture

The handbook will extend the existing v9 docsite migration section at
`apps/public-docsite-v9/src/Concepts/Migration/FromV8/`.

It consists of:

1. The existing `ComponentMapping.mdx` page, expanded into the maintained migration inventory and handbook landing page.
2. One migration page per component or closely related component family under `FromV8/Components/`.
3. Storybook `<Meta>` titles under `Concepts/Migration/from v8/Components/...`, matching the existing hierarchy.
4. Links from `ComponentMapping.mdx` to every completed guide.
5. Links from each guide to the component mapping page and relevant v8 and v9 component documentation.

Existing From-v8 pages and `ComponentMapping.mdx` are retained and improved in place. The project does not introduce a parallel migration section or replace package-local guides. Package-local guides remain supporting evidence and can be linked when they add useful detail.

### Inventory

The inventory is a committed, maintained document and the source of truth for migration-guide coverage. Each eligible component entry records:

- v8 component or component family;
- recommended v9 replacement;
- guide status;
- migration complexity;
- priority;
- guide link when complete;
- notes for conditional mappings, unsupported scenarios, or multiple possible replacements.

Supported statuses are:

- `missing`;
- `in progress`;
- `complete`;
- `no direct counterpart`;
- `out of scope`.

The inventory population starts from the v8 controls registered in
`apps/public-docsite-resources/src/AppDefinition.tsx`, reconciled with the existing rows in `ComponentMapping.mdx`. Every public v8 docsite control receives a row. Duplicate mapping rows are removed, and any control present in only one source is investigated and retained with the appropriate status.

Inventory entries use one row per v8 public component or component family. Variants are grouped only when they share the same v9 destination and migration model, such as the v8 button variants that converge on the v9 button family. A stable v9 component with no v8 source does not receive a migration row; it remains covered by the existing "New Components in v9" section.

Eligibility is determined as follows:

- **Stable v9 component:** exported from the stable `@fluentui/react-components` entry point and not located in a preview, compatibility, utility, or deprecated package.
- **Clear counterpart:** the existing component mapping identifies a stable v9 replacement and repository source or specifications show that it serves the same primary user task.
- **Conditional counterpart:** more than one stable v9 component can replace the v8 component depending on the usage scenario. These entries remain eligible and must document the decision criteria.
- **No direct counterpart:** no stable v9 component serves the same primary user task. The inventory records this status, but no guide is required.
- **Out of scope:** the only available destination is preview, compatibility, utility, deprecated, or third-party functionality. The row remains in the inventory and explains the exclusion.

Complexity values are:

- `high`: any of these apply: multiple destination components require a scenario decision; one v8 component becomes three or more required v9 compound components; or a supported core v8 scenario requires custom implementation because v9 has no equivalent;
- `medium`: no `high` rule applies, but migration changes controlled-state ownership, event data shape, accessible labeling, focus/keyboard behavior, or replaces render callbacks with slots or child composition;
- `low`: neither `high` nor `medium` applies, and migration is limited to component/prop renames, string-enum changes, or native HTML/ARIA prop replacements.

Priority values are:

- `P0`: the approved ten-component pilot;
- `P1`: a missing guide with `high` or `medium` complexity;
- `P2`: a missing guide with `low` complexity;
- `N/A`: complete, out-of-scope, or no-direct-counterpart entries.

Changing a guide from `missing` to `in progress` does not change its priority. A guide changes to `N/A` priority only when it becomes `complete` or is classified as out of scope or no direct counterpart.

A guide is `complete` only when its MDX page exists, has the required `<Meta>` title, is linked from `ComponentMapping.mdx`, contains every required section or an explicit `Not applicable` statement, includes the required examples, has no unresolved documentation gap affecting destination choice, public API mapping, behavior, or example correctness, and passes the validation defined below.

## Pilot Components

The first batch contains ten components selected for common v8 usage and substantial API, composition, or behavior differences:

| v8 component     | v9 component             | Primary migration concern                                            |
| ---------------- | ------------------------ | -------------------------------------------------------------------- |
| `Dialog`         | `Dialog`                 | Compound-component structure and open-state handling                 |
| `Panel`          | `Drawer`                 | Component rename and inline/overlay composition                      |
| `TextField`      | `Input`                  | Label/validation composition and public API changes                  |
| `ContextualMenu` | `Menu`                   | Declarative child composition and item variants                      |
| `MessageBar`     | `MessageBar`             | Compound structure, intent, actions, and dismissal                   |
| `Callout`        | `Popover`                | Trigger ownership, open state, focus, and positioning                |
| `ChoiceGroup`    | `RadioGroup` and `Radio` | Component rename, option composition, and events                     |
| `Dropdown`       | `Dropdown` or `Select`   | Scenario-based replacement, multiselect, and native select semantics |
| `SpinButton`     | `SpinButton`             | Numeric value model, events, and formatting                          |
| `DetailsList`    | `Table` and `DataGrid`   | Feature decomposition, selection, sorting, and virtualization gaps   |

Some v8 components map to more than one v9 option. The guide must explain the decision criteria instead of presenting a false one-to-one replacement. For v8 `Dropdown`, v9 `Dropdown` is the primary replacement and supports single-select and multiselect scenarios. V9 `Select` is an alternative only when native `<select>` semantics, native option rendering, and single selection satisfy the product requirements. Editable, freeform, or built-in filtering scenarios belong to the separate v8 `ComboBox` to v9 `Combobox` mapping and are cross-linked rather than presented as ordinary `Dropdown` migration.

Four pilot pages already exist in the central docsite:

- `Input.mdx`;
- `Menu.mdx`;
- `RadioGroup.mdx`;
- `SpinButton.mdx`.

These pages are audit-and-revise work, not duplicate-page creation. They must be brought up to the new content model, corrected against current stable APIs, and relinked from the expanded inventory. The remaining six pilot guides are new pages.

## Guide Content Model

Every component guide follows the same top-level structure. If a section is not relevant, it contains an explicit `Not applicable` statement rather than being omitted:

1. **Overview**
   - What the v8 component maps to in v9.
   - The most important migration risks.
2. **Component mapping**
   - Renamed components.
   - Components split into multiple v9 components.
   - Conditional or alternative replacements.
3. **What changed**
   - Renamed APIs.
   - Removed APIs.
   - APIs replaced by slots, composition, native HTML props, hooks, or separate components.
   - Newly available v9 capabilities.
4. **Architecture and behavior**
   - Compound-component structure.
   - Controlled and uncontrolled state.
   - Event and data-shape differences.
   - Interaction and rendering changes.
5. **Prop mapping**
   - Tables with v8 prop, v9 equivalent, status, and migration notes.
   - Large APIs may be divided by scenario or responsibility.
6. **Styling and theming**
   - `styles` and `theme` migration to Griffel and design tokens.
   - Slot styling and class application where relevant.
7. **Accessibility**
   - Labeling, roles, focus management, keyboard behavior, and semantic changes.
8. **Examples**
   - At least one side-by-side basic v8 and v9 example.
   - Focused examples for each major structural or API change.
9. **Unsupported scenarios and known gaps**
   - Missing equivalents.
   - Required custom composition.
   - Links to alternate components where appropriate.

A **major change** is any item classified as a conditional mapping, composition replacement, separate-component replacement, behavioral change, or unsupported core scenario. Each major change requires a focused example. If an unsupported scenario cannot have a runnable v9 example, it requires a minimal v8 example plus a concrete composition sketch or explicit statement that no supported replacement exists.

## Research and Evidence

Migration claims must be based on current repository sources:

- v8 exported public types and representative examples;
- v9 exported public types and representative stories;
- existing standalone migration guides;
- internal v9 specifications;
- changelogs and RFCs when they explain intentional behavior changes;
- current component tests when behavior is not clear from the public API.

Internal specifications are evidence, not publication-ready content. Proposal language, stale type links, and unresolved design notes must not be copied into the handbook. Every statement and code example must describe the current stable API.

When evidence is incomplete or contradictory, the guide must not guess. The author should either:

- resolve the behavior from current source and tests;
- describe the limitation conservatively;
- mark the item as a documentation gap requiring component-owner input.

A documentation gap that affects destination choice, public prop/event mapping, behavior, accessibility guidance, or example correctness blocks `complete` status until repository evidence or component-owner confirmation resolves it. Minor historical context gaps may remain in the known-gaps section when they do not affect migration instructions.

## Authoring Workflow

The workflow is inventory-first:

1. Enumerate public v8 controls from `AppDefinition.tsx` and reconcile them with `ComponentMapping.mdx`.
2. Map each v8 control to a stable, conditional, unavailable, or out-of-scope v9 destination.
3. Detect existing standalone and embedded migration material.
4. Assign status, migration complexity, and priority.
5. Expand `ComponentMapping.mdx` into the landing inventory and establish the component-page template.
6. Audit and revise the four existing pilot pages.
7. Research and author the six new pilot pages from current public APIs.
8. Update the inventory in the same change as each completed guide.
9. Run a final cross-guide consistency and navigation pass.

The ten pages should be authored in small reviewable groups. Each page remains independently reviewable and maintainable even though the pilot is one documentation initiative.

## Data Flow

The inventory connects component coverage to guide publication:

1. The public v8 control list establishes the inventory row set.
2. Repository package and API data classifies each v8-to-v9 mapping.
3. The inventory records the mapping, priority, and current status.
4. Research produces a structured list of component, prop, behavior, and example differences.
5. The structured findings become a component migration page.
6. The completed page is linked from the inventory and docsite navigation.
7. Future API or guide changes update both the component page and inventory status where necessary.

This coupling prevents migration coverage from drifting silently.

## Handling Complex and Ambiguous Migrations

Migration guidance must distinguish these cases:

- **Rename:** the capability is materially the same under a new component or prop name.
- **Native replacement:** v9 uses a native HTML or ARIA prop.
- **Composition replacement:** v9 expresses the behavior through child components or slots.
- **Separate component:** the v8 prop moved to another v9 component.
- **Behavioral change:** a similar API has different state, event, focus, or rendering behavior.
- **Unsupported:** v9 has no supported equivalent.
- **Conditional mapping:** the correct v9 replacement depends on the v8 usage scenario.

Large migrations such as `DetailsList` to `Table` or `DataGrid` should be organized by user scenario and feature responsibility. They should not force every v8 prop into a single unreadable table.

## Validation

Documentation validation covers:

- docsite navigation and page rendering;
- Markdown formatting and internal links;
- TypeScript/TSX syntax in code samples;
- package imports and exported component names;
- current public prop names and event data shapes;
- accessible labels, roles, focus behavior, and keyboard guidance;
- consistency of terminology and mapping status across all pages;
- presence of all required guide sections;
- at least one basic v8/v9 example pair per guide;
- focused examples for major API or composition changes.

Reviewers should specifically check that removed APIs are not confused with APIs replaced through slots, composition, native props, or separate components.

The implementation plan must use the existing Nx targets:

- `yarn nx run public-docsite-v9:type-check` for docsite TypeScript and imported MDX dependencies;
- `yarn nx run public-docsite-v9:lint` for repository documentation and source conventions;
- `yarn nx run public-docsite-v9:test` for migration navigation and route-link validation;
- `yarn nx run public-docsite-v9:build-storybook:docsite` to prove that MDX pages, `<Meta>` declarations, navigation, and links can be built by the docsite.

Examples use adjacent CSF story files, with separate exported stories for the v8 and v9 forms. The MDX page imports those stories and uses Storybook's `<Canvas of={...}>` and `<Source of={...}>` blocks, so the rendered example and visible source come from the same typed implementation. The public docsite already depends on both `@fluentui/react` and `@fluentui/react-components`; therefore, `public-docsite-v9:type-check` reproducibly validates imports and props for both versions.

Every guide uses this exact title prefix:

```tsx
<Meta title="Concepts/Migration/from v8/Components/<Migration name>" />
```

Internal guide links use Storybook doc routes in the existing form:

```text
/docs/concepts-migration-from-v8-components-<storybook-slug>--docs
```

An adjacent Jest navigation test under `FromV8/` scans `ComponentMapping.mdx` and pilot MDX files, extracts `<Meta title>` values and internal `/docs/` links, derives Storybook IDs with Storybook's existing CSF ID utility, and fails when a linked guide has no matching MDX title. `yarn nx run public-docsite-v9:test` runs this check. This source-level test complements the Storybook build, which validates MDX compilation but does not itself prove that links resolve.

## Delivery Phases

### Phase 1: Handbook foundation

- Expand `ComponentMapping.mdx` into the landing inventory.
- Add the full eligible-component inventory.
- Add the guide template and preserve the existing Storybook navigation hierarchy.

### Phase 2: Pilot guides

- Audit and revise the four existing pilot pages.
- Publish the six new pilot component pages in small reviewable groups.
- Update inventory status and links with every completed page.

### Phase 3: Consistency pass

- Normalize terminology and table structure.
- Verify examples, links, and current APIs.
- Check cross-links for conditional migrations.
- Confirm all pilot acceptance criteria.

## Acceptance Criteria

The pilot is complete when:

- the existing v9 From-v8 component mapping page serves as the migration landing page;
- the landing page contains a maintained inventory of all eligible stable v9 components with clear v8 counterparts;
- the inventory records a defensible status, complexity, and priority for every entry;
- all ten pilot component pages are published and linked;
- the four existing pilot pages are revised in place rather than duplicated;
- every guide covers renamed, removed, replaced, unsupported, and new APIs where applicable;
- every required section is present or explicitly marked `Not applicable`;
- every guide includes appropriate prop mapping tables;
- every guide includes at least one basic side-by-side v8/v9 example;
- major API and composition changes have focused examples;
- imports, props, event shapes, and examples match current stable APIs;
- v9 examples have a typed story or fixture source shared with the visible documentation example;
- accessibility and interaction differences are documented;
- internal specifications are not treated as current public guidance without verification;
- the public docsite type-check, lint, and Storybook docsite build succeed.
