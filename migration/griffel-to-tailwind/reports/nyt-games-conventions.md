# Research: nyt-games-conventions

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

nyt-games styles with Tailwind v4.3.2 + CSS Modules: every `*.module.css` opens with `@reference '#theme'` (a Node `imports` subpath in `package.json`, not a tsconfig path) and wraps rules in `@layer components.l1`/`l2` from a globally declared cascade order `theme, base, components, components.l1..l5, utilities`. Enum style props split two ways — "which look" props (color/shape/variant) become CSS Module class lookups (`styles[color]`), while "which state/scale" props (size) become `data-*` attributes matched by `@custom-variant` selectors. A 95-entry `@custom-variant` catalog in `src/theme/variants.css` normalizes React Aria `data-*` and native pseudo-classes into one `@variant name { … }` vocabulary, every one wrapped in `:where()` so variants add zero specificity and layer order alone decides the cascade. Colors/typography are exposed as custom `@utility` families (`flood-*`, `color-*`, `outline-*`, `type-*`, `weight-*`) built on `--value(--namespace-*, [*])` namespace matching, with `--spacing: calc(1px * var(--base-scale))` making every numeric Tailwind scale value read as px but compute as rem.

## Key facts

- Tailwind 4.3.2 exactly (installed), no tailwind.config.\* file anywhere — all config is CSS-first via @theme/@utility/@custom-variant in src/theme/{index,colors,typography,variants}.css
- '#theme' is a Node subpath import declared in package.json L102-104 ("imports": {"#theme": "./src/theme/index.css"}), NOT a tsconfig path — tsconfig.json L28-32 declares only ~/_, @/_, $/\*
- All 19 _.module.css files begin with `@reference '#theme';` (find src -name '_.module.css' | wc -l → 19; rg -l "@reference '#theme'" -g '\*.css' src | wc -l → 19)
- postcss.config.mjs runs '@tailwindcss/postcss' then '@accelint/postcss-tailwind-css-modules' v1.1.0; the second plugin :global()-wraps group/ and peer/ classes in .module.css files so Tailwind group variants survive CSS Modules hashing (node_modules/@accelint/postcss-tailwind-css-modules/readme.md)
- Layer order declared as first statement of src/theme/index.css L1-9: @layer theme, base, components, components.l1..l5, utilities — 'utilities' last means any Tailwind utility beats any CSS-Module rule
- Layer usage counted via `rg -o --no-filename "@layer components\.l[1-5]" -g '*.css' src | sort | uniq -c`: l1 = 17, l2 = 5, l3/l4/l5 = 0 (declared as headroom only)
- l1 = design-system base components (src/components/\*); l2 = rules that override a consumed l1 component (src/app/@footer/footer.module.css L46 .link overrides src/components/link/link.module.css L4 .link; sidenav.module.css L246-328; game-card.module.css is entirely l2)
- Look-enums (color/shape/variant) map to CSS Module classes via styles[color] (src/components/button/index.tsx:25-32); scale/state enums (size) map to data-\* attributes (button/index.tsx:33 data-size={size}, badge/index.tsx:26, link/index.tsx:49)
- Domain identity enums also use data-\* + group variants: game-card/index.tsx:34 data-game={id} on a group/card element, consumed as @variant group-game-connections/card in game-card.module.css:11
- Boolean state data-attrs are written `value || null` so React omits them entirely (word/write.tsx:231,245,246) — required because the variants are attribute-presence selectors
- src/theme/variants.css holds exactly 95 @custom-variant declarations and is the only file with any (rg "@custom-variant" -g '\*.css' src --no-filename | wc -l → 95; rg -l → only variants.css)
- Every one of the 95 variants wraps its matcher in :where() → zero added specificity, so @layer components.lN ordering (not specificity) decides overrides; hover/focus/pressed/disabled deliberately shadow Tailwind's built-ins with the zero-specificity forms
- Variant authoring templates: self-state `@custom-variant <name> (&:where(<matchers>));` (88 of 95) and ancestor-scoped `@custom-variant <name> (:where([data-x="y"]) &);` (7, device-\* only). Dual-source variants union RAC data-attr + native attr + native pseudo, e.g. `invalid (&:where([invalid], [data-invalid], :invalid))`
- 23 @utility declarations total: 3 in colors.css (color-_, flood-_, outline-_) and 20 in typography.css (weight-_ plus 19 type-\*)
- flood-_/color-_/outline-_ use `--value(--ns-_, …, [*])` namespace fallthrough with different first namespaces: color-→--fg-_, flood-→--bg-_, outline-→--outline-_; all then try --accent-_, --game-_, --neutral-_, then arbitrary [*]
- Modifier syntax `/N` on those utilities is opacity percent: `--flood-opacity: calc(--modifier(integer) / 100)` then `rgb(from var(--flood-value) r g b / var(--flood-opacity, alpha))` — omitted modifier falls back to source alpha (colors.css:87-94)
- `--color-*: initial;` at colors.css:2 deletes Tailwind's entire default palette; flood-_/color-_ are the only way to set background/text color
- --spacing: calc(1px _ var(--base-scale)) with --base-scale: calc(1rem / 16px) (index.css:18,28) makes numeric scale values px-named but rem-computed (p-40 → 40 × 0.0625rem = 2.5rem); --spacing-_: initial removes the default 0.25rem scale, so ANY integer works (max-w-890, min-h-320, size-120, w-143, h-0.75)
- tracking-_, leading-_, text-_ are Tailwind built-ins re-keyed by `--tracking-_: initial`/`--leading-_: initial`/`--text-_: initial` plus custom values in typography.css L16-58 — they are NOT custom @utility declarations
- type-\* utilities are static @apply bundles named type-<role>-<pxSize> across 5 roles (heading, subheading, feature, display, content), typography.css:65-139
- Dark/light is a single variant pair (variants.css:94-95) matching BOTH .dark/.light classes and [data-theme] on self or any ancestor; app runtime uses data-theme (layout.tsx:52, features/theme/client.tsx:29-36), Storybook uses the class (.storybook/preview.tsx:31-37, 56-57)
- Theme switching happens in the token layer via light-dark() (colors.css:44-72), enabled by `color-scheme: dark/light` set on `*` in @layer base (index.css:50-56) — component CSS contains essentially no dark:/light: variants
- clsx order is always: literal 'group/<name>' → styles.<base> → styles[<enum>]… → className last (button/index.tsx:25-32 and all siblings); the override actually wins by layer order, not class order
- Composite components expose a `classNames` object (one key per internal element) instead of className, with className Omit'ed from the public type (game-card/types.ts:7-23) and every element wired as clsx(styles.x, classNames?.x) — AGENTS.md:165-172
- All five design-system components share the same 5-file layout (index.tsx, types.ts, constants.ts, context.tsx, <name>.module.css) with no barrel exports; Icon has no constants.ts (no style enums) and Link reuses ButtonStyleDefaults + button.module.css (link/index.tsx:8-9)
- useContextProps pattern is uniform: `[props, ref] = useContextProps(props, ref, XContext)` first line, then `const { … } = { ...XStyleDefaults, ...props }` — precedence defaults → context → local props; no forwardRef anywhere (React 19)
- group names are the component's own lowercase name: group/badge, group/button, group/card, group/link, plus app-level group/disclosure, group/field, group/word, group/letter (rg -o "group/[a-z-]+" -g '\*.tsx' src)
- A declared enum value may have no matching CSS class — card/types.ts:4 declares variant 'flat' but card.module.css defines only .aloft and .shell; clsx drops the undefined
- !important is used exactly once in the whole repo, at index.css:48 (`@apply overflow-visible!`) for a React Aria modal workaround — never as an override mechanism
- prettier.config.ts sorts classes inside className, classNames, @apply, and clsx() using tailwindStylesheet: './src/theme/index.css'; biome.json:118-123 disables CSS formatting but enables cssModules parsing

