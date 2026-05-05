# Image Migration

v9 `Image` renders a plain `<img>` element (no wrapper `<div>`). The fit API is renamed and simplified.

## Key Changes

- **No wrapper div**: v8 wrapped `<img>` in a styled `<div>`; v9 applies styles directly to `<img>`. This may affect existing layouts.
- **`imageFit` → `fit`**: maps directly to CSS `object-fit` / `object-position`
- **`shouldFadeIn` / `shouldStartVisible` / `onLoadingStateChange` removed**: use native `onLoad` / `onError` events

## Fit Mapping

| v8 `imageFit`                   | v9 `fit`                | CSS equivalent                                 |
| ------------------------------- | ----------------------- | ---------------------------------------------- |
| `ImageFit.contain`              | `"contain"`             | `object-fit: contain; object-position: center` |
| `ImageFit.cover`                | `"cover"`               | `object-fit: cover; object-position: center`   |
| `ImageFit.center`               | `"center"`              | `object-fit: none; object-position: center`    |
| `ImageFit.none`                 | `"none"`                | `object-fit: none; object-position: left top`  |
| `centerContain` / `centerCover` | use `contain` / `cover` | Centering is the default in v9                 |

> **Note**: `fit="none"` and `fit="center"` are **not** exact drop-ins for v8 equivalents. v8 used absolute positioning + transform; v9 uses `object-fit`. With `shape="circular"`, use `fit="cover"` to ensure the image fills the box.

## Prop Mapping

| v8                     | v9            | Notes                                           |
| ---------------------- | ------------- | ----------------------------------------------- |
| `height`               | `height`      |                                                 |
| `width`                | `width`       |                                                 |
| `className`            | `className`   |                                                 |
| `imageFit`             | `fit`         | See fit mapping above                           |
| `coverStyle`           | `fit="cover"` |                                                 |
| `maximizeFrame`        | `block`       | Renamed                                         |
| `styles`               | `className`   | Use `makeStyles`                                |
| `shouldFadeIn`         | —             | Implement via `makeStyles` + `onLoad` animation |
| `shouldStartVisible`   | —             | Use `onLoad` / `onError` events                 |
| `loading`              | —             | Use `onLoad` / `onError` events                 |
| `onLoadingStateChange` | —             | Use `onLoad` / `onError` events                 |
| `theme`                | —             | Use `FluentProvider`                            |

The boolean style props from v8 (`isCenter`, `isCoverContain`, `isLandscape`, `isError`, `isLoaded`, etc.) are removed — use `className` with `makeStyles` instead.

## Before / After

### Before

```tsx
import { Image, ImageFit } from '@fluentui/react';
<Image src={imgSrc} imageFit={ImageFit.cover} width={200} height={150} shouldFadeIn />;
```

### After

```tsx
import { Image, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  img: {
    // Griffel: pass keyframe stops directly to animationName (no @keyframes key)
    animationName: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    animationDuration: '300ms',
  },
});

function MyImage() {
  const s = useStyles();
  return <Image src={imgSrc} fit="cover" width={200} height={150} className={s.img} />;
}
```
