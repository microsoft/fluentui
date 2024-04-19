# Text Migration

## Introduction

This guide is a reference for upgrading from v7 (Fabric) or v0 (Northstar) into v9 (Fluent UI / converged).

## Property mapping

Below you'll find a table with the relations between the properties of Fabric/Northstar and the converged version of Text to make it clear for you which properties require changes or are deprecated with the new version.

> ⚠️ Note - Properties not in this table are considered deprecated.
> You can find how to migrate them below.

| v8 (Fabric) | v0 (Northstar) | v9 (Fluent UI) | Good to go? |
| ----------- | -------------- | -------------- | ----------- |
| as          | as             | as             | ✔️          |
| className   | className      | className      | ✔️          |
| variant     | size           | size           | ⚠️          |
| block       | -              | block          | ✔️          |
| nowrap      | -              | wrap           | ⚠️          |
| -           | align          | align          | ✔️          |
| -           | content        | children       | ⚠️          |
| -           | styles         | styles         | ✔️          |
| -           | truncated      | truncate       | ⚠️          |
| -           | weight         | weight         | ⚠️          |

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

```tsx
<Text wrap={false}>Not wrapped</Text>
```

### variant

Variants are now represented with tokens that you can override on a theme level. These are the token sizes for the default theme:

<h4 id="size-table">Fluent UI size tokens</h4>

| Token | font-size | line-height |
| ----- | --------- | ----------- |
| 100   | 10px      | 14px        |
| 200   | 12px      | 16px        |
| 300   | 14px      | 20px        |
| 400   | 16px      | 22px        |
| 500   | 20px      | 28px        |
| 600   | 24px      | 32px        |
| 700   | 28px      | 36px        |
| 800   | 32px      | 40px        |
| 900   | 40px      | 52px        |
| 1000  | 68px      | 92px        |

You can use them with Text as such:

```tsx
<Text size={300}>Text</Text>
```

---

## Migration from v0 (Northstar)

> ⚠️ Note - The Teams specific functionality will only be partially covered in this guide.
> Given that most properties depend on Teams design tokens and there is yet no relationship table created for Teams to Fluent UI tokens, only the absolute values and Northstar token names will be provided.

### as

_This property suffered no changes and can be left as is._

### truncated

To achieve the same result with the new `truncate` property, you'll need to do the following:

```tsx
<Text block truncate wrap={false}>
  Not wrapped
</Text>
```

This is due to `truncate` changing the CSS property `text-overflow` to `ellipsis`.
Since `text-overflow` doesn't force an overflow to occur, properties `overflow` and `white-space` also need to be set. These two are set by the `wrap` property when set as `false`.
Finally, `block` is required as `Text` is now displayed as `inline` by default and without it the container will grow according to the content.

_Read more about the CSS props:_

- _[text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)_
- _[overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)_
- _[white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)_
- _[display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)_

### size

While the name remains the same, the values are now represented with integer tokens that you can override on a theme level. Please refer to the [Fluent UI size table](#size-table) above for more information about the absolute values for the tokens.

You can use them with Text as such:

```tsx
<Text size={300}>Text</Text>
```

### align

_This property suffered no changes and can be left as is._

### atMention [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

#### Using `atMention` / `atMention={true}`

##### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colors.brand[600]`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(98, 100, 167)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

##### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.brand[400]`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(166, 167, 220)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

##### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.accessibleYellow`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(255, 255, 1)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

#### Using `atMention="me"`

##### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colors.orange[400]`
- Font weight: `siteVariables.fontWeightBold`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(204, 74, 49)',
    fontWeight: 700,
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

##### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.orange[300]`
- Font weight: `siteVariables.fontWeightBold`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(233, 117, 72)',
    fontWeight: 700,
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

##### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.accessibleYellow`
- Font weight: `siteVariables.fontWeightBold`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(255, 255, 1)',
    fontWeight: 700,
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

### color

This property was deprecated. Below is a simple example on how to achieve the same result:

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: '__ put your color there __',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

_Read more about the CSS prop: [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)_

### content

The `content` prop works the same way as the native `children` prop in React.
You can either use:

```tsx
<Text children="Hello World!" />
```

Or the common and recomended way:

```tsx
<Text>Hello World!</Text>
```

### disabled [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

#### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colors.grey[250]`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(200, 198, 196)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.grey[450]`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(96, 94, 92)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.accessibleGreen`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(63, 242, 63)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### error [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

#### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colorScheme.red.foreground`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(196, 49, 75)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.red[300]`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(231, 53, 80)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.red`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(255, 0, 0)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### important [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

#### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colors.red[400]`
- Font weight: `siteVariables.fontWeightBold`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(196, 49, 75)',
     fontWeight: 700
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.red[300]`
- Font weight: `siteVariables.fontWeightBold`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(231, 53, 80)',
     fontWeight: 700
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.red`
- Font weight: `siteVariables.fontWeightBold`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(255, 0, 0)',
     fontWeight: 700
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

### success [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

#### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colors.green[600]`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(35, 123, 75)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colors.green[200]`

```
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles(theme => ({
  root: {
     color: 'rgb(146, 195, 83)'
  },
})

const MyComponent = () => {
    const styles = useStyles()

    return <Text className={styles.root}>{...}</Text>
}
```

#### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.colors.green[200]`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(146, 195, 83)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

### temporary [DEPRECATED]

This property was deprecated. Given that this property depends on the applied style, you can find below examples on how to achieve the same results in the default, dark and high contrast themes:

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    fontStyle: 'italic',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

### timestamp [DEPRECATED]

This property was deprecated. Below is a simple example on how to achieve the same result:

#### **teamsTheme**

Northstar design tokens:

- Color: `siteVariables.colorScheme.default.foreground1`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(72, 70, 68)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

#### **teamsDarkTheme**

Northstar design tokens:

- Color: `siteVariables.colorScheme.default.foreground1`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(138, 136, 134)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

#### **teamsHighContrastTheme**

Northstar design tokens:

- Color: `siteVariables.colors.white`

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    color: 'rgb(255, 255, 255)',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

### variables [DEPRECATED]

For v9, this feature is no longer supported. The alternative is to apply styles through `makeStyles()` (see [Griffel](https://github.com/microsoft/griffel) docs for more details). Below is an example of a migration:

#### v0 (Northstar) implementation

```
const MyComponent = () => {
  return <Text disabled variables={{ disabledColor: 'red' }} />
}
```

#### v9 (Fluent UI) implementation

```tsx
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  red: {
    color: 'red',
  },
});

const MyComponent = () => {
  const styles = useStyles();

  return <Text className={styles.root}>{/* ... */}</Text>;
};
```

### weight

The name and the usage of the `weight` property remains the same. However, the allowed values have changed:

| Northstar   | Computated value | Fluent UI  |
| ----------- | ---------------- | ---------- |
| `light`     | 200              | -          |
| `semilight` | 300              | -          |
| `regular`   | 400              | `regular`  |
| -           | 500              | `medium`   |
| `semibold`  | 600              | `semibold` |
| `bold`      | 700              | -          |

### className

_This property suffered no changes and can be left as is._

### styles

_This property suffered no changes and can be used as is. However, we highly recommend that you migrate to `makeStyles()` (a [Griffel](https://github.com/microsoft/griffel) styling solution) for performance reasons._
