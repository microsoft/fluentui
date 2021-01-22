# Menu

## TODOS

- Get reviews
- Write summary at end
- Checkin to github
- Write prototype
- Finalize structure
- Finalize API
- Final review

## Menu Basics

A menu is a way of displaying items that a user may be able to interact with. Menus vary quite a bit based on implementation and usage. Some are horizontal, some have collapsable sections, and others are just a list. Likewise menu items are equally varied. Some may just convey information but cannot be interacted with like headers or dividers while others are either buttons, links, or expand into a submenu.

The w3 specifications for a menu suggest that it is only for user actions, not user input. Most varieties of menus interpret this as being for navigation.

Menus are often combined with a popover or similar floating component so the menu appears over other items and is subsequently dismissed.

### MenuItem

Most menus have a concept of a specific menuitem. It is an integral part of the menu and will have some of its own sections throughout.

## References

[CodeSandbox of implemented versions](https://codesandbox.io/s/menuexamples-uybsr)

- [Aria practices](https://www.w3.org/TR/wai-aria-1.1/#menu)
- [Fabric](https://developer.microsoft.com/en-us/fabric#/controls/web/contextualmenu)
- [Stardust](https://microsoft.github.io/fluent-ui-react/components/menu/definition)
- [Material-ui](https://material-ui.com/components/menus/)
- [Chakra-ui](https://chakra-ui.com/menu)
- [AntDesign](https://ant.design/components/menu/)
- [Jquery-ui](https://jqueryui.com/menu/)
- [Carbon-ui](https://www.carbondesignsystem.com/components/overflow-menu/code)
- [Fast-DNA](https://github.com/microsoft/fast-dna/blob/master/packages/fast-components-react-base/src/context-menu/context-menu.tsx)
- [BluePrintJs](https://blueprintjs.com/docs/#core/components/menu)

### Notes from references:

- Most render children, rather than passing a list of items in as props
- Menu is usually a `<ul>` with `<li>` as children
- Some are popout menus rather than just being a list, but most do not have an explicit popout.
- Most have a concept of submenus, either explicitly or as a result of nested lists.
- The line between list and menu is fuzzy.

## API

### Prop comparison \(Stardust vs Fabric\)

_Note:_ I've skipped some of the boilerplate props like className.

#### Fabric

##### Menu

| Prop Name                | Type                                                                                                                    | Description                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| target                   | Target                                                                                                                  | Target for positioning                                     |
| directionalHint          | DirectionalHint                                                                                                         | How the menu should try to align itself                    |
| gapSpace                 | number                                                                                                                  | Distance between menu and target                           |
| beakWidth                | number                                                                                                                  | Width of the beak                                          |
| useTargetWidth           | 'boolean'                                                                                                               | If the menu should match the targets width                 |
| useTargetAsMinWidth      | boolean                                                                                                                 | see above                                                  |
| bounds                   | IRectangle \| (target?: targetWindow?: Window)=>< IRectangle \| undefined                                               | The space that the menu can appear in                      |
| directionalHintForRTL    | DirectionalHint                                                                                                         |
| gapSpace                 | number                                                                                                                  | The space between the menu and its target                  |
| beakWidth?               | number                                                                                                                  | The size of the beak that points                           |
| isBeakVisible?           | boolean                                                                                                                 |                                                            |
| coverTarget?             | boolean                                                                                                                 | If the menu should cover its target                        |
| alignTargetEdge?         | boolean                                                                                                                 | If the menu should be aligned.                             |
| items                    | IContextualMenuItem[]                                                                                                   | The list of items to be rendered                           |
| labelElementId?          | string                                                                                                                  | The id of a label element for the menu                     |
| shouldFocusOnMount?      | boolean                                                                                                                 |                                                            |
| shouldFocusOnContainer?  | boolean                                                                                                                 |                                                            |
| onDismiss?               | Event                                                                                                                   | callback for what should happen when menu is dismissed     | Not needed |
| onItemClick?             | (ev?: React.MouseEvent<HTMLElement> \| React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean \| void |                                                            |
| isSubMenu?               | boolean                                                                                                                 | whether or not the menu is owned by another menu           |
| id?                      | string                                                                                                                  |                                                            |
| ariaLabel?               | string                                                                                                                  |                                                            |
| doNotLayer?              | boolean                                                                                                                 |                                                            |
| directionalHintFixed?    | boolean                                                                                                                 |                                                            |
| onMenuOpened?            | (contextualMenu?: IContextualMenuProps) => void                                                                         | callback for when the menu is opened                       |
| onMenuDismissed?         | (contextualMenu?: IContextualMenuProps) => void                                                                         | callback for when the menu is completly dismissed          |
| calloutProps?            | ICalloutProps                                                                                                           | passthrough props to the callout                           |
| title?                   | string                                                                                                                  |                                                            |
| getMenuClassNames?       | (theme: ITheme, className?: string) => IContextualMenuClassNames                                                        | styling function                                           |
| onRenderSubMenu?         | IRenderFunction<IContextualMenuProps>                                                                                   | a different way of rendering the submenu                   |
| onRenderMenuList?        | IRenderFunction<IContextualMenuListProps>                                                                               | a different way of rendering the list of items             |
| subMenuHoverDelay?       | number                                                                                                                  | how long it should take for the submenu to open            |
| contextualMenuItemAs?    | React.ComponentClass<IContextualMenuItemProps>                                                                          | React.StatelessComponent<IContextualMenuItemProps>         | a different way of rendering each item |
| focusZoneProps?          | IFocusZoneProps                                                                                                         | passthrough props to control how the focus zone works      |
| hidden?                  | boolean                                                                                                                 | if the menu should be hidden and not destroyed             |
| shouldUpdateWhenHidden?  | boolean                                                                                                                 |                                                            |
| delayUpdateFocusOnHover? | boolean                                                                                                                 | if focus should go to the menu items when they are hovered |

##### Menuitem

| Prop Name                | Type                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel                | string                                                                                |                                                                                                                                                                                                                                                                                                                                                                                              |
| canCheck                 | boolean                                                                               | Whether or not this menu item can be checked                                                                                                                                                                                                                                                                                                                                                 |
| checked                  | boolean                                                                               | Whether or not this menu item is currently checked.                                                                                                                                                                                                                                                                                                                                          |
| className                | string                                                                                | Additional CSS class to apply to the menu item.                                                                                                                                                                                                                                                                                                                                              |
| componentRef             | IRefObject<IContextualMenuRenderItem>                                                 | Optional callback to access the IContextualMenuRenderItem interface. This will get passed down to ContextualMenuItem.                                                                                                                                                                                                                                                                        |
| customOnRenderListLength | number                                                                                | When rendering a custom menu component that is passed in, the component might also be a list of elements. We want to keep track of the correct index our menu is using based off of the length of the custom list. It is up to the user to increment the count for their list.                                                                                                               |
| data                     | any                                                                                   | Any custom data the developer wishes to associate with the menu item.                                                                                                                                                                                                                                                                                                                        |
| disabled                 | boolean                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                        | Whether the menu item is disabled |
| href                     | string                                                                                | Navigate to this URL when the menu item is clicked.                                                                                                                                                                                                                                                                                                                                          |
| iconProps                | IIconProps                                                                            | Props for the Icon.                                                                                                                                                                                                                                                                                                                                                                          |
| itemProps                | Partial<IContextualMenuItemProps>                                                     | Optional IContextualMenuItemProps overrides to customize behaviors such as item styling via styles.                                                                                                                                                                                                                                                                                          |
| itemType                 | ContextualMenuItemType                                                                |
| key                      | string                                                                                | Unique id to identify the item                                                                                                                                                                                                                                                                                                                                                               |
| keytipProps              | IKeytipProps                                                                          | Keytip for this contextual menu item                                                                                                                                                                                                                                                                                                                                                         |
| onClick                  | (ev?: React.MouseEvent<HTMLElement>                                                   | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean                                                                                                                                                                                                                                                                                                                     | void | Callback for when the menu item is invoked. If ev.preventDefault() is called in onClick, the click will not close the menu. Returning true will dismiss the menu even if ev.preventDefault() was called. |
| onMouseDown              | (item: IContextualMenuItem, event: React.MouseEvent<HTMLElement>) => void             | A function to be executed on mouse down. This is executed before an onClick event and can be used to interrupt native on click events as well. The click event should still handle the commands. This should only be used in special cases when react and non-react are mixed.                                                                                                               |
| onRender                 | (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void) => React.ReactNode | Method to custom render this menu item. For keyboard accessibility, the top-level rendered item should be a focusable element (like an anchor or a button) or have the data-is-focusable property set to true. The function receives a function that can be called to dismiss the menu as a second argument. This can be used to make sure that a custom menu item click dismisses the menu. |
| onRenderIcon             | IRenderFunction<IContextualMenuItemProps>                                             | Custom render function for the menu item icon                                                                                                                                                                                                                                                                                                                                                |
| primaryDisabled          | boolean                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                        | If the menu item is a split button, this prop disables purely the primary action of the button. |
| rel                      | string                                                                                | Link relation setting when using href. If target is \_blank, rel is defaulted to a value to prevent clickjacking.                                                                                                                                                                                                                                                                            |
| role                     | string                                                                                | Optional override for the menu button's role. Defaults to menuitem or menuitemcheckbox.                                                                                                                                                                                                                                                                                                      |
| secondaryText            | string                                                                                | Seconday description for the menu item to display                                                                                                                                                                                                                                                                                                                                            |
| sectionProps             | IContextualMenuSection                                                                | Properties to apply to render this item as a section. This prop is mutually exclusive with subMenuProps.                                                                                                                                                                                                                                                                                     |
| split                    | boolean                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                        | Whether or not this menu item is a splitButton. |
| subMenuProps             | IContextualMenuProps                                                                  | Properties to apply to a submenu to this item. The ContextualMenu will provide default values for target, onDismiss, isSubMenu, id, shouldFocusOnMount, directionalHint, className, and gapSpace, all of which can be overridden.                                                                                                                                                            |
| submenuIconProps         | IIconProps                                                                            | Props for the Icon used for the chevron.                                                                                                                                                                                                                                                                                                                                                     |
| target                   | string                                                                                | Target window when using href.                                                                                                                                                                                                                                                                                                                                                               |
| text                     | string                                                                                | Text description for the menu item to display                                                                                                                                                                                                                                                                                                                                                |
| title                    | string                                                                                | Optional title for displaying text when hovering over an item.                                                                                                                                                                                                                                                                                                                               |

#### Stardust

##### Menu

| Prop Name          | Type                                                     | Description                                             |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------------- |
| accessibility      | Accessibility                                            | Determines how the keyboard interacts with the menu     |
| activeIndex        | number \| string                                         | Index of currently active item                          |
| defaultActiveIndex | number \| string                                         | Default index of currently active item                  |
| fluid              | boolean                                                  | whether or not the menu should fill its container       |
| iconOnly           | boolean                                                  | whether or not the menu only has icons                  | Not needed |
| items              | ShorthandCollection\<MenuItemProps, MenuShorthandKinds\> | The items that are to be rendered in the menu           |
| onItemClick        | ComponentEventHandler\<MenuItemProps\>                   | Callback for what should happen when an item is clicked |
| pills              | boolean                                                  | If the items should have rounded edges                  | not needed |
| pointing           | boolean \| 'start' \| 'end'                              | The direction in which an item should point towards     |
| primary            | boolean                                                  | Determines if the menu is primary or not, changes color |
| secondary          | boolean                                                  | see above but secondary                                 |
| underlined         | boolean                                                  | If the items should be underlined                       |
| vertical           | boolean                                                  | How the menu should render, vertically or horizontally  |
| submenu            | boolean                                                  | If the menu is a submenu or not                         |
| indicator          | ShorthandValue\<IconProps\>                              | How the submenu icon should look                        |

##### Menuitem

| Prop Name        | Type                                 | Description                                                                                                                          |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| accessibility    | "menuItemBehavior" any               | Accessibility behavior if overridden by the user.                                                                                    |
| active           | false \| boolean                     | A menu item can be active.                                                                                                           |
| animation        | AnimationProp                        | Generic animation property that can be used for applying different theme animations.                                                 |
| as               | "a" React.ElementType                | An element type to render as (string or component).                                                                                  |
| className        | string                               | Additional CSS class name(s) to apply.                                                                                               |
| content          | ReactNode                            | Shorthand for primary content.                                                                                                       |
| defaultMenuOpen  | false \| boolean                     | Default menu open                                                                                                                    |
| design           | ComponentDesign                      |                                                                                                                                      |
| disabled         | false \| boolean                     | A menu item can show it is currently unable to be interacted with.                                                                   |
| icon S           | ShorthandValue<IconProps>            | Name or shorthand for Menu Item Icon                                                                                                 |
| iconOnly         | false \| boolean                     | A menu may have just icons.                                                                                                          |
| inSubmenu        | false \| boolean                     | Indicates whether the menu item is part of submenu.                                                                                  |
| index            | number                               | MenuItem index inside Menu.                                                                                                          |
| indicator S      | ShorthandValue<IconProps>            | Shorthand for the submenu indicator.                                                                                                 |
| itemPosition     | number                               | MenuItem position inside Menu (skipping separators).                                                                                 |
| itemsCount       | number                               | MenuItem count inside Menu.                                                                                                          |
| menu S           | ShorthandValue<MenuProps>            | ShorthandCollection<MenuItemProps, MenuShorthandKinds>                                                                               | Shorthand for the submenu. |
| menuOpen         | false \| boolean                     | Indicates if the menu inside the item is open.                                                                                       |
| onActiveChanged  | ComponentEventHandler                | Callback for setting the current menu item as active element in the menu.                                                            |
| onBlur           | ComponentEventHandler                | Called after item blur.                                                                                                              |
| onClick          | ComponentEventHandler                | Called on click.                                                                                                                     |
| onFocus          | ComponentEventHandler                | Called after user's focus.                                                                                                           |
| onMenuOpenChange | ComponentEventHandler                | Event for request to change 'open' value.                                                                                            |
| pills            | false \| boolean                     | A menu can adjust its appearance to de-emphasize its contents.                                                                       |
| pointing         | boolean \| enum                      | A menu can point to show its relationship to nearby content. For vertical menu, it can point to the start of the item or to the end. |
| primary          | false \| boolean                     | The menu item can have primary type.                                                                                                 |
| secondary        | false \| boolean                     | The menu item can have secondary type.                                                                                               |
| styles           | ComponentSlotStyle                   | Additional CSS styles to apply to the component instance.                                                                            |
| underlined       | false \| boolean                     | Menu items can by highlighted using underline.                                                                                       |
| variables        | any                                  | Override for theme site variables to allow modifications of component styling via themes.                                            |
| vertical         | false \| boolean                     | A vertical menu displays elements vertically.                                                                                        |
| wrapper S        | {"as":"li"} ShorthandValue<BoxProps> | Shorthand for the wrapper component.                                                                                                 |

### Recommended Props

Most props should be removed in favor of a composition model where the parent component passes in menuItems which contain content styled however they want.

#### Menu component

Should extend `ul` props

| Prop Name   | Prop Type                     | Notes                                                                                                                                                                 |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children    | `li | MenuItem | Divider`     | Text                                                                                                                                                                  |
| orientation | enum: `vertical | horizontal` | Specifies how the menu is oriented.                                                                                                                                   |
| onClick     | `onClickHandler`              | This is from the root UL props but it's worth noting that there shouldn't be a specific onMenuClick/onMenuItemClick handler. See [Behaviors](#On-Menu-Click) for more |

#### MenuItem component

Should extend `li` props
Most of the other props exist as HTMLAttributes like `selected`, `checked`, `onClick`.

| Prop Name | Prop Type                                                                                               | Notes                            |
| --------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| children  | [Flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content) | No content should have on clicks |

#### SubmenuItem component

Should extend MenuItems props but omit onClick

| Prop Name | Prop Type                                                                                               | Notes                            |
| --------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| children  | [Flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content) | No content should have on clicks |

#### Submenu component

| Prop Name | Prop Type                                                                                               | Notes                                              |
| --------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| children  | [Flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content) | No content should have on clicks                   |
| open      | boolean                                                                                                 | whether or not this particular menu group is open. |

#### Submenu component

Should take in MenuProps

#### Communication between Menu and MenuItems

To help provide additional information to menu items and their context, the menu should implement react context. This allows for synchronization between menu items. This also allows menu groups to pass their open status down to their children to determine how the sub items are rendered.

Similarly Submenus should control their open state through context.

#### Discussion:

This is a large departure from the way that both Stardust and Fabric implement menus but it is more in line with the way a lot of other frameworks menus work. Additionally I believe it gives a lot more flexibility through composition which removes some of the pressure to add many props.

There should be a lot more discussion to see if this relaxed approach to props is appropriate. Additionally it could make SplitButton menu items difficult to implement.

### Conversion Plan:

#### Fabric to Fluent:

##### Menu

| Action to take/taken     | Property transitioned? | Breaking change? | Codemod/Shim created? |
| ------------------------ | ---------------------- | ---------------- | --------------------- |
| target                   | &#x274C;               | &#x274C;         | &#x274C;              |
| directionalHint          | &#x274C;               | &#x274C;         | &#x274C;              |
| gapSpace                 | &#x274C;               | &#x274C;         | &#x274C;              |
| beakWidth                | &#x274C;               | &#x274C;         | &#x274C;              |
| useTargetWidth           | &#x274C;               | &#x274C;         | &#x274C;              |
| useTargetAsMinWidth      | &#x274C;               | &#x274C;         | &#x274C;              |
| bounds                   | &#x274C;               | &#x274C;         | &#x274C;              |
| directionalHintForRTL    | &#x274C;               | &#x274C;         | &#x274C;              |
| gapSpace                 | &#x274C;               | &#x274C;         | &#x274C;              |
| beakWidth?               | &#x274C;               | &#x274C;         | &#x274C;              |
| isBeakVisible?           | &#x274C;               | &#x274C;         | &#x274C;              |
| coverTarget?             | &#x274C;               | &#x274C;         | &#x274C;              |
| alignTargetEdge?         | &#x274C;               | &#x274C;         | &#x274C;              |
| items                    | &#x274C;               | &#x274C;         | &#x274C;              |
| labelElementId?          | &#x274C;               | &#x274C;         | &#x274C;              |
| shouldFocusOnMount?      | &#x274C;               | &#x274C;         | &#x274C;              |
| shouldFocusOnContainer?  | &#x274C;               | &#x274C;         | &#x274C;              |
| onDismiss?               | &#x274C;               | &#x274C;         | &#x274C;              |
| onItemClick?             | &#x274C;               | &#x274C;         | &#x274C;              |
| isSubMenu?               | &#x274C;               | &#x274C;         | &#x274C;              |
| id?                      | &#x274C;               | &#x274C;         | &#x274C;              |
| ariaLabel?               | &#x274C;               | &#x274C;         | &#x274C;              |
| doNotLayer?              | &#x274C;               | &#x274C;         | &#x274C;              |
| directionalHintFixed?    | &#x274C;               | &#x274C;         | &#x274C;              |
| onMenuOpened?            | &#x274C;               | &#x274C;         | &#x274C;              |
| onMenuDismissed?         | &#x274C;               | &#x274C;         | &#x274C;              |
| calloutProps?            | &#x274C;               | &#x274C;         | &#x274C;              |
| title?                   | &#x274C;               | &#x274C;         | &#x274C;              |
| getMenuClassNames?       | &#x274C;               | &#x274C;         | &#x274C;              |
| onRenderSubMenu?         | &#x274C;               | &#x274C;         | &#x274C;              |
| onRenderMenuList?        | &#x274C;               | &#x274C;         | &#x274C;              |
| subMenuHoverDelay?       | &#x274C;               | &#x274C;         | &#x274C;              |
| contextualMenuItemAs?    | &#x274C;               | &#x274C;         | &#x274C;              |
| focusZoneProps?          | &#x274C;               | &#x274C;         | &#x274C;              |
| hidden?                  | &#x274C;               | &#x274C;         | &#x274C;              |
| shouldUpdateWhenHidden?  | &#x274C;               | &#x274C;         | &#x274C;              |
| delayUpdateFocusOnHover? | &#x274C;               | &#x274C;         | &#x274C;              |

##### Menuitem

| Action to take/taken     | Property transitioned? | Breaking change? | Codemod/Shim created? |
| ------------------------ | ---------------------- | ---------------- | --------------------- |
| ariaLabel                | &#x274C;               | &#x274C;         | &#x274C;              |
| canCheck                 | &#x274C;               | &#x274C;         | &#x274C;              |
| checked                  | &#x274C;               | &#x274C;         | &#x274C;              |
| className                | &#x274C;               | &#x274C;         | &#x274C;              |
| componentRef             | &#x274C;               | &#x274C;         | &#x274C;              |
| customOnRenderListLength | &#x274C;               | &#x274C;         | &#x274C;              |
| data                     | &#x274C;               | &#x274C;         | &#x274C;              |
| disabled                 | &#x274C;               | &#x274C;         | &#x274C;              |
| href                     | &#x274C;               | &#x274C;         | &#x274C;              |
| iconProps                | &#x274C;               | &#x274C;         | &#x274C;              |
| itemProps                | &#x274C;               | &#x274C;         | &#x274C;              |
| itemType                 | &#x274C;               | &#x274C;         | &#x274C;              |
| key                      | &#x274C;               | &#x274C;         | &#x274C;              |
| keytipProps              | &#x274C;               | &#x274C;         | &#x274C;              |
| onClick                  | &#x274C;               | &#x274C;         | &#x274C;              |
| onMouseDown              | &#x274C;               | &#x274C;         | &#x274C;              |
| onRender                 | &#x274C;               | &#x274C;         | &#x274C;              |
| onRenderIcon             | &#x274C;               | &#x274C;         | &#x274C;              |
| primaryDisabled          | &#x274C;               | &#x274C;         | &#x274C;              |
| rel                      | &#x274C;               | &#x274C;         | &#x274C;              |
| role                     | &#x274C;               | &#x274C;         | &#x274C;              |
| secondaryText            | &#x274C;               | &#x274C;         | &#x274C;              |
| sectionProps             | &#x274C;               | &#x274C;         | &#x274C;              |
| split                    | &#x274C;               | &#x274C;         | &#x274C;              |
| subMenuProps             | &#x274C;               | &#x274C;         | &#x274C;              |
| submenuIconProps         | &#x274C;               | &#x274C;         | &#x274C;              |
| target                   | &#x274C;               | &#x274C;         | &#x274C;              |
| text                     | &#x274C;               | &#x274C;         | &#x274C;              |
| title                    | &#x274C;               | &#x274C;         | &#x274C;              |

#### Stardust to Fluent

##### Menu

| Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| -------------------- | ---------------------- | ---------------- | --------------------- |
| accessibility        | &#x274C;               | &#x274C;         | &#x274C;              |
| activeIndex          | &#x274C;               | &#x274C;         | &#x274C;              |
| defaultActiveIndex   | &#x274C;               | &#x274C;         | &#x274C;              |
| fluid                | &#x274C;               | &#x274C;         | &#x274C;              |
| iconOnly             | &#x274C;               | &#x274C;         | &#x274C;              |
| items                | &#x274C;               | &#x274C;         | &#x274C;              |
| onItemClick          | &#x274C;               | &#x274C;         | &#x274C;              |
| pills                | &#x274C;               | &#x274C;         | &#x274C;              |
| pointing             | &#x274C;               | &#x274C;         | &#x274C;              |
| primary              | &#x274C;               | &#x274C;         | &#x274C;              |
| secondary            | &#x274C;               | &#x274C;         | &#x274C;              |
| underlined           | &#x274C;               | &#x274C;         | &#x274C;              |
| vertical             | &#x274C;               | &#x274C;         | &#x274C;              |
| submenu              | &#x274C;               | &#x274C;         | &#x274C;              |
| indicator            | &#x274C;               | &#x274C;         | &#x274C;              |

##### Menuitem

| Action to take/taken | Property transitioned? | Breaking change? | Codemod/Shim created? |
| -------------------- | ---------------------- | ---------------- | --------------------- |
| accessibility        | &#x274C;               | &#x274C;         | &#x274C;              |
| active               | &#x274C;               | &#x274C;         | &#x274C;              |
| animation            | &#x274C;               | &#x274C;         | &#x274C;              |
| as                   | &#x274C;               | &#x274C;         | &#x274C;              |
| className            | &#x274C;               | &#x274C;         | &#x274C;              |
| content              | &#x274C;               | &#x274C;         | &#x274C;              |
| defaultMenuOpen      | &#x274C;               | &#x274C;         | &#x274C;              |
| design               | &#x274C;               | &#x274C;         | &#x274C;              |
| disabled             | &#x274C;               | &#x274C;         | &#x274C;              |
| icon S               | &#x274C;               | &#x274C;         | &#x274C;              |
| iconOnly             | &#x274C;               | &#x274C;         | &#x274C;              |
| inSubmenu            | &#x274C;               | &#x274C;         | &#x274C;              |
| index                | &#x274C;               | &#x274C;         | &#x274C;              |
| indicator S          | &#x274C;               | &#x274C;         | &#x274C;              |
| itemPosition         | &#x274C;               | &#x274C;         | &#x274C;              |
| itemsCount           | &#x274C;               | &#x274C;         | &#x274C;              |
| menu S               | &#x274C;               | &#x274C;         | &#x274C;              |
| menuOpen             | &#x274C;               | &#x274C;         | &#x274C;              |
| onActiveChanged      | &#x274C;               | &#x274C;         | &#x274C;              |
| onBlur               | &#x274C;               | &#x274C;         | &#x274C;              |
| onClick              | &#x274C;               | &#x274C;         | &#x274C;              |
| onFocus              | &#x274C;               | &#x274C;         | &#x274C;              |
| onMenuOpenChange     | &#x274C;               | &#x274C;         | &#x274C;              |
| pills                | &#x274C;               | &#x274C;         | &#x274C;              |
| pointing             | &#x274C;               | &#x274C;         | &#x274C;              |
| primary              | &#x274C;               | &#x274C;         | &#x274C;              |
| secondary            | &#x274C;               | &#x274C;         | &#x274C;              |
| styles               | &#x274C;               | &#x274C;         | &#x274C;              |
| underlined           | &#x274C;               | &#x274C;         | &#x274C;              |
| variables            | &#x274C;               | &#x274C;         | &#x274C;              |
| vertical             | &#x274C;               | &#x274C;         | &#x274C;              |
| wrapper S            | &#x274C;               | &#x274C;         | &#x274C;              |

### Notable things

Based on my recommendations, the MenuItem ends up doing a lot of work compared to the Menu itself. The MenuItem would be responsible for managing whether or not its expanded, has a submenu, and any other state it might have.

## DOM Structure

### HTML DOM structure

```HTML
<ul role="menu">
    <li role="menuitem">{"Item one"}</li>
    <hr />
    <li role="menuitem">{"Item two"}</li>
    <li role="menuitem">
        {"Item Three"}
        <ul role="menu">
            <li role="menuitem">{"SubItem one"}</li>
            <li role="menuitem">{"SubItem two"}</li>
        </ul>
    </li>
</ul>
```

### Stardust Dom Structure

Note: Class names removed

```HTML
<ul role="menu" data-aa-class="Menu" >
    <li role="presentation" data-aa-class="MenuItem__wrapper">
        <a role="menuitem" tabindex="0" data-is-focusable="true" data-aa-class="MenuItem">
        <span dir="auto" >Item one</span>
        </a>
    </li>
    <li role="presentation" data-aa-class="MenuDivider" dir="auto"> | </li>
    <li role="presentation" data-aa-class="MenuItem__wrapper" >
        <a role="menuitem" tabindex="-1" data-is-focusable="true" data-aa-class="MenuItem">
            <span dir="auto" >Item two</span>
        </a>
    </li>
    <li role="presentation" data-aa-class="MenuItem__wrapper" >
        <a role="menuitem" tabindex="0" aria-expanded="false" aria-haspopup="true" data-is-focusable="true" data-aa-class="MenuItem">
            <span dir="auto">Item three</span>
        </a>
    </li>
</ul>
```

### office-ui-fabric-react DOM Structure

_Note:_ Some long class names removed

```HTML
<div data-focuszone-id="FocusZone159">
   <ul role="menu">
      <li role="presentation" class="ms-ContextualMenu-item item-127">
         <button class="ms-ContextualMenu-link root-129" aria-posinset="1" aria-setsize="3" aria-disabled="false" role="menuitem" tabindex="0">
            <div><span class="ms-ContextualMenu-itemText label-139">Item one</span></div>
         </button>
      </li>
      <li role="separator" aria-hidden="true"></li>
      <li role="presentation" class="ms-ContextualMenu-item item-127">
         <button class="ms-ContextualMenu-link root-129" aria-posinset="2" aria-setsize="3" aria-disabled="false" role="menuitem" tabindex="-1">
            <div class="ms-ContextualMenu-linkContent linkContent-133"><span class="ms-ContextualMenu-itemText label-139">Item two</span></div>
         </button>
      </li>
      <li role="presentation" class="ms-ContextualMenu-item item-127">
         <button class="ms-ContextualMenu-link root-129" aria-haspopup="true" aria-expanded="false" aria-posinset="3" aria-setsize="3" aria-disabled="false" role="menuitem" tabindex="-1">
            <div class="ms-ContextualMenu-linkContent linkContent-133"><span>Item 3 (has submenu)</span><i data-icon-name="ChevronRight" aria-hidden="true" class="ms-ContextualMenu-submenuIcon subMenuIcon-151"></i></div>
         </button>
      </li>
   </ul>
</div>
```

### Fast-DNA DOM Structure

```HTML
<div role="menu" class="contextMenu-3-1-49">
   <div tabindex="-1" class="contextMenuItem-3-1-50" role="menuitem">
       <span class="contextMenuItem_contentRegion-3-1-51">Item one</span>
   </div>
   <hr tabindex="-1" class="divider-3-1-53">
   <div tabindex="0" class="contextMenuItem-3-1-50" role="menuitem">
       <span class="contextMenuItem_contentRegion-3-1-51">Item two</span>
   </div>
   <div tabindex="-1" class="contextMenuItem-3-1-50" role="menuitem">
       <span class="contextMenuItem_contentRegion-3-1-51">Item three</span>
   </div>
   <div tabindex="-1" class="contextMenuItem-3-1-50" role="menuitem">
       <span class="contextMenuItem_contentRegion-3-1-51">SubItem one</span>
   </div>
   <div tabindex="-1" class="contextMenuItem-3-1-50" role="menuitem">
       <span class="contextMenuItem_contentRegion-3-1-51">SubItem Two</span>
   </div>
</div>
```

#### Comments

Fast-DNA is one of the only menus that doesn't use `li` elements.

### MaterialUI

_Note:_ Some long class names removed

```HTML
<ul class="MuiList-root MuiList-padding" role="menu" tabindex="-1" id="simple-menu">
   <li tabindex="0" role="menuitem" aria-disabled="false">Item one<span class="MuiTouchRipple-root"></span></li>
   <hr class="MuiDivider-root">
   <li tabindex="-1" role="menuitem" aria-disabled="false">Item two<span class="MuiTouchRipple-root"></span></li>
   <li tabindex="-1" role="menuitem" aria-disabled="false">Item three<span class="MuiTouchRipple-root"></span></li>
   <li tabindex="-1" role="menuitem" aria-disabled="false">Subitem one<span class="MuiTouchRipple-root"></span></li>
   <li tabindex="-1" role="menuitem" aria-disabled="false">Subitem Two<span class="MuiTouchRipple-root"></span></li>
</ul>
```

### AntDesign DOM Structure

_Note:_ Some long class names removed

```HTML
<ul role="menu">
   <li class="ant-menu-item" role="menuitem" style="padding-left: 24px;">Item one</li>
   <li class=" ant-menu-item-divider"></li>
   <li class="ant-menu-item" role="menuitem" style="padding-left: 24px;"> Item two</li>
   <li class="ant-menu-submenu ant-menu-submenu-inline" role="menuitem">
      <div class="ant-menu-submenu-title" aria-expanded="false" aria-haspopup="true" style="padding-left: 24px;">
          <span>Item Three</span>
          <i class="ant-menu-submenu-arrow"/>
      </div>
   </li>
</ul>
```

## Recommendations

### Recommended DOM Structure

```HTML
<div role="menu">
    <div role="menuitem">{"Item one"}</div>
    <div role="presentation" />
    <div role="menuitem">{"Item two"}</div>
    <a role="menuitem" href="www.isALink.com"> link1 </a>
    <div role="menuitem">
        {"Item Three"}
    </div>
        <!-->
            I'm not sure if this is the right role or if it is actually a menu item. It should
            probably be related to its parent's item in some way.
        <-->
    <div role="presentation">
        <!-->
            Note: Does not necessarily need to be part of the same dom
            tree, could be floating.
        <-->
        <div role="menu">
            <div role="menuitem">{"SubItem one"}</div>
            <div role="menuitem">{"SubItem two"}</div>
        </div>
    </div>
</ul>
```

### Recommended React Structure

#### Shape when used

```TSX
return <Menu>
    <MenuItem onClick={callback}>{"Item one"}</MenuItem>
    <Divider/>
    <MenuItem>{"Item two"}</MenuItem>
    <Submenu>
    <SubmenuItem>{"Item two"}</SubmenuItem>
        <SubmenuList>
            <MenuItem>{"SubItem one"}</MenuItem>
            <MenuItem>{"SubItem two"}</MenuItem>
        </SubmenuList>
    </SubMenu>
</Menu>;
```

#### Menu

```TSX
function() {
    return (
    <MenuContext.Provider value={menuState}>
        <Slots.Root {...props} role={"menu"}>
            {props.children}
        </Slots.Root>
    <MenuContext.Provider>);
}
```

#### MenuItem

```TSX
function() {
    return (
    <Slots.Root {...props} role={"menuitem"}>
        {props.children}
    </Slots.Root>);
}
```

#### Submenu

Maybe should be named SubmenuContext?
Should submenu have its own context?

```TSX
function() {
return (
    <OpenableContext.Provider value={submenuState}>
        {props.children}
    </OpenableContext.Provider>);
}
```

#### SubmenuList

```TSX
function() {
    const openableContext = React.useContext(OpenableContext);
    return (openableContext.open &&
    <Slots.Root {...menuProps}>
        {props.children}
    </Slots.Root>);
}
```

#### SubmenuItem

```TSX
function() {
    const openableContext = React.useContext(OpenableContext);
    return (
    <Slots.Root {...menuItemProps} onClick={openableContext.toggleOpen}>
        {props.children}
    </Slots.Root>);
}
```

### Slots

#### Menu

Since the Menu is only rendering its children, the only slot necessary is the one for the Root `div`. The rest can be passed in as children variants.

#### MenuItem

Since the MenuItem is only rendering its children, the only slot necessary is the one for the Root `div`. The rest can be passed in as children.

#### SubmenuList

Since the SubmenuList is effectively the same as the Menu, it should have only one slot for the Root `div` and for all intents and purposes should behave exactly the same as the Menu slot does.

#### SubmenuItem

Since the SubmenuItem is effectively the same as the MenuItem, it should have only one slot for the Root `div` and for all intents and purposes should behave exactly the same as the MenuItem slot does.

### Behaviors

#### Menu

The menu itself should be a list that renders menu items, it will provide context about its overall state but should not pass that directly into its items as props.

##### Orientation

The menu should provide some help for orienting its contents either vertically, like a left nav, or horizontally, like a nav bar. Ideally this will just be a prop that gets put into context so each item can decide how it should appear. It's possible that the menu should enforce direction itself.

##### Focus

By default Focus should go to the tab stops and it's up to each menuItem to decide if it has tabindex=0. An example of a menuItem that shouldn't be focusable would be a Divider.

However for the menu we should provide a focus wrapper that is able to track focus using role="menuitem" to determine what item should get focused.

The menu does not need to provide a native way to be controlled without getting focus directly. Like above, there should be a simple utility wrapper that could be written to implement this.

##### On Menu Click

Some implementations of menu have a general `onClick` function that is applied to all items as a way of getting more information.

Recommendation: There is not a need to have an `onClick` that is called whenever an item is clicked. Instead the root `menu` should take an `onClick` that will fire if a child's on click does not prevent default.

#### Menu Items

##### On Item Click

The on item click should be supplied individually by the consuming component

##### Focus

The menu item should change border and background color on focus.

##### Hover

The menu item should change border and background color on hover.

An extra consideration needs to be made for forcing focus into the menu item on hover. Menus on most Microsoft desktop applications work this way. We should ensure there is a way to achieve this behavior through composition or props.

#### Submenu Items

A submenu item should have all of the same states and behaviors as menu items with the only difference being that submenu items lack an `onClick` callback.

A submenu item needs to provide a way for menus to open on hover as many submenus have that behavior.

##### Open

A menu item should have a different state depending on if it is open or not.

### Theming && customization

The menu should have as few opinions on theming as possible, allowing the items to determine customizations as much as possible. There should also be a way to easily remove the theme entirely from the menu so the items can determine the look and feel.

#### Menu Tokens

None needed

#### Menu Item Tokens

| Token Name                 |
| -------------------------- |
| rootBackgroundColor        |
| rootBorderColor            |
| rootHoverBackgroundColor   |
| rootFocusedBackgroundColor |
| rootHoverBorderColor       |
| rootFocusedBorderColor     |
| rootOutlineColor           |
| rootHoverOutlineColor      |
| rootFocusedOutlineColor    |

#### Submenu Item Tokens

Extends menu item tokens

| Token Name              |
| ----------------------- |
| rootOpenBackgroundColor |
| rootOpenBorderColor     |

### Composition

The menu should consist of a list element, a `div`, which renders individual menu items. Each menu item consists of an element which renders with `role="menuitem"`
