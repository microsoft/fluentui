# Button component specification

The `Button` component allows users to commit a change or trigger an action via a single click or tap and is often found inside forms, dialogs, panels and/or pages.

## Related variant considerations

The following section documents variants of the component that currently exist in Fabric and identifies variants that exist in other component libraries but don't currently exist in Fabric, documenting which component libraries have those variants.

### Variants existing in Fabric today

#### Styling related

The following are variants that don't affect the functionality of the `Button`, but that have a visually distinct representation. A discussion needs to happen about how we support each of these variants and the effect of our theming story in that decision (separate components, via props, etc).

- `Action/Link button`
- `Circular button`
- `Compound button`
- `Icon button`
- `Primary button`
- `Secondary/Default button`

#### Functionality related

The following are variants that are functionally different from the base `Button` variant. A discussion needs to happen about how much of this functionality belongs to base versus a different variant and about the need of maybe having a different spec for these variants if they are significantly different from the base `Button`.

- `Menu button`
- `Pressable`
- `Split button`
- `Toggle button`
  - > TODO - Need to discuss if functionality belongs to base button or separate variant.

#### Tied to other components

The following are variants that exist because of the need of `Buttons` to reside inside other components and, while functionally the same, the styling of these `Buttons` is tightly coupled with the styling of these other components.

- `Command bar button`
- `Message bar button`

### Variants not in Fabric but that exist in other component libraries

- `Animated button`
  - In Semantic UI
- `Block/Fluid button`
  - In Ant Design
  - In Semantic UI
  - In Shards React
  - In Stardust UI
- `Button group/set`
  - In Ant Design
  - In Atlaskit
  - In Base Web
  - In Carbon Design
  - In Elemental UI
  - In Material-UI
  - In React Bootstrap
  - In Semantic UI
  - In Shards React
  - In Stardust UI
- `Conditional button`
  - In Semantic UI
- `Floating action/Raised button`
  - In Material-UI
  - In PrimeReact
- `Labelled button`
  - In Semantic UI
- `Outlined/Ghost button`
  - In Ant Design
  - In Carbon Design
  - In Chakra UI
  - In Elemental UI
  - In FastDNA
  - In Material-UI
  - In Shards React
- `Pill/Round button`
  - In Ant Design
  - In Base Web
  - In PrimeReact
  - In Shards React
- `Tertiary button`
  - In Base Web
  - In Carbon Design
  - In React Bootstrap

## Reference implementations

The following section documents links to different UI libraries implementations of Buttons, while also providing a code sandbox with a side by side implementation of them for comparison.

