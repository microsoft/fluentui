# Button Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

### Component renames

Common buttons now all map to `Button`:

| v8 `Button`                                      | Converged `Button`                                   |
| ------------------------------------------------ | ---------------------------------------------------- |
| `<DefaultButton text="Hello, world" />`          | `<Button>Hello, world</Button>`                      |
| `<PrimaryButton text="Hello, world" />`          | `<Button primary>Hello, world</Button>`              |
| `<IconButton iconProps={{ iconName: 'Add' }} />` | `<Button subtle icon={ <Icon iconName="Add" /> } />` |

### Props that remain as is

- `children`
- `disabled`
- `href`

### Renamed props

- `allowDisabledFocus` => `disabledFocusable`
- `elementRef` => `ref`

### Props removed because we can get them from HTML props

- `ariaDescription` => Getting it as `aria-description` instead
- `ariaHidden` => Getting it as `aria-hidden` instead
- `ariaLabel` => Getting it as `aria-label` instead
- `className`

### Props removed because they were already deprecated

- `buttonType` => Use correct component instead
- `description` => Use `secondaryText` in `CompoundButton` instead
- `renderPersistedMenuHiddenOnMount` => Removed since legacy Edge has been deprecated
- `rootProps` => Just pass the props instead
- `toggled` => Use `checked` instead in `ToggleButton`

### Props considered for specific component variant

- `checked` => Considered for `ToggleButton`
- `menuAs` => Considered for `MenuButton`
- `menuIconProps` => Considered for `MenuButton`
- `menuProps` => Considered for `MenuButton`
- `menuTriggerKeyCode` => Considered for `MenuButton`
- `onAfterMenuDismiss` => Considered for `MenuButton`
- `onMenuClick` => Considered for `MenuButton`
- `onRenderAriaDescription` => Considered for `CompoundButton`
- `onRenderDescription` => Considered for `CompoundButton`
- `onRenderMenu` => Considered for `MenuButton`
- `onRenderMenuIcon` => Considered for `MenuButton`
- `persistMenu` => Considered for `MenuButton`
- `primaryActionButtonProps` => Considered for `SplitButton`
- `primaryDisabled` => Considered for `SplitButton`
- `secondaryText` => Considered for `CompoundButton`
- `splitButtonAriaLabel` => Considered for `SplitButton`
- `splitButtonMenuProps` => Considered for `SplitButton`

### Props no longer supported with an equivalent functionality in converged Button

- `componentRef` => Use regular `ref` instead
- `iconProps` => Add the icon customized as you want via the `icon` token
- `keytipProps` => Wrap the component with the `Keytip` component instead
- `onRenderChildren` => Pass the customized `children` as you want instead
- `onRenderIcon` => Add the icon customized as you want via the `icon` token
- `primary` => Use `primary` value in `appearance` prop instead
- `onRenderText` => Add the text customized as you want by passing it as `children` instead
- `split` => Use `SplitButton` component instead
- `styles` => Use new styling system via `tokens` instead
- `text` => Pass the text as `children` instead
- `toggle` => Use `ToggleButton` component instead

### Props no longer supported without an equivalent functionality in converged Button

- `data`
- `defaultRender`
- `getClassNames`
- `getSplitButtonClassNames`
- `theme`
- `uniqueId`

## Migration from v0

### Props that remain as is

- `children`
- `disabled`
- `disabledFocusable`
- `icon`
- `iconPosition`
- `loader`
- `loading`
- `size`

### Renamed props

- `fluid` => `block`
- `text` => `transparent`

### Props removed because we can get them from HTML props

- `className`
- `onClick`
- `onFocus`

### Props no longer supported with an equivalent functionality in converged Button

- `accessibility` => Override accessibility behavior by composing the `Button` how you want
- `circular` => Use `circular` value in `shape` prop instead
- `content` => Pass the content as `children` instead
- `primary` => Use `primary` value in `appearance` prop instead
- `secondary` => Use the `Button` as it comes by default instead

### Props TBD

- `iconOnly`
- `inverted`

## Property mapping

| v8 `Button`                        | v0 `Button`         | Converged `Button`     |
| ---------------------------------- | ------------------- | ---------------------- |
|                                    | `accessibility`     |                        |
| `allowDisabledFocus`               | `disabledFocusable` | `disabledFocusable`    |
| `ariaDescription`                  | `aria-description`  | `aria-description`     |
| `ariaHidden`                       | `aria-hidden`       | `aria-hidden`          |
| `ariaLabel`                        | `aria-label`        | `aria-label`           |
| `buttonType`                       |                     |                        |
| `checked`                          |                     |                        |
| `children`                         | `children`          | `children`             |
|                                    | `circular`          | `shape=circular`       |
| `className`                        | `className`         | `className`            |
| `componentRef`                     |                     |                        |
| `data`                             |                     |                        |
| `defaultRender`                    |                     |                        |
| `description`                      |                     |                        |
| `disabled`                         | `disabled`          | `disabled`             |
| `elementRef`                       |                     | `ref`                  |
|                                    | `fluid`             | `block`                |
| `getClassNames`                    |                     |                        |
| `getSplitButtonClassNames`         |                     |                        |
| `href`                             |                     | `href`                 |
|                                    | `icon`              | `icon`                 |
|                                    | `iconOnly`          |                        |
|                                    | `iconPosition`      | `iconPosition`         |
| `iconProps`                        |                     |                        |
|                                    | `inverted`          |                        |
| `keytipProps`                      |                     |                        |
|                                    | `loader`            | `loader`               |
|                                    | `loading`           | `loading`              |
| `menuAs`                           |                     |                        |
| `menuIconProps`                    |                     |                        |
| `menuProps`                        |                     |                        |
| `menuTriggerKeyCode`               |                     |                        |
| `onAfterMenuDismiss`               |                     |                        |
| `onClick`                          | `onClick`           | `onClick`              |
| `onFocus`                          | `onFocus`           | `onFocus`              |
| `onMenuClick`                      |                     |                        |
| `onRenderAriaDescription`          |                     |                        |
| `onRenderChildren`                 |                     |                        |
| `onRenderDescription`              |                     |                        |
| `onRenderIcon`                     |                     |                        |
| `onRenderMenu`                     |                     |                        |
| `onRenderMenuIcon`                 |                     |                        |
| `onRenderText`                     |                     |                        |
| `persistMenu`                      |                     |                        |
| `primary`                          | `primary`           | `appearance='primary'` |
| `primaryActionButtonProps`         |                     |                        |
| `primaryDisabled`                  |                     |                        |
| `renderPersistedMenuHiddenOnMount` |                     |                        |
| `rootProps`                        |                     |                        |
|                                    | `secondary`         |                        |
| `secondaryText`                    |                     |                        |
|                                    | `size`              | `size`                 |
| `split`                            |                     |                        |
| `splitButtonAriaLabel`             |                     |                        |
| `splitButtonMenuProps`             |                     |                        |
| `styles`                           |                     |                        |
| `text`                             | `content`           |                        |
|                                    | `text`              | `transparent`          |
| `theme`                            |                     |                        |
| `toggle`                           |                     |                        |
| `toggled`                          |                     |                        |
| `uniqueId`                         |                     |                        |
