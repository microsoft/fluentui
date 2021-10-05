# Image Migration

## Introduction

This guide is a reference for upgrading the Image component from v8 (Fabric) or v0 (Northstar) to v9 (FluentUI vNext).

## Migration from v8 (Fabric)

### Property mapping

The table below presents a mapping of props between the v8 (FabricUI) and v9 (Fluent UI vNext) in order to clarify which properties require changes to achieve the same result.

> ⚠️ Note - Properties not in this table are considered deprecated.

| v7 / v8                 | v9      | Good to go? |
| ----------------------- | ------- | ----------- |
| `className`             | -       | ✔️          |
| `coverStyle`            | `fit`   | ⚠️          |
| `imageFit`              | `fit`   | ✔️          |
| `maximizeFrame`         | `block` | ✔️          |
| `loading`               | -       | ✔️          |
| `onLoadingStateChanged` | -       | ❌          |
| `shouldFadeIn`          | -       | ❌          |
| `shouldStartVisible`    | -       | ❌          |
| `styles`                | -       | ❌          |
| `theme`                 | -       | ❓          |

### className

_This property suffered no changes and can be left as is._

### coverStyle

The bahviour of this prop can be achived using the `fit` prop with the value of `cover`.

```
<Image src="example.jpg" fit="cover"/>
```

### imageFit

This can be achieved with the `fit` prop by asigning the value of `contain`.

```
<Image src="example.jpg" fit="contain"/>
```

### maximizeFrame

This prop has been renamed to `block` which will result into the same behaviour as before.

```
<Image src="example.jpg" block>
```

### loading

_This property suffered no changes and can be used as is._

### onLoadingStateChanged

For v9, this feature is no longer supported. The alternative would be to use the global events such as: `onLoad`, `onError` to detect the state of image loading.

### shouldFadeIn

For v9, this feature is no longer supported. The alternative is to apply the animation through `make-styles` and using the global event `onLoad`. Below is an example of a migration:

> ⚠️❌🚧 Note - This snipped needs changes!! ❌🚧

```jsx
const useStyles = makeStyles(theme => ({
  fadeIn400: {
    animationName: {
      '0px' : {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    //need to change
    animationIterationCount: 'normal',
    animationDuration: '3s',
  },
})

const MyComponent = () => {
    const [isLoaded, setLoaded] = useState(false);
    const styles = useStyles()

    return <Image src="example.jpg" onLoad={()=> setLoaded(true)} className={!isLoaded? styles.fadeIn400 ? ''} />
}
```

### shouldStartVisible

For v9, this feature is no longer supported. Alternatively, you can use the global events `onLoad` and `onError` to achieve the same behaviour. Below is an example showcasing this:

```jsx
import { useState } from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
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

_This property suffered no changes and can be used as is. However, we highly recommend that you migrate to a `make-styles` styling solution for performance reasons._

### theme

_This property suffered no changes and can be used as is. However, we highly recommend that you migrate to a `make-styles` styling solution for performance reasons._

## Migration from v0 (Northstar)

### Property mapping

The table below presents a mapping of props between the v0 and v9 versions in order to make it clear which properties require changes to achieve the same result.

| v0              | v9                 | Good to go? |
| --------------- | ------------------ | ----------- |
| `accessibility` | -                  | ❌          |
| `alt`           | -                  | ✔️          |
| `aria-label`    | -                  | ✔️          |
| `as`            | -                  | ❌          |
| `avatar`        | `shape="circular"` | ✔️          |
| `circular`      | `shape="circular"` | ✔️          |
| `className`     | -                  | ✔️          |
| `fluid`         | `block`            | ✔️          |
| `styles`        | -                  | ❌          |
| `variables`     | -                  | ❌          |

### accessibility

This property is no longer in the v9. It is recommended to follow the best practices of a11y in order for Image to be accessible to assistive tools. Thus:

- It is important for Image to have the `alt` description
- In case the Image is decorative only then to have either `role="presentation"` or `aria-hidden`. Plese ensure the correct usage of these two attributes, based on your objectives.

### alt

_This property suffered no changes and can be left as is._

### aria-label

_This property suffered no changes and can be left as is._

### as

This property is no longer in the v9. The Image prop will always be an `<img/>` element, it is not possible to show an image as any other element.

### avatar

This can be achieved using the `shape` prop with the value of `circular`.

```
<Image src="example.jpg" shape="circular"/>
```

### circular

This can be achieved using the `shape` prop with the value of `circular`.

```
<Image src="example.jpg" shape="circular"/>
```

### className

_This property suffered no changes and can be left as is._

### fluid

The behaviour of the `fluid` prop can be achieved with the use of the `block` prop.

```
<Image src="example.jpg" block/>
```

### styles

_This property suffered no changes and can be used as is. However, we highly recommend that you migrate to a `make-styles` styling solution for performance reasons._

### variables

For v9, this feature is no longer supported. The alternative is to apply styles through `make-styles`. Below is an example of a migration:

#### v0 (Northstar) implementation

```
const MyComponent = () => {
  return <Image src="example.jpg" variables={{ width: '100px' }} />
}
```

#### v9 (Fluent UI vNext) implementation

```
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
