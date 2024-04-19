# @fluentui/react-image

## Background

Image is a visual representation of some content, such as a photo, illustration etc.

## Concerns

Based on the OpenUI research and the Figma specification, Image seems to be one of those components that is purely styling, thus I would appreciate your answers in any of these questions:

- Are there any components would need to use Image?
- Apart from styling, are there any other functionalities for Image?

  **Conclusion**: Some potential features that Image can have are:

  - fallback image placeholder when image fails to load
  - onLoading callback when image fails to load
  - styling helpers
    These will be addressed on later iterations when needed

- Is there any benefit of having Image as a component? (taking into consideration that it is css styling and we will need to maintain it over time.)

  **Conclusion**: The image component will ensure correct styling and behaviour regardless of the Theme

## Prior Art

- Convergence epic issue: [#16658](https://github.com/microsoft/fluentui/issues/16658)
- Open UI research [Link](https://open-ui.org/components/image.research), PR: [#274](https://github.com/openui/open-ui/pull/274)

### V8/v0 comparison

Comparison done in: [#17608](https://github.com/microsoft/fluentui/pull/17608)

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
| An element type to render as (string or component)                      | N/A                     | `as`            | v7/v8 missing                 |
| An image may be formatted to appear inline with text as an avatar       | N/A                     | `avatar`        | v7/v8 missing                 |
| An image can appear circular                                            | N/A                     | `circular`      | v7/v8 missing                 |
| Component design prop                                                   | N/A                     | `design`        | v7/v8 missing                 |
| Image source URL                                                        | N/A                     | `src`           | v7/v8 missing                 |

### v8 usage

```jsx
import { Image, ImageFit } from '@fluentui/react/lib/Image';

<Image maximizeFrame imageFit={ImageFit.contain} src="..." alt="Example of the image component in v8" />;
```

### v0 usage

```jsx
<Image block src="..." alt="Example of the image component in v0" />
```

## Variants

n/a

## API proposal

See API at [Image.types.ts](./src/components/Image/Image.types.ts).

Proposed component props:

| Name       | Type      | Default value | Comments                                     |
| ---------- | --------- | ------------- | -------------------------------------------- |
| `bordered` | `boolean` | `false`       |                                              |
| `fit`      | `string`  | `"none"`      | One of: `none`, `center`, `contain`, `cover` |
| `block`    | `boolean` | `false`       |                                              |
| `shape `   | `string ` | `"square"`    | One of: `square`, `circular` , `rounded`     |
| `shadow`   | `boolean` | `false`       |                                              |

All native html attributes of the `<img />` will be available to be used as props of the Image component.

## Sample Code

Sample code based on the proposed API:

### Bordered

```jsx
<Image bordered src="..." />
```

### Block

```jsx
<Image block src="..." />
```

### Rounded

```jsx
<Image shape="rounded" src="..." />
```

### Circular

```jsx
<Image shape="circular" src="..." />
```

### Fit

```jsx
// None
<Image fit="none" src="..." />

// Center
<Image fit="center" src="..." />

// Contain
<Image fit="contain" src="..." />

// Cover
<Image fit="cover" src="..." />
```

## Structure

### Public

```tsx
<Image src=".." />
```

### Internal

```tsx
<slots.root {...slotProps.root} />
```

### DOM

```tsx
<img src="..." class="...">
```

## Migration

See [MIGRATION.md](./MIGRATION.md).

## Accessibility

Images should include the `alt` attribute that includes a description of the image's content and function to be accessible to assistive technologies. The alt description should be concise and clearly communicate the meaning and purpose of the image on where it was included. Avoid using "image of", "picture of" etc. as it is redundant.

The images that are only decorative and do not have the structural relevance implied by the semantic element should use the `alt=""` (null alt text) or `role="presentation"`/`role="none"` which will remove the semantic meaning of the element. In case the image is needed to be removed from the accessibility tree then `aria-hidden="true"` can be used.

### Relevant documents

- [WAI-ARIA 1.1 img Spec](https://www.w3.org/TR/wai-aria-1.1/#img)
- [WAI-ARIA 1.2 img Spec](https://www.w3.org/TR/wai-aria-1.2/#img)
- [WAI-ARIA 1.1 Hiding Semantics](https://www.w3.org/TR/wai-aria-practices-1.1/#presentation_role)
