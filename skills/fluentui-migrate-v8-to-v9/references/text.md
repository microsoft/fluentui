# Text Migration

v9 `Text` replaces the v8 `variant` prop with individual style props (`size`, `weight`, `font`, etc.) that map directly to design tokens.

## Prop Mapping

| v8 `ITextProps` | v9 `TextProps`    | Notes                                                                |
| --------------- | ----------------- | -------------------------------------------------------------------- |
| `variant`       | `size` + `weight` | See variant → size/weight table below                                |
| `nowrap`        | `wrap={false}`    | Inverted boolean                                                     |
| `block`         | `block`           | Same                                                                 |
| `as`            | `as`              | v9 supports `"h1"`–`"h6"`, `"p"`, `"span"`, `"strong"`, `"em"`, etc. |
| `styles`        | `className`       | Use `makeStyles`                                                     |
| `theme`         | —                 | Use `FluentProvider`                                                 |

## Variant → Size / Weight Mapping

| v8 `variant`       | v9 `size` | v9 `weight` |
| ------------------ | --------- | ----------- |
| `tiny`             | `100`     | `regular`   |
| `xSmall`           | `200`     | `regular`   |
| `small`            | `200`     | `regular`   |
| `smallPlus`        | `200`     | `semibold`  |
| `medium` (default) | `300`     | `regular`   |
| `mediumPlus`       | `300`     | `semibold`  |
| `large`            | `400`     | `regular`   |
| `xLarge`           | `500`     | `semibold`  |
| `xLargePlus`       | `600`     | `semibold`  |
| `xxLarge`          | `700`     | `semibold`  |
| `xxLargePlus`      | `800`     | `semibold`  |
| `superLarge`       | `900`     | `semibold`  |
| `mega`             | `1000`    | `semibold`  |

## New Props in v9

| Prop            | Values                                             |
| --------------- | -------------------------------------------------- |
| `italic`        | `boolean`                                          |
| `underline`     | `boolean`                                          |
| `strikethrough` | `boolean`                                          |
| `truncate`      | `boolean` — clips text with `…` on block elements  |
| `align`         | `"start"` \| `"center"` \| `"end"` \| `"justify"`  |
| `font`          | `"base"` (default) \| `"numeric"` \| `"monospace"` |

## Presets

v9 also exports semantic preset components that match design token names:

```tsx
import {
  Body1, Body1Strong, Body2, Caption1, Caption2,
  Display, LargeTitle, Subtitle1, Subtitle2, Title1, Title2, Title3,
} from '@fluentui/react-components';

<Title1>Page heading</Title1>
<Body1>Body text</Body1>
<Caption1>Small caption</Caption1>
```

Prefer presets over manual `size`/`weight` when matching the Fluent design system — they stay in sync as tokens evolve.

## Before / After

### Before

```tsx
import { Text } from '@fluentui/react';
<Text variant="xxLarge" block nowrap>
  Heading
</Text>;
```

### After

```tsx
import { Text } from '@fluentui/react-components';
<Text size={700} weight="semibold" block wrap={false}>
  Heading
</Text>;

// v9 — using preset (preferred)
import { Title2 } from '@fluentui/react-components';
<Title2 block wrap={false}>
  Heading
</Title2>;
```
