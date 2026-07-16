---
name: migrate-fluent-wc-3
description: 'Migrate a component that builds on Fluent Web Components (extending its base classes, options, or templates from @fluentui/web-components) up to Fluent Web Components 3.x — which requires upgrading its FAST Element runtime from 2.x to 3.x at the same time. Use for Fluent packages and design systems that wrap them when a package still imports @microsoft/fast-html, calls RenderableFASTElement, defineAsync(), or compose(), or sets templateOptions: "defer-and-hydrate".'
argument-hint: '[package-or-path]'
allowed-tools: Bash Read Edit Grep Glob
---

# Migrate Fluent Web Components–based components to Fluent v3

Move a component that **builds on Fluent Web Components** — extending its base
classes, or reusing its options and templates from `@fluentui/web-components` — up
to **Fluent Web Components 3.x**. Fluent v3 runs on **FAST Element 3.x**, so the
Fluent upgrade _requires_ migrating the FAST Element runtime from 2.x in the same
move. This skill covers both halves of that single step.

It applies to any package layered on Fluent Web Components — the Fluent packages
themselves, and design systems that wrap them (for example, ones that re-export
Fluent base classes under their own tag prefix). Reach for it when code predates
the v3 upgrade: a feature branch cut earlier, or a component copied from an older
template.

## Authoritative references

