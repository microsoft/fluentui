# Reading token values in JavaScript

`useCssVarValue` reads the computed value of one or more CSS custom properties at an element's DOM
position, and re-reads them when the values could have changed. Use it when a token's resolved value is
needed at runtime — canvas drawing, measurement, theming a third-party widget.

```tsx
import { useCssVarValue, invalidateCssVars } from '@fluentui/react-windmod-preview/use-css-var-value';
```

## Signatures

```ts
useCssVarValue(
  variableName: string,
  elementRef: React.RefObject<HTMLElement | null>,
  options?: UseCssVarValueOptions,
): string | undefined;

useCssVarValue<T extends Record<string, string>>(
  variableNames: T,
  elementRef: React.RefObject<HTMLElement | null>,
  options?: UseCssVarValueOptions,
): CssVarValues<T>;   // { [K in keyof T]: string | undefined }
```

```ts
interface UseCssVarValueOptions {
  /** Returned before mount (SSR and the first client render) and whenever the variable has no
   *  computed value at the element. For the record form it fills each unresolved slot. */
  fallback?: string;
  /** Reads the DOM on every committed render instead of consulting the cache. */
  forceOnRender?: boolean;
}
```

Variable names include their leading dashes.

## Usage

```tsx
const ref = React.useRef<HTMLDivElement>(null);

// single
const fg = useCssVarValue('--color-neutral-foreground-1', ref, { fallback: '#242424' });

// record — the return mirrors the input's keys
const { bg, radius } = useCssVarValue({ bg: '--color-neutral-background-1', radius: '--radius-medium' }, ref);

return <div ref={ref}>…</div>;
```

The read happens through `getComputedStyle(element).getPropertyValue(name)` **at the consuming
element**, so cascade, inheritance and theme scoping all apply — the value is whatever CSS would hand
to a `var()` reference on that element. That is why it takes a ref rather than reading `:root`: a token
inside a nested provider resolves to that provider's theme.

## What re-reads

- the nearest `FluentProvider`'s `className` or inline `style` changing — from a prop or from an
  external `classList`/`style` mutation
- **any ancestor provider** changing (a nested provider only shields its subtree for tokens it
  redeclares itself)
- a `style` mutation on `documentElement` in any observed document
- `invalidateCssVars()`
- `options.forceOnRender`, on every committed render

Values are memoized per `(element, variable)` in a `WeakMap`, tagged with the scope and root versions
they were read under, so a hit is taken only while every input is unchanged. A record read is N
independent entries and shares them with any single-name read of the same variable at the same element.

## The one thing that will surprise you

**Not every token reads back as a usable value.** The theme deliberately leaves its knobs unregistered
(no `@property`), so a custom property's computed value is the specified token stream with `var()`
substituted and **`calc()` not evaluated**. Measured over all 462 declared tokens (a follow-up to
AR2 DELETED `--leading-*` entirely — `leading-<n>` is now pure arithmetic, `n / 100` for any bare
integer `n`, or `leading-<a>/<b>` for an exact ratio, compiled straight into `line-height` by a
functional `@utility` override in `css/index.css` with no backing custom property at all, so the
15 `--leading-*` declarations the original AR2 landing added are gone, not renamed):

| Family         | Reads as a literal | Reads as a `calc()` string |
| -------------- | ------------------ | -------------------------- |
| `--color-*`    | 366                | 0                          |
| `--shadow-*`   | 12                 | 0                          |
| `--radius-*`   | 11                 | 0                          |
| `--ease-*`     | 9                  | 0                          |
| `--duration-*` | 8                  | 0                          |
| `--font-*`     | 7                  | 0                          |
| `--spacing-*`  | 2                  | 25                         |
| `--text-*`     | 0                  | 17                         |
| `--stroke-*`   | 0                  | 4                          |
| `--base-scale` | 0                  | 1                          |
| **Total**      | **415**            | **47**                     |

So colour, shadow, radius, ease, duration and font read as usable values — `#242424`, `150ms`,
`12px`, `cubic-bezier(0.9, 0.1, 1, 0.2)`. Text, spacing, stroke and `--base-scale` read as unevaluated
strings such as `calc(14px * calc(1rem / 16px * 1))`, invariant under both a theme change and a root
font-size change. Leading is **absent from this table on purpose**: `leading-140` and
`leading-20/14` alike compile straight into a `line-height` declaration (`calc(140 / 100)`, the
unevaluated ratio `calc(20 / 14)`) with no `--leading-*` custom property ever declared, so there is
nothing for this hook to read — asking for `leading` returns `fallback` (or `undefined`), the same
as asking for any other name nothing declares. A ratio consumed in a calc formula (a label-offset
margin, say) is authored as a literal fraction directly in the CSS, not read back through this hook.

The practical consequence: **this hook is for colour and other literal tokens.** For a resolved _length_
you want `getComputedStyle` on a real property, not on the token.

A theme-class change moves 315 tokens and every one of them is a literal — so for exactly the tokens
theme switching changes, the value is real and scope-correct.

## Gotchas

- **The returned record is not a stable identity.** It is a fresh object on every render even when no
  slot changed. Never use it as an effect dependency — read the slots.
- **SSR-safe**: on the server, and until the layout effect runs, the hook returns `options.fallback`.
  Always pass one for anything that renders.
- **A bare root `font-size` change reports nothing.** Zoom controls that change only the root font size
  move no unregistered token; the invalidation fires and the re-read returns the same string. A zoom
  control that sets a custom property inline **is** observable.
- **Residual staleness**: a provider's version only advances while that provider is mounted. A mutation
  at an element while no provider is mounted, followed by a remount at that element, can serve a stale
  cached value. `invalidateCssVars()` is the escape hatch.
- **`forceOnRender` writes the shared cache.** A forced consumer refreshes the `(element, variable)`
  entry for every other consumer of the same pair, so a plain peer's value can move without any
  invalidation event. The value is read at the current versions, so it is fresher, never wronger.
- **jsdom**: `getComputedStyle` resolves custom properties set as **inline styles** but does not cascade
  them from stylesheets. In unit tests, set the variable with `element.style.setProperty(...)`.

## `invalidateCssVars()`

```ts
invalidateCssVars(): void;
```

Invalidates every mounted `useCssVarValue` consumer, in every document. The escape hatch for anything
the provider and root observers cannot see.
