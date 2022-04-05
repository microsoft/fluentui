# Link component specification

The `Link` component is a clickable control primarily used for navigation, providing an interactive reference to a resource. It is usually displayed as an inline element by default that can wrap text if it goes past the edges of its parent.

## Related variant considerations

The following section documents variants of the component that currently exist in Fabric and identifies variants that exist in other component libraries but don't currently exist in Fabric, documenting which component libraries have those variants.

### Variants existing in Fabric today

- `Link rendered as an anchor`
- `Link rendered as a button`
  - Removing this variant by default from Fluent UI, if people want it they can use the `slots` or the `as` prop.

### Variants not in Fabric but that exist in other component libraries

- `Block/Non-inline link`
  - In Carbon Design
  - In Gestalt
- `External link`
  - In Chakra UI

## Reference implementations

The following section documents links to different UI libraries implementations of Links, while also providing a code sandbox with a side by side implementation of them for comparison.

- [Side-by-side implementations](https://codesandbox.io/s/link-implementations-utdpb)

- [Base Web Link docs](https://baseweb.design/components/link/)

- [Carbon Design Link docs](https://www.carbondesignsystem.com/components/link/code)

- [Chakra UI Link docs](https://chakra-ui.com/link)

- [Fabric Link docs](https://developer.microsoft.com/en-us/fabric#/controls/web/link)

- FastDNA Link (Hypertext)

  - [Docs](https://github.com/microsoft/fast-dna/tree/master/packages/fast-components-react-base/src/hypertext)
  - [Example](https://explore.fast.design/components/hypertext)

- [Gestalt Link docs](https://pinterest.github.io/gestalt/?ref=designrevision.com#/Link)

- [Material-UI Link docs](https://material-ui.com/components/links/)

## Props

The following section documents the properties that will become part of the new component, as well as the process for mitigating all changes when moving from Fabric and Stardust to Fluent UI.

### Recommended component props

| Name              |            Type            | Default value | Required? | Description                                                                            |
| ----------------- | :------------------------: | :-----------: | :-------: | -------------------------------------------------------------------------------------- |
| `ariaDescribedBy` |          `string`          |               |    No     | Identifies the element (or elements) that describes the object.                        |
| `ariaHidden`      |         `boolean`          |    `false`    |    No     | Indicates whether the element is exposed to an accessibility API.                      |
| `ariaLabel`       |          `string`          |               |    No     | Defines a string value that labels the current element.                                |
| `ariaLabelledBy`  |          `string`          |               |    No     | Identifies the element (or elements) that labels the current element.                  |
| `className`       |          `string`          |               |    No     | Defines an additional classname to provide on the root of the `Link`.                  |
| `componentRef`    |    `IRefObject<ILink>`     |               |    No     | Defines an optional reference to access the imperative interface of the `Link`.        |
| `disabled`        |         `boolean`          |    `false`    |    No     | Defines whether the `Link` is in an enabled or disabled state.                         |
| `href`            |          `string`          |               |    Yes    | Defines an href that serves as the navigation destination when clicking on the `Link`. |
| `onClick`         | `(ev: MouseEvent) => void` |               |    No     | Defines a callback that handles the processing of click events on the `Link`.          |
| `role`            |          `string`          |               |    No     | Defines the accessibility role of the `Link`.                                          |

Props no outlined above are not handled and should be spread in the `root` slot of the component.

### Recommended interface props

| Name    |     Type     | Default value | Description               |
| ------- | :----------: | ------------- | ------------------------- |
| `focus` | `() => void` |               | Sets focus on the `Link`. |

### Props to be discussed

None at the moment.

### Fabric Link props

https://developer.microsoft.com/en-us/fabric#/controls/web/link

#### ILink interface

| Name    |     Type     | Notes |
| ------- | :----------: | ----- |
| `focus` | `() => void` |       |

#### ILinkProps interface

| Name           |                             Type                             | Notes                                                  |
| -------------- | :----------------------------------------------------------: | ------------------------------------------------------ |
| `as`           | `string \| React.ComponentClass \| React.StatelessComponent` | Remove `as` prop in new component.                     |
| `componentRef` |                     `IRefObject<ILink>`                      |                                                        |
| `disabled`     |                          `boolean`                           |                                                        |
| `keytipProps`  |                        `IKeytipProps`                        | Should be removed until we add `Keytips` in Fluent UI. |
| `styles`       |    `IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>`    | Should be deprecated in favor of recomposition.        |
| `theme`        |                           `ITheme`                           | Should not show up in the public props contract.       |

### Stardust Link props

Stardust does not currently have a `Link` component implementation.

### Conversion process from Fabric 7 to Fluent UI Link

#### ILink interface

| Name    | Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| ------- | -------------------- | :--------------------: | :--------------: | :-------------------: |
| `focus` | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |

#### ILinkProps interface

| Name           | Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| -------------- | -------------------- | :--------------------: | :--------------: | :-------------------: |
| `as`           | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `componentRef` | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `disabled`     | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `keytipProps`  | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `styles`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `theme`        | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |

### Conversion process from Stardust to Fluent UI Link

Stardust does not currently have a `Link` component implementation.

## DOM Structure

The following section documents the DOM structure for the component from different component library examples and then suggests a recommended DOM taking into consideration common patterns between the libraries reviewed.

### Base Web Link

#### Example DOM

```html
<a data-baseweb="link" href="https://baseweb.design" class="k5 ah eq bk er es bb bc tf tg th"> Link to Base Web </a>
```

#### Considerations

None.

### Carbon Design Link

#### Example DOM

```html
<a href="#" class="bx--link some-class">Link</a>
```

#### Considerations

- Renders by default as a block, and not an inline, element.

### Chakra UI Link

#### Example DOM

```html
<a href="https=//chakra-ui.com" class="css-u5zpo1">Chakra UI</a>
```

#### Considerations

None.

### Fabric Link

#### Example DOM

##### With href

```html
<a href="http://dev.office.com/fabric/components/link" class="ms-Link root-109"> it renders as an anchor tag. </a>
```

##### Without href

```html
<button type="button" class="ms-Link root-163">the link is rendered as a button</button>
```

#### Considerations

- `Links` without an `href` provided render as `buttons`.

### FastDNA Link (Hypertext)

#### Example DOM

```html
<a href="https://www.bing.com" class="c012">Hypertext</a>
```

#### Considerations

None.

### Gestalt Link

#### Example DOM

```html
<a class="Wk9 xQ4 WMU iyn ljY kVc" href="https://pinterest.com">click here</a>
```

#### Considerations

- Renders by default as a block, and not an inline, element.

### Material-UI Link

#### Example DOM

##### With href

```html
<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover jss243 MuiTypography-colorPrimary" href="#"> Link </a>
```

##### Without href

```html
<button
  class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiLink-button MuiTypography-body2 MuiTypography-colorPrimary"
>
  Button Link
</button>
```

#### Considerations

- `Links` without an `href` provided render as `buttons`.

### Recommended DOM

After looking at all the component libraries above and taking into consideration common patterns the following DOM is recommended.

#### For default links

```html
<a class="root" href="{href}">{children}</a>
```

#### For recomposed links

If the link is recomposed to use another tag that is not `a` for its `root` slot, then `role="link"` should be added to the root. An example using `button` can be read below:

```html
<button class="root" href="{href}" role="link">{children}</button>
```

### Slots

From the recommended DOM above we can indicate which slots are going to be required:

| Name   | Considerations |
| ------ | -------------- |
| `root` |                |

### Considerations that need discussion

- What about inline vs block links? Should we provide them as well?
  - Maybe different styled variant via recomposition.

## Behaviors

Aria spec:
https://www.w3.org/TR/wai-aria-1.1/#link
https://www.w3.org/TR/wai-aria-practices/#link

Fluent UI HIG:
https://microsoft.sharepoint-df.com/:w:/r/teams/OPGUXLeads/_layouts/15/Doc.aspx?sourcedoc=%7BE585806E-01BF-4F37-BF59-12708E4CE81D%7D&file=Links.docx&action=default&mobileredirect=true

### States

The following section describes the different states in which a `Link` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Link` communicates interaction by having styling that invite the user to click/tap on it to navigate through content.

#### Disabled state

A disabled `Link` is non-interactive, disallowing the user to click/tap on it to navigate through content.

Typically disabled browser elements do now allow focus. This makes the control difficult for a blind user to know about it, or why it's disabled, without scanning the entire page. Therefore it is recommended to allow focus on disabled components and to make them readonly. This means we use `ariaDisabled` attributes, and not `disabled` attributes, for defining a disabled state. This may sometimes require special attention to ignoring input events in the case a browser element might do something. In the past we've introduced an `allowDisabledFocus` prop for component users to control this behavior.

#### Hovered state

A hovered `Link` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `Link` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state plus extra styling on the outline to indicate keyboard focus has been placed on the component.

#### States that need discussion

None.

### Keyboard interaction

The following is a set of keys that interact with the `Link` component:

| Key                      | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `Enter`                  | Executes the `Link` and moves focus to the `Link` target. |
| `Shift + F10` (Optional) | Opens a context menu for the `Link`.                      |

### Cursor interaction

Test: Possible to use this to capture mouse, though Safari does not have compatibility:
https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

- `mouseenter`: Should immediately change the styling of the `Link` so that it appears to be hovered.
- `mouseleave`: Should immediately remove the hovered styling of the `Link`.
- `mouseup`: If triggered while cursor is still inside of the `Link's` boundaries, then it should execute the `Link` and move focus to the `Link` target.

### Touch interaction

The same behavior as above translated for touch events. This means that there is no equivalent for `mouseenter` and `mouseleave`, which makes it so that the hovered state cannot be accessed.

### Screen reader accessibility

#### `root`:

- Should default to render a native `a` element unless another `root` slot has been specified.
- Should mix in the native props expected for the `a` native element.
- Should be keyboard tabbable and focusable.

#### Accessibility concerns for the user.

The `ariaLabel`, `ariaLabelledby` and `ariaDescribedBy` properties are surfaced to the component interface but are required to be set by the component user to meet accessibility requirements.

## Themability and customization

### Composition

The `Link` component uses `react-texture` to provide a recomposable implementation that has no runtime performance penalties. The `BaseLink` implementation can be used to provide new `slots` and default `props` without the application of additional styling:

```tsx
const FooLink = BaseLink.compose({
  tokens: {},
  styles: {},
  slots: {}
});

render () {
  <FooLink href="https://www.bing.com">
    Go to bing!
  </FooLink>
}
```

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

| Name                     | Considerations |
| ------------------------ | -------------- |
| `background`             |                |
| `backgroundDisabled`     |                |
| `backgroundHovered`      |                |
| `backgroundPressed`      |                |
| `backgroundVisited`      |                |
| `color`                  |                |
| `colorDisabled`          |                |
| `colorHovered`           |                |
| `colorPressed`           |                |
| `colorVisited`           |                |
| `fontFamily`             |                |
| `fontSize`               |                |
| `fontWeight`             |                |
| `textDecoration`         |                |
| `textDecorationDisabled` |                |
| `textDecorationHovered`  |                |
| `textDecorationPressed`  |                |
| `textDecorationVisited`  |                |

### To be discussed

- What do we do about high contrast? Do we provide additional tokens?

## Use cases

> TODO: Example use cases

## Compatibility with other libraries

> TODO: If this component represents a selected value, how will that be used in an HTML form? Is there a code example to illustrate?

> TODO: Is it possible this component could be rendered in a focus zone? If so, should the focus model change in that case?
