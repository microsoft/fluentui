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

The handbook will live in a central v9 docsite migration section rather than in individual package documentation.

It consists of:

1. A migration landing page containing the maintained component inventory.
2. One migration page per component or closely related component family.
3. Navigation from the landing page to completed guides.
4. Links from each guide to the landing page and relevant v8 and v9 component documentation.

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

The eligible inventory includes stable v9 component packages with a clear v8 counterpart. Preview, compatibility, utility, and deprecated packages are excluded from the pilot. Components without a direct v8 counterpart can appear in the inventory with an explanatory status but are not migration-guide candidates.

## Pilot Components

The first batch contains ten components selected for common v8 usage and substantial API, composition, or behavior differences:

| v8 component     | v9 component             | Primary migration concern                                          |
| ---------------- | ------------------------ | ------------------------------------------------------------------ |
| `Dialog`         | `Dialog`                 | Compound-component structure and open-state handling               |
| `Panel`          | `Drawer`                 | Component rename and inline/overlay composition                    |
| `TextField`      | `Input`                  | Label/validation composition and public API changes                |
| `ContextualMenu` | `Menu`                   | Declarative child composition and item variants                    |
| `MessageBar`     | `MessageBar`             | Compound structure, intent, actions, and dismissal                 |
| `Callout`        | `Popover`                | Trigger ownership, open state, focus, and positioning              |
| `ChoiceGroup`    | `RadioGroup` and `Radio` | Component rename, option composition, and events                   |
| `Dropdown`       | `Select`                 | Scenario-based replacement and native select semantics             |
| `SpinButton`     | `SpinButton`             | Numeric value model, events, and formatting                        |
| `DetailsList`    | `Table` and `DataGrid`   | Feature decomposition, selection, sorting, and virtualization gaps |

Some v8 components map to more than one v9 option. The guide must explain the decision criteria instead of presenting a false one-to-one replacement. For example, searchable or multiselect v8 `Dropdown` scenarios may require v9 `Combobox` rather than `Select`.

## Guide Content Model

Every component guide follows the same top-level structure, adjusted when a section is not relevant:

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

## Authoring Workflow

The workflow is inventory-first:

1. Enumerate eligible stable v9 components.
2. Map each v9 component to its v8 source component or components.
3. Detect existing standalone and embedded migration material.
4. Assign status, migration complexity, and priority.
5. Create the central landing page and component-page template.
6. Research and author each pilot guide from current public APIs.
7. Update the inventory in the same change as each completed guide.
8. Run a final cross-guide consistency and navigation pass.

The ten pages should be authored in small reviewable groups. Each page remains independently reviewable and maintainable even though the pilot is one documentation initiative.

## Data Flow

The inventory connects component coverage to guide publication:

1. Repository package and API data identifies an eligible v8-to-v9 mapping.
2. The inventory records the mapping, priority, and current status.
3. Research produces a structured list of component, prop, behavior, and example differences.
4. The structured findings become a component migration page.
5. The completed page is linked from the inventory and docsite navigation.
6. Future API or guide changes update both the component page and inventory status where necessary.

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

## Delivery Phases

### Phase 1: Handbook foundation

- Add the central migration section and landing page.
- Add the full eligible-component inventory.
- Add the guide template and navigation.

### Phase 2: Pilot guides

- Publish the ten pilot component pages in small reviewable groups.
- Update inventory status and links with every completed page.

### Phase 3: Consistency pass

- Normalize terminology and table structure.
- Verify examples, links, and current APIs.
- Check cross-links for conditional migrations.
- Confirm all pilot acceptance criteria.

## Acceptance Criteria

The pilot is complete when:

- the v9 docsite exposes a migration landing page;
- the landing page contains a maintained inventory of all eligible stable v9 components with clear v8 counterparts;
- the inventory records a defensible status, complexity, and priority for every entry;
- all ten pilot component pages are published and linked;
- every guide covers renamed, removed, replaced, unsupported, and new APIs where applicable;
- every guide includes appropriate prop mapping tables;
- every guide includes at least one basic side-by-side v8/v9 example;
- major API and composition changes have focused examples;
- imports, props, event shapes, and examples match current stable APIs;
- accessibility and interaction differences are documented;
- internal specifications are not treated as current public guidance without verification;
- docsite rendering, links, and navigation succeed.
