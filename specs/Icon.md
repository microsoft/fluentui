# Icon component specification

The `Icon` component provides a symbol, graphic or image that represents an application, a capability, or some other concept or specific entity with meaning for the user.

## Related variant considerations

The following section documents variants of the component that currently exist in Fabric and identifies variants that exist in other component libraries but don't currently exist in Fabric, documenting which component libraries have those variants.

### Variants existing in Fabric today

- `Font icons`
- `Image icons`

### Variants not in Fabric but that exist in other component libraries

- `Block icons`
  - In Gestalt
- `Bordered icons`
  - In Semantic UI
  - In Stardust
- `Circular icons`
  - In Semantic UI
  - In Stardust
- `Corner icons`
  - In Semantic UI
- `Focusable icons`
  - In Chakra UI
- `Group icons`
  - In Semantic UI
- `Inverted icons`
  - In Semantic UI
- `Outlined vs filled icons via props`
  - In Ant Design
- `Rotated icons`
  - In Ant Design
  - In Semantic UI
  - In Stardust
- `Spinning/Loading icons`
  - In Ant Design
  - In Semantic UI
- `Two tone icons`
  - In Ant Design
  - In Atlaskit

## Reference implementations

The following section documents links to different UI libraries implementations of Icons, while also providing a code sandbox with a side by side implementation of them for comparison.

