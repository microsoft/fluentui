# Image Migration

## Introduction

This guide is a reference for upgrading the `Image` component from v8 or v0 to v9 .

> **A note on the styling in the examples below.** The "after" snippets on this page are written with
> `makeStyles`. As of the vNEXT major, `makeStyles` is no longer re-exported from
> `@fluentui/react-components` (add `@griffel/react` as a dependency to run them verbatim), and v9
> no longer authors its own styles that way. The shipped
> equivalent is ordinary CSS (a stylesheet, a CSS Module, Tailwind) passed through `className`, with
> theme values referenced as custom properties such as `var(--colorNeutralForeground2)`. See
> [Styling components](https://react.fluentui.dev/?path=/docs/concepts-developer-styling-components--docs).

## Migration from v8

### Property mapping

The table below presents a mapping of props between the v8 and v9 `Image` components in order to clarify which properties require changes to achieve the same result.

> ⚠️ Note - Properties not in this table are considered deprecated.

| v7 / v8                 | v9              | Good to go? |
| ----------------------- | --------------- | ----------- |
| `className`             | `className`     | ✔️          |
| `coverStyle`            | `fit="cover"`   | ⚠️          |
| `imageFit`              | `fit="contain"` | ✔️          |
| `maximizeFrame`         | `block`         | ✔️          |
| `loading`               | -               | ❌          |
| `onLoadingStateChanged` | -               | ❌          |
| `shouldFadeIn`          | -               | ❌          |
| `shouldStartVisible`    | -               | ❌          |
| `styles`                | -               | ❌          |
| `theme`                 | -               | ❌          |

### className

_This property has not changed and can be left as is._

### coverStyle

The behaviour of this prop can be achieved using the `fit` prop with the value of `cover`.

```jsx
<Image src="example.jpg" fit="cover" />
```

### imageFit

This can be achieved using the `fit` prop by asigning the value of `contain`.

```jsx
<Image src="example.jpg" fit="contain" />
```

### maximizeFrame

This prop has been renamed to `block` which will result in the same behaviour as before.

```jsx
<Image src="example.jpg" block />
```

### loading

For v9, this feature is no longer supported. The alternative is to use the global events such as: `onLoad`, `onError` to detect the image loading state.

### onLoadingStateChanged

For v9, this feature is no longer supported. The alternative would be to use the global events such as: `onLoad`, `onError` to detect the image loading state.

### shouldFadeIn

For v9, this feature is no longer supported. The alternative is to apply the animation with your own CSS and the global event `onLoad`. Below is an example of a migration:

```css
/* MyComponent.module.css */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn400 {
  animation-name: fade-in;
  animation-iteration-count: infinite;
  animation-duration: 0.367s;
}
```

```jsx
import { useState } from 'react';
import { Image } from '@fluentui/react-image';
import styles from './MyComponent.module.css';

const MyComponent = () => {
  const [isLoaded, setLoaded] = useState(false);

  return <Image src="example.jpg" onLoad={() => setLoaded(true)} className={!isLoaded ? styles.fadeIn400 : ''} />;
};
```

### shouldStartVisible

For v9, this feature is no longer supported. The alternative would be to use the global events such as: `onLoad` and `onError` to achieve the same behaviour. Below is an example showcasing this:

```css
/* App.module.css */
.hidden {
  display: none;
}
```

```jsx
import { useState } from 'react';
import { Image } from '@fluentui/react-image';
import styles from './App.module.css';

export default function App() {
  const [isLoaded, setLoaded] = useState(null);

  return (
    <Image
      src="https://via.placeholder.com/300x300"
      alt="Example image"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(false)}
      className={isLoaded === false ? styles.hidden : ''}
    />
  );
}
```

### styles

For v9, you should do style customizations with your own CSS through the `className` prop.

### theme

For v9, you should reference the theme's CSS variables (e.g. `var(--colorNeutralForeground1)`) in your CSS, with `FluentProvider` supplying the token values.

## Migration from v0

### Property mapping

The table below presents a mapping of props between the v0 and v9 versions of `Image` in order to make it clear which properties require changes to achieve the same result.

| v0              | v9                 | Good to go? |
| --------------- | ------------------ | ----------- |
| `accessibility` | -                  | ❌          |
| `alt`           | `alt`              | ✔️          |
| `aria-label`    | `aria-label`       | ✔️          |
| `as`            | -                  | ❌          |
| `avatar`        | `shape="circular"` | ✔️          |
| `circular`      | `shape="circular"` | ✔️          |
| `className`     | `className`        | ✔️          |
| `fluid`         | `block`            | ✔️          |
| `styles`        | -                  | ❌          |
| `variables`     | -                  | ❌          |

### accessibility

For v9, this property is no longer supported. It is recommended to follow the best practices of a11y in order for Image to be accessible to assistive tools. Thus:

- It is important for `Image` to have the `alt` description.
- In case the `Image` is decorative only, have either `role="presentation"` or `aria-hidden`. Ensure the correct usage of these two attributes, based on your objectives.

### alt

_This property has not changed and can be left as is._

### aria-label

_This property has not changed and can be left as is._

### as

For v9, this property is no longer supported. The `Image` prop will always be an `<img/>` element, it is not possible to show an image as any other element.

### avatar

This can be achieved using the `shape` prop with the value of `circular`.

```jsx
<Image src="example.jpg" shape="circular" />
```

### circular

This can be achieved using the `shape` prop with the value of `circular`.

```jsx
<Image src="example.jpg" shape="circular" />
```

### className

_This property has not changed and can be left as is._

### fluid

This prop has been renamed to `block` which will result into the same behaviour as before.

```jsx
<Image src="example.jpg" block />
```

### styles

For v9, you should do style customizations with your own CSS through the `className` prop.

### variables

For v9, this feature is no longer supported. The alternative is to apply styles through `make-styles`. Below is an example of a migration:

#### v0 implementation

```jsx
const MyComponent = () => {
  return <Image src="example.jpg" variables={{ width: '100px' }} />;
};
```

#### v9 implementation

```css
/* MyComponent.module.css */
.width100 {
  width: 100px;
}
```

```jsx
import { Image } from '@fluentui/react-image';
import styles from './MyComponent.module.css';

const MyComponent = () => {
  return <Image src="example.jpg" className={styles.width100} />;
};
```
