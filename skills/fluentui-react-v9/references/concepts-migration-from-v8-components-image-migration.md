# Image Migration

**v8 -> v9**

- **Removed v8 behaviors**: `shouldFadeIn`, `shouldStartVisible`, and `onLoadingStateChange` are not in v9.
  - Use native `<img>` events (`onLoad`, `onError`) and your own styling.
- **Different markup**: image in v9 is not wrapped into a `<div>` with predefined styles, instead it renders plain `<img>` element with styles applied directly to it based on props.
- **Fit API renamed & simplified**: `imageFit` → `fit` (`'none' | 'center' | 'contain' | 'cover'`) and maps directly to CSS `object-fit`/`object-position`.

## Markup

v9 renders plain `<img>` element without any wrapper, which may affect your current layouts that previously used v8 `Image` component.

## Fit differences

In v9, `fit` is the analogue of v8's `imageFit`, with a difference, that [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) is used for all fit variants:

- `fit="contain"` → `object-fit: contain; object-position: center;`
- `fit="cover"` → `object-fit: cover; object-position: center;`
- `fit="center"` → `object-fit: none; object-position: center;`
- `fit="none"` → `object-fit: none; object-position: left top;`

v8 values like `centerContain` and `centerCover` are not needed in v9 because **centering is the default** for all fits except `none`.

### Notes on `none` and `center`

`fit="none"` and `fit="center"` are **not** exact drop-in replacements for v8's `imageFit="none"` and `imageFit="center"`.

- v8 achieved centering via a **wrapper** (`position: relative`) and an **absolutely positioned** image with `transform: translate(...)`.
- v9 relies entirely on `object-fit`/`object-position` on the `<img>`.

because of this:

- When using imageFit="none" or fit="center", the image might not fill the container.
- Applying shape="circular" or a border-radius may not produce a perfect circle unless the image fills the box. Unless:
  - The image fills the box (e.g., `fit="cover"`)
  - The container handles clipping (`border-radius` + `overflow: hidden`).

100x100 v8 Image with border-radius style and imageFit.center

100x100 v9 Image with shape="circular" and fit="center"

500x500 v8 Image with border-radius style and imageFit.center

500x500 v9 Image with shape="circular" and fit="center"

## Replacing removed features

### shouldFadeIn

For v9, this feature is no longer supported. The alternative is to apply the animation through `makeStyles` and using the global event `onLoad`. Below is an example of a migration:

### shouldStartVisible

For v9, this feature is no longer supported. The alternative would be to use the global events such as: `onLoad` and `onError` to achieve the same behavior. Below is an example showcasing this:

### styles

For v9, this feature is no longer supported. The alternative is to apply styles through `makeStyles`. Below is an example of a migration:

#### v8 implementation

#### v9 implementation

## Props mapping

The table below presents a mapping of props between the v8 and v9 `Image` components in order to clarify which properties require changes.

| v8                     | v9                                                                         |
| ---------------------- | -------------------------------------------------------------------------- |
| `height`               | `height`                                                                   |
| `width`                | `width`                                                                    |
| `className`            | `className`                                                                |
| `coverStyle`           | `fit="cover"`                                                              |
| `imageFit`             | `fit`                                                                      |
| `maximizeFrame`        | `block`.                                                                   |
| `styles`               | `className`                                                                |
| `loading`              | Not supported -> use onLoad and onError events                             |
| `onLoadingStateChange` | Not supported -> use onLoad and onError events                             |
| `shouldFadeIn`         | Not supported -> implement animation via makeStyles and className + onLoad |
| `shouldStartVisible`   | Not supported -> use onLoad and onError events                             |
| `theme`                | Use `FluentProvider` to customize the theme                                |

In v9, the boolean props from [IImageStyleProps](https://developer.microsoft.com/en-us/fluentui#/controls/web/image#IImageStyleProps) — such as `isCenter`, `isCenterCover`, `isCenterContain`, `isContain`, `isLandscape`, `isNone`, `isError`, `isLoaded`, and `isNotImageFit` — are no longer supported. Use the className prop for custom styling and the fit prop to control image fitting instead.
