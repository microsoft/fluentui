# Image

## Background

Image is a utility-type component

## Prior Art

Convergence tracking history can be found in [microsoft/fluentui#16658].

[microsoft/fluentui#16658]: https://github.com/microsoft/fluentui/issues/16658

## Comparison between v0 and v7/v8

See [Image@v7/v8] for v7/v8 API, and [Image@v0] for v0 API.

[image@v7/v8]: https://developer.microsoft.com/en-us/fluentui#/controls/web/image
[image@v0]: https://fluentsite.z22.web.core.windows.net/0.53.0/components/image/props

| Purpose                                                                 | v7 / v8                 | v0              | Matching                      |
| ----------------------------------------------------------------------- | ----------------------- | --------------- | ----------------------------- |
| Additional CSS class name(s) to apply                                   | `className`             | `className`     | matching                      |
| Specifies the cover style to be used for this image                     | `coverStyle`            | N/A             | v0 missing                    |
| Replaces the src in case of errors                                      | `errorSrc` [DEPRECATED] | N/A             | _See `onLoadingStateChanged`_ |
| Determines how the image is scaled and cropped to fit the frame         | `imageFit`              | `fluid`         | partially matching            |
| Expands image frame to fill its parent container                        | `maximizeFrame`         | `fluid`         | partially matching            |
| Optional callback for when the image load state changed                 | `onLoadingStateChanged` | N/A             | v0 missing                    |
| Fades the image in when loaded                                          | `shouldFadeIn`          | N/A             | v0 missing                    |
| The image starts as visible and is hidden on error                      | `shouldStartVisible`    | N/A             | v0 missing                    |
| Provides customized styling that will layer on top of the variant rules | `styles`                | `styles`        | matching                      |
| Theme provided by HOC                                                   | `theme`                 | `variables`     | matching                      |
| Accessibility behavior overridden by the user                           | N/A                     | `accessibility` | v7/v8 missing                 |
| Alternative text                                                        | N/A                     | `alt`           | v7/v8 missing                 |
| ARIA label                                                              | N/A                     | `aria-label`    | v7/v8 missing                 |
| An element type to render as (string or component)                      | N/A                     | `as`            | v7/v8 missing                 |
| An image may be formatted to appear inline with text as an avatar       | N/A                     | `avatar`        | v7/v8 missing                 |
| An image can appear circular                                            | N/A                     | `circular`      | v7/v8 missing                 |
| Component design prop                                                   | N/A                     | `design`        | v7/v8 missing                 |
| Image source URL                                                        | N/A                     | `src`           | v7/v8 missing                 |

## Proposed API

See [react-image/Image.types.ts] for the API.

[react-image/image.types.ts]: https://github.com/microsoft/fluentui/blob/master/packages/react-image/src/components/Image/Image.types.ts

| Name       | Type      | Default value | Comments                                     |
| ---------- | --------- | ------------- | -------------------------------------------- |
| `alt`      | `string`  | `undefined`   |                                              |
| `bordered` | `boolean` | `false`       |                                              |
| `fit`      | `string`  | "`none`"      | One of: `none`, `center`, `contain`, `cover` |
| `fluid`    | `boolean` | `false`       |                                              |
| `circular` | `boolean` | `false`       |                                              |
| `rounded`  | `boolean` | `false`       |                                              |
| `src`      | `string`  | `undefined`   |                                              |

## Sample code

### Bordered

```tsx
<Image bordered src="..." />
```

### Fluid

```tsx
<Image fluid src="..." />
```

### Rounded

```tsx
<Image rounded src="..." />
```

### Circular

```tsx
<Image circular src="..." />
```

### Fit

#### None

```tsx
<Image fit="none" src="..." />
```

#### Center

```tsx
<Image fit="center" src="..." />
```

#### Contain

```tsx
<Image fit="contain" src="..." />
```

#### Cover

```tsx
<Image fit="cover" src="..." />
```