- [Side-by-side implementations](https://codesandbox.io/s/icon-implementations-4d5gp)

- [Ant Design Icon docs](https://ant.design/components/icon/)

- [Atlaskit Icon docs](https://atlaskit.atlassian.com/packages/core/icon)

- [Base Web Icon docs](https://baseweb.design/components/icon/)

- [Chakra UI Icon docs](https://chakra-ui.com/icon)

- [Elemental UI Icon docs](http://elemental-ui.com/forms)

  - Look for the `Icons` section in the `Forms` page

- [Fabric Icon docs](https://developer.microsoft.com/en-us/fabric#/controls/web/icon)

- [Gestalt Icon docs](https://pinterest.github.io/gestalt/?ref=designrevision.com#/Icon)

- [Material-UI Icon docs](https://material-ui.com/components/icons/)

- [Semantic UI Icon docs](https://react.semantic-ui.com/elements/icon/)

- [Stardust Icon docs](https://microsoft.github.io/fluent-ui-react/components/icon/definition)

## Props

The following section documents the properties that will become part of the new component, as well as the process for mitigating all changes when moving from Fabric and Stardust to Fluent UI.

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |

### Recommended component props

| Name             |   Type    | Default value | Description                                                                                                                                 |
| ---------------- | :-------: | :-----------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaHidden`     | `boolean` |    `false`    | Indicates whether the element is exposed to an accessibility API.                                                                           |
| `ariaLabel`      | `string`  |               | Defines a string value that labels the current element.                                                                                     |
| `ariaLabelledby` | `string`  |               | Identifies the element (or elements) that labels the current element.                                                                       |
| `as`             | `string`  |               | Defines a component that should be used as the root element of the `Icon`.                                                                  |
| `className`      | `string`  |               | Defines an additional classname to provide on the root of the `Icon`.                                                                       |
| `name`           | `string`  |               | Defines the name of the pre-registered `Icon` to use. If the string is empty, a placeholder blank space of the same width will be rendered. |
| `role`           | `string`  |               | Defines the accessibility role of the `Icon`.                                                                                               |
| `title`          | `string`  |               | Specifies extra information about the `Icon`.                                                                                               |

### Props to be discussed

None at the moment.

### Fabric Icon props

https://developer.microsoft.com/en-us/fabric#/controls/web/icon

#### IIconProps interface

| Name           |                          Type                          | Notes                                                                            |
| -------------- | :----------------------------------------------------: | -------------------------------------------------------------------------------- |
| `ariaLabel`    |                        `string`                        |                                                                                  |
| `iconName`     |                        `string`                        | Should we rename this to just be `name`?                                         |
| `iconType`     |                       `IconType`                       | Already deprecated.                                                              |
| `imageErrorAs` |           `React.ComponentType<IImageProps>`           | Should be removed duo to unnecessary complexity and infrequent use.              |
| `imageProps`   |                     `IImageProps`                      | Should not be part of base `Icon`. Should be considered for `ImageIcon` variant. |
| `styles`       | `IStyleFunctionOrObject<IIconStyleProps, IIconStyles>` | Should be deprecated in favor of recomposition.                                  |
| `theme`        |                        `ITheme`                        | Should not show up in the public props contract.                                 |

### Stardust Icon props

#### IconProps interface

| Name            |      Type       | Notes                                                                                                     |
| --------------- | :-------------: | --------------------------------------------------------------------------------------------------------- |
| `accessibility` | `Accessibility` | Why would a user need this prop?                                                                          |
| `bordered`      |    `boolean`    | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |
| `circular`      |    `boolean`    | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |
| `disabled`      |    `boolean`    | Does it make sense for an `Icon` to be `disabled` if it is not an interactive component.                  |
| `name`          |    `string`     |                                                                                                           |
| `outline`       |    `boolean`    | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |
| `rotate`        |    `number`     | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |
| `size`          |   `SizeValue`   | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |
| `xSpacing`      | `IconXSpacing`  | Should this prop be provided or is this just a matter that could be solved via styling and recomposition? |

### Conversion process from Fabric 7 to Fluent UI Icon

#### IIconProps interface

| Name           | Action to take/taken                  | Property transitioned? |            Breaking change?             | Codemod/Shim created? |
| -------------- | ------------------------------------- | :--------------------: | :-------------------------------------: | :-------------------: |
| `ariaLabel`    | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `iconName`     | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `iconType`     | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `imageErrorAs` | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `imageProps`   | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `styles`       | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `theme`        | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |

### Conversion process from Stardust to Fluent UI Icon

#### IconProps interface

| Name            | Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| --------------- | -------------------- | :--------------------: | :--------------: | :-------------------: |
| `accessibility` | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `bordered`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `circular`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `disabled`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `name`          | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `outline`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `rotate`        | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `size`          | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `xSpacing`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |

## DOM Structure

The following section documents the DOM structure for the component from different component library examples and then suggests a recommended DOM taking into consideration common patterns between the libraries reviewed.

### Ant Design Icon

#### Example DOM

```html
<i aria-label="icon: home" class="anticon anticon-home">
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    class=""
    data-icon="home"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
    ></path>
  </svg>
</i>
```

#### Considerations

- Only supports SVG icons.

### Atlaskit Icon

#### Example DOM

```html
<span class="sc-gzVnrw fihEGT" aria-label="HomeIcon">
  <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation">
    <path
      d="M10 19v-4.5a2 2 0 1 1 4 0V19h4a1 1 0 0 0 1-1v-7.831l-6.293-6.296a1 1 0 0 0-1.414 0L5 10.169V18a1 1 0 0 0 1 1h4zm11-6.83V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5.83l-.04.04c-.39.39-1.03.39-1.42 0-.39-.39-.39-1.03 0-1.42l8.339-8.331a3 3 0 0 1 4.242 0l8.339 8.331c.39.39.39 1.03 0 1.42-.39.39-1.03.39-1.42 0l-.04-.04z"
      fill="currentColor"
    ></path>
  </svg>
</span>
```

#### Considerations

- Only supports SVG icons.
- To use provided icons you need to import built-in icon directly (i.e. `BookIcon`).

### Base Web Icon

#### Example DOM

```html
<svg data-baseweb="icon" viewBox="0 0 24 24" class="by bz c0 k2 kt">
  <title>Arrow Up</title>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M11.2929 6.29289C11.6834 5.90237 12.3166 5.90237 12.7071 6.29289L16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071C16.3166 12.0976 15.6834 12.0976 15.2929 11.7071L13 9.41421V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V9.41421L8.70711 11.7071C8.31658 12.0976 7.68342 12.0976 7.29289 11.7071C6.90237 11.3166 6.90237 10.6834 7.29289 10.2929L11.2929 6.29289Z"
  ></path>
</svg>
```

#### Considerations

- Only supports SVG icons.
- To use provided icons you need to import built-in icon directly (i.e. `ArrowUp`).

### Chakra UI Icon

#### Example DOM

```html
<svg viewBox="0 0 14 14" focusable="false" role="presentation" class="css-h7g82p">
  <path
    fill="currentColor"
    d="M2.20731,0.0127209 C2.1105,-0.0066419 1.99432,-0.00664663 1.91687,0.032079 C0.871279,0.438698 0.212942,1.92964 0.0580392,2.95587 C-0.426031,6.28627 2.20731,9.17133 4.62766,11.0689 C6.77694,12.7534 10.9012,15.5223 13.3409,12.8503 C13.6507,12.5211 14.0186,12.037 13.9993,11.553 C13.9412,10.7397 13.186,10.1588 12.6051,9.71349 C12.1598,9.38432 11.2304,8.47427 10.6495,8.49363 C10.1267,8.51299 9.79754,9.05515 9.46837,9.38432 L8.88748,9.96521 C8.79067,10.062 7.55145,9.24878 7.41591,9.15197 C6.91248,8.8228 6.4284,8.45491 6.00242,8.04829 C5.57644,7.64167 5.18919,7.19632 4.86002,6.73161 C4.7632,6.59607 3.96933,5.41495 4.04678,5.31813 C4.04678,5.31813 4.72448,4.58234 4.91811,4.2919 C5.32473,3.67229 5.63453,3.18822 5.16982,2.45243 C4.99556,2.18135 4.78257,1.96836 4.55021,1.73601 C4.14359,1.34875 3.73698,0.942131 3.27227,0.612963 C3.02055,0.419335 2.59457,0.0708094 2.20731,0.0127209 Z"
  ></path>
</svg>
```

#### Considerations

- Only supports SVG icons.
- Icons are and can be added as part of the theme.

### Fabric Icon

#### Example DOM

##### Font Icon

```html
<i data-icon-name="CompassNW" role="presentation" aria-hidden="true" class="ms-Icon root-38 css-176 css-144"></i>
```

##### SVG Icon

```html
<i data-icon-name="onedrive-svg" role="presentation" aria-hidden="true" class="ms-Icon root-38 css-144">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,2048,2048">
    <g fill="#1B559B">
      <path
        d="M 1860 1196 q 53 10 94 37 q 18 12 35 29 q 16 16 30 40 q 13 23 21 53 q 8 30 8 68 q 0 37 -10 75 q -11 38 -34 69 q -23 31 -58 51 q -36 20 -86 20 h -1079 q -78 0 -131 -24 q -54 -25 -87 -65 q -34 -40 -49 -91 q -15 -52 -15 -107 q 0 -46 12 -81 q 11 -35 31 -61 q 19 -27 43 -45 q 24 -19 50 -31 q 60 -29 136 -35 q 0 -1 4 -26 q 3 -25 16 -61 q 12 -37 36 -80 q 24 -43 64 -79 q 39 -37 98 -61 q 59 -25 141 -25 q 57 0 103 15 q 45 15 81 38 q 35 23 62 52 q 26 28 44 55 q 18 -10 42 -18 q 20 -7 48 -12 q 27 -6 60 -6 q 40 0 91 15 q 50 14 94 48 q 44 33 75 88 q 30 55 30 136 m -1463 174 q 0 53 10 99 q 10 46 29 86 h -170 q -52 0 -100 -23 q -48 -23 -85 -61 q -37 -38 -59 -87 q -22 -50 -22 -104 q 0 -49 11 -87 q 10 -38 27 -66 q 17 -29 39 -49 q 21 -21 44 -35 q 53 -33 121 -41 q -1 -9 -1 -18 q -1 -9 -1 -17 q 0 -72 27 -134 q 27 -63 73 -110 q 45 -47 106 -74 q 60 -27 127 -27 q 36 0 66 7 q 29 6 51 14 q 25 10 45 21 q 27 -48 65 -89 q 37 -41 84 -71 q 46 -30 101 -47 q 55 -17 115 -17 q 39 0 80 8 q 41 7 83 24 q 72 28 121 71 q 49 42 81 90 q 32 47 49 94 q 16 46 22 82 q -23 2 -43 5 q -21 3 -40 8 q -66 -69 -148 -104 q -82 -36 -177 -36 q -76 0 -136 17 q -60 17 -106 45 q -47 28 -81 64 q -34 36 -58 75 q -24 38 -39 76 q -15 37 -23 67 q -51 12 -102 38 q -52 26 -93 68 q -42 42 -67 101 q -26 59 -26 137"
      ></path>
    </g>
  </svg>
</i>
```

##### Image Icon

```html
<div role="presentation" aria-hidden="true" class="ms-Icon root-38 ms-Icon-imageContainer image-40 one-149">
  <div class="ms-Image oneImage-266">
    <img
      src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/icon-one.png"
      class="ms-Image-image is-loaded ms-Image-image--portrait is-fadeIn image-264"
    />
  </div>
</div>
```

#### Considerations

- Requires icon initialization and uses global registration.

### Gestalt Icon

#### Example DOM

```html
<svg class="gUZ pBj U9O kVc" height="16" width="16" viewBox="0 0 24 24" aria-label="Pin" role="img">
  <path
    d="M18 13.5c0-2.22-1.21-4.15-3-5.19V2.45A2.5 2.5 0 0 0 17 0H7a2.5 2.5 0 0 0 2 2.45v5.86c-1.79 1.04-3 2.97-3 5.19h5v8.46L12 24l1-2.04V13.5h5z"
  ></path>
</svg>
```

#### Considerations

- Only supports SVG icons.
- Renders by default as a block, and not an inline, element.

### Material-UI Icon

#### Example DOM

##### Font Icon

```html
<span class="material-icons MuiIcon-root" aria-hidden="true">add_circle</span>
```

##### SVG Icon

```html
<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
</svg>
```

#### Considerations

None.

### Semantic UI Icon

#### Example DOM

```html
<i aria-hidden="true" class="users icon">::before</i>
```

#### Considerations

- Only supports font icons.
- Can support icon groups and icon superpositions with the second item in the corner.

### Stardust Icon

#### Example DOM

```html
<span class="ui-icon ck cb ca" role="img" aria-hidden="true">
  <svg class="em ct cu en cw" viewBox="8 8 16 16" role="presentation" focusable="false">
    <g class="ui-icon__outline eo">
      <path
        d="M23.6968,12.0403c-0.1836-0.0786-0.3975-0.04-0.542,0.0981l-2.5317,2.4165C20.2212,14.9382,20,15.4514,20,16  c0,0.5483,0.2212,1.0615,0.623,1.4448l2.5317,2.4167C23.2495,19.9521,23.374,20,23.5,20c0.0664,0,0.1333-0.0132,0.1968-0.0403  C23.8809,19.8809,24,19.7002,24,19.5v-7C24,12.2998,23.8809,12.1191,23.6968,12.0403z M23,18.3315l-1.6865-1.6099v-0.0002  C21.1113,16.5286,21,16.2725,21,16s0.1113-0.5286,0.3135-0.7217L23,13.6685V18.3315z"
      ></path>
      <path
        d="M17.5,11H9.8193c-0.7056,0-1.3232,0.5393-1.4692,1.2822C8.1177,13.4619,8,14.7129,8,16s0.1177,2.5381,0.3501,3.7173  C8.4961,20.4607,9.1138,21,9.8193,21H17.5c0.8271,0,1.5-0.6729,1.5-1.5v-7C19,11.6729,18.3271,11,17.5,11z M18,19.5  c0,0.2756-0.2241,0.5-0.5,0.5H9.8193c-0.2285,0-0.4341-0.2-0.4878-0.4756C9.1113,18.4082,9,17.2224,9,16  s0.1113-2.4082,0.3315-3.5249C9.3853,12.2,9.5908,12,9.8193,12H17.5c0.2759,0,0.5,0.2244,0.5,0.5V19.5z"
      ></path>
    </g>
    <g class="ui-icon__filled">
      <path
        d="M23.6968,12.0403c-0.1841-0.0786-0.3975-0.04-0.542,0.0981l-2.5317,2.4165C20.2212,14.9382,20,15.4514,20,16  c0,0.5483,0.2212,1.0615,0.623,1.4448l2.5317,2.4167C23.2495,19.9521,23.374,20,23.5,20c0.0664,0,0.1333-0.0132,0.1968-0.0403  C23.8809,19.8809,24,19.7002,24,19.5v-7C24,12.2998,23.8809,12.1191,23.6968,12.0403z"
      ></path>
      <path
        d="M17.5,11H9.8193c-0.7056,0-1.3232,0.5393-1.4692,1.2822C8.1177,13.4619,8,14.7129,8,16s0.1177,2.5381,0.3501,3.7173  C8.4961,20.4607,9.1138,21,9.8193,21H17.5c0.8271,0,1.5-0.6729,1.5-1.5v-7C19,11.6729,18.3271,11,17.5,11z"
      ></path>
    </g>
  </svg>
</span>
```

#### Considerations

- Allows for both font and SVG icons but only has SVG icons built-in.

### Recommended DOM

After looking at all the component libraries above and taking into consideration common patterns the following DOM is recommended.

```html
<span class="root" aria-hidden="true">{fontIconName}</span>
```

> TODO: Discuss need to shim back to Fabric with `as=i` because of different tag being used in order to not break styling.

### Slots

From the recommended DOM above we can indicate which slots are going to be required:

| Name   | Considerations |
| ------ | -------------- |
| `root` |                |

> TODO: I really think we should have `ImageIcon` as a separate component, maybe via recomposition, to have a very simple and fast base `Icon`.
> TODO: Do we want a specific `SvgIcon` apart from the `ImageIcon` variant? This seems like one of the most used examples.

## Behaviors

Aria spec:
There's no aria spec available for icons.

Fluent UI HIG:
https://microsoft.sharepoint-df.com/:w:/r/teams/OPGUXLeads/_layouts/15/Doc.aspx?sourcedoc=%7B5113018C-05E7-44BF-B6D4-B164755B8D71%7D&file=Icon.docx&action=default&mobileredirect=true

### States

The following section describes the different states in which a `Icon` can be throughout the course of interaction with it.

#### Default state

An `Icon` has only one state, its default state. The `Icon` is not an interactive component and it's used only for representational purposes.

#### States that need discussion

None.

### Keyboard interaction

There is no keyboard interaction that occurs with the `Icon`.

### Cursor interaction

There is no cursor interaction that occurs with the `Icon`.

### Touch interaction

There is no touch interaction that occurs with the `Icon`.

### Screen reader accessibility

#### `root`:

- Should not be tabbable nor focusable and should have `aria-hidden` applied to it by default.

#### Accessibility concerns for the user.

All accessibility concerns would come from user manipulation of the component, so they would be a concern solely for the user and not for the component creator.

## Themability and customization

### Composition

The `Icon` component uses `react-texture` to provide a recomposable implementation that has no runtime performance penalties. The `BaseIcon` implementation can be used to provide new `slots` and default `props` without the application of additional styling:

```tsx
const FooIcon = BaseIcon.compose({
  tokens: {},
  styles: {},
  slots: {}
});

render () {
  <FooIcon name="Home" />
}
```

### Icon Registration

#### Fabric

Fabric uses global registration for its icons which needs a call to an initialization function to be used. Below are wiki and code references into this process:

- [Wiki page](https://github.com/microsoft/fluentui/wiki/Using-icons)
- [Icon font generation tool](https://uifabricicons.azurewebsites.net)
- [Main `initializeIcons` function](https://github.com/microsoft/fluentui/blob/master/packages/font-icons-mdl2/src/index.ts)
- [Icon registration utilities](https://github.com/microsoft/fluentui/blob/master/packages/style-utilities/src/utilities/icons.ts)
- [Icon component](https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Icon)

#### Stardust

Stardust registers icons in the theme, with all default icons being SVGs but also supporting font icons via:

```ts
type ObjectOrFunc<TResult, TArg = {}> = ((arg: TArg) => TResult) | TResult;

type FontIconSpec = ObjectOrFunc<{
  content: string;
  fontFamily: string;
}>;
```

Below are wiki and code references into this process:

- [SVG icon processing](https://github.com/microsoft/fluent-ui-react/blob/21c2f9e3e495b3094e0db4610e9f8834cdc135b0/packages/react/src/themes/teams/components/Icon/svg/ProcessedIcons/stardust-icons.sh#L36)
- [Instructions on adding new SVG Icon](https://github.com/microsoft/fluent-ui-react/pull/585)
- [Font icon registration into the theme (fontAwesome theme example)](https://github.com/microsoft/fluent-ui-react/blob/feat/generate-css/src/themes/teams/components/Icon/fontAwesomeIconStyles.ts)
- [Font vs SVG icon rendering](https://github.com/microsoft/fluent-ui-react/blob/master/packages/react/src/themes/teams/components/Icon/iconStyles.ts)
- [Icon styles as part of theme component styles](https://github.com/microsoft/fluent-ui-react/blob/de10e334fc039370c4fe4b425050327d57f3f515/packages/react/src/themes/teams/componentStyles.ts#L51)
- [Merging icons as part of theme](https://github.com/microsoft/fluent-ui-react/blob/feat/generate-css/src/themes/teams/index.ts)

> - TODO: Decide on recommended thing to do. Leaning towards Stardust approach but worried about perf implications regarding icon definitions.
> - TODO: Discuss how to handle font loading if we put icons in the theme.
>   - Should font loading also be part of the theme?
>   - Has to be loaded somehow and is ok for the majority of customers to automatically load them, but some customers need to prevent this loading from MSFT CDNs.

## Class names

1 per slot
1 per state, tagged on root

### Component design tokens

> Tokens represent the general look and feel of the various visual slots. Tokens feed into the styling at the right times in the right slot.
>
> Regarding naming conventions, use a camelCased name following this format:
> `{slot}{property}{state (or none for default)}`. For example: `thumbSizeHovered`.
>
> Common property names: `size`, `background`, `color`, `borderRadius`
>
> Common states: `hovered`, `pressed`, `focused`, `checked`, `checkedHovered`, `disabled`

| Name         | Considerations |
| ------------ | -------------- |
| `color`      |                |
| `fontSize`   |                |
| `fontWeight` |                |

## Use cases

> TODO: Example use cases

## Compatibility with other libraries

> TODO: If this component represents a selected value, how will that be used in an HTML form? Is there a code example to illustrate?

> TODO: Is it possible this component could be rendered in a focus zone? If so, should the focus model change in that case?
