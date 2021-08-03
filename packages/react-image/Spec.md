# @fluentui/react-image

## Background

Image is a visual representation of some content, such as a photo, illustration etc.

## Concerns

Based on the OpenUI research and the Figma specification, Image seems to be one of those components that is purely styling, thus I would appreciate your answers in any of these questions:

- Are there any components would need to use Image?
- Apart from styling, are there any other functionalities for Image?
- Is there any benefit of having Image as a component? (taking into consideration that it is css styling and we will need to maintain it over time.)

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
<Image fluid src="..." alt="Example of the image component in v0" />
```

## Variants

n/a

## API proposal

See [react-image/Image.types.ts] for the API.

[react-image/image.types.ts]: https://github.com/microsoft/fluentui/blob/master/packages/react-image/src/components/Image/Image.types.ts

Proposed component props:

| Name       | Type      | Default value | Comments                                     |
| ---------- | --------- | ------------- | -------------------------------------------- |
| `bordered` | `boolean` | `false`       |                                              |
| `fit`      | `string`  | "`none`"      | One of: `none`, `center`, `contain`, `cover` |
| `fluid`    | `boolean` | `false`       |                                              |
| `circular` | `boolean` | `false`       |                                              |
| `rounded`  | `boolean` | `false`       | rounded corners                              |

All native html attributes of the `<img />` will be available to be used as props of the Image component.

## Sample Code

Sample code based on the proposed API:

### Bordered

```jsx
<Image bordered src="..." />
```

### Fluid

```jsx
<Image fluid src="..." />
```

### Rounded

```jsx
<Image rounded src="..." />
```

### Circular

```jsx
<Image circular src="..." />
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

## Tech Sync follow-up: Placeholder Image fallback

Currently the Design Spec for Image defines the default browser fallback when an image fails to load. However, during Tech Sync it was porposed as a desired feature for Image. Thus, the two ways we can implement this are:

### - Using the `<figure>` tag

Another way to achieve the fallback placeholder is using the `<figure>` tag which allows nested `<img>` elements.

```jsx
//Usage:
  <Image>
    <Img src=".." alt="..."/>
    <PlaceholderImage src="..." alt="..."/>
  </Image>


// DOM:
  <figure>
    <img src="..." alt="..."/>
    <img src="..." alt="..."/>
  <figure>
```

<!-- #### Difference between `<img/>` and `<figure>` -->

### - Using GlobalEventHandler.onError/onLoad

It is possibe to use the [GlobalEventHandler.onError](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#element.onerror) and/or [GlobalEventHandler.onLoad](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload) directly on the `<img>` tag in order to show a placeholder image for a load failure.

_Note: The [onerror](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement#errors) is marked as depricated for HTMLImageElement, however there are no other documentation regarding the GlobalEventHandler or if it should be used or not._

Using the onLoad/onError callbacks it is possible to change the `src` and `alt` values so that we would show either the image or the fallback image based on image load success/faliure. Since there is no design specification regarding the type of placeholder it should be, a prop would be added `placeholderImage` that would expect an `src` and an `alt` value from the user.

Usage:

```jsx
<Image
  alt="Amanda's avatar"
  rounded
  src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBradyaa.jpg"
  //Because there is no design specificaion, assumtion is made that the placeholder will be provided by the user
  placeholderImage={{
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder Image',
  }}
  height={200}
  width={200}
/>
```

<!-- ## Migration -->

<!-- _Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_ -->

## Accessibility

Images should always include the `alt` attribute along with a description of the content and function of the image to be accessible to screeen readers. Avoid using "image of", "picture of" etc. on the alt description. The images that are only decorative and do not have the structural relevance implied by the semantic element should use the `aria-hidden` which will imply that the image is decoration only.

### Relevant documents

- [WAI-ARIA 1.1 img Spec](https://www.w3.org/TR/wai-aria-1.1/#img)
- [WAI-ARIA 1.2 img Spec](https://www.w3.org/TR/wai-aria-1.2/#img)
- [WAI-ARIA 1.1 Hiding Semantics](https://www.w3.org/TR/wai-aria-practices-1.1/#presentation_role)