## Risks

- `--color-*: initial` (colors.css:2) and `--spacing-*: initial` (index.css:27) delete Tailwind's default palette and spacing scale entirely. Fluent UI's Griffel styles reference ~hundreds of Fluent design tokens (colorNeutralBackground1 etc.). A Fluent port must decide: (a) register every Fluent token into an @theme namespace so flood-_/color-_ can resolve them, or (b) abandon the flood-_/color-_ utilities and use flood-(--colorNeutralBackground1) CSS-variable-shorthand everywhere. Option (a) requires renaming Fluent's camelCase token names into kebab-case namespaced names, which breaks 1:1 token traceability.
- The --spacing: calc(1px \* var(--base-scale)) trick makes every numeric utility rem-based. Fluent UI Griffel styles are overwhelmingly authored in raw px. Any class like `p-12` will emit 0.75rem, not 12px. If the Fluent components must be pixel-identical at non-default root font sizes, this is a behavioral change, not a mechanical one. Either --base-scale must be redefined so --spacing = 1px, or every value must be written as plain CSS px after @apply.
- Only 5 layer slots exist (components.l1..l5) and nyt-games uses just 2. Fluent UI v9 has far deeper composition (a Menu inside a Popover inside a Dialog, plus slot-level overrides and `styles` prop escape hatches). Mapping Griffel's mergeClasses last-wins-per-property semantics onto a fixed 5-rank layer ladder is not a 1:1 translation — Griffel dedupes at the CSS-property level, layers dedupe at the rule level. Two Griffel rules setting different properties merge; two CSS-module rules in the same layer do not resolve the same way.
- Griffel's mergeClasses() guarantees that a later-merged class always overrides an earlier one property-by-property regardless of authoring order. The nyt-games convention has no equivalent — it relies on the author picking the right lN. Every Fluent component that currently accepts `className` and relies on mergeClasses ordering (documented in react-components/react-conformance-griffel/README.md as 'mergeClasses() classname ordering') will need a hand-assigned layer, and conformance tests that assert mergeClasses behavior will need replacing.
- The `group/<name>` pattern REQUIRES @accelint/postcss-tailwind-css-modules in the PostCSS chain, and it only processes files matching \*.module.css. Fluent UI's build is not a single Next.js app — it is a monorepo with per-package builds (Jest, Webpack, Storybook, api-extractor). Every build path that compiles CSS Modules must add this plugin after Tailwind, or group variants silently no-op (no error, just missing styles).
- `@reference '#theme'` resolves via Node subpath imports from package.json. In a pnpm monorepo, each package has its own package.json, so either every package needs the `imports` field pointing at the shared theme, or the alias must be re-implemented per bundler. Nothing in tsconfig helps — TypeScript never sees this specifier.
- The 95-variant catalog is written against React Aria Components' data-attribute contract (data-hovered, data-pressed, data-focus-visible, data-selected, data-entering/exiting). Fluent UI v9 does NOT use React Aria; it uses its own state model and mostly native pseudo-classes plus its own data attributes. The dual-source variants (`&:where([data-hovered], :hover)`) will half-apply — the native half fires, the RAC half never does. The catalog must be re-derived from Fluent's actual attribute surface or the RAC halves stripped.
- `light-dark()` requires `color-scheme` to be set and requires the browser to support it. Fluent UI's theming is a JS-driven FluentProvider that writes CSS custom properties into a scoped class, and supports arbitrary user-supplied themes (not just dark/light) plus nested/partial theme scoping. The nyt-games two-variant light-dark() model cannot express Fluent's arbitrary-theme or nested-theme cases — preserving 'the Fluent theme as CSS custom properties' means the light-dark() layer must be dropped entirely, which in turn means the `dark`/`light` custom variants and the `color-scheme` base rule lose their purpose.
- AGENTS.md is internally inconsistent with the code in two places: it says to use `@reference "@/theme/index.css"` (real files use '#theme') and says never to use bracket arbitrary values while game-card.module.css:5 uses the exact forbidden example `max-w-[280px]`. Using AGENTS.md as the migration spec without reading the actual files will produce non-compiling CSS (the @/ path does not resolve in CSS).
- The `classNames` object convention (Omit className from the public type) is a breaking public-API change for any Fluent component that currently accepts className. Fluent v9's slot system already has its own override channel (slot props / `className` per slot); adopting nyt-games' classNames object would be a second, redundant mechanism unless the migration explicitly maps Fluent slots to classNames keys.
- styles[enumValue] indexing is unchecked — card/types.ts declares a 'flat' variant with no corresponding CSS rule and nothing fails. Ported Fluent components with large enum surfaces (Button appearance × shape × size × icon-position, etc.) will silently drop styles for any enum value whose class was missed during conversion. There is no test in nyt-games that asserts every enum value resolves to a defined class (badge/index.test.tsx only checks data-size).
- No CSS-in-JS means no runtime-computed styles. Any Griffel usage that computes values from props/tokens at runtime (rather than selecting among a fixed set) has no direct CSS-Modules equivalent and must become an inline CSS custom property on the element — a pattern that does not appear anywhere in nyt-games, so there is no established convention to copy.

## Full report

# nyt-games Styling Convention — Executable Specification

All paths repo-relative to `C:/Users/ArrayKnight/Code/nyt-games`.

---

## 1. Tailwind version, PostCSS setup, and the `#theme` alias

### Versions (resolved from installed `node_modules`, not the range)

Command: `node -p "['tailwindcss','@tailwindcss/postcss','@tailwindcss/vite','@accelint/postcss-tailwind-css-modules','clsx','prettier-plugin-tailwindcss'].map(p=>p+' '+require('./node_modules/'+p+'/package.json').version).join('\n')"`

| package                                  | installed | declared in `package.json`      |
| ---------------------------------------- | --------- | ------------------------------- |
| `tailwindcss`                            | 4.3.2     | `^4.3.2` (devDependencies, L92) |
| `@tailwindcss/postcss`                   | 4.3.2     | `^4.3.2` (L70)                  |
| `@tailwindcss/vite`                      | 4.3.2     | `^4.3.2` (L71)                  |
| `@accelint/postcss-tailwind-css-modules` | 1.1.0     | `^1.1.0` (L56)                  |
| `clsx`                                   | 2.1.1     | `^2.1.1` (dependencies, L45)    |
| `prettier-plugin-tailwindcss`            | 0.8.0     | `^0.8.0` (L89)                  |

There is **no `tailwind.config.js`/`.ts`** anywhere in the repo. All configuration is CSS-first (`@theme`, `@utility`, `@custom-variant`).