- [Side-by-side implementations](https://codesandbox.io/s/button-implementations-93x8z)

- [Ant Design Button docs](https://ant.design/components/button/)

- [Atlaskit Button docs](https://atlaskit.atlassian.com/packages/core/button)

- [Base Web Button docs](https://baseweb.design/components/button/)

- [Carbon Design Button docs](https://www.carbondesignsystem.com/components/button/code)

- [Chakra UI Button docs](https://chakra-ui.com/button)

- [Elemental UI Button docs](http://elemental-ui.com/buttons)

- [Fabric Button docs](https://developer.microsoft.com/en-us/fabric#/controls/web/button)

- FastDNA Button

  - [Docs](https://github.com/microsoft/fast-dna/tree/master/packages/fast-components-react-base/src/button)
  - [Example](https://explore.fast.design/components/button)

- [Gestalt Button docs](https://pinterest.github.io/gestalt/?ref=designrevision.com#/Button)

- [Grommet Button docs](https://v2.grommet.io/button)

- [Material-UI Button docs](https://material-ui.com/components/buttons/)

- [Prime React Button docs](https://www.primefaces.org/primereact/#/button)

- [React Bootstrap Button docs](https://react-bootstrap.github.io/components/buttons/)

- [Semantic UI Button docs](https://react.semantic-ui.com/elements/button/)

- [Shards React Button docs](https://designrevision.com/docs/shards-react/component/button)

- [Stardust Button docs](https://microsoft.github.io/fluent-ui-react/components/button/definition)

## Props

The following section documents the properties that will become part of the new component, as well as the process for mitigating all changes when moving from Fabric and Stardust to Fluent UI.

> TODO: Consult the prop wizard to derive consistently defined props.

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |

### Recommended component props

The `Button` component should inherit the HTML props of the web `button` so that props like `onClick` and `aria` have the same typings as the native web counterparts.

| Name        |   Type    | Default value | Description                                                                            |
| ----------- | :-------: | :-----------: | -------------------------------------------------------------------------------------- |
| `as`        | `string`  |               | Defines a component that should be used as the root element of the `Button`.           |
| `className` | `string`  |               | Defines an additional classname to provide on the root of the `Button`.                |
| `disabled`  | `boolean` |    `false`    | Defines whether the `Button` is in an enabled or disabled state.                       |
| `href`      | `string`  |               | Defines an href that, if provided, will make the `Button` render as an anchor.         |
| `primary`   | `boolean` |    `false`    | Defines whether the visual representation of the `Button` should be emphasized or not. |

> TODO: Talk about the inheritance of native props, what should we do about them? `Pick`, `Omit`, get all of them? What do we do about slots? Do we defect to `any`?

### Recommended interface props

| Name    |     Type     | Default value | Description                 |
| ------- | :----------: | ------------- | --------------------------- |
| `focus` | `() => void` |               | Sets focus on the `Button`. |

### Props to be discussed

| Name                 | Description                                                                            | Concern                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `allowDisabledFocus` | Defines whether disabled `Buttons` should be tabbable via keyboard navigation or not.  | Should we really redefine standard behavior here?                                                            |
| `checked`            | Defines whether the `Button` is in a checked state.                                    | Does this belong to the base or to a variant `ToggleButton`?                                                 |
| `circular`           | Defines whether the `Button` should be rendered as a circle instead of as a rectangle. | Should we still have this prop or should we generate a `CircularButton` variant via recomposition of styles? |
| `primary`            | Defines whether the visual representation of the `Button` should be emphasized or not. | Should we still have this prop or should we generate a `PrimaryButton` variant via recomposition of styles?  |

### Fabric Button props

https://developer.microsoft.com/en-us/fabric#/controls/web/button

#### IButton interface

| Name          |                                    Type                                    | Notes                                                                                                                          |
| ------------- | :------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------ |
| `dismissMenu` |                                `() => void`                                | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe just bring it from the `Menu` interface. |
| `focus`       |                                `() => void`                                |                                                                                                                                |
| `openMenu`    | `(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void` | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe just bring it from the `Menu` interface. |

#### IButtonProps interface

| Name                               |                                                    Type                                                    | Notes                                                                                                                                       |
| ---------------------------------- | :--------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowDisabledFocus`               |                                                 `boolean`                                                  | Should we really redefine standard behavior here?                                                                                           |
| `ariaDescription`                  |                                                  `string`                                                  | What purpose does this serve? If anything, belongs to `CompoundButton` and not to base.                                                     |
| `ariaHidden`                       |                                                 `boolean`                                                  | Should use native `aria-hidden` instead.                                                                                                    |
| `ariaLabel`                        |                                                  `string`                                                  | Should use native `aria-label` instead.                                                                                                     |
| `buttonType`                       |                                                `ButtonType`                                                | Already deprecated.                                                                                                                         |
| `checked`                          |                                                 `boolean`                                                  | Does this belong to the base or to a variant `ToggleButton`?                                                                                |
| `className`                        |                                                  `string`                                                  |                                                                                                                                             |
| `componentRef`                     |                                           `IRefObject<IButton>`                                            |                                                                                                                                             |
| `data`                             |                                                   `any`                                                    | What purpose does this serve? Maybe remove?                                                                                                 |
| `defaultRender`                    |                                                   `any`                                                    | What purpose does this serve? Maybe remove?                                                                                                 |
| `description`                      |                                                  `string`                                                  | Already deprecated in favor of `secondaryText`.                                                                                             |
| `disabled`                         |                                                 `boolean`                                                  |                                                                                                                                             |
| `getClassNames`                    |                                       `(props) => IButtonClassNames`                                       | Should be deprecated in favor of new composition approach.                                                                                  |
| `getSplitButtonClassNames`         |                                       `(props) => IButtonClassNames`                                       | Should not be part of the base `Button`. Should be considered for `SplitButton`. Should be deprecated in favor of new composition approach. |
| `href`                             |                                                  `string`                                                  |                                                                                                                                             |
| `iconProps`                        |                                                `IIconProps`                                                | Should be replaced by `slotProps`.                                                                                                          |
| `keytipProps`                      |                                               `IKeytipProps`                                               | Should be removed until we add `Keytips` in Fluent UI.                                                                                      |
| `menuAs`                           |                                    `IComponentAs<IContextualMenuProps>`                                    | Should be deprecated in favor of slot overrides.                                                                                            |
| `menuIconProps`                    |                                                `IIconProps`                                                | Should not be part of the base `Button` and should be replaced by `slotProps` in `MenuButton`.                                              |
| `menuProps`                        |                                           `IContextualMenuProps`                                           | Should not be part of the base `Button` and should be replaced by `slotProps` in `MenuButton`.                                              |
| `menuTriggerKeyCode`               |                                             `KeyCodes \| null`                                             | Should not be part of the base `Button`. Should be considered for `MenuButton`.                                                             |
| `onAfterMenuDismiss`               |                                                `() => void`                                                | Should not be part of the base `Button`. Should be considered for `MenuButton`. Maybe rename to `onDismiss`?                                |
| `onMenuClick`                      | `(ev?: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;` | Should not be part of the base `Button`. Should be considered for `MenuButton`.                                                             |
| `onRenderAriaDescription`          |                                      `IRenderFunction<IButtonProps>`                                       | Only keep if we are keeping `ariaDescription`. If keeping it, deprecate in favor of slot overrides.                                         |
| `onRenderChildren`                 |                                      `IRenderFunction<IButtonProps>`                                       | Should be removed or deprecated in favor of slot overrides.                                                                                 |
| `onRenderDescription`              |                                      `IRenderFunction<IButtonProps>`                                       | Should not be part of base `Button`. Could be considered for `CompoundButton`. In that case, deprecate in favor of slot overrides.          |
| `onRenderIcon`                     |                                      `IRenderFunction<IButtonProps>`                                       | Should be deprecated in favor of slot overrides.                                                                                            |
| `onRenderMenuIcon`                 |                                      `IRenderFunction<IButtonProps>`                                       | Should not be part of the base `Button`. Should be considered for `MenuButton`. Should be deprecated in favor of slot overrides.            |
| `onRenderMenu`                     |                                  `IRenderFunction<IContextualMenuProps>`                                   | Should not be part of the base `Button`. Should be considered for `MenuButton`. Should be deprecated in favor of slot overrides.            |
| `onRenderText`                     |                                      `IRenderFunction<IButtonProps>`                                       | Should be deprecated in favor of slot overrides.                                                                                            |
| `persistMenu`                      |                                                 `boolean`                                                  | Should this be handled as part of the menu `slotProps` instead of being a separate prop altogether?                                         |
| `primary`                          |                                                 `boolean`                                                  |                                                                                                                                             |
| `primaryActionButtonProps`         |                                               `IButtonProps`                                               | Should not be part of the base `Button`. Should be replaced by a slot in `SplitButton`.                                                     |
| `primaryDisabled`                  |                                                 `boolean`                                                  | Should not be part of the base `Button`. Should be considered for `SplitButton`.                                                            |
| `renderPersistedMenuHiddenOnMount` |                                                 `boolean`                                                  | Already deprecated.                                                                                                                         |
| `rootProps`                        |      `React.ButtonHTMLAttributes<HTMLButtonElement> \| React.AnchorHTMLAttributes<HTMLAnchorElement>`      | Already deprecated. Should use `slotProps` instead.                                                                                         |
| `secondaryText`                    |                                                  `string`                                                  | Should not be part of the base `Button`. Should be replaced by a slot in `CompoundButton`.                                                  |
| `split`                            |                                                 `boolean`                                                  | Should be deprecated in favor of a `SplitButton` variant.                                                                                   |
| `splitButtonAriaLabel`             |                                                  `string`                                                  | Should not be part of the base `Button`. Should be considered for `SplitButton`. Maybe rename to `secondaryActionAriaLabel`?                |
| `splitButtonMenuProps`             |                                               `IButtonProps`                                               | Should not be part of the base `Button`. Should be replaced by a slot in `SplitButton`.                                                     |
| `styles`                           |                                              `IButtonStyles`                                               | Should be deprecated in favor of recomposition.                                                                                             |
| `theme`                            |                                                  `ITheme`                                                  | Should not show up in the public props contract.                                                                                            |
| `text`                             |                                                  `string`                                                  | Should be replaced by a slot.                                                                                                               |
| `toggle`                           |                                                 `boolean`                                                  | Does this belong to the base or to a variant `ToggleButton`?                                                                                |
| `toggled`                          |                                                 `boolean`                                                  | Already deprecated in favor of `checked`.                                                                                                   |
| `uniqueId`                         |                                             `string \| number`                                             | This is used for keytip support in Fabric. Maybe remove it until we add `Keytips` in Fluent UI?                                             |

### Stardust Button props

#### ButtonProps interface

| Name            |                 Type                 | Notes                                                                                                                             |
| --------------- | :----------------------------------: | --------------------------------------------------------------------------------------------------------------------------------- |
| `accessibility` |           `Accessibility`            | Why would a user need this as a prop?                                                                                             |
| `circular`      |              `boolean`               |                                                                                                                                   |
| `disabled`      |              `boolean`               |                                                                                                                                   |
| `fluid`         |              `boolean`               | Should this be a prop or should the library have a separate `BlockButton` variant?                                                |
| `icon`          |     `ShorthandValue<IconProps>`      | Should be replaced by a slot.                                                                                                     |
| `iconOnly`      |              `boolean`               | Should this be a prop or should the library have a separate `IconButton` variant?                                                 |
| `iconPosition`  |        `'before' \| 'after'`         | Should be deprecated in favor of view recomposition.                                                                              |
| `loader`        |    `ShorthandValue<LoaderProps>`     | What's the use case for this?                                                                                                     |
| `loading`       |              `boolean`               | Should be deprecated in favor of recomposition.                                                                                   |
| `onClick`       | `ComponentEventHandler<ButtonProps>` | Should be replaced by the native event signature from which we extend.                                                            |
| `onFocus`       | `ComponentEventHandler<ButtonProps>` | Should be replaced by the native event signature from which we extend.                                                            |
| `primary`       |              `boolean`               |                                                                                                                                   |
| `secondary`     |              `boolean`               | Does this change styling or is this just the default?                                                                             |
| `size`          |             `SizeValue`              | Should this prop be provided or is this just a matter that could be solved via styling and recomposition?                         |
| `text`          |              `boolean`               | Should this be a prop or should the library have a separate `GhostButton` variant? If a prop, should it be named `ghost` instead? |

### Conversion process from Fabric 7 to Fluent UI Button

#### IButton interface

| Name          | Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| ------------- | -------------------- | :--------------------: | :--------------: | :-------------------: |
| `dismissMenu` | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `focus`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `openMenu`    | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |

#### IButtonProps interface

| Name                               | Action to take/taken                  | Property transitioned? |            Breaking change?             | Codemod/Shim created? |
| ---------------------------------- | ------------------------------------- | :--------------------: | :-------------------------------------: | :-------------------: |
| `allowDisabledFocus`               | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `ariaDescription`                  | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `ariaHidden`                       | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `ariaLabel`                        | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `buttonType`                       | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `checked`                          | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `className`                        | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `componentRef`                     | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `data`                             | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `defaultRender`                    | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `description`                      | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `disabled`                         | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `getClassNames`                    | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `getSplitButtonClassNames`         | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `href`                             | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `iconProps`                        | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `keytipProps`                      | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `menuAs`                           | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `menuIconProps`                    | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `menuProps`                        | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `menuTriggerKeyCode`               | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onAfterMenuDismiss`               | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onMenuClick`                      | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderAriaDescription`          | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderChildren`                 | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderDescription`              | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderIcon`                     | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderMenuIcon`                 | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderMenu`                     | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `onRenderText`                     | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `persistMenu`                      | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `primary`                          | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `primaryActionButtonProps`         | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `primaryDisabled`                  | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `renderPersistedMenuHiddenOnMount` | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `rootProps`                        | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `secondaryText`                    | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `split`                            | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `splitButtonAriaLabel`             | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `splitButtonMenuProps`             | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `styles`                           | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `theme`                            | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `text`                             | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `toggle`                           | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |
| `toggled`                          | Removing as it is already deprecated. |        &#9745;         | No, because prop is already deprecated. |       &#x274C;        |
| `uniqueId`                         | TBD                                   |        &#x274C;        |                &#x274C;                 |       &#x274C;        |

### Conversion process from Stardust to Fluent UI Button

#### ButtonProps interface

| Name            | Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| --------------- | -------------------- | :--------------------: | :--------------: | :-------------------: |
| `accessibility` | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `circular`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `disabled`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `fluid`         | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `icon`          | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `iconOnly`      | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `iconPosition`  | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `loader`        | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `loading`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `onClick`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `onFocus`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `primary`       | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `secondary`     | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `size`          | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |
| `text`          | TBD                  |        &#x274C;        |     &#x274C;     |       &#x274C;        |

## DOM Structure

The following section documents the DOM structure for the component from different component library examples and then suggests a recommended DOM taking into consideration common patterns between the libraries reviewed.

### Ant Design Button

#### Example DOM

```html
<button type="button" class="ant-btn">
  <i aria-label="icon: download" class="anticon anticon-download">
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      class=""
      data-icon="download"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"
      ></path>
    </svg>
  </i>
  <span>Download</span>
</button>
```

#### Considerations

- `Children` of `Button` components are rendered inside a `span`.

### Atlaskit Button

#### Example DOM

```html
<button type="button" class="css-shc4i4">
  <span class="css-j8fq0c">
    <span class="css-8xpfx5">
      <i>3d_rotation</i>
    </span>
    <span class="css-mu6jxl">Default</span>
  </span>
</button>
```

#### Considerations

- Icons can go before and/or after the `children` via the `iconBefore` and `iconAfter` props.
- Uneeded extra `span` wrapper inside of `button` tag.
- Both `icons` and `children` are wrapped in styled `spans`.

### Base Web Button

#### Example DOM

```html
<button
  data-baseweb="button"
  class="b3 ay b4 b5 b6 b7 b8 b9 ba bb bc b1 bd mh mi bg bh bi bj ah jp bk ex bl bm bn bo fi fk d6 fj bt ae ms mt mu"
>
  <div class="al j6">
    <svg data-baseweb="icon" viewBox="0 0 24 24" class="by bz c0 d3 md">
      <title>Arrow Right</title>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 12C6 12.5523 6.44772 13 7 13H14.5858L12.2929 15.2929C11.9024 15.6834 11.9024 16.3166 12.2929 16.7071C12.6834 17.0976 13.3166 17.0976 13.7071 16.7071L17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929L13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289C11.9024 7.68342 11.9024 8.31658 12.2929 8.70711L14.5858 11H7C6.44772 11 6 11.4477 6 12Z"
      ></path>
    </svg>
  </div>
  Start Enhancer
</button>
```

#### Considerations

- The concept of icon does not exist here, instead you can add _enhancers_ which are effectively a `React.Node` that are placed behind or after the `children` under a styled `div`.

### Carbon Design Button

#### Example DOM

```html
<button class="bx--btn bx--btn--primary" type="button">
  With icon
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    style="will-change: transform;"
    xmlns="http://www.w3.org/2000/svg"
    class="bx--btn__icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M9 7L9 3 7 3 7 7 3 7 3 9 7 9 7 13 9 13 9 9 13 9 13 7z"></path>
  </svg>
</button>
```

#### Considerations

None.

### Chakra UI Button

#### Example DOM

```html
<button type="button" class="css-z57ty6">
  <svg viewBox="0 0 24 24" focusable="false" role="presentation" class="css-yxiis9">
    <g fill="currentColor">
      <path
        d="M11.114,14.556a1.252,1.252,0,0,0,1.768,0L22.568,4.87a.5.5,0,0,0-.281-.849A1.966,1.966,0,0,0,22,4H2a1.966,1.966,0,0,0-.289.021.5.5,0,0,0-.281.849Z"
      ></path>
      <path
        d="M23.888,5.832a.182.182,0,0,0-.2.039l-6.2,6.2a.251.251,0,0,0,0,.354l5.043,5.043a.75.75,0,1,1-1.06,1.061l-5.043-5.043a.25.25,0,0,0-.354,0l-2.129,2.129a2.75,2.75,0,0,1-3.888,0L7.926,13.488a.251.251,0,0,0-.354,0L2.529,18.531a.75.75,0,0,1-1.06-1.061l5.043-5.043a.251.251,0,0,0,0-.354l-6.2-6.2a.18.18,0,0,0-.2-.039A.182.182,0,0,0,0,6V18a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A.181.181,0,0,0,23.888,5.832Z"
      ></path>
    </g>
  </svg>
  Email
</button>
```

#### Considerations

- Icons can go before and/or after the `children` via the `leftIcon` and `rightIcon` props.

### Elemental UI Button

#### Example DOM

```html
<button class="Button Button--default" type="button">
  <!-- react-text: 161 -->
  Default
  <!-- /react-text --><!-- react-text: 162 -->
  Button
  <!-- /react-text -->
</button>
```

#### Considerations

- Has no built-in support for icons via props.

### Fabric Button

#### Example DOM

```html
<button type="button" class="ms-Button ms-Button--default root-172" data-is-focusable="true">
  <span class="ms-Button-flexContainer flexContainer-99" data-automationid="splitbuttonprimary">
    <i
      data-icon-name="Upload"
      role="presentation"
      aria-hidden="true"
      class="ms-Icon root-38 css-96 ms-Button-icon icon-84"
    >
      
    </i>
    <span class="ms-Button-textContainer textContainer-83">
      <span class="ms-Button-label label-126 x-hidden-focus" id="id__361">Standard</span>
    </span>
  </span>
</button>
```

#### Considerations

- Icons via props are only supported on the left of the `children` inside the `Button`.
- Text can be provided via a `text` prop and via `children`.
  - If both are provided, only the one provided via the `text` prop is rendered.
  - If `children` is not a `string`, then both are rendered.
  - Text provided via the `text` prop is rendered inside two nested styled `spans`, one for the text container and one for the actual text.

### FastDNA Button

#### Example DOM

```html
<button class="c012">
  <span class="c018">Button</span>
</button>
```

#### Considerations

- Has no built-in support for icons via props.
- Extra styled `span` wraps `children` inside of the `Button`.

### Gestalt Button

#### Example DOM

```html
<button class="RCK Hsu mix Vxj aZc GmH adn a_A gpV hNT iyn BG7 gn8 L4E kVc" type="button">
  <div class="tBJ dyH iFc SMy yTZ pBj tg7 mWe">Medium Sized Button</div>
</button>
```

#### Considerations

- Has no built-in support for icons via props.
- Extends to container's width by default.
- Text has to be provided via a `text` prop as `children` are not rendered.

### Grommet Button

#### Example DOM

```html
<button type="button" class="StyledButton-sc-323bzc-0 iQekQI">
  <div class="StyledBox-sc-13pk1d4-0 jHQJnz">
    <svg aria-label="Edit" viewBox="0 0 24 24" class="StyledIcon-ofa7kd-0 iOkQrb">
      <path
        fill="none"
        stroke="#000"
        stroke-width="2"
        d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"
      ></path>
    </svg>
    <div class="StyledBox__StyledBoxGap-sc-13pk1d4-1 iChEkS"></div>
    Edit
  </div>
</button>
```

#### Considerations

- Icons via props are only supported on the left of the `children` inside the `Button`.
- Text has to be provided via the `label` prop as `children` are not rendered.
- A styled `div` is added in-between the icon and the text to add a _gap_ between them.
- Uneeded extra `div` wrapper inside of `button` tag.

### Material-UI Button

#### Example DOM

```html
<button
  class="MuiButtonBase-root MuiButton-root MuiButton-contained jss985 MuiButton-containedSecondary"
  tabindex="0"
  type="button"
>
  <span class="MuiButton-label">
    <span class="MuiButton-startIcon MuiButton-iconSizeMedium">
      <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
      </svg>
    </span>
    Delete
  </span>
  <span class="MuiTouchRipple-root"> </span>
</button>
```

#### Considerations

- Icons can go before and/or after the `children` via the `startIcon` and `endIcon` props.
- Both `children` and icons are wrapped inside of a `styled` span.
- An extra `span` is added inside of the `Button` for styling the _ripple effect_ in Material-UI.

### Prime React Button

#### Example DOM

```html
<button class="p-button p-component p-button-text-icon-left">
  <span class="pi pi-check p-c p-button-icon-left">::before</span>
  <span class="p-button-text p-c">Click</span>
</button>
```

#### Considerations

- Icons can go before and/or after the `children` via the `iconPos` prop.
- Icons are rendered via the `:before` and `content` css props.

### React Bootstrap Button

#### Example DOM

```html
<button type="button" class="btn btn-secondary">Secondary</button>
```

#### Considerations

- Has no built-in support for icons via props.

### Semantic UI Button

#### Example DOM

```html
<button class="ui facebook button">
  <i aria-hidden="true" class="facebook icon">::before</i>
  Facebook
</button>
```

#### Considerations

- Icons via props are only supported if `children` are not being rendered.
- Icons are rendered via the `:before` and `content` css props.

### Shard React Button

#### Example DOM

```html
<button class="btn btn-secondary">Secondary</button>
```

#### Considerations

- Has no built-in support for icons via props.

### Stardust Button

#### Example DOM

```html
<button
  class="ui-button jz lc oh mt je le lf lg lh cl cp cn dd bj rm bl rn cb gz as at au av ro rp rq rr rs ln ha hb hc hd he hf hg hh hi hj hk hl hm hn ho hp ot ou ov ow hu hv hw hx hy hz ia ib ic id ie if ig ih ii ij ik il im ox oy oz pa ir is it iu iv iw ix iy rt ru"
>
  <span class="ui-icon ck cb gw rv ca" role="img" aria-hidden="true">
    <svg class="cz ct cu da cw" viewBox="8 8 16 16" role="presentation" focusable="false">
      <g class="ui-icon__outline cy">
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
  <span dir="auto" class="ui-box lp lq lr cg ls ch">A text button with an icon</span>
</button>
```

#### Considerations

- Icons via props are only supported if `children` are not being rendered.
  - The icon is rendered inside of a styled `span`.
- Text can be provided via both the `content` prop and `children`.
  - Text provided via the `content` prop is rendered inside of a styled `span`.

### Recommended DOM

After looking at all the component libraries above and taking into consideration common patterns the following DOM is recommended.

#### Regular buttons

```html
<button class="root" role="button" type="button">
  <i class="startIcon"></i>
  {children}
  <i class="endIcon"></i>
</button>
```

#### Buttons rendered as links

```html
<a class="root" role="button" type="link">
  <i class="startIcon"></i>
  {children}
  <i class="endIcon"></i>
</a>
```

### Slots

From the recommended DOM above we can indicate which slots are going to be required:

| Name        | Considerations |
| ----------- | -------------- |
| `root`      |                |
| `startIcon` |                |
| `endIcon`   |                |

### Considerations that need discussion

- Do we provide both a `startIcon` and `endIcon` as recommended above?
  - Alternatively we could provide just an `icon` slot that is always on the left and provide a _"button with icon on the right"_ variant via view recomposition.
- Previously we had a `text` prop. Our recommended DOM above is taking that out in favor of just having `children`.
  - Do we want to still have a `text` or `content` prop/slot?
  - If we do, where do we place `children` in relation to it?

## Behaviors

Aria spec:
https://www.w3.org/TR/wai-aria-1.1/#button
https://www.w3.org/TR/wai-aria-practices/#button

Fluent UI HIG:
https://microsoft.sharepoint-df.com/:w:/r/teams/OPGUXLeads/_layouts/15/Doc.aspx?sourcedoc=%7B150DD97E-0ECE-460D-B868-8BCB91FCB4BA%7D&file=Buttons.docx&action=default&mobileredirect=true

### States

The following section describes the different states in which a `Button` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Button` communicates interaction by having styling that invite the user to click/tap on it to trigger an action.

#### Disabled state

A disabled `Button` is non-interactive, disallowing the user to click/tap on it to trigger an action.

Typically disabled browser elements do now allow focus. This makes the control difficult for a blind user to know about it, or why it's disabled, without scanning the entire page. Therefore it is recommended to allow focus on disabled components and to make them readonly. This means we use `aria-disabled` attributes, and not `disabled` attributes, for defining a disabled state. This may sometimes require special attention to ignoring input events in the case a browser element might do something. In the past we've introduced an `allowDisabledFocus` prop for component users to control this behavior.

#### Hovered state

A hovered `Button` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `Button` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state.

#### Pressed state

A pressed `Button` changes styling to communicate that the user has clicked/tapped on it.

#### States that need discussion

- Checked state in `Toggle buttons`, `Menu buttons` and `Split buttons`.

### Keyboard interaction

The following is a set of keys that interact with the `Button` component:

| Key     | Description                     |
| ------- | ------------------------------- |
| `Space` | Triggers the `Button's` action. |
| `Enter` | Triggers the `Button's` action. |

### Cursor interaction

Test: Possible to use this to capture mouse, though Safari does not have compatibility:
https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

- `mouseenter`: Should immediately change the styling of the `Button` so that it appears to be hovered.
- `mouseleave`: Should immediately remove the hovered styling of the `Button`.
- `mousedown`: Should immediately change the styling of the `Button` so that it appears to be pressed.
- `mouseup`:
  - If triggered while cursor is still inside of the `Button's` boundaries, then it should trigger the `Button's` action and immediately remove the pressed styling of the `Button`.
  - If triggered outside of the `Button's` boundaries, then it should immediately remove the pressed styling of the `Button` without triggering the `Button's` action.

### Touch interaction

The same behavior as above translated for touch events. This means that there is no equivalent for `mouseenter` and `mouseleave`, which makes it so that the hovered state cannot be accessed.

### Screen reader accessibility

#### `root`:

- Should render the native element using the `as` prop, defaulting to a native `button` element, or a native `a` element if the `href` prop has been set.
- Should mix in the native props expected for the `button` or `a` native elements depending on if the `href` prop has been set.
- Should be keyboard tabbable and focusable.

#### Accessibility concerns for the user.

The `aria-label`, `aria-labelledby` and `aria-describedby` properties are surfaced to the component interface but are required to be set by the component user to meet accessibility requirements.

## Themability and customization

### Composition

The `Button` component uses `react-texture` to provide a recomposable implementation that has no runtime performance penalties. The `BaseButton` implementation can be used to provide new `slots` and default `props` without the application of additional styling:

```tsx
const FooButton = BaseButton.compose({
  tokens: {},
  styles: {},
  slots: {}
});

const onClickAlert = () => {
  alert('Clicked');
};

render() {
  <FooButton onClick={onClickAlert}>
    Click me!
  </FooButton>
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

#### Button tokens:

| Name                     | Considerations |
| ------------------------ | -------------- |
| `background`             |                |
| `backgroundDisabled`     |                |
| `backgroundHovered`      |                |
| `backgroundPressed`      |                |
| `borderColor`            |                |
| `borderColorDisabled`    |                |
| `borderColorHovered`     |                |
| `borderColorPressed`     |                |
| `borderRadius`           |                |
| `borderStyle`            |                |
| `borderWidth`            |                |
| `boxShadow`              |                |
| `boxShadowDisabled`      |                |
| `boxShadowHovered`       |                |
| `boxShadowPressed`       |                |
| `color`                  |                |
| `colorDisabled`          |                |
| `colorHovered`           |                |
| `colorPressed`           |                |
| `fontFamily`             |                |
| `fontSize`               |                |
| `fontWeight`             |                |
| `height`                 |                |
| `lineHeight`             |                |
| `margin`                 |                |
| `maxHeight`              |                |
| `maxWidth`               |                |
| `minHeight`              |                |
| `minWidth`               |                |
| `outlineWidth`           |                |
| `padding`                |                |
| `width`                  |                |
| `startIconColor`         |                |
| `startIconColorDisabled` |                |
| `startIconColorHovered`  |                |
| `startIconColorPressed`  |                |
| `startIconFontSize`      |                |
| `startIconFontWeight`    |                |
| `endIconColor`           |                |
| `endIconColorDisabled`   |                |
| `endIconColorHovered`    |                |
| `endIconColorPressed`    |                |
| `endIconFontSize`        |                |
| `endIconFontWeight`      |                |

#### Primary Button specific tokens:

| Name                            | Considerations |
| ------------------------------- | -------------- |
| `backgroundPrimary`             |                |
| `backgroundPrimaryDisabled`     |                |
| `backgroundPrimaryHovered`      |                |
| `backgroundPrimaryPressed`      |                |
| `borderColorPrimary`            |                |
| `borderColorPrimaryDisabled`    |                |
| `borderColorPrimaryHovered`     |                |
| `borderColorPrimaryPressed`     |                |
| `colorPrimary`                  |                |
| `colorPrimaryDisabled`          |                |
| `colorPrimaryHovered`           |                |
| `colorPrimaryPressed`           |                |
| `startIconColorPrimary`         |                |
| `startIconColorPrimaryDisabled` |                |
| `startIconColorPrimaryHovered`  |                |
| `startIconColorPrimaryPressed`  |                |
| `endIconColorPrimary`           |                |
| `endIconColorPrimaryDisabled`   |                |
| `endIconColorPrimaryHovered`    |                |
| `endIconColorPrimaryPressed`    |                |

NOTE! Stardust does not follow this convention. Their `Button` currently uses these tokens:

```
backgroundColor: string
backgroundColorActive: string
backgroundColorDisabled: string
backgroundColorFocus: string
backgroundColorHover: string
borderColor: string
borderColorDisabled: string
borderColorHover: string
borderRadius: string
boxShadow: string
circularBackgroundColor: string
circularBackgroundColorActive: string
circularBackgroundColorFocus: string
circularBackgroundColorHover: string
circularBorderColor: string
circularBorderColorFocus: string
circularBorderColorHover: string
circularBorderRadius: string
circularColor: string
circularColorActive: string
color: string
colorDisabled: string
colorFocus: string
colorHover: string
contentFontSize: string
contentFontWeight: Property.FontWeight
contentLineHeight: string
height: string
loaderBorderSize: string
loaderSize: string
loaderSvgAnimationHeight: string
loaderSvgHeight: string
loadingMinWidth: string
maxWidth: string
minWidth: string
padding: string
sizeSmallContentFontSize: string
sizeSmallContentLineHeight: string
sizeSmallHeight: string
sizeSmallLoaderBorderSize: string
sizeSmallLoaderSvgAnimationHeight: string
sizeSmallLoaderSvgHeight: string
sizeSmallMinWidth: string
sizeSmallPadding: string
textColor: string
textColorDisabled: string
textColorHover: string
textPrimaryColor: string
textPrimaryColorHover: string
```

### To be discussed

- What do we do about high contrast? Do we provide additional tokens?

## Use cases

> TODO: Example use cases

## Compatibility with other libraries

> TODO: If this component represents a selected value, how will that be used in an HTML form? Is there a code example to illustrate?

> TODO: Is it possible this component could be rendered in a focus zone? If so, should the focus model change in that case?
