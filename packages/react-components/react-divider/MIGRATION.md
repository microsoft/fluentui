# Divider Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The existing `Separator` control supports the `content` property as well as children nodes. The `content` property has been removed and now only supports children.

With the new converged capabilities, both the `styles` and `theme` properties are no longer supported.

Properties that are still available are the `alignContent` and `vertical` with the same acceptable values that are currently defined.

## Migration from v0

The v0 Divider is close to the converged Divider. Again, as with the Separator control, the `content` property in the converged component is not supported.

Also, from design discussion, the converged component does not support the `size` component as it is redundant as it can be replicated through using the `borderSize` property and if needed, update the `fontSize` property to match desired style.

The `fitted` property also is not in use as by default the `Divider` can use the standard `margin` | `marginLeft` | `marginRight` | `marginTop` | `marginBottom` properties to adjust as needed. The default margin for the divider is 0.

## Property mapping

| v8 `Separator` | v0 `Divider` | Converged `Divider`   |
| -------------- | ------------ | --------------------- |
| alignContent   | -            | alignContent          |
| vertical       | vertical     | vertical              |
| theme          | -            | (tokens)              |
| styles         | -            | (tokens)              |
| -              | color        | color                 |
| -              | size         | fontSize & borderSize |
| -              | important    | important             |
| -              | fitted       | margin properties     |
| -              | -            | inset                 |
| -              | -            | borderStyle           |
| -              | -            | borderSize            |
| -              | -            | appearance            |

## Examples

```
<Divider content="My Content">
<Divider>My Content</Divider>
```

_Note:_ The property theme from the separator control has been removed

```
<Separator theme={myTheme}>
<Divider /> /* Handled by the theme provider */
```

_Note:_ The property styles from the separator control has been removed and now uses the inherent react style mechanics

```
<Separator styles={myStyles}>
<Divider style={{ direction:ltr }}/>
/* Handled by the theme provider / Tokens */
```
