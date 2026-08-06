# S5 adjudication — `recipes` and `theme-designer`: what this fork's documentation teaches

**Date:** 2026-07-29
**Branch:** `styling/tailwind-css-modules`
**Gates:** batch S5 (specials-triage §8). Also settles triage seam #3 and seam #4.
**Authority:** `reports/specials-triage.md` §4 B2/B3, §7 · `reports/DECISIONS.md` D1, D2 (+ am. 2/3/4/5), D4 (+ amendments), D7-revision, D13, D15, D16.
**Depends on:** S0 — **landed.** Both packages' storybooks inherit it without per-package work:
`.storybook/main.js:71-72` registers `cssModulesRule` + `tailwindThemeRule`, `.storybook/preview.js:4`
imports `scripts/storybook/src/tailwind-theme.css`, and both previews spread the root
(`recipes/.storybook/preview.js:1`, `theme-designer/.storybook/preview.js:1`).

**Verdicts**

| Package          | Option                                                                                            | One line                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `recipes`        | **(b) rewrite to teach the new contract**                                                         | It is live public documentation, and what it teaches is a symbol D7-revision removes. |
| `theme-designer` | **(a) convert as an app** — at `fui.components.l4`, using `.module.css`, **not** inline utilities | Option (c)'s premise is false: `@griffel/react` stays a repo dependency regardless.   |

---

## Part A — `recipes`

### A.1 The shape is even more docs-only than the triage said

- **The package exports nothing.** `src/index.ts` is literally `export {};`. There is no library
  surface at all — not a small one, none.
- `package.json`: `private: true`, `version: "0.0.0"`, `sideEffects: false`, `exports` map with no
  `./styles.css`. `project.json` tags `type:stories`, `sourceRoot` is `src/` with no `library/`
  subfolder. `dist/styles.css` is not merely unbuilt; there is no build target that could produce it.

### A.2 But it is publicly shipped, and the triage did not establish that

