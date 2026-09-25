---
name: migrate-presentational-attr
description: "Migrate CSS-only attributes in Fluent UI's packages/web-components package from runtime JavaScript properties and attribute observation to class-level @presentational documentation while preserving HTML styling and generated API metadata. Use when auditing or removing @attr decorators, observed properties, change callbacks, CSS-state mirroring, or property synchronization from presentational attributes under packages/web-components/**."
argument-hint: 'Name the Web Component or attribute to migrate, or request an audit.'
---

# Migrate Presentational Attributes

Remove JavaScript APIs and runtime observation from attributes used only for styling while
preserving their HTML attribute behavior, CSS selectors, documentation, and generated Custom
Elements Manifest (CEM) records.

This skill specifically targets Fluent UI's `packages/web-components/**` package. Discover
component locations, package boundaries, generated files, and validation commands within that
scope rather than assuming a particular component layout.

## Resulting Contract

A migrated attribute:

- Remains supported in HTML.
- Continues to style the component through attribute selectors.
- Is documented with a class-level `@presentational` tag.
- Appears as a CEM attribute without a corresponding JavaScript field.
- Is changed from JavaScript with `setAttribute`, `removeAttribute`, or `toggleAttribute`.
- Is no longer an observed property and does not invoke a change callback.

Property assignment is intentionally removed:

```js
// Supported
element.setAttribute('appearance', 'primary');
element.toggleAttribute('compact', true);

// No longer supported after migration
element.appearance = 'primary';
element.compact = true;
```

## Prerequisite

Before migrating a component, verify that the repository's shared CEM configuration recognizes
class-level `@presentational` tags and emits standard attribute records without synthetic fields.
Use this syntax:

```ts
/**
 * @presentational {Appearance | undefined} appearance - Controls the visual appearance.
 * @presentational {boolean} compact - Uses the compact presentation.
 */
```

Named aliases should remain type-only imports when they are no longer used at runtime:

```ts
import type { Appearance } from './component.options.js';
```

If the target repository does not support `@presentational`, do not remove component fields and
silently lose public metadata. Add equivalent shared CEM support first or report the prerequisite
as a blocker.

## Phase 1: Discover Local Conventions

Start from the requested component class under `packages/web-components/**`. Locate:

- The owning class and its base class.
- Component styles and templates.
- Functional and visual tests.
- Stories, examples, and API documentation.
- The nearest package manifest and its build, test, CEM, and bundle-size scripts.
- The generated component manifest and any aggregate manifest.

Use the repository's existing commands and neighboring Web Component patterns. Do not invent
package paths, test commands, or generation steps from another repository.

## Phase 2: Classify Each Attribute

An attribute qualifies only when CSS is its sole consumer and the owning class does not promise a
JavaScript property API.

For each candidate, search both its HTML spelling and property spelling across the repository.
For example, search both `icon-only` and `iconOnly`. Use symbol references for the property when
the language service supports them.

Inspect all of the following:

1. The field decorator or observation metadata.
2. `<property>Changed`, `attributeChangedCallback`, converters, and reflection settings.
3. Reads and writes in the class, base classes, templates, directives, helpers, controllers, and
   event handlers.
4. Accessibility, form-association, focus, validation, and keyboard behavior.
5. CSS selectors for every supported value and presence state.
6. Tests, stories, examples, and external package usage that assign the property.
7. The generated manifest's attribute and field records.

### Eligible

Migrate when all of these are true:

- Styling is driven directly by selectors such as `:host([appearance="primary"])` or
  `:host([compact])`.
- JavaScript does not branch on, delegate, coerce, validate, reflect, or emit events for the value.
- No template binding or accessibility behavior reads the property.
- Removing the property is an intentional API change.
- The attribute is owned by the class being edited rather than inherited from an unmodified base
  class.

A change callback may be removed only when its sole effect is redundant presentation mirroring,
such as toggling a CSS custom state already covered by equivalent attribute selectors. Verify
that every state and value still has an attribute-selector styling path before deleting it.

### Not Eligible

Keep the runtime-backed attribute when any of these apply:

- JavaScript reads its value or reacts with non-styling behavior.
- It controls accessibility, focus, forms, keyboard interaction, validation, content, events, or
  template structure.
- It is delegated to an internal control or another element.
- It requires conversion, normalization, reflection, or a meaningful default property value.
- Styling depends on a custom state and there is no equivalent attribute selector.
- Consumers still require property assignment as a supported API.
- The decorator or property is inherited from a base class outside the migration scope.

CSS usage is evidence, not proof. An attribute can participate in both CSS and behavior.