### PostCSS pipeline (`postcss.config.mjs`, entire file)

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    '@accelint/postcss-tailwind-css-modules': {},
  },
};
```

Order is load-bearing. Per `node_modules/@accelint/postcss-tailwind-css-modules/readme.md` ("Usage → Turbo and Webpack"), the plugin **must come after** the Tailwind PostCSS plugin. Its job: it processes only files ending in `.module.css`, finds Tailwind `group/…` and `peer/…` classes in generated selectors, and wraps them in `:global(…)` so CSS Modules does not hash them. Without it, `group-hover/button` inside a `.module.css` compiles to a hashed `.group\/button` that never matches the literal `group/button` string in JSX.

**Vite/Storybook path differs**: `vite.config.ts` L28 uses `plugins: [react(), tailwindcss(), normalizeVirtualNextImagePaths()]` — the `@tailwindcss/vite` plugin does Tailwind processing there, and `postcss.config.mjs` still applies the accelint plugin. The readme documents exactly this split.

**Next build path**: `next.config.ts` has no PostCSS or CSS config at all — Next picks up `postcss.config.mjs` implicitly. Turbopack rules only handle `*.svg` (L59-69).

### The `#theme` alias

It is a **Node subpath import**, declared in `package.json` L102-104:

```json
"imports": {
  "#theme": "./src/theme/index.css"
}
```

It is **not** in `tsconfig.json` — `tsconfig.json` L28-32 declares only `~/*` → `./*`, `@/*` → `./src/*`, `$/*` → `./src/app/*`. TS never resolves `#theme` because it appears only inside CSS.

Every `.module.css` opens with it. Verified: `find src -name '*.module.css' | wc -l` → **19**; `rg -l "@reference '#theme'" -g '*.css' src | wc -l` → **19**. 100% coverage.

```css
/* src/components/button/button.module.css:1 */
@reference '#theme';
```

`@reference` is Tailwind v4's "make theme vars, utilities and variants available for `@apply`/`@variant` in this file **without emitting any CSS**" directive. The actual stylesheet is emitted exactly once, from `src/app/layout.tsx:12` (`import '@/theme/index.css';`) and `.storybook/preview.tsx:15` (same import).

Note the drift: `AGENTS.md:264` still says _"All CSS Module files must include `@reference "@/theme/index.css"`"_ — every real file uses `@reference '#theme'` instead (`AGENTS.md:248` and `:284` code samples are correct; the prose bullet is stale).

Prettier is configured to understand this (`prettier.config.ts`):

```ts
plugins: ['prettier-plugin-tailwindcss'],
requirePragma: true,
tailwindAttributes: ['className', 'classNames', '@apply'],
tailwindFunctions: ['clsx'],
tailwindStylesheet: './src/theme/index.css',
overrides: [{ files: ['*.css','*.module.css','*.mdx'], options: { requirePragma: false, singleQuote: true } }],
```

So class-order sorting applies inside `className`, `classNames`, `@apply`, and `clsx(...)`. Biome does **not** format CSS (`biome.json:118-121` `css.formatter.enabled: false`) but does parse CSS Modules (`biome.json:122-123` `css.parser.cssModules: true`).

---

## 2. The `@layer` scheme

Declared once, as the **first statement** of `src/theme/index.css` (L1-9), before `@import 'tailwindcss'`:

```css
@layer theme,
  base,
  components,
  components.l1,
  components.l2,
  components.l3,
  components.l4,
  components.l5,
  utilities;
```

Then L11-15:

```css
@import 'tailwindcss';

@import './colors.css';
@import './typography.css';
@import './variants.css';
```

### Semantics

- Layer order is document-global and established by that first `@layer` statement. Later layers win over earlier ones **regardless of selector specificity**.
- `theme` / `base` / `components` / `utilities` are Tailwind v4's own layers; this file only _pre-orders_ them and inserts `components.l1..l5` as sublayers of `components`.
- `utilities` is last → **any Tailwind utility class always beats any CSS-Module rule**, no matter which `lN` layer the module rule sits in. This is the mechanism that makes consumer `className="…"` overrides win (see §7).
- `components.lN` is the "component cascade rank": higher N overrides lower N.

### Rule for choosing N (`AGENTS.md:265-269`)

> Wrap styles in appropriate `@layer components.lN` where N is determined by cascade priority: use a higher layer number when you need to override styles from lower layers. Base component library uses `l1` — check existing components to see their layer. App-level components typically use `l2` or higher to override base components. When in doubt, check the layer of components you're consuming and use a higher number.

### Actual usage

Command: `rg -o --no-filename "@layer components\.l[1-5]" -g '*.css' src | sort | uniq -c`

- `components.l1` — **17** occurrences
- `components.l2` — **5** occurrences
- `components.l3/l4/l5` — **0** occurrences in any module (`rg -c "components\.l[345]" -g '*.css' src` matches only the 3 declaration lines in `src/theme/index.css`). They exist as pre-declared headroom.

Per-file (`rg -n "@layer" -g '*.module.css' src`):

| file                                                           | layers              |
| -------------------------------------------------------------- | ------------------- |
| `src/components/button/button.module.css`                      | l1                  |
| `src/components/badge/badge.module.css`                        | l1                  |
| `src/components/card/card.module.css`                          | l1                  |
| `src/components/icon/icon.module.css`                          | l1                  |
| `src/components/link/link.module.css`                          | l1                  |
| `src/features/theme/theme.module.css`                          | l1                  |
| `src/app/layout.module.css`                                    | l1                  |
| `src/app/landing.module.css`                                   | l1                  |
| `src/app/_components/header/header.module.css`                 | l1                  |
| `src/app/_components/sidenav/sidenav.module.css`               | l1 (L3) + l2 (L246) |
| `src/app/_components/feature-card/feature-card.module.css`     | l1 (L3) + l2 (L41)  |
| `src/app/_components/game-card/game-card.module.css`           | **l2 only** (L3)    |
| `src/app/@footer/footer.module.css`                            | l1 (L3) + l2 (L46)  |
| `src/app/@logo/logo.module.css`                                | l1                  |
| `src/app/@logo/transient.module.css`                           | **l2 only**         |
| `src/app/@identity/_components/overlay.module.css`             | l1                  |
| `src/app/@identity/_components/three-word-combobox.module.css` | l1 (empty block)    |
| `src/app/(games)/_components/landing/landing.module.css`       | l1                  |
| `src/app/(games)/lexekin/_components/word/word.module.css`     | l1                  |

The pattern in practice: a file uses **l1 for its own new elements** and **l2 for rules that must override an `l1` design-system component it consumes**. `src/app/@footer/footer.module.css` is the cleanest illustration — `.footer/.wrapper/.about/.links/.heading/.list/.item` in l1 (L3-44), but `.link` in l2 (L46-49) because it overrides `src/components/link/link.module.css`'s `.link` (l1). Same in `src/app/_components/sidenav/sidenav.module.css`: `.trigger`, `.bar`, `.link` in l2 (L246-328) override `button.module.css` / `link.module.css`. `game-card.module.css` is entirely l2 because every rule (`.card`, `.media`, `.content`, `.icon`) targets Card/CardMedia/CardContent internals.

Note: `@keyframes` blocks are placed **outside** any `@layer` (e.g. `sidenav.module.css:330-346`, `word.module.css:116-144`, `overlay.module.css:35-73`).

---

## 3. Enum props → module classes vs `data-*` attributes

There is a consistent split, visible in all five design-system components.

