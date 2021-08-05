# Text Migration

## Introduction

This guide is a reference for upgrading from Fabric or Northstar into our converged library.

## Property mapping

Below you'll find a table with the relations between the properties of Fabric/Northstar and the converged version of Text to make it clear for you which property to use with the new version.

> ⚠️ Note - Properties not in this table are considered deprecated.
> You can find the full migration guide below.

| Fabric (v8) | Northstar (v0) | Converged (vNext) | Good to go? |
| ----------- | -------------- | ----------------- | ----------- |
| as          | as             | as                | ✔️          |
| className   | className      | className         | ✔️          |
| variant     | size           | size              | ⚠️          |
| block       | -              | block             | ✔️          |
| nowrap      | -              | wrap              | ⚠️          |
| -           | align          | align             | ✔️          |
| -           | content        | children          | ⚠️          |
| -           | styles         | styles            | ✔️          |
| -           | truncated      | truncate          | ⚠️          |
| -           | weight         | weight            | ⚠️          |
| -           | -              | font              | -           |
| -           | -              | italic            | -           |
| -           | -              | strikethrough     | -           |
| -           | -              | underline         | -           |

---

## Migration from v8 (Fabric)

### as

_This property suffered no changes and can be left as is._

### block

_This property suffered no changes and can be left as is._

### className

_This property suffered no changes and can be left as is._

### nowrap

The `nowrap` property was changed to `wrap` and it is `true` by default. You can achieve the same result as `nowrap` by using:

```
<Text wrap={false}>Not wrapped</Text>
```

### variant

Variants are now represented with tokens that you can define on the Theme. These are the token sizes for the default theme:

<h4 id="size-table">Size token table</h4>

| Size token | font-size | line-height |
| ---------- | --------- | ----------- |
| 100        | 10px      | 14px        |
| 200        | 12px      | 16px        |
| 300        | 14px      | 20px        |
| 400        | 16px      | 22px        |
| 500        | 20px      | 28px        |
| 600        | 24px      | 32px        |
| 700        | 28px      | 36px        |
| 800        | 32px      | 40px        |
| 900        | 40px      | 52px        |
| 1000       | 68px      | 92px        |

You can use them with Text as such:

```
<Text size={300}>Not wrapped</Text>
```

---

## Migration from v0 (Northstar)

### as

_This property suffered no changes and can be left as is._

### truncated

To achieve the same result with the new `truncate` property, you'll need to do the following:

```
<Text block truncate wrap={false}>Not wrapped</Text>
```

This is due to `truncate` changing the CSS property `text-overflow` to `ellipsis`.
Since `text-overflow` doesn't force an overflow to occur, properties `overflow` and `white-space` also need to be set. These two are set by the `wrap` property when set as `false`.
Finally, `block` is required as `Text` is displayed as `inline` by default.

_Read more about the CSS props:_

- _[text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)_
- _[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)_
- _[white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)_
- _[display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)_

### size

Sizes are now represented with tokens that you can define on the Theme. Refer to the [Size Table](#size-table) above for more information about the absolute values for the tokens..

### align

_This property suffered no changes and can be left as is._

### atMention [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->

#### atMention / atMention={true}

<!-- siteVariables.colors.brand[600] -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### atMention="me"

<!-- siteVariables.colors.orange[400] -->
<!-- siteVariables.fontWeightBold -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
     fontWeight:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### color

This property was deprecated. Below is a simple example on how to achieve the same result:

```
const useStyles = makeStyles(theme => ({
  root: {
    color: //Your color here
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

_Read more about the CSS prop: [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)_

### content

The `content` prop works the same way as the native `children` prop in React.
You can either use:

```
<Text children="Hello World!" />
```

Or the common and recomended way:

```
<Text>Hello World!</Text>
```

### disabled [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->
<!-- siteVariables.colors.grey[250] -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### error [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->
<!-- siteVariables.colorScheme.red.foreground -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### important [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->
<!-- siteVariables.colors.red[400] -->
<!-- siteVariables.fontWeightBold -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
     fontWeight:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### success [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->
<!-- siteVariables.colors.green[600] -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### temporary [DEPRECATED]

This property was deprecated. Below is a simple example on how to achieve the same result:

```
const useStyles = makeStyles(theme => ({
  root: {
     fontStyle: 'italic'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### timestamp [DEPRECATED] - 🚧 WIP 🚧

This property was deprecated. Below is a simple example on how to achieve the same result:

<!-- TODO: Validate what's the matching color here for Fluent -->
<!-- siteVariables.colorScheme.default.foreground1 -->

```
const useStyles = makeStyles(theme => ({
  root: {
     color:
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### variables [DEPRECATED] - 🚧 WIP 🚧

<!-- TODO: Figure out origin and replacement for this -->

### weight - 🚧 WIP 🚧

Usage and name of the `weight` property remain the same, but the values have been reduced.
Find below the old and new values:

<!-- TODO: Figure out if it's a direct match -->

| Old Value   | New Value  |
| ----------- | ---------- |
| `light`     | `-`        |
| `semilight` | `-`        |
| `regular`   | `regular`  |
| `-`         | `medium`   |
| `semibold`  | `semibold` |
| `bold`      | `-`        |

### className

_This property suffered no changes and can be left as is._

### styles

_This property suffered no changes and can be used as is left we highly recommend that you migrate to the `make-styles` styling solution_

---

## Examples

<!-- TODO: But what are we to do? -->
