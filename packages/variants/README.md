# [variants](https://dev.microsoft.com/fabric)

Variants are [themes](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Theming) generated from an existing theme, as opposed to [from raw colors](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator). A variant will share the same colors as the original theme it was generated from, but will use those colors differently. For example, the background color and text color might be swapped. Variants can be used to highlight or de-emphasize portions of the page.

Example of normal, soft, and strong variants:

![example of variants](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/variants/example.png)

This project provides helper functions to create variants of a given theme, which can be used with the [Customizer](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/utilities/src/Customizer.tsx) component to theme a specific portion of the page. Each function takes in an [IPartialTheme](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/interfaces/ITheme.ts) and returns an [ITheme](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/interfaces/ITheme.ts).

The following example uses [getTheme()](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/styles/theme.ts) to grab the current global theme, then creates a strong variant of the that theme, and applies that strong variant to the components wrapped by Customizer.

```
<Customizer settings={ { theme: getStrongVariant(getTheme()) } }>
  <components... />
</Customizer>
```

The available variants are:

- `getNeutralVariant(theme: IPartialTheme): ITheme`
  - Neutral - a soft neutral color is used as the background (light gray in the default theme), most other colors are changed very little or not at all
- `getSoftVariant(theme: IPartialTheme): ITheme`
  - Soft - a soft shade of the primary color is used as the background (light blue in the default theme), most other colors are changed very little or not at all, but input controls look different
- `getStrongVariant(theme: IPartialTheme): ITheme`
  - Strong - a strong shade of the primary color is used as the background (blue in the default theme), almost all colors are changed