### Rule A — "which visual treatment" enums become **CSS Module class lookups**

`src/components/button/index.tsx:25-32`:

```tsx
className={clsx(
  'group/button',
  styles.button,
  styles[color],
  styles[shape],
  styles[variant],
  className,
)}
```

`color`, `shape`, `variant` are indexed straight into the module (`styles[color]` → `.primary`/`.subtle`/`.bold`/`.transparent` in `button.module.css:20,32,44,56`).

Same shape in:

- `src/components/badge/index.tsx:25` — `clsx('group/badge', styles.badge, styles[color], className)`
- `src/components/card/index.tsx:25` — `clsx('group/card', styles.card, styles[variant], className)`
- `src/components/link/index.tsx:26-37` — conditional: when `button` is true it borrows `buttonStyles.button/[color]/[shape]/[variant]`, else `linkStyles.link`

### Rule B — "scale / stateful" enums become **`data-*` attributes**

`src/components/button/index.tsx:33` → `data-size={size}`
`src/components/badge/index.tsx:26` → `data-size={size}`
`src/components/link/index.tsx:49` → `data-size={(button && size) || null}`

Matched in CSS via the pre-declared custom variants, never via a module class:

```css
/* src/components/button/button.module.css:71-81 */
@variant size-small {
  @apply px-12 py-8 text-12 tracking-md;
}
@variant size-medium {
  @apply min-w-[100px] p-12 text-12 tracking-md;
}
@variant size-large {
  @apply min-w-[140px] p-12 text-16 tracking-sm;
}
```

`badge.module.css:7-21` nests further: `@variant size-small { … @variant empty { @apply aspect-square h-12 w-12 rounded-full p-0; } }`.

`data-size` is asserted in tests: `src/components/badge/index.test.tsx:11` and `:21` check `getAttribute('data-size')`.

### Rule C — identity/domain enums also become `data-*`, consumed via **group variants**

`src/app/_components/game-card/index.tsx:34` → `data-game={id}` on the `<Card>`, which also carries `group/card`.
`src/app/_components/sidenav/games.tsx:53-55, 79-81` → `className={clsx('group/disclosure', styles.disclosure)} data-game={game.id}`.

Consumed as `@variant group-game-<id>/<groupname>` — `game-card.module.css:11-57` (12 games) and `sidenav.module.css:44-210` (12 games × hover + expanded).

### Rule D — boolean/derived state uses `data-*` set to `value || null`

`src/app/(games)/lexekin/_components/word/write.tsx`:

- L231 `data-invalid={!isValid || null}`
- L245 `data-empty={!item.letter.trim() || null}`
- L246 `data-required={item.id < minLength || null}`

`|| null` is required: React omits the attribute entirely for `null`, and the custom variants are **attribute-presence** selectors (`&:where([data-empty], :empty)`), so `data-empty="false"` would falsely match.

### Rule E — arbitrary/opaque payloads also ride `data-*`

`src/components/icon/index.tsx:27` → `data-mask={mask?.src}`, consumed by a plain attribute selector (not a variant) in `icon.module.css:7-10`:

```css
&[data-mask] {
  background-color: currentColor;
  mask: image-set(attr(data-mask)) no-repeat center / contain;
}
```

### Rule F — a declared enum value may legitimately have **no** class

`src/components/card/types.ts:4` declares `variant?: 'aloft' | 'shell' | 'flat'`, but `card.module.css` defines only `.aloft` (L16) and `.shell` (L20). `styles.flat` is `undefined`; `clsx` drops it. `AGENTS.md:169-171` states this is intentional ("`styles.icon` may be undefined, `clsx` handles this gracefully").

---

## 4. The `@custom-variant` catalog

All 95 live in one file, `src/theme/variants.css`, and nowhere else. Counts:

- `rg "@custom-variant" -g '*.css' src --no-filename | wc -l` → **95**
- `rg -l "@custom-variant" -g '*.css' src` → only `src\theme\variants.css`

### Full list, verbatim, grouped by selector form

**Ancestor form `(:where([attr]) &)` — 7 device variants (L1-7).** These are the only ones where the attribute lives on an _ancestor_ (`<html data-device>`, set at `src/app/layout.tsx:51`):

```
device-desktop   (:where([data-device="desktop"]) &)
device-mobile    (:where([data-device="mobile"]) &)
device-tablet    (:where([data-device="tablet"]) &)
device-console   (:where([data-device="console"]) &)
device-tv        (:where([data-device="smarttv"]) &)
device-wearable  (:where([data-device="wearable"]) &)
device-embedded  (:where([data-device="embedded"]) &)
```

**Self form `(&:where(…))` — everything else (L8-95).**

_Games (L8-21, 14):_ `game-chess`, `game-connections`, `game-crossplay`, `game-crossword`, `game-letter-boxed`, `game-lexekin`, `game-midi`, `game-mini`, `game-pips`, `game-spelling-bee`, `game-strands`, `game-sudoku`, `game-tiles`, `game-wordle` — each `(&:where([data-game="<id>"]))`.

_Space-separated token lists — note `~=` (L22-33, 12):_

```
extend-left|right|top|bottom        (&:where([data-extend~="left"]))     …
placement-left|right|top|bottom     (&:where([data-placement~="left"]))  …
push-left|right|top|bottom          (&:where([data-push~="left"]))       …
```

_Size (L34-38, 5):_ `size-xlarge`, `size-large`, `size-medium`, `size-small`, `size-xsmall` — `(&:where([data-size="…"]))`.

_Type (L39-42, 4):_ `type-literal`, `type-year`, `type-month`, `type-day` — `(&:where([data-type="…"]))`.

_Layout / orientation / selection / resize / sort (L43-54, 12):_ `layout-grid|stack|inline`, `orientation-horizontal|vertical`, `selection-single|multiple` (`[data-selection-mode]`), `resizable-right|left|both` (`[data-resizable-direction]`), `sort-ascending|descending` (`[data-sort-direction]`).

_Capability flags (L55-59, 5):_ `allows-removing`, `allows-sorting`, `allows-dragging`, `has-submenu`, `has-child-items`.

_Dual-source state — the core React Aria bridge (L60-93, 34)._ Each unions the RAC `data-*` attribute, the native HTML attribute, and/or the native pseudo-class:

```
enabled             (&:where(:not([disabled], [data-disabled]), :enabled))
open                (&:where([open], [data-open], :open))
closed              (&:where(:not([open], [data-open], :open)))
expanded            (&:where([expanded], [data-expanded]))
entering            (&:where([data-entering]))
exiting             (&:where([data-exiting]))
indeterminate       (&:where([data-indeterminate], :indeterminate))
placeholder-shown   (&:where([data-placeholder], :placeholder-shown))
current             (&:where([data-current]))
visited             (&:where([data-visited], :visited))
optional            (&:where(:not([required], [data-required]), :optional))
required            (&:where([required], [data-required], :required))
unavailable         (&:where([data-unavailable]))
invalid             (&:where([invalid], [data-invalid], :invalid))
read-only           (&:where([readonly], [data-readonly], input:read-only, select:read-only, textarea:read-only))
outside-month       (&:where([data-outside-month]))
outside-visible-range (&:where([data-outside-visible-range]))
pending             (&:where([data-pending]))
empty               (&:where([data-empty], :empty))
focus-within        (&:where([data-focus-within], :focus-within))
focus-visible-within (&:where(:has([data-focus-visible], :focus-visible)))
hover               (&:where([data-hovered], :hover))
focus               (&:where([data-focused], :focus))
focus-visible       (&:where([data-focus-visible], :focus-visible))
pressed             (&:where([data-pressed], :active))
selected            (&:where([data-selected], :checked))
selection-start     (&:where([data-selection-start]))
selection-end       (&:where([data-selection-end]))
visible             (&:where([data-visible]))
viewable            (&:where([data-viewable]))
dragging            (&:where([data-dragging]))
drop-target         (&:where([data-drop-target]))
resizing            (&:where([data-resizing]))
disabled            (&:where([disabled], [data-disabled], :disabled))
```