## Phase 3: Make the Smallest Migration

For each eligible attribute:

1. Add one `@presentational` tag to the JSDoc immediately preceding the custom element class.
2. Preserve the public attribute name, description, declared type, allowed values, and default.
3. Remove the observation decorator or metadata and the JavaScript field.
4. Remove a change callback only if its entire purpose is redundant presentation mirroring.
5. Remove imports used only by the deleted field or callback.
6. Convert type aliases from value imports to `import type` when no runtime usage remains.
7. Leave attribute selectors and the options/type declaration intact.
8. Do not add a placeholder field, getter, setter, property alias, or vendor-specific CEM marker.

Example:

```ts
// Before
import { attr } from '@microsoft/fast-element';
import { Appearance } from './component.options.js';

export class Example extends BaseExample {
  @attr
  public appearance?: Appearance;
}
```

```ts
// After
import type { Appearance } from './component.options.js';

/**
 * @presentational {Appearance | undefined} appearance - Controls the visual appearance.
 */
export class Example extends BaseExample {}
```

For a boolean presence attribute, use the HTML name and `{boolean}`:

```ts
/**
 * @presentational {boolean} icon-only - Displays only an icon.
 */
```

Do not combine the migration with unrelated component refactors.

## Phase 4: Update Tests Deliberately

Delete tests whose expected contract was intentionally removed, including assertions that:

- An HTML attribute synchronizes to a same-named JavaScript property.
- Property assignment reflects to the HTML attribute.
- A deleted change callback creates a redundant presentation-only custom state.

Remove imports used only by those tests.

Keep tests for:

- Behavioral attributes that remain runtime-backed.
- Native or inherited properties still supported by the component.
- Delegation to internal controls.
- Accessibility, forms, focus, keyboard behavior, events, and template changes.
- Existing visual coverage of the affected appearances or states.

Do not replace deleted property tests with brittle assertions merely to preserve test count. Add a
new functional test only when it verifies a stable public behavior not already covered. Prefer
existing visual tests for styling parity.

## Phase 5: Regenerate Public Metadata

Run the repository's component-level CEM generation command. Do not hand-edit generated
manifests.

Verify each migrated attribute:

- Still exists in the component's `attributes` array.
- Retains its name, description, type, expanded values, and default where applicable.
- Has no field link such as `fieldName`.
- Has no corresponding class field member.

If the repository generates an aggregate or suite manifest, regenerate it with the established
command and verify the same contract there. Check documentation or Storybook consumers that join
attributes to fields; standalone attributes must remain visible and controllable.

## Phase 6: Validate Immediately

After the first component edit, run the cheapest focused executable check before migrating more
components. Use the target repository's commands in this order when available:

1. Component CEM generation.
2. Component typecheck or build.
3. Component functional tests.
4. Existing visual tests for affected appearances.
5. Aggregate manifest generation.
6. Bundle-size measurement.

Then run targeted searches to confirm:

- No stale property references or assignments remain for migrated attributes.
- No property-synchronization tests remain.
- No unused decorator, converter, helper, or enum imports remain.
- Behavioral attributes in the same class were not changed.

For a batch migration, complete and validate one representative component first. Continue in
small groups, rerunning focused validation after each group. Finish with the repository's normal
broader checks for the affected scope.

## Review Checklist

- [ ] CSS is the only implementation consumer of every migrated attribute.
- [ ] Every supported state still has an attribute-selector styling path.
- [ ] Behavioral and inherited attributes were left runtime-backed.
- [ ] The class-level `@presentational` tags preserve public metadata.
- [ ] Fields, decorators, redundant callbacks, and unused imports were removed.
- [ ] Property API tests were removed without deleting behavioral coverage.
- [ ] Component and aggregate manifests were regenerated, not hand-edited.
- [ ] Generated attributes remain documented without field members.
- [ ] Focused builds and tests pass.
- [ ] The final summary names migrated attributes, intentionally retained attributes, validation
      run, and any unresolved consumer property assignments.

## Stop Conditions

Stop and report the evidence instead of guessing when:

- Ownership is ambiguous across a base class and subclass.
- A callback mixes visual mirroring with behavioral side effects.
- CSS does not directly cover every state that the callback previously represented.
- Repository-wide usage shows supported property assignment that has no migration plan.
- CEM generation cannot preserve an attribute without a field.
- Focused validation shows a styling, accessibility, form, or interaction regression.

Do not claim runtime performance improvements unless the target repository has a reliable
benchmark. Bundle-size changes may be measured independently.