The triage flagged `recipes/.storybook/main.js:5` as globbing a non-existent `stories/` directory
(seam #4) and left it as an unrelated curiosity. It is not unrelated — it is the reason the package
_looks_ dead while its content is live.

- Its **own** storybook renders nothing of its own: `main.js:5` globs `'../stories/**/*.mdx'` and
  `'../stories/**/index.stories.@(ts|tsx)'`, and there is no `stories/` directory.
- The **public docsite** renders it anyway. `apps/public-docsite-v9/package.json:36` declares
  `"@fluentui/recipes": "*"`, and `getPackageStoriesGlob` walks the docsite's dependencies
  (`scripts/storybook/src/utils.js:241-243`). For a package with neither a `<name>-stories` sibling
  project (`:261-266`) nor a `stories/` folder (`:268-273`), it falls through to
  `<pkgRoot>/src/**/@(index.stories.@(ts|tsx)|*.mdx)` (`:258`, `:275`).

So `recipes/src/recipes/media-object/MediaObject.mdx` **is** rendered in the public docsite, as
`Concepts/Recipes/Media Object` (`MediaObject.mdx:7`). This is not dormant code — it is the
publicly-shipped answer to "how do I style things in Fluent".

### A.3 The teaching material is the prose, not the styles files

This is the finding that decides the option. The two `.styles.ts` files are a small part; the
substance is hand-written code in the MDX, which no mechanical conversion would touch:

| `MediaObject.mdx` | Content                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `:57-68`          | `makeStyles({ parent: { display: 'flex', flexDirection: 'row' }, textContainer: {…} })`            |
| `:75`             | `import { Text, makeStyles } from '@fluentui/react-components';`                                   |
| `:116-123`        | `makeStyles({ parent: { display: 'grid', gridAutoFlow: 'column' } })`                              |
| `:129-136`        | `makeStyles({ media: { gridRowStart: 'span 4' } })`                                                |
| `:143`            | `import { Text, makeStyles } from '@fluentui/react-components';`                                   |
| `:163-170`        | `makeStyles({ parent: { gridTemplateColumns: 'max-content [middle] auto' } })`                     |
| `:176-186`        | `makeStyles({ media: { gridColumnEnd: 'middle' }, text: { gridColumnStart: 'middle' } })`          |
| `:193`            | `import { Text, makeStyles } from '@fluentui/react-components';`                                   |
| `:55`, `:114`     | prose: _"as shown in the `makeStyles` call below"_, _"Resulting in a `makeStyles` call like this"_ |

Converting only the runtime files (`MediaObjectStyles.styles.ts`, `MediaObject.tsx:3,23,29,48,61-62`,
`templates/Example.styles.ts`, `Example.tsx:4,13`) produces the **worst** available state: rendered
examples on CSS Modules, the code fences beside them teaching Griffel. That is a documented
mismatch shipped to the public docsite.

### A.4 Adjudication

**(a) leave as-is permanently — rejected.** The argument for (a) is "docs lag the library, that is
normal". It does not hold here, for one specific reason: the symbol the recipe teaches is
`makeStyles` imported from `@fluentui/react-components`, and **D7-revision moved the suite's Griffel
re-exports into this migration's breaking change** ("Griffel symbol re-exports … are part of this
migration's breaking change, not deferred to a later major"). Under (a), this fork's only public
styling recipe instructs consumers to import a symbol this fork removes. That is not stale docs;
that is docs that generate code which will not compile.

**(c) retire — rejected, but it is the close call.** `export {}`, `private`, `0.0.0`, a broken
self-glob, and one recipe make a real case for deletion. Against it: it is the docsite's only
recipe-shaped page and the `TemplateExample` frame (`src/templates/`) is the reusable chrome any
future recipe would sit in. Re-pointing costs one MDX rewrite and two small module conversions;
rebuilding the frame later costs more. Retire is available if the user prefers a smaller surface —
it is a scope preference, not a correctness question, and it should be an explicit call rather than
a default.

**(b) rewrite to teach the new contract — recommended.** This fork's shipped styling architecture is
Tailwind-flavored CSS Modules + the `@layer fui.*` family (D2 am. 3/4) + per-slot `className` props

- `group/fui-*` markers + `data-*` variants (D15, D16.1). The docsite is the only artifact that
  tells a consumer any of that. The recipe already teaches the part that matters — flex-vs-grid
  layout, `grid-auto-flow: column`, `grid-row-start: span 4`, the `[middle]` line name — and none of
  that is Griffel-specific. Only the authoring wrapper changes.

### A.5 Specification

1. **`src/templates/Example.styles.ts` + `Example.tsx` → `Example.module.css` + `clsx`.**
   Layer **`fui.components.l4`** (D2 am. 2: "application implementation/page/feature-specific
   styling") — this is docs chrome, it styles no Fluent component's slots. Notes:
   `tokens.colorNeutralStroke1` (`Example.styles.ts:1,5`) becomes literal
   `var(--colorNeutralStroke1)` per D4. `padding: '30px'`, `margin: '6px'`, `borderRadius: '16px'`
   match no spacing step → numeric utilities (`p-30`, `m-6`) per D4 amendment §3's fallback clause;
   `border-radius` takes an arbitrary value. `mergeClasses` at `Example.tsx:4,13` → `clsx`.
2. **`src/recipes/media-object/code-snippets/MediaObjectStyles.styles.ts` + `MediaObject.tsx` →
   `MediaObject.module.css` + `clsx`.** Same `fui.components.l4`. The six `rowGap`/`columnGap` pairs
   (`:7-8, 22-23, 28-29, 42-43, 48-49, 66-67`) collapse to `gap-*`. Five `mergeClasses` call sites
   (`MediaObject.tsx:23, 29, 48, 61, 62`) → `clsx`.
3. **`MediaObject.mdx` — the actual deliverable.** Rewrite the eight sites in §A.3 into the shipped
   dialect: a `MediaObject.module.css` fence opening with `@reference '#theme';` and the canonical
   `@layer` order statement, and a `.tsx` fence doing
   `import styles from './MediaObject.module.css'` + `clsx`. Keep every word of the layout teaching
   and the _Best practices_ section (`:230-234`) unchanged. Update the two prose references to
   "`makeStyles` call" (`:55`, `:114`).
4. **Fix `recipes/.storybook/main.js:5`** — `'../stories/**'` → `'../src/**'` (both globs). This is
   triage seam #4, it is one line, and it is the only way to verify this batch locally without
   building the whole docsite. Doing it here rather than "later" also means the package's own
   storybook and the docsite finally render the same set.
5. **`package.json`:** `sideEffects: false` → `["**/*.css"]`. **Do not** add a `./styles.css`
   export — there is no build target and no consumer (`export {}`); the modules are only ever
   consumed through the storybook webpack pipeline, which S0 already wires.
6. **Seam #3, folded in here because it is the same decision.**
   `apps/public-docsite-v9/src/Utilities/FocusManagement/useFocusableGroup/{Default,Limited,LimitedTrapFocus}.stories.tsx:8,21`
   teach `createFocusOutlineStyle` from `@fluentui/react-tabster` — documentation _about_ focus
   management, authored in the Griffel factory the migration replaced. Re-point to the shared
   `fui-focus-outline` utility (D6). Bundling it here is not scope creep: these three files are
   `react-tabster`'s last docsite callers, and clearing them is a prerequisite for S6's
   deprecate-and-retire.

---

## Part B — `theme-designer`

### B.1 Correction to the triage — the blocking pattern does not exist

The triage recorded:

> One pattern the cookbook does not cover: `Export/ExportLink.tsx:74` calls `makeStyles({…})` > **inside a component body**. That has no CSS-Modules equivalent and needs a hand-written answer.

**This is wrong, and it was the item that made `theme-designer` look bespoke.** `ExportLink.tsx:15`
opens a template literal — `const content = dedent\`` — which is closed at `:278`. Everything
between is a **string**. `makeStaticStyles`/`makeStyles`/`shorthands`at`:18-20`and the`const useStyles = makeStyles({`at`:74`are text inside it. The string's value is handed to
CodeSandbox as the`example.tsx` file (`:311-316`, via `getParameters`from`codesandbox-import-utils`, `:4`), producing the "Preview theme in CodeSandbox" link (`:334-338`).

There is **no in-render `makeStyles` anywhere in the package.** All real call sites are ordinary
module-scope hooks. The corrected count is **12** live `makeStyles` calls, not 13:

`ColorTokens/AccessibilityList.tsx:29` · `ColorTokens/TokenList.styles.ts:4` ·
`Content/Content.tsx:13` · `Demo/Demo.tsx:36` · `Export/ExportPanel.tsx:25` · `Header/Header.tsx:27` ·
`Nav/Nav.tsx:10` · `Palette/Palette.tsx:15` · `Sidebar/Form.tsx:22` · `Sidebar/Sidebar.tsx:10` ·
`TokenBoxes/TokenBoxes.tsx:18` · `ThemeDesigner.styles.ts:9`

Plus 6 `mergeClasses` composition sites (`Content.tsx:38`, `Demo.tsx:189`, `Header.tsx:64`,
`Nav.tsx:45`, `Palette.tsx:65`, `Sidebar.tsx:26`) and one `makeStaticStyles` (§B.4.3).

The correction relocates the problem rather than removing it: `ExportLink`'s string is _generated
authoring content_ — it hands a user a starter project written in Griffel, exactly the same species
of issue as `recipes`' MDX. §B.4.4 handles it, and handles it differently.

### B.2 Shape

- `private: true`, `version: "9.0.0"`, no `library/` subfolder (`project.json` sourceRoot is
  `packages/react-components/theme-designer/src`), `public/` holding one `favicon.ico`,
  `sideEffects: false`, `exports` map with no `./styles.css`.
- It has its own storybook with `staticDirs: ['../public']` (`.storybook/main.js:6`) globbing
  `'../src/**/*.mdx'` and `'../src/**/index.stories.@(ts|tsx)'` — correct globs, unlike `recipes`.
- **It is excluded from the public docsite.** `apps/public-docsite-v9/.storybook/main.js` lists
  `'@fluentui/theme-designer'` in `excludeStoriesInsertionFromPackages`. Its surface is
  `ThemeDesigner.mdx` plus `ColorTokens.stories.tsx`, `Palette.stories.tsx`, `TokenBoxes.stories.tsx`
  in its own storybook only.
- `ThemeDesigner.mdx` contains **zero** Griffel or `makeStyles` prose — unlike `recipes`, this
  package's docs teach theming, not styling authorship. Nothing to rewrite there.

### B.3 Adjudication

**(c) leave on Griffel — rejected, because its stated premise is false.** The case for (c) is that
it costs only keeping `@griffel/react` as a repo dependency, which Phase 3's cleanup may want gone.
Measured, not assumed:

- **23** `package.json` files in `packages/`, `apps/`, `tools/`, `scripts/` declare `@griffel/react`.
- **23** project trees still import it in source (excluding `node_modules`, `lib`, `dist`).
- `packages/charts/react-charts` alone accounts for **41** source imports — and it does not appear
  in `migration/griffel-to-tailwind/ledger.json` **at all** (88 entries; zero keys matching
  `/chart/i`). It is outside the migration's scope entirely.
- Others outside the specials set that keep importing it: `apps/vr-tests-react-components` (26 —
  the Griffel VR stories D11 retires), `tools/workspace-plugin` (5),
  `packages/react-components/eslint-plugin-react-components` (3),
  `deprecated/react-virtualizer` (3), `react-storybook-addon` (6).

`@griffel/react` remains a repo dependency after every specials batch no matter what
`theme-designer` does. Option (c) buys nothing it claims to buy, and costs having the fork's own
theming tool authored in the system the fork removed.

**(b) minimal conversion, hooks only — rejected.** There is no coherent half-state. Only 2 of the 12
call sites live in a `.styles.ts` (`TokenList.styles.ts`, `ThemeDesigner.styles.ts`); the other 10
are inline in `.tsx`. "Hooks only" converts two files, leaves ten on Griffel, keeps the dependency
and the AOT build step, and produces a diff that is harder to review than the whole thing.

**(a) convert as an app — recommended, with one qualification.** The qualification is that
"inline Tailwind utilities acceptable" should **not** be taken up:

- The D1 `dist/styles.css` contract genuinely does not apply (private, no build target, no
  consumers) — so the _packaging_ freedom the option describes is real.
- But `.module.css` is the path S0 already wired for this storybook, with a stable ident scheme
  shared across build/storybook/jest (`scripts/css-modules/ident.js`, D15.2). Inline
  `className="grid grid-cols-[250px_auto]"` in `.tsx` requires Tailwind's **content scan** over
  `.tsx` sources, which the repo's shared rule does not configure — `cssModulesRule` tests
  `/\.module\.css$/` only (`scripts/storybook/src/rules.js:111`) and `tailwindThemeRule` is
  `include`-scoped to the single theme entry (`:132-138`). Choosing inline utilities means adding a
  scanning configuration that exists nowhere else, for one private app.

Convert to `.module.css` + `clsx`, same as everything else. The freedom the app shape buys is spent
on _packaging_ and _altitude_, not on a second authoring dialect.

### B.4 Specification

1. **12 files → 12 co-located `*.module.css`**, `mergeClasses` → `clsx` at the 6 composition sites
   listed in §B.1. Locals lowercase-kebab (D15.3). Suite imports of `makeStyles` (`Content.tsx:2`,
   `Nav.tsx:2`, `Header.tsx:4`, `AccessibilityList.tsx:9`, `ThemeDesigner.styles.ts:1`) and direct
   `@griffel/react` imports (7 files) all drop out; remove `@griffel/react` from `package.json`
   dependencies.
2. **Altitude: `fui.components.l4` for all of it** — D2 amendment 2's "application
   implementation/page/feature-specific styling". This is the fork's first real `l4` consumer and
   is worth calling out in the PR as the reference example: the l3–l5 headroom is not decorative,
   and an in-repo app using it correctly is the cheapest possible documentation of that.
   **Two exceptions at `fui.components.l2`:** `Header.tsx:64` and `Nav.tsx:45` apply their class to
   `<FluentProvider theme={webDarkTheme} className={…}>` — styling another converted component's
   hook output, which is l2 by definition. (`react-provider` is `validated` in the ledger, so this
   is converted-over-converted; no unlayered block is needed.)
3. **`ThemeDesigner.styles.ts:3-7` `makeStaticStyles` → plain CSS, in a file that already exists.**
   The call targets Storybook's own DOM:
   `{'#storybook-docs .sbdocs-content > div:last-child': { marginBottom: '0px' }}`.
   `.storybook/docs-root-theme-designer.css` already holds exactly this kind of rule
   (`#storybook-docs .sbdocs-wrapper`, `#storybook-docs .sbdocs-content`) and is already imported by
   `.storybook/preview.js:2`. Move the three lines there and delete the `makeStaticStyles` call — no
   new mechanism, no new import. Keep it **unlayered**: the subject is Storybook's DOM, which is
   external unlayered CSS, so D2 amendment 5's authoring rule applies.
4. **`ExportLink.tsx:15-278` — deliberately OUT of scope for this batch; tracked as its own item.**
   Leave the string byte-identical. Three reasons, and the third is the one that matters:
   - It is a docs-authoring change with different validation (does the generated project still build
     on codesandbox.io?), not a conversion.
   - It is not broken. `packageContent` (`:305-307`) pins
     `"@fluentui/react-components":"^9"` — the **published npm** suite, not this fork's build. The
     exported sandbox keeps compiling after the fork removes its Griffel re-exports; it merely
     teaches a dialect this fork no longer ships.
   - Re-authoring it now would teach a public contract the fork's suite has not published yet.
     Open the follow-on for when it has.
     **Record this explicitly** so no one mid-batch "helpfully" ports the string and silently breaks
     the export link — the failure would be an invalid CodeSandbox payload with no local symptom.
5. **`package.json`:** `sideEffects: false` → `["**/*.css"]`. No `./styles.css` export.

---

## Part C — Validation for the batch

Neither package has VR baselines, a `dist/styles.css` contract, or a consumer to break. The gate is
render-correctness in the storybooks S0 unblocked:

1. **`theme-designer`** — its own storybook builds and renders `ThemeDesigner.mdx` plus
   `ColorTokens.stories.tsx`, `Palette.stories.tsx`, `TokenBoxes.stories.tsx` correctly styled.
   Specifically check the grid shell (`ThemeDesigner.styles.ts:9-32` — `grid-template-columns:
250px auto`, `grid-template-rows: 40px auto`), because a silently-empty class map from a
   mis-wired module rule presents exactly as a collapsed layout.
2. **`recipes`** — after the §A.5.4 glob fix, its own storybook renders
   `Concepts/Recipes/Media Object`; **and** the public docsite still renders the same page, because
   that is the shipped path (§A.2). Both, not either.
3. **Class-map sanity, in both**: assert at least one `fuicm-` class reaches the DOM in each
   package. The S0-era failure mode (builder's implicit `/\.css$/` rule swallowing `*.module.css`
   and returning an empty map — `scripts/storybook/src/rules.js:138-145`) is silent and produces an
   unstyled page, which on a docs page can look plausible.
4. **Cache-miss build.** The D2 amendment 5 postmortem applies unchanged: a render check read from a
   replayed nx-cached storybook bundle proves nothing.
5. **Ledger:** flip both to `validated`, and record §B.1's correction against the
   `theme-designer` note ("`makeStyles` inside a render body") so the false blocker does not
   resurface — plus the corrected count of **12** live call sites.

## Part D — Open call for the user

`recipes` option (c) — retire the package outright — is a legitimate scope preference that this
document declines by default but does not foreclose. If the answer is "retire", §A.5 items 1–5
drop and the batch reduces to seam #3 alone (§A.5.6). The choice turns on whether this fork wants a
public recipes surface at all, which is a product call, not a migration call.