_Theme (L94-95, 2):_

```
dark   (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *))
light  (&:where(.light, .light *, [data-theme="light"], [data-theme="light"] *))
```

### The `:where()` specificity strategy

Every single one of the 95 wraps its matcher in `:where(…)`, which has **zero specificity**. Consequences, and why this is the load-bearing design decision:

1. **`hover`, `focus`, `disabled`, `pressed` deliberately shadow Tailwind's built-ins.** Tailwind ships `hover:` as `&:hover` (specificity 0,1,0 added). Here `hover` is `&:where([data-hovered], :hover)` (adds 0,0,0). So `.button` and `.button:where(:hover)` have _identical_ specificity (0,1,0) — the later rule in source order wins within a layer, and a higher layer always wins. This is what makes `@layer components.lN` an actual, reliable priority ladder rather than a specificity fight.

2. **Composability with `group-*`.** Because the variant body is `&:where(…)`, Tailwind can mechanically rewrite it into the group form. `group-game-connections/card` and `group-expanded/disclosure` (`sidenav.module.css:44, 51`) are `group-` + a _custom_ variant name — this works only because the variants are written in the canonical `&:where(...)` shape.

3. **`not-` composition works too:** `group-not-focus-within/field` (`word.module.css:69, 86`) and `group-not-last/disclosure` (`sidenav.module.css:212`).

### Pattern for authoring a new variant

Add one line to `src/theme/variants.css` following the two templates:

- **Self-state (99% of cases)** — `@custom-variant <kebab-name> (&:where(<matchers>));`
  - single data attr: `@custom-variant pending (&:where([data-pending]));`
  - enum on self: `@custom-variant size-large (&:where([data-size="large"]));`
  - token list: `@custom-variant push-top (&:where([data-push~="top"]));`
  - dual-source (RAC + native): `@custom-variant invalid (&:where([invalid], [data-invalid], :invalid));`
  - negation: `@custom-variant closed (&:where(:not([open], [data-open], :open)));`
- **Ancestor-scoped (root/document flags only)** — `@custom-variant <name> (:where([data-x="y"]) &);` — used exclusively for `device-*`.

Naming is `<prop>-<value>` in kebab-case, matching the `data-<prop>="<value>"` pair exactly (`size-large` ↔ `data-size="large"`; `selection-single` ↔ `data-selection-mode="single"` is the one place the variant name is shortened from the attribute name). The file is sorted roughly by conceptual family, not alphabetically, and `dark`/`light` are last.

Consumption inside a module is always the block form, never a class prefix:

```css
.primary {
  @apply flood-primary color-primary outline-primary;
  @variant hover {
    @apply flood-primary-inverse color-primary-inverse;
  }
  @variant pressed {
    @apply flood-tertiary-inverse color-primary-inverse;
  }
}
```

(`button.module.css:20-30`). Nesting variants is normal: `badge.module.css:7-13` nests `empty` inside `size-small`; `sidenav.module.css:44-56` nests `group-hover/disclosure` → `before` inside `group-game-connections/disclosure`.

---

## 5. Custom `@utility` families

23 `@utility` declarations total (`rg "@utility" -g '*.css' src --no-filename | wc -l` → 23): **3 in `src/theme/colors.css`**, **20 in `src/theme/typography.css`** (1 `weight-*` + 19 `type-*`; `rg -c "@utility type-" src/theme/typography.css` → 19).

### 5a. Color utilities (`src/theme/colors.css:80-103`) — the `--value(namespace…, [*])` form

```css
@utility color-* {
  --color-value: --value(--fg- *, --accent- *, --game- *, --neutral- *, [ *]);
  --color-opacity: calc(--modifier(integer) / 100);

  color: rgb(from var(--color-value) r g b / var(--color-opacity, alpha));
}

@utility flood-* {
  --flood-value: --value(--bg- *, --accent- *, --game- *, --neutral- *, [ *]);
  --flood-opacity: calc(--modifier(integer) / 100);

  background-color: rgb(from var(--flood-value) r g b / var(--flood-opacity, alpha));
}

@utility outline-* {
  --outline-value: --value(--outline- *, --accent- *, --game- *, --neutral- *, [ *]);
  --outline-opacity: calc(--modifier(integer) / 100);

  outline-color: rgb(from var(--outline-value) r g b / var(--outline-opacity, alpha));
}
```

Mechanics:

- `--value(--ns-*, …)` tries each theme namespace **in order** against the suffix. `flood-primary` → `--bg-primary` (first namespace hits). `color-primary` → `--fg-primary`. `outline-primary` → `--outline-primary`. So the _same_ suffix means different tokens per utility — that is the point.
- Fallthrough across namespaces: `flood-connections-purple` → `--bg-connections-purple` (miss) → `--accent-…` (miss) → `--game-connections-purple` (hit) (`game-card.module.css:12`). `color-00` → `--neutral-00` (`game-card.module.css:73`). `color-link-blue` → `--accent-link-blue` (`link.module.css:6`). `flood-highlight` → `--accent-highlight` (`word.module.css:65`).
- `[*]` is the arbitrary-value escape hatch: `flood-[transparent]` (`button.module.css:57, 84`), `flood-[#4d88f9]` (`feature-card.module.css:5`).
- CSS-variable shorthand also works: `flood-(--outline-focus)` (`word.module.css:28`), `outline-(--outline-focus)` (`word.module.css:47`), `inset-ring-(--outline-focus)` (`index.css:59`).
- **Modifier = opacity percent**: `--modifier(integer)/100`. `flood-primary/40` (`button.module.css:60`), `flood-primary-inverse/5` and `/10` (`sidenav.module.css:5, 8`), `flood-primary/100` (`sidenav.module.css:17`, `overlay.module.css:17`), `flood-highlight/25` and `/0` (`word.module.css:84, 87`).
- `rgb(from … r g b / var(--x-opacity, alpha))` — when no modifier is given, `--x-opacity` is unset and the fallback `alpha` preserves the source color's own alpha.
- **`--color-*: initial;`** at `colors.css:2` wipes Tailwind's entire default palette, so `bg-red-500`, `text-blue-600` etc. do not exist. `flood-*`/`color-*` are the _only_ way to set background/text color.
- `outline-*` (custom, color) coexists with Tailwind's built-in outline _style/width_ utilities: `button.module.css:17` uses `outline-solid`, `:21` uses `outline-primary`; `word.module.css:25` chains `outline-tertiary outline-dashed`; `index.css:48` uses `outline outline-none`.
- `--shadow-*: initial` + `--shadow-sm/md/lg` (`colors.css:74-77`) redefine shadows as `0 Npx 0 0 rgb(from currentColor r g b / 0.3)` — **currentColor-derived, hard-edged, no blur**.

