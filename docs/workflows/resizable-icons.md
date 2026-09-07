# Migrating to resizable Fluent icons

## Goal

Replace fixed-size icon exports:

```tsx
import { Dismiss20Regular } from '@fluentui/react-icons';
```

with resizable exports:

```tsx
import { DismissRegular } from '@fluentui/react-icons';
```

Resizable icons use scalable 20px artwork, render at `1em`, and support both SVG and font implementations.

## Enable linting

Install [`@fluentui/eslint-plugin-react-icons`](https://github.com/microsoft/fluentui-system-icons/tree/main/packages/eslint-plugin-react-icons) and enable `prefer-resizable`:

```js
const reactIconsPlugin = require('@fluentui/eslint-plugin-react-icons');

module.exports = [
  {
    plugins: {
      '@fluentui/react-icons': reactIconsPlugin,
    },
    rules: {
      '@fluentui/react-icons/prefer-resizable': 'error',
    },
  },
];
```

The rule offers editor suggestions, but its suggestions are not applied by `eslint --fix`.

## Rename imports

Remove the numeric size from each icon name while preserving its variant:

```tsx
// Before
import { Add20Filled, Add20Regular } from '@fluentui/react-icons';

// After
import { AddFilled, AddRegular } from '@fluentui/react-icons';
```

Preserve aliases and deduplicate imports when multiple sized exports collapse to one resizable export.

## Preserve icon dimensions

### Component-owned default icons

When a component constructs its default icon, pass the old size through the `fontSize` prop:

```tsx
// Before
<Dismiss12Regular />

// After
<DismissRegular fontSize={12} />
```

`fontSize` is part of `FluentIconsProps` and is supported by both SVG and font icon variants. A direct prop sizes only the owned default and does not change user-provided slot content.

For defaults that vary with component size, use a size map:

```tsx
const iconSizeMap = {
  small: 12,
  medium: 16,
  large: 20,
} as const;

<InfoRegular fontSize={iconSizeMap[size]} />;
```

A `20` prop is unnecessary when the receiving slot already guarantees `font-size: 20px`. For example, Button owns its icon dimensions, so this only needs an import rename:

```tsx
<Button icon={<AddRegular />} />
```

### Replaceable icon slots

Keep sizing in CSS when consumers can replace the icon and the component promises to size arbitrary slot content:

```ts
const useStyles = makeStyles({
  icon: {
    fontSize: '16px',
  },
});
```

This makes the size part of the slot contract instead of an implementation detail of the default icon.

Use literal pixel values for fixed icon geometry. Typography tokens can be customized by themes and should not control dimensions that must remain equivalent to a former sized icon.

## Support font icon variants

Font icon variants render an element with the `data-fui-icon` attribute. Every existing style selector that targets a Fluent icon SVG must also match this attribute.

Preserve the original combinator:

```ts
// Descendant
'& svg': {
  display: 'block',
},

// Becomes
'& :is(svg, :where([data-fui-icon]))': {
  display: 'block',
},
```

```ts
// Direct child
'> svg': {
  fontSize: '20px',
},

// Becomes
'> :is(svg, :where([data-fui-icon]))': {
  fontSize: '20px',
},
```

Use `:is(svg, :where([data-fui-icon]))`, not `:where(:is(svg, [data-fui-icon]))`.

- `svg` retains the original type selector specificity contribution of `(0,0,1)`.
- `:where([data-fui-icon])` matches the font variant without increasing specificity.
- Wrapping the entire selector in `:where()` would reduce that contribution to zero and could change the cascade.

Direct `fontSize` props do not replace these selector updates. Existing selectors may also provide layout behavior such as `display`, `overflow`, flex sizing, or sizing for arbitrary slot content.

Do not update selectors for generic SVG content that is not a Fluent icon, such as charts, illustrations, or positioning overlays.

## Migrate `bundleIcon`

Migrate both variants and apply sizing when rendering the bundled component:

```tsx
// Before
const InfoIcon = bundleIcon(Info16Filled, Info16Regular);

// After
const InfoIcon = bundleIcon(InfoFilled, InfoRegular);

<InfoIcon fontSize={16} />;
```

`bundleIcon` selects the filled or regular variant; it does not own the rendered size.

## Stories and tests

Icons passed to components with a defined icon-slot size usually need only an import rename:

```tsx
<Button icon={<AddRegular />} />
```

Standalone icons and icons stored in intermediate variables should preserve their former dimensions explicitly:

```tsx
// Before
<AnimalCat24Regular />

// After
<AnimalCatRegular fontSize={24} />
```

Expected snapshot changes include:

- `width` and `height` changing to `1em`;
- `viewBox` generally changing to `0 0 20 20`;
- path data changing to the resizable 20px artwork;
- an explicit `font-size` attribute when the prop is provided.

## Optical differences

Resizable exports use scalable 20px artwork. A resizable icon rendered with `fontSize={24}` has the same dimensions as a 24px icon, but it may not look identical to the optically tuned `*24Regular` artwork.

If exact size-specific artwork is required:

1. Keep the sized icon intentionally.
2. Add a narrowly scoped lint suppression.
3. Document why the optical tuning is required.

## Validation

### Public Storybook icon variants

The v9 and headless public Storybooks use atomic SVG icon imports by default. Set `FLUENTUI_ICON_VARIANT=fonts` at build time to use atomic font icons and subset the emitted fonts:

```bash
# Atomic SVG icons (default)
yarn nx run public-docsite-v9:build-storybook
yarn nx run public-docsite-v9-headless:build-storybook

# Atomic, subsetted font icons
FLUENTUI_ICON_VARIANT=fonts yarn nx run public-docsite-v9:build-storybook
FLUENTUI_ICON_VARIANT=fonts yarn nx run public-docsite-v9-headless:build-storybook
```

Do not set the flag for normal SVG builds. Font mode falls back to SVG for icon packages or color icons that do not provide a font variant.

Run the relevant package checks:

```bash
yarn nx run <project>:lint
yarn nx run <project>:test
yarn nx run <project>:build
yarn nx format:check --base origin/master
yarn beachball check
```

Visually inspect:

- icons smaller or larger than 20px;
- dynamic component sizes;
- icon alignment in buttons and field controls;
- custom icon slot content;
- SVG and font icon renderers.
