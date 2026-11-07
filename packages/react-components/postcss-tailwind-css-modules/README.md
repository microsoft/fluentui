# @fluentui/postcss-tailwind-css-modules

A PostCSS plugin that keeps Tailwind's named `group/…` and `peer/…` markers global under CSS
Modules.

## The problem

Tailwind compiles `group-disabled/fui-button:line-through` (or `@variant
group-disabled/fui-button`) to a selector containing the literal class `.group\/fui-button`.
`postcss-modules` (or any CSS-Modules loader) then hashes every local class it sees, including
that marker — and the result is a selector the DOM never matches. Nothing warns: the CSS stays
well-formed, the build succeeds, and the rule simply never applies.

This plugin runs between Tailwind and `postcss-modules` and wraps every such marker in
`:global(…)`, so CSS Modules leaves it exactly as authored.

## Install

```sh
npm install --save-dev @fluentui/postcss-tailwind-css-modules
```

`postcss` (`^8.4.0`) is a peer dependency.

## Usage

Add it to your PostCSS config, **after** `@tailwindcss/postcss` and **before**
`postcss-modules`. Order is load-bearing: Tailwind has to have emitted the `.group\/…` /
`.peer\/…` class before it can be rewritten, and `postcss-modules` has to see the `:global()`
wrapper before it scopes anything.

Object form:

```js
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    '@fluentui/postcss-tailwind-css-modules': {},
    'postcss-modules': {/* … */},
  },
};
```

Array form:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),
    require('@fluentui/postcss-tailwind-css-modules')(),
    require('postcss-modules')({/* … */}),
  ],
};
```

### Vite

Use Tailwind's Vite plugin rather than `@tailwindcss/postcss` — Tailwind's processing then
happens inside the Vite plugin, ahead of the rest of the PostCSS chain. Your `postcss.config.js`
contains only this plugin, in object syntax (the array form does not work with Vite):

```js
// postcss.config.js
export default {
  plugins: {
    '@fluentui/postcss-tailwind-css-modules': {},
  },
};
```

## The `include` option

By default, only files whose PostCSS `source.input.file` ends in `.module.css` are rewritten:

```ts
interface Options {
  include?: RegExp | ((file: string) => boolean) | true;
  onRewrite?: (info: { from: string; to: string; count: number }) => void;
}
```

- Pass a `RegExp` or a predicate function to use a different filter.
- Pass `include: true` to rewrite every rule regardless of filename.
- When no `from` is given to `postcss.process(css)`, `source.input.file` is `undefined`, and the
  default filter treats that as **not matching** — pass `from`, or pass `include: true`, to opt
  in.