### 5b. Typography utilities (`src/theme/typography.css`)

One functional utility:

```css
@utility weight-* {
  font-weight: --value(number);
}
```

(`typography.css:61-63`) — `--value(number)` accepts bare numbers, e.g. `weight-700` (`sidenav.module.css:326`).

Then 19 **static, composed** `type-*` utilities, each a pure `@apply` bundle of font-family + size + weight (+ tracking/leading/transform):

```css
@utility type-heading-35 {
  @apply font-heading text-35 weight-700;
}
@utility type-heading-28 {
  @apply font-heading text-28 weight-700;
}
@utility type-heading-22 {
  @apply font-heading text-22 weight-700;
}
@utility type-subheading-18 {
  @apply font-subheading text-18 weight-700;
}
@utility type-subheading-12 {
  @apply font-content text-12 weight-700 tracking-lg uppercase;
}
@utility type-feature-20 {
  @apply font-feature text-20 leading-xl weight-300 tracking-md;
}
@utility type-display-38 {
  @apply font-display text-38 weight-500;
}
@utility type-display-32 {
  @apply font-display text-32 weight-500;
}
@utility type-display-26 {
  @apply font-display text-26 weight-500;
}
@utility type-display-24 {
  @apply font-display text-24 weight-500;
}
@utility type-display-20 {
  @apply font-display text-20 weight-500;
}
@utility type-content-30 {
  @apply font-content text-30 weight-400;
}
@utility type-content-28 {
  @apply font-content text-28 weight-400;
}
@utility type-content-18 {
  @apply font-content text-18 weight-400;
}
@utility type-content-16 {
  @apply font-content text-16 weight-400;
}
@utility type-content-14 {
  @apply font-content text-14 weight-400;
}
@utility type-content-12 {
  @apply font-content text-12 weight-400;
}
@utility type-content-11 {
  @apply font-content text-11 weight-400;
}
@utility type-content-10 {
  @apply font-content text-10 weight-400;
}
```

Naming: `type-<role>-<pxSize>`. Roles: `heading`, `subheading`, `feature`, `display`, `content`. Note `type-subheading-12` deliberately uses `font-content` (not `font-subheading`).

`tracking-*` is **not** a custom utility — it is Tailwind's built-in `letter-spacing` utility re-keyed by resetting the scale (`typography.css:55-58`):

```css
--tracking-*: initial;
--tracking-sm: --spacing(0.25);
--tracking-md: --spacing(0.5);
--tracking-lg: --spacing(0.8);
```

Same technique for `--leading-*` (L16-21: `xs:1, sm:1.1, md:1.2, lg:1.3, xl:1.4`) and `--text-*` (L23-53: `text-10 … text-38`, each with a paired `--text-NN--line-height`).

### 5c. The `--spacing` / `--base-scale` engine (`src/theme/index.css:17-44`)

```css
@theme static {
  --base-scale: calc(1rem / 16px);

  --breakpoint-*: initial;
  --breakpoint-xs: 23.5rem; /* 376px */
  --breakpoint-sm: 27.75rem; /* 444px */
  --breakpoint-md: 48rem; /* 768px */
  --breakpoint-lg: 62rem; /* 992px */
  --breakpoint-xl: 75rem; /* 1200px */

  --spacing-*: initial;
  --spacing: calc(1px * var(--base-scale));

  --radius-*: initial;
  --radius-none: 0;
  --radius-sm: --spacing(4);
  --radius-md: --spacing(8);
  --radius-pill: calc(infinity * 1px);
  --radius-full: 50%;

  --outline-offset: -1px;
  --header-height: 55px;
}
```

`--base-scale: calc(1rem / 16px)` is unitless. `--spacing` is therefore `1rem/16` = 0.0625rem. Tailwind multiplies numeric scale values by `--spacing`, so **`p-40` = 40 × 0.0625rem = 2.5rem**, i.e. the number in the class is the px value at a 16px root but the emitted value is rem and scales with user font-size. This is why the codebase writes `p-40`, `gap-16`, `size-64`, `py-6`, `text-16` — those are px-denominated names. `--spacing-*: initial` deletes Tailwind's default 0.25rem-step scale.

Because `--spacing` is a single value (not a scale map), **any** number works: `max-w-890` (`landing.module.css:9`), `max-w-1000` (`feature-card.module.css:9`), `min-h-320`/`min-h-250`/`min-h-290` (`feature-card.module.css:43,54,58`), `size-120` (`feature-card.module.css:48`), `max-w-375` (`sidenav.module.css:17`), `max-w-460` (`overlay.module.css:17`), `w-143` (`logo.module.css:8`), `h-0.75` (`sidenav.module.css:214`), `--spacing(1328)` used directly in plain CSS (`footer.module.css:10`).

Breakpoints `--breakpoint-*: initial` + 5 named → `@variant sm|md|lg` are used as block variants (`footer.module.css:12,29`, `landing.module.css:11,15,19`, `header.module.css:21,29`). Raw media queries are used when a breakpoint isn't in the scale: `@media (min-width: 35.75rem)` (`game-card.module.css:67, 75`).

### 5d. `@layer base` (`src/theme/index.css:46-77`)

```css
@layer base {
  * {
    @apply outline outline-none;
    @variant dark {
      color-scheme: dark;
    }
    @variant light {
      color-scheme: light;
    }
    @variant focus-visible {
      @apply inset-ring-2 inset-ring-(--outline-focus);
    }
  }

  html {
    @apply overflow-visible!;
    scrollbar-gutter: stable;
    scroll-padding-top: var(--header-height);
    &[style*='overflow: hidden'] > body {
      @apply overflow-hidden;
    }
  }

  body {
    @apply overflow-x-hidden flood-primary type-content-16 color-primary;
  }
}
```

Global focus ring is a single `*` rule using `inset-ring` (not `outline`), so components opt _out_ rather than in (`word.module.css:15-17` `@variant focus-visible { @apply inset-ring-0; }`). The `html[style*='overflow: hidden']` hack is annotated at `index.css:63` as a workaround for React Aria Components setting an inline overflow style on modal open, which breaks `position: sticky` on the header.

---

## 6. Dark / light theming

Two selectors, one variant pair — `src/theme/variants.css:94-95`:

```css
@custom-variant dark  (&:where(.dark,  .dark *,  [data-theme="dark"],  [data-theme="dark"] *));
@custom-variant light (&:where(.light, .light *, [data-theme="light"], [data-theme="light"] *));
```

Each matches **four** things: the class on self, the class on any ancestor, the data-attribute on self, the data-attribute on any ancestor. The dual form exists because the two consumers set it differently:

- **App (runtime)** uses `data-theme`. `src/app/layout.tsx:52` renders `<html … data-theme={DEFAULT_THEME}>` (and `suppressHydrationWarning` at L50, `data-device='desktop'` at L51). `src/features/theme/client.tsx:29-36` flips it imperatively:
  ```ts
  document.documentElement.dataset.theme =
    key === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : key;
  ```
  then persists via the `setTheme` server action (`src/features/theme/actions.ts:12` — `z.enum(['dark','light','system'])`). Asserted in `src/features/theme/client.test.tsx:31, 48` (`document.documentElement.dataset.theme`).