- **FAST 3.x migration guide** — the breaking-change list this skill distills.
  Package guide: <https://github.com/microsoft/fast/blob/main/packages/fast-element/docs/migration/fast-element-3.md>.
  In a FAST checkout it lives at `packages/fast-element/docs/migration/fast-element-3.md`,
  with a narrative version on the [FAST documentation site](https://fast.design/docs/3.x/migration-guide/core/).
- **Fluent Web Components 3.x** — a reference implementation already on these
  conventions. When unsure what "migrated" looks like, read a component such as
  `button` in `@fluentui/web-components` (`src/button/*.ts`): its `define.ts`,
  `definition.ts`, and `definition-async.ts` are the target shape.

## When to use — legacy markers

The target is a component built on Fluent Web Components (or a design system that
wraps them). Migrate it if its source still contains **any** of these pre-3
markers:

- A dependency on `@fluentui/web-components` at a pre-3 range (e.g. `3.0.0-rc.*`)
- Imports from `@microsoft/fast-html` (e.g. `RenderableFASTElement`, `TemplateElement`)
- `RenderableFASTElement(X).defineAsync(...)` or any `defineAsync()` / `composeAsync()`
- `templateOptions: "defer-and-hydrate"` (or any `templateOptions`)
- `X.compose({ ... })`
- A peer/dependency on `@microsoft/fast-element@^2.x` or any `@microsoft/fast-html`

If none appear, the package is already on 3.x.

### Detect across a repo

Run from the repo root; adjust the globs to your source layout:

```sh
grep -rlE "fast-html|RenderableFASTElement|defer-and-hydrate|templateOptions|defineAsync|composeAsync|\.compose\(" \
  --include="*.ts" . 2>/dev/null | grep -v node_modules | sort -u
```

## The core transforms (framework level)

These are the FAST Element 3.x changes that Fluent v3 requires — straight from the
FAST 3.x migration guide and independent of any folder structure. Names below are
placeholders: `MyElement` is the element class, `my-element` the tag.

### 1. Dependencies

- `@fluentui/web-components`: any pre-3 range (e.g. `3.0.0-rc.*`) → `^3.0.0`. This
  is the headline bump; the FAST changes below follow from it.
- `@microsoft/fast-element`: `^2.x` → `^3.0.0` — the runtime Fluent v3 runs on.
- Remove `@microsoft/fast-html`. Its declarative APIs moved to FAST Element path
  exports (see transform 5).

### 2. `RenderableFASTElement` → `define()`

`RenderableFASTElement` (from `@microsoft/fast-html`) was removed; components
extend `FASTElement` and register directly.

```diff
-import { RenderableFASTElement } from "@microsoft/fast-html";
-
-RenderableFASTElement(MyElement).defineAsync({
-    name: "my-element",
-    templateOptions: "defer-and-hydrate",
-});
+MyElement.define({
+    name: "my-element",
+    template: declarativeTemplate(),
+});
```

### 3. `templateOptions: "defer-and-hydrate"` → `template: declarativeTemplate()`

`TemplateOptions` and `templateOptions` were removed. When declarative markup
supplies the template (SSR / deferred hydration), use `declarativeTemplate()`.

```diff
+import { declarativeTemplate } from "@microsoft/fast-element/declarative.js";
+
 export const definition = {
     name: "my-element",
-    templateOptions: "defer-and-hydrate",
+    template: declarativeTemplate(),
 };
```

The internal `<f-template>` element is defined automatically — no manual
`TemplateElement.define(...)` is needed.

### 4. `compose()` → `define()`

`FASTElement.compose()` (and `composeAsync()`) were removed. Where code composed
then immediately registered, call `define()` directly:

```diff
-MyElement.compose({
-    name: "my-element",
-    template,
-    styles,
-}).define();
+MyElement.define({
+    name: "my-element",
+    template,
+    styles,
+});
```

`define()` returns a `Promise` that resolves immediately for concrete templates,
and after matching declarative markup arrives for `declarativeTemplate()`. Awaiting
the promise is optional; the element is defined as soon as the promise resolves.

### 5. Declarative-HTML import paths

```diff
-import { TemplateElement } from "@microsoft/fast-html";
-import { deepMerge } from "@microsoft/fast-html/utilities.js";
+import { declarativeTemplate } from "@microsoft/fast-element/declarative.js";
+import { deepMerge } from "@microsoft/fast-element/declarative-utilities.js";
```

Other v3 import moves (attribute/observer maps, hydration, flat directive paths,
explicit `enableDebug()` / `enableHydration()`) are listed in the migration
guide — apply the ones your package actually imports. Standard authoring imports
(`FASTElement`, `attr`, `observable`, `html`, `ref`, `css`, `when`, `repeat`,
`slotted`) still come from `@microsoft/fast-element` and need no change.

## Split define / definition modules (Fluent Web Components layout)

Fluent Web Components — and design systems built on it — split registration
across small modules per component. If your package uses this layout, the
transforms above land in specific files, plus one that is easy to miss. Skip this
section for a single-file component.

Typical files: `define.ts` / `define-async.ts` (side-effect registration),
`<name>.definition.ts` / `<name>.definition-async.ts` (definition objects), and a
client-side-rendering (CSR) test entry.

**Definition objects** become plain `PartialFASTElementDefinition` values (no
`compose()`), and a design-system registry moves _onto_ the object if the package uses one:

```diff
-import { MyElement } from "./my-element.js";
+import { DesignSystem } from "<your-design-system>";
+import type { PartialFASTElementDefinition } from "@microsoft/fast-element";
 import { tagName } from "./my-element.options.js";
 import { styles } from "./my-element.styles.js";
 import { template } from "./my-element.template.js";

-export const definition = MyElement.compose({
+export const definition: PartialFASTElementDefinition = {
     name: tagName,
+    registry: DesignSystem.registry,
     styles,
     template,
-});
+};
```

The async definition uses `declarativeTemplate()` (transform 3). Fluent imports
the type alongside it:
`import { declarativeTemplate, type PartialFASTElementDefinition } from "@microsoft/fast-element/declarative.js";`.

**Side-effect registration** moves from the definition to the class:

```diff
-import { DesignSystem } from "<your-design-system>";
-import { definition } from "./my-element.definition.js";
-
-definition.define(DesignSystem.registry);
+import { definition } from "./my-element.definition.js";
+import { MyElement } from "./my-element.js";
+
+MyElement.define(definition);
```

**CSR test entry (easy to miss):** any harness bootstrap that previously called
`definition.define(registry)` must switch to the side-effect import — the plain
`definition` object no longer has a `.define()` method.

```diff
-import { DesignSystem } from "<your-design-system>";
-import { definition } from "<pkg>/definition.js";
-
-definition.define(DesignSystem.registry);
+import "<pkg>/define.js";
```

> Miss this one and the browser throws (the plain `definition` object has no
> `.define` method), so the element never gets defined and CSR functional tests
> time out waiting for it — while SSR tests would still pass because they follow
> a different code path.

## What does not change

- Element class, template, styles, and options modules — no source edits for
  standard `FASTElement` / `attr` / `observable` / `html` / `ref` usage.
- Server-render harness entries that already import the `define-async` side
  effect — verify, but expect no edit.
- README / doc snippets are often stale repo-wide; keep a package consistent with
  its siblings rather than fixing one in isolation.

## Validate

Rebuild (regenerates any generated artifacts such as a custom-elements manifest),
then run the package's tests — both client-side and server-side rendering if the
package tests both:

```sh
# commands vary by repo; use whatever the package defines
<build command for the package>
<test command for the package>
```

A clean migration builds without type errors and passes all functional + SSR
tests.

## Acceptance checklist

- [ ] Detection grep returns nothing for the package.
- [ ] `@microsoft/fast-html` is gone from imports and dependencies.
- [ ] No `compose()`, `defineAsync()`, `composeAsync()`, or `templateOptions` remain.
- [ ] Deferred/SSR templates use `template: declarativeTemplate()`.
- [ ] Package builds and its tests pass (client + SSR where applicable).
