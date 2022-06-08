# Image Migration

## Introduction

This guide is a reference for upgrading the `Image` component from v8 or v0 to v9 .

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

For v9, this feature is no longer supported. The alternative is to apply the animation through `make-styles` and using the global event `onLoad`. Below is an example of a migration:

```jsx
import { useState } from 'react';
import { Image } from '@fluentui/react-image';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles(theme => ({
  fadeIn400: {
    animationName: {
      from : {
        opacity: 0,
      },
      to: {
        opacity: 1,
      }
    },
    animationIterationCount: 'infinite',
    animationDuration: '0.367s',
  },
})

const MyComponent = () => {
    const [isLoaded, setLoaded] = useState(false);
    const styles = useStyles()

    return <Image src="example.jpg" onLoad={()=> setLoaded(true)} className={!isLoaded? styles.fadeIn400 : ''} />
}
```

### shouldStartVisible

For v9, this feature is no longer supported. The alternative would be to use the global events such as: `onLoad` and `onError` to achieve the same behaviour. Below is an example showcasing this:

```jsx
import { useState } from 'react';
import { makeStyles } from '@griffel/react';
import { Image } from '@fluentui/react-image';

const useStyles = makeStyles({
  root: {
    display: 'none',
  },
});

export default function App() {
  const [isLoaded, setLoaded] = useState(null);

  const styles = useStyles();

  return (
    <Image
      src="https://via.placeholder.com/300x300"
      alt="Example image"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(false)}
      className={isLoaded === false ? styles.root : ''}
    />
  );
}
```

### styles

For v9, you should migrate to use `make-styles` and do style customizations through the `className` prop.

### theme

For v9, you should use `tokens` in conjunction with `make-styles` and `FluentProvider` to achieve theming correctly.

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

For v9, you should migrate to use `make-styles` and do style customizations through the `className` prop.

### variables

For v9, this feature is no longer supported. The alternative is to apply styles through `make-styles`. Below is an example of a migration:

#### v0 implementation

```jsx
const MyComponent = () => {
  return <Image src="example.jpg" variables={{ width: '100px' }} />;
};
```

#### v9 implementation

```jsx
import { Image } from '@fluentui/react-image';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles(theme => ({
  width100: {
     width: '100px'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Image src="example.jpg" className={styles.width100} />
}
```