- **Storybook** uses the **class**. `.storybook/preview.tsx:31-37` `withThemeByClassName({ themes: { light: 'light', dark: 'dark' }, defaultTheme: 'light' })`, and the docs container at L56-57 does `classList.remove(…)/add(…)`.

**Crucially, almost no CSS uses `dark:`/`light:` variants.** The theme switch is carried entirely by `light-dark()` in the token layer (`src/theme/colors.css:44-72`):

```css
--fg-primary: light-dark(var(--neutral-00), var(--neutral-f8));
--fg-primary-inverse: light-dark(var(--neutral-f8), var(--neutral-00));
--fg-primary-subtle: light-dark(var(--neutral-36), var(--neutral-df));
--fg-secondary: light-dark(var(--neutral-5a), var(--neutral-bb));
--fg-secondary-inverse: light-dark(var(--neutral-bb), var(--neutral-5a));
--fg-secondary-subtle: light-dark(var(--neutral-72), var(--neutral-a3));
--fg-tertiary: var(--neutral-8b); /* deliberately theme-invariant */
--fg-quaternary: light-dark(var(--neutral-eb), var(--neutral-36));
--accent-highlight: light-dark(var(--accent-bright-blue), var(--accent-light-blue));
--accent-positive: light-dark(var(--accent-green), var(--accent-light-green));
--accent-negative: light-dark(var(--accent-red), var(--accent-light-red));
--bg-primary: light-dark(var(--neutral-ff), var(--neutral-00));
--bg-primary-inverse: light-dark(var(--neutral-00), var(--neutral-ff));
--bg-secondary: light-dark(var(--neutral-f8), var(--neutral-1b));
--bg-secondary-inverse: light-dark(var(--neutral-1b), var(--neutral-f8));
--bg-tertiary: light-dark(var(--neutral-eb), var(--neutral-2a));
--bg-tertiary-inverse: light-dark(var(--neutral-2a), var(--neutral-eb));
--bg-quaternary: light-dark(var(--neutral-df), var(--neutral-36));
--bg-quaternary-inverse: light-dark(var(--neutral-36), var(--neutral-df));
--outline-focus: #add8e6; /* theme-invariant */
--outline-primary: light-dark(var(--neutral-00), var(--neutral-f8));
--outline-secondary: var(--neutral-97); /* theme-invariant */
--outline-tertiary: light-dark(var(--neutral-df), var(--neutral-42));
```

`light-dark()` only resolves if `color-scheme` is set — which is exactly what the `dark`/`light` variants do in the single `*` base rule (`index.css:50-56`). So the whole theming chain is:

`<html data-theme="dark">` → `@custom-variant dark` matches `*` → `color-scheme: dark` inherits to every element → every `light-dark()` token resolves to its second argument → every `flood-*`/`color-*`/`outline-*` utility flips. **Zero component CSS needs a dark variant.**

Token naming layers: primitives (`--neutral-*`, `--accent-*`, `--game-*`) are raw hex and never used directly by semantic utilities in components (except deliberately, e.g. `color-00`); semantic aliases (`--fg-*`, `--bg-*`, `--outline-*`, three `--accent-*` semantics) are the intended API. `src/theme/colors.docs.mdx` documents this split as "Primitive" vs. semantic ColorPalette sections in Storybook.

---

## 7. `clsx` composition order and override guarantees

### Canonical order

```
clsx(
  '<literal group/ marker>',   // 1. global, unhashed group name
  styles.<base>,               // 2. base module class
  styles[<enum>], …            // 3. variant module classes, one per look-enum
  className,                   // 4. consumer override — ALWAYS LAST
)
```

Exactly as written in `src/components/button/index.tsx:25-32`, `badge/index.tsx:25`, `card/index.tsx:25`, `link/index.tsx:26-37`, `icon/index.tsx:25` (`clsx(styles.icon, className)` — no group marker on Icon).

### Why "last in clsx" is _not_ what makes the override win

Class order in the `class` attribute has **no** effect on CSS cascade. The actual guarantees are:

1. **Consumer passes a Tailwind utility** (e.g. `CardProvider className='shadow-[#2860d8]'`, `feature-card/index.tsx:76`; `clsx(state.isExpanded && 'rotate-180')`, `sidenav/games.tsx:100`) → that class lands in `@layer utilities`, which is declared **after** all `components.lN` in `src/theme/index.css:1-9`. Utilities beat components unconditionally.
2. **Consumer passes a class from their own `.module.css` in a higher `lN`** (the dominant pattern) → higher layer wins. `src/app/@footer/footer.tsx`-side `.link` sits in `components.l2` (`footer.module.css:46-49`) and beats `link.module.css`'s `.link` in `components.l1`.
3. **`:where()` on every custom variant** (§4) guarantees the base component's stateful rules (`.button` + `@variant hover`) never gain extra specificity, so a higher-layer flat class can override even a hovered/pressed style without needing `!important` or a matching state selector. `sidenav.module.css:247-257` relies on this — `.trigger` (l2) redefines `hover`/`pressed` flood over `button.module.css` `.primary` (l1).

`!` (Tailwind `!important` suffix) appears exactly once in the repo, at `src/theme/index.css:48` (`@apply overflow-visible!`), for the RAC inline-style workaround. It is not used as an override mechanism in components.

### The `classNames` object convention for composites

`AGENTS.md:165-172` mandates that composite components accept a `classNames` object rather than a single `className`, with one key per internal element, and that **every** internal element gets both a module class and a `classNames?.x` slot:

```tsx
// src/app/_components/game-card/index.tsx:32,37,40,42,45,54,56,62
className={clsx(styles.card,        classNames?.card)}
className={clsx(styles.media,       classNames?.media)}
className={clsx(styles.icon,        classNames?.icon)}
className={clsx(styles.title,       classNames?.title)}
className={clsx(styles.badge,       classNames?.badge)}
className={clsx(styles.content,     classNames?.content)}
className={clsx(styles.description, classNames?.description)}
className={clsx(styles.links,       classNames?.links)}
```

Typed in `src/app/_components/game-card/types.ts:7-23` as `Omit<CardProps, 'className'> & { classNames?: { badge?, card?, content?, description?, icon?, links?, media?, title? } … }` — note `className` is **removed** from the public surface so the object is the only override channel. Rules from AGENTS.md: use optional chaining (`classNames?.card`), never a `= {}` default; a `styles.x` reference must exist even if the CSS rule doesn't yet.

`FeatureCards` merges into that object rather than replacing (`feature-card/index.tsx:80-86`):

```tsx
classNames: { ...card.props.classNames, card: clsx(card.props.classNames?.card, classes[index]) }
```

---

## 8. Other load-bearing conventions

### 8a. Component file layout (5 files per component, no barrels)

`src/components/{badge,button,card,icon,link}/` each contain:

| file                | contents                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `index.tsx`         | the component; `'use client'` + `import 'client-only'` at top                                                 |
| `types.ts`          | `<Name>StyleProps` (the enum-only slice) + `<Name>Props` (intersection with the underlying element/RAC props) |
| `constants.ts`      | `<Name>StyleDefaults: Required<<Name>StyleProps>`                                                             |
| `context.tsx`       | `<Name>Context` + `<Name>Provider`                                                                            |
| `<name>.module.css` | styles                                                                                                        |

