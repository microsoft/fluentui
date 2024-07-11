# RFC: Stop pre-processing styles with Griffel in `@fluentui/react-components`

[@layershifter](https://github.com/layershifter)

## Background

We've begun noticing a pattern where apps are bundled into multiple separate bundles. For example, there's the main bundle for the app itself and a separate bundle for a first UI piece fetched from a CDN. This problem is described in the following issues:

- [microsoft/griffel#453](https://github.com/microsoft/griffel/issues/453) (_check this issue for more details_)
- [microsoft/griffel#526](https://github.com/microsoft/griffel/issues/526)

_TL;DR_: Griffel relies on the order of CSS classes, which can lead to clashes when multiple bundles are involved. See the simple example below:

```html
<!-- CURRENT STATE -->

<!-- main bundle -->
<style>
  .order0 {
    padding: 10px;
  }
  .order1 {
    padding-left: 5px;
  }
</style>

<!-- CDN bundle -->
<style>
  .order0 {
    padding: 10px;
  }
</style>

<!-- HTML -->

<!--
  🔴 We expect that a "div" below will have "padding-left: 5px", but instead, it has "padding: 10px".

     The issue appears because the CDN bundle loads after the main bundle, resulting in style overrides. This occurs because ".order0" appears in both bundles, and CSS prioritizes the order of appearance. 
  -->

<div class="order0 order1"></div>
```

The single reliable solution is to prefix styles with a unique identifier. This prevents CSS rules from colliding, for example:

```html
<!-- PROPOSAL -->

<!-- main bundle -->
<style>
  .main-order0 {
    padding: 10px;
  }
  .main-order1 {
    padding-left: 5px;
  }
</style>

<!-- CDN bundle -->
<style>
  .order0 {
    padding: 10px;
  }
</style>

<!-- HTML -->

<!--
  ✅ Now the "div" below will have "padding-left: 5px" as CSS rules don't clash anymore.
  -->

<div class="main-order0 main-order1"></div>
```

The proposed idea is to integrate prefix as a part of classes generation in Griffel as a salt for hashing (see [`hashClassName`](https://github.com/microsoft/griffel/blob/e3bf466e36464585ecff0ca3492760f6ada76dcc/packages/core/src/runtime/utils/hashClassName.ts#L23-L32) function):

- 👍 Class length won't change
- 👍 Apps can easily _prefix_ classes with a unique identifier like a project name

## Problem statement

Integrating prefixing into Griffel is relatively straightforward. However, we currently undergo a pre-processing step in `@fluentui/react-components` that modifies JavaScript code.

<details>
  <summary>Original code</summary>

```ts
// packages/react-components/react-menu/src/components/MenuDivider/useMenuDividerStyles.styles.ts
// 📝 output is simpfied

const useStyles = makeStyles({
  root: {
    ...shorthands.margin('4px', '-5px', '4px', '-5px'),
  },
});
```

</details>

<details>
  <summary>Pre-processed code</summary>

```ts
// @fluentui/react-menu/lib/components/MenuDivider/useMenuDividerStyles.styles.js
// 📝 output is simpfied

const useStyles = /*#__PURE__*/ __styles(
  {
    root: {
      B6of3ja: 'fvjh0tl',
      t21cq0: ['f1rnx978', 'f1q7jvqi'],
    },
  },
  {
    d: ['.fvjh0tl{margin-top:4px;}', '.f1rnx978{margin-right:-5px;}', '.f1q7jvqi{margin-left:-5px;}'],
  },
);
```

</details>

Addressing prefixing for pre-processed styles presents a challenge, as they have already been transformed into CSS rules and classes:

- 👎 **Webpack loader** (i.e. build time) - Will make loaders more complex and less efficient
- 👎 **Runtime** - Will require additional logic in `__styles()` (_artifact of AOT compilation in Griffel_) to prefix classes that makes the idea of AOT compilation obsolete

## Current workaround

We have proposed a temporary workaround in [microsoft/griffel#453](https://github.com/microsoft/griffel/issues/453#issuecomment-1850115159). The workaround involves increasing the specificity of the CSS rules in the consuming app. This is achieved by adding a unique class to the root element of the app, for example:

```css
.color-red {
}
/* becomes ⬇️ */
.PREFIX .color-red {
}
```

As a result, the CSS rules will have a higher specificity and will override any conflicting rules from the application. This approach is not ideal, as it affects performance (makes CSS rules less efficient).

> Note: We cannot prefix classes as Fluent components have pre-processed styles:
>
> ```js
> const useStyles = /*#__PURE__*/ __styles(
>   // Part 1: CSS classes mapping
>   { root: { B6of3ja: 'fvjh0tl' } },
>   // Part 2: CSS rules
>   { d: ['.fvjh0tl{margin-top:4px;}'] },
> );
> ```
>
> - We cannot prefix classes in the mapping with current APIs (part 1) as classes have been already hashed~~~~
> - We can prefix CSS classes (part 2) properly only but invoking Stylis (CSS preprocessor) on every CSS rule

> Note: `__styles()` is a result of AOT compilation in Griffel, adding additional responsibilities to it makes the idea of AOT compilation obsolete.

A [StackBlitz example](https://stackblitz.com/edit/vitejs-vite-d11ccd) demonstrates this workaround.

## Accepted solution

### Option A: Stop pre-processing styles

> Note: Applications already undertake this responsibility, as first and third-party packages do not include pre-processed styles.

This option involves eliminating the pre-processing step from `@fluentui/react-components`, shifting the responsibility to the consuming application.

This is the simplest option, albeit it necessitates adjustments in the consuming app and is not backward compatible. Consequently, apps not utilizing [AOT in Griffel](https://griffel.js.org/react/ahead-of-time-compilation/introduction) will experience noticeable slowdowns during initial loading.

## Pros and Cons

- 👍 (DX) drastically simplified Fluent build flow
  👍 (DX/CI) significantly faster transpilation of Fluent libraries ([microsoft/griffel#534](https://github.com/microsoft/griffel/issues/534))
- 👎 Not backward compatible

### Rejected solutions

### Option B: Ship ESM output with unprocessed styles

This option is more complex to maintain but ensures backward compatibility and avoids breaking changes.

We will offer three outputs for each package under the following `exports` in `package.json`:

- `"import": "./lib/index.js"` (as is) - ESM output with pre-processed styles (default for bundlers)
- `"require": "./lib-commonjs/index.js"` (as is) - CJS output with pre-processed styles (default for Node.js)
- `"import-raw": "./lib-raw/index.js"` (🆕)- ESM output with unprocessed styles

Consumers desiring to use the class prefixing feature will need to configure their bundler to use the `"import-raw"` output. For example, in Webpack:

```js
// webpack.config.js

module.exports = {
  resolve: {
    conditionNames: ['import-raw', '...'],
  },
};
```

- 👍 Backward compatible
- 👍 No changes required in consuming apps
- 👎 Harder to maintain; adds complexity to the build system
- 👎 Another public API that is tightly coupled only for limited set of files including Griffel
- 👎 Increased install size (NPM package will be larger)