Plus optional `<name>.stories.tsx`, `index.test.tsx`, and extra subcomponent files (`card/content.tsx`, `card/media.tsx`). **No `index.ts` barrels** — consumers import `@/components/card/content` directly (`game-card/index.tsx:10-11`). Card is the exception on file count: it has `content.tsx` and `media.tsx` but no `.stories.tsx`.

### 8b. `useContextProps` pattern

Every component's first two statements:

```tsx
export function Button({ ref, ...props }: ButtonProps) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
```

(`button/index.tsx:13-14`; identical at `badge/index.tsx:13-14`, `card/index.tsx:13-14`, `icon/index.tsx:14-15`, `link/index.tsx:14-15`, and app-level `word/index.tsx:19-20`.)

`useContextProps` is from `react-aria-components`; it merges nearest-provider values with local props (local wins) and merges refs. `ref` is a plain prop — React 19, **no `forwardRef`** anywhere.

Context shape is identical in all five (`button/context.tsx:11-21`):

```tsx
export const ButtonContext = createContext<ContextValue<Partial<ButtonProps>, HTMLButtonElement>>(null);

export function ButtonProvider({ children, ...props }: ProviderProps<ButtonProps>) {
  return <ButtonContext.Provider value={props}>{children}</ButtonContext.Provider>;
}
```

`ProviderProps<T>` is defined in `src/lib/types.ts:66-68` as `PropsWithChildren<Partial<Omit<T,'children'|'slot'>> & SlottedValue<Partial<T>>>` — i.e. providers accept every prop as optional and additionally support React Aria's `slots` map.

Real use: `game-card/index.tsx:60-67` wraps a list of `<Link>`s in `<LinkProvider button className={…} color='subtle' shape='pill' size='large' variant='shell'>` so each child link renders as a button-styled link without repeating props. `feature-card/index.tsx:76` wraps cards in `<CardProvider className='shadow-[#2860d8]' variant='aloft'>`.

### 8c. `constants.ts` defaults pattern

```ts
// src/components/button/constants.ts
export const ButtonStyleDefaults: Required<ButtonStyleProps> = {
  color: 'primary',
  shape: 'square',
  size: 'medium',
  variant: 'solid',
};
```

Applied by object-spread merge _after_ context resolution, in a single destructure (`button/index.tsx:16-19`):

```tsx
const { className, color, shape, size, variant, ...rest } = {
  ...ButtonStyleDefaults,
  ...props,
};
```

`Required<…StyleProps>` makes `styles[color]` etc. non-optional index reads. Precedence chain: **defaults → context → local props**.

Other instances: `BadgeStyleDefaults` (`badge/constants.ts:3-6`, color `bold`, size `medium`), `CardStyleDefaults` (`card/constants.ts:3-5`, variant `aloft`). **Icon has no `constants.ts`** — it has no style enums (`icon/index.tsx:17` destructures `props` directly with no defaults merge). **Link has no `constants.ts` of its own** — it imports `ButtonStyleDefaults` from `../button/constants` (`link/index.tsx:9`) and reuses `buttonStyles` (`link/index.tsx:8`), which is the cross-component style-reuse pattern.

### 8d. `group/*` naming

Group names are the **component's own lowercase name**, applied as a literal (unhashed) string as the first `clsx` argument:

Command `rg -o --no-filename "group/[a-z-]+" -g '*.tsx' src | sort | uniq -c`:

```
1 group/badge       (badge/index.tsx:25)
1 group/button      (button/index.tsx:26)
1 group/card        (card/index.tsx:25)
3 group/disclosure  (sidenav/games.tsx:53, 79, 122)
3 group/field       (word/control.tsx:146, read.tsx:9, write.tsx:183)
1 group/link        (link/index.tsx:27)
3 group/letter      (word/control.tsx:159, read.tsx:18, write.tsx:237)
3 group/word        (word/control.tsx:148, read.tsx:11, write.tsx:226)
```

Icon has no group. `Word` uses a 3-level nesting: `group/field` → `group/word` → `group/letter`.

Consumers (`rg -o --no-filename "group-[a-z0-9-]+/[a-z-]+" -g '*.css' src | sort | uniq -c`): `group-expanded/disclosure` ×13, `group-hover/disclosure` ×12, `group-game-<id>/card` ×12, `group-game-<id>/disclosure` ×12, `group-hover/button` ×1, `group-pressed/button` ×1, `group-not-focus-within/field` ×2, `group-not-last/disclosure` ×1.

Since `group/x` is a literal string in JSX and the accelint PostCSS plugin `:global()`-wraps the compiled selector, the two sides match across the CSS-Modules hashing boundary. **This plugin is mandatory for the pattern to work at all.**

### 8e. Arbitrary values

`AGENTS.md:271-272` says: _"For arbitrary values, use plain CSS after `@apply` — don't use Tailwind's bracket syntax like `max-w-[280px]`. Example: `@apply max-w-full; max-width: 280px;`"_.

In practice the codebase does both. Plain-CSS-after-`@apply` is common:

- `header.module.css:5-7` — `@apply sticky top-0 left-0 z-50 flood-primary; width: 100vw;`
- `header.module.css:10-11` — `border-bottom: 1px solid var(--outline-tertiary);`
- `layout.module.css:5-6` — `@apply grid min-h-screen; grid-template-rows: auto 1fr auto;`
- `footer.module.css:9-10` — `max-width: --spacing(1328);` (note: the `--spacing()` function works in plain CSS too)
- `feature-card.module.css:10-13, 16-20` — `grid-template-areas`
- `sidenav.module.css:241-242` — `border-top`, `box-shadow`
- `overlay.module.css:18-19` — `border`, `box-shadow`

But bracket syntax is also present: `min-w-[100px]`/`min-w-[140px]` (`button.module.css:76, 80`), `max-w-[280px]` (`game-card.module.css:5` — literally the example AGENTS.md says not to write), `w-[80%]` (`feature-card.module.css:101`), `h-[1.4em] w-[2.5px]` (`word.module.css:65`), `flood-[transparent]`, `flood-[#4d88f9]`. Treat the AGENTS.md rule as a preference, not an invariant.

### 8f. Miscellaneous

- Empty rule bodies are tolerated as placeholders: `footer.module.css:42-43` (`.item { }`), `three-word-combobox.module.css:3-4` (`@layer components.l1 { }`).
- Non-`@apply` CSS features used freely inside layers: nesting (`&.bold`, `& > :first-child`, `&:is(a)`, `&::before`), `:has()` (`sidenav.module.css:11`), `@keyframes` outside layers, `attr()` in `mask` (`icon.module.css:9`), `image-set()`.
- Fonts: `@theme static` declares `--font-cheltenham: ;` … (empty values, `typography.css:2-6`) then aliases them semantically (`--font-sans: var(--font-franklin)`, `--font-display: var(--font-serif)`, `--font-content: var(--font-sans)`, L8-14). Real values come from `next/font/local` CSS variables applied as classes on `<html>` (`src/theme/fonts/index.ts:16,57,83,89,111`; `src/app/layout.tsx:41-47`; `.storybook/preview.tsx:17-25`).
- Design-system components are all `'use client'` + `import 'client-only'` (`button/index.tsx:1-3` and every sibling), **except** `card/content.tsx` and `card/media.tsx`, which are plain server-safe modules.
