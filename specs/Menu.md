# Menu

## Background

### Definition

This spec defines the default function of a `Menu` as an interactive component that displays a list of options that can be represented by a range possible states. Possible variants are defined in [the relevant section](#variants)

The `Menu` should be displayed on a temporary surface that interrupts the normal flow of content. The temporary surface should be triggered by an external user action such as (but not limited to) a click on a button or other UI control.

The interactions that result in the dismiss/removal of the `Menu` component should be configurable.

## Prior art

As a part of the spec definitions in Fluent UI, a research effort has been made through [Open UI](https://open-ui.org/). The current research proposal is available as an open source contribution undergoing review ([research proposal](https://github.com/WICG/open-ui/pull/249))

## Comparison of `@fluentui/react` and `@fluentui/react-northstar`

- All mentions of v7 or v8 == `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 == `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

The most relevant comparison that can be achieved between the two libraries is between `ContextualMenu` in v7 and a combination of `Menu`, `Popup` and `ToolbarItem` in v0.

v0 suffers from a consistency issue that the control used in `Menu` and the menu variant of `ToolbarItem` are not actually the same component and have different behavior. However, semantically for the purposes of this spec, they representthe same control that will be implemented.

Note that the below code samples are not meant to be complete, but to highlight differences between the two libraries. Please refer to official docsites for actual API references.

### Positioning

`ContextualMenu` in v7 is a component that also exposes the API to control the positioning of the temporary popup surface that the Menu is rendered on. This aspect of the v7 component should be compared with the `Popup` component in v0 since the v0 `Menu` is created as a standalone component with no positioning properties.

v0 uses the [OSS Popper.js library](https://popper.js.org/) while v7 uses a component based implementation `CalloutContent`. Below we provide the results of testing common positioning boundary/edge cases between the two.

// TODO compare boudary/edge cases in positioning

- flip
- prevent overflow
- offset from reference
- tethering

### Trigger vs target

The v7 `ContextualMenu` has a prop `target` which is intended to be a ref to the DOM element that the positioning logic anchors to. The usage of this prop requires the visibility state of the component to be controlled using React state by the consumer. The same prop exists on the v0 `Popup` component that is intended to perform the same function.

```typescript
const buttonRef = React.useRef(<button />)
// V7/8
<ContextualMenu
  ...
  target={buttonRef}
/>

// v0 - shorthand
<Popup
  target={buttonRef}
  content={...}
/>
```

The v0 `Popup` component has an alternative prop, `trigger`, which accepts a React component. This prop simplifies the creation of temporary content by autocontrolling the open/dismiss functionality.

```typescript
// v0 - shorthand trigger
<Popup
  trigger={<Button />}
  content={...}
/>
// v0 - children trigger
<Popup content={...}>
  <Button icon={<MoreIcon />} title="Show popup" />
</Popup>
```

### Layout variations

The v7 `ContextualMenu` only has one primary layout which is a vertical list of menu items.

The v0 `Menu` component differs clearly in this that the default layout is a horizontal menu. To achieve the same layout as `ContextualMenu` (and the layout defined in this spec) it's necessary to use the `vertical` prop which is `false` by default.

```typescript
<Menu items={items} vertical />
```

### Open/Dismiss events

The v7 `ContextualMenu` is intended to be used as a controlled component. The visibiltiy of the menu is controlled using the `hidden` prop whose value should be React state of the cosumer. A separate `onDismiss` prop can also be used that will be invoked during events where the callout tries to close, i.e. click outside the content.

The v0 `Popup` should be compared here, since the v0 `Menu` does not handle open/dismiss events. `Popup` visibility can be controlled using the `open` prop. `Popup` provides a callback prop `onOpenChange` which can be used both to open and dismiss.

As mentioned above, `Popup` implements an autocontrolled pattern which allows both controlled an uncontrolled variants to be used in its API.

```typescript
// v7 controlled ContextualMenu
const [showContextualMenu, setShowContextualMenu] = React.useState(false);
const onShowContextualMenu = () => setShowContextualMenu(true);
const onHideContextualMenu = () => setShowContextualMenu(false);

<ContextualMenu
  hidden={!showContextualMenu}
  onItemClick={onHideContextualMenu}
  onDismiss={onHideContextualMenu
/>;

// v0 uncontrolled Popup
const [open, setOpen] = React.useState(false);

<Popup
  onOpenChange={(e, props: PopupProps) => {/*react on changes*/}}
  trigger={<Button icon={<OpenOutsideIcon />} title="Open popup" />}
/>;

// v0 controlled Popup - used with trigger disables autocontrol
const [open, setOpen] = React.useState(false);

<Popup
  open={open}
  onOpenChange={(e, props: PopupProps) => setOpen(!props.open)}
  trigger={<Button icon={<OpenOutsideIcon />} title="Open popup" />}
/>;
```

### Keyboard navigation

Both v7 and v0 support arrow navigation in the menu, and home/end keys to jump to first and last items respectively.

One interesting difference is that the v7 `ContextualMenu` will also tab through items. The v0 `Menu` on the other hand uses tab to focus in/out of the entire component.

`ContextualMenu` will also allow disabled items to be focusable while navigating the list, while the v0 `Menu` does not permit this.

### Selection state

The v0 `Menu` component supports and `active` state and has a number of props to manage this state. However, this state only affects items visually and does not perform the same function as menu item checkboxes or radio items. The `active` state of menu items can both be controlled and autocontrolled

```typescript
// v0 autocontrolled active index with default
<Menu defaultActiveIndex={0}>
  <Menu.Item index={0}>
    <Menu.ItemContent>Editorials</Menu.ItemContent>
  </Menu.Item>
</Menu>

// v0 autocontrolled active index controlled
<Menu activeIndex={0}>
  <Menu.Item index={0}>
    <Menu.ItemContent>Editorials</Menu.ItemContent>
  </Menu.Item>
</Menu>

// shorthand variation
const items = [
  {
    key: 'editorials',
    content: 'Editorials',
  },
]
<Menu defaultActiveIndex={0} items={items} />
```

In order to obtain semantically meaningful selection state in v0, the only possible way is to use a `Toolbar` component. The menu that is rendered in this component is completely different but supports both checkbox and radio selection states through the use of an `active` prop and must be controlled.

```typescript
// Toolbar with one item that opens a selectable menu
const toolbarItems = [
  {
    icon: <MoreIcon />,
    title: 'More',
    menu: [
      {
        active: true,
        content: 'Bold',
        kind: 'toggle',
        // kind: 'radio', // for radio
        onClick: handleToggleClick,
      },
      {
        active: false,
        content: 'Italic',
        kind: 'toggle',
        // kind: 'radio', // for radio
      },
    ],
    menuOpen,
    onMenuOpenChange: (e, { menuOpen }) => setMenuOpen(menuOpen),
  },
]

<Toolbar items={toolbarItems}>
```

The v7 `ContextualMenu` on the other hand, only supports the checkbox selection state implicitly. This behavior must be controlled by consumers and uses `canCheck` and `isChecked` props:

```typescript
const menuProps = {
  shouldFocusOnMount: true,
  items: [
    {
      text: 'New',
      canCheck: true,
      isChecked: true,
      onClick: onToggleSelect,
    },
    {
      text: 'Share',
      canCheck: true,
      isChecked: false,
      onClick: onToggleSelect,
    },
  ],
};

// shorthand usage in a menu button
<DefaultButton menuProps={menuProps} />;
```

### DOM output

Below are some sample DOM outputs to compare for certain scenarios. Not all DOM attributes are reflected here, a subset have been chosen to provide easier reading and comparison.

### Basic menu

```html
<!-- v7 basic menu  -->
<ul role="menu">
  <li role="presentation">
    <button role="menuitem" tabindex="0">
      <div class="linkContent">
        <span class="itemText">Editorials</span>
      </div>
    </button>
  </li>
  <li role="presentation">
    <button role="menuitem" tabindex="-1">
      <div class="linkContent">
        <span class="itemText">Reviews</span>
      </div>
    </button>
  </li>
</ul>

<!-- v0 basic menu  -->
<ul role="menu">
  <li role="presentation">
    <a role="menuitem" tabindex="0">
      <span class="menu__itemcontent">Editorials</span>
    </a>
  </li>
  <li role="presentation">
    <a role="menuitem" tabindex="-1">
      <span class="menu__itemcontent">Reviews</span>
    </a>
  </li>
</ul>
```

### Menu divider

```html
<!-- v7 divider item  -->
<li role="separator" aria-hidden="true"></li>

<!-- v0 divider item  -->
<li role="presentation" class="menu__divider"></li>
```

### Custom rendering and data

v7 provides render callbacks that can be used to render either the entire menu list or specific slots of menut items. Each call back provides the props avaialble to that slot and a `defaultRender` which allows to easily extend the original render, if required.

```typescript
// v7 custom rendering
const menuProps = {
  onRenderMenuList: (props: IContextualMenuListProps, defaultRenderer) => {},
  onRenderSubMenu: (props: IContextualMenuProps, defaultRenderer) => {},
  items: [
    {
      onRender: (
        item: any,
        dismissMenu: (ev?: any, dismissAll?: boolean) => void
      ) => React.ReactNode
    }
    {onRenderContent: (props: IContextualMenuItemProps, defaultRenderer) => {}},
    {onRenderIcon: (props: IContextualMenuItemProps, defaultRenderer) => {}},
  ]
}

<ContextualMenu menuProps={menuProps}>
```

Custom data can also be associated with menu items

```typescript
const menuProps = {
  items: [{
    ...
    data: { foo: "bar" }
  }]
}
```

v0 custom rendering through shorthand components is a consistent experience through all shorthand components, but provide a smaller API surface (whether this is simpler or less powerful can be subjective). Custom rendering in the case of the `Menu` component would be done through the use of `children` prop either through the standard React child component API or through shorthand as a callback function.

```typescript
// v0 shorthand children render callback
const items = [
  {
    key: 'editorials',
    children: (El, props) => <El>{props.key}</El>
  },
]

<Menu defaultActiveIndex={0} items={items} />

// v0 children API custom render
<Menu>
  <Menu.Item index={0}>
    <Menu.ItemContent>Editorials</Menu.ItemContent>
  </Menu.Item>
  <Menu.Item index={1}>
    CustomContent
  </Menu.Item>
  {/*Not recommended but definitely possible*/}
  <div>custom item</div>
</Menu>
```

## Variants

### Nested menus

A `Menu` should be able to trigger an additional instance of itself as a part of one or more of its options. The nested `Menu` component should have the same functional capabilities as the root `Menu` component.

The actions that trigger the the nested `Menu` should be be consistent with the actions that can trigger any root `Menu` from a similar UI control.

We advise that no more than two nested `Menu` components be used, but this spec does not functionally apply that constrain to the implementation of the `Menu` component.

### Selection state

A `Menu` should be able to track and represent the selection state of all or some of its options if required.

When an options is associated with a selection state. The `Menu`, either root or nested, should control its dismiss behavior accordingly based on configuration.

### Sections

A `Menu` can be partitioned into sections using visible dividers in its list of options. Each section can contain a heading title that announces or briefly describes the options in the particular section

### Secondary text

An option of a `Menu` component should be able to declare additional secondary text that can provide additional context describing the option or its usage.

For example a secondary text can be a label that shows a keyboard shortcut that will perform an equivalent action of the option of the `Menu` component.

### Split option with nesting

An option of a `Menu` component can trigger a nested `Menu` component and also perform its default action by splitting the option into two interactable areas that handle each action separately.

### Disabled option(s)

All options in a `Menu` component can be disabled and should provide a visible indication for this purpose. User interaction should be defined for disabled options

### Scrollable

A `Menu` should display a vertical scrollbar when the number of options exceeds the height of the component

### Standalone/No surface

A `Menu` can be used without the temporary popup surface and its trigger. This will allow `Menu` components to be permanent page content or used in custom surfaces with a wider range of UI components.

### Custom content

```
This variant is still a work in progress and needs additional thought
```

Any custom content can be used in the rendering of the Menu, all interactions and accessibility is left to the discretion of the consumer.

## API

The `Menu` should implement a `children` based API as is the standard across all the surveyed alternatives as a part of Open UI research in [Prior Art](#prior-art). The component will leverage the use of `context` in the interaction and data flows of child components.

Sample usages will be give in the following section of this document [Sample code](#sample-code)

### Menu

The root level component serves as a simplified interface (sugar) for popup positioning and triggering.

### MenuList

This component is used internally by `Menu` and manages the context and layout its items.

`MenuList` can also be used separately as the standalone variant of the `Menu`, since it should not control popup positioning or triggers. It is the only component in the API that can be used standalone. Envisioned to be used with more complex popup or trigger scenarios where the `Menu` component does not provide enough control for these situations.

### MenuSection

Creates a section inside a `MenuList`, setting up header layout and dividers between `MenuItems`.

The MenuSection is also a useful component to declare different selection groups (checkbox/radio) in a `MenuList`.

### MenuItem

As the name infers

### SubMenu

Creates a `Menu` component with `MenuItem` trigger and handles the positioning of the nested menu.

## Sample code

The below samples do not represent the definitive props of the final implemented component, but represent the ideal final implementations. Can be subject to change during the implementation phase.

### Default Menu

```typescript
const trigger = <button> Open menu </button>

const menu = (
  <Menu trigger={trigger}>
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  <Menu>
)
```

### Sections and submenus

```typescript
const trigger = <button> Open menu </button>

const menu = (
  <Menu trigger={trigger}>
    <MenuItem>Option 1</MenuItem>
    <MenuSection title="Section">
      <MenuItem>Section Option 1</MenuItem>
      <MenuItem>Section Option 2</MenuItem>
      <MenuItem>Section Option 3</MenuItem>
    <MenuSection />
    <SubMenu title="Open submenu">
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    <SubMenu>
  <Menu>
)
```

### Standlone

```typescript
const [open] = React.useState(false);

const menu = (
  <CustomSurface open={open}>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    <MenuList>
  <CustomSurface>
)
```

### Selection

```typescript
const trigger = <button> Open menu </button>
const [selectedItems, setSelectedItems] = React.useState([]);

// basic checkbox example
const menuCheckbox = (
  <Menu
    selectedItems={selectedItems}
    onSelectionChange={setSeelctedItems}
    trigger={trigger}
  >
    <MenuItem index={1}>Option 1</MenuItem>
    <MenuItem index={2}>Option 2</MenuItem>
    <MenuItem index={3}>Option 3</MenuItem>
  <Menu>
)

// leverage MenuSection for different selection groups
const menuSelectableSections = (
  <Menu
    selectedItems={selectedItems}
    onSelectionChange={setSeelctedItems}
    trigger={trigger}
  >
    <MenuSection kind="checkbox">
      <MenuItem index={1}>Option 1</MenuItem>
      <MenuItem index={2}>Option 2</MenuItem>
      <MenuItem index={3}>Option 3</MenuItem>
    </MenuSection>
    <MenuSection kind="radio">
      <MenuItem index={4}>Option 1</MenuItem>
      <MenuItem index={5}>Option 2</MenuItem>
      <MenuItem index={6}>Option 3</MenuItem>
    </MenuSection>
  <Menu>
)
```

// TODO positioning examples ?

## Behaviors

### Useful references

The below references were used to decide n appropriate keyboard interactions from an a11y perspective.

- https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
- https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
- https://www.w3.org/WAI/tutorials/menus/application-menus/

### Menu open/dismiss

A menu can be triggered by the following user interactions on the triggering/anchor element. Not all interactions should be supported at the same time, but the component must be able to support combinations of the below interactions.

As a general rule, once the menu is closed the focus should return to the triggering element once the menu is closed unless the interaction would involve another focusable element.

| Type     | Action     | Result  | Details                                                                |
| -------- | ---------- | ------- | ---------------------------------------------------------------------- |
| Mouse    | Click      | Open    | Click on the trigger element                                           |
| Mouse    | Hover      | Open    | Hover over the trigger element with delay                              |
| Mouse    | LongPress  | Open    | MouseDown with delay, equivalent to right click for touch devices      |
| Mouse    | Click      | Open    | Right click for contextual menus                                       |
| Keyboard | Enter      | Open    | Focus on trigger element and press Enter                               |
| Keyboard | Space      | Open    | Focus on trigger element and press Space                               |
| Keyboard | Shift+F10  | Open    | Focus on trigger element to open context menu (i.e. right click)       |
| Keyboard | ArrowDown  | Open    | Focus on trigger element. Used in menu buttons                         |
| Mouse    | Click      | Dismiss | Click anywhere outside the component                                   |
| Mouse    | Click      | Dismiss | Click on the trigger while the menu is open                            |
| Mouse    | Click      | Dismiss | Click on a menu item                                                   |
| Mouse    | MouseLeave | Dismiss | Mouse leaves the component after a delay                               |
| Keyboard | Enter      | Dismiss | Invoked on a menu item                                                 |
| Keyboard | Space      | Dismiss | Invoked on a menu item                                                 |
| Keyboard | Esc        | Dismiss | Closes the menu and focuses on the triggering element                  |
| Keyboard | Tab        | Dismiss | Closes the menu and all submenus, focus moves to next element in order |

### Submenu trigger/navigation

A submenu can be triggered by the following user interactions on the triggering menu item. Not all interactions should be supported at the same time, but the component must be able to support combinations of the below interactions.

As a general rule, once a submenu is dismissed without dismissing the menu, the focus should revert to the triggering menu item unless the interaction involves another focusable UI component.

| Type     | Action     | Result  | Details                                                                |
| -------- | ---------- | ------- | ---------------------------------------------------------------------- |
| Mouse    | Click      | Open    | Click the menu item that contains a submenu                            |
| Mouse    | Hover      | Open    | Hover over the menu item that contains a submenu with delay            |
| Keyboard | Enter      | Open    | Focus on triggering menu item                                          |
| Keyboard | Space      | Open    | Focus on triggering menu item                                          |
| Keyboard | ArrowRight | Open    | Focus on triggering menu item                                          |
| Mouse    | Click      | Dismiss | Click on an item in the submenu                                        |
| Mouse    | Click      | Dismiss | Click on a UI element that is not the submenu                          |
| Mouse    | MouseLeave | Dismiss | Mouse leaves the submenu or its triggering menu item after delay       |
| Keyboard | ArrowLeft  | Dismiss | Closes the submenu and focuses on the triggering menu item             |
| Keyboard | Esc        | Dismiss | Closes the submenu and focuses on the triggering menu item             |
| Keyboard | Tab        | Dismiss | Closes the menu and all submenus, focus moves to next element in order |

### Split button MenuItem submenu

All of the above Mouse events in the [previous section](#submenu-trigger/navigation) should apply to the part of the split button that is intended to open a submenu.

```
Keyboard interaction for the split button menu item WIP and requires input from a11y champs
```

Once the the submenu is open, the same behavior as in the [previous section](#submenu-trigger/navigation) apply

### Menu keyboard navigation

Keyboard interactions required to navigate the menu. The alphanumeric match interaction does not need to be supported in all cases, but should be supported as much as possible.

| Type     | Action    | Result            | Details                                                               |
| -------- | --------- | ----------------- | --------------------------------------------------------------------- |
| Keyboard | ArrowDown | Next Item         | Roving, if on the last item got to the first                          |
| Keyboard | ArrowUp   | Previous Item     | Roving, if on the first item go to the last                           |
| Keyboard | Home      | First item        |                                                                       |
| Keyboard | End       | Last item         |                                                                       |
| Keyboard | A-Z, 0-9  | Matched item      | Matches the first item that corresponds alphabetically or numerically |
| Mouse    | Hover     | Reveals scrollbar | If required, reveals scrollbar after delay                            |

### MenuItem selection

Below are the interactions that should be supported for all menu items that are required to handle a selection state.

In the event that the selection method is a radio, the previous selected item must be unselected.

| Type     | Action | Result | Details                                      |
| -------- | ------ | ------ | -------------------------------------------- |
| Keyboard | Space  | Toggle | Toggle the selection status of the menu item |
| Keyboard | Enter  | Toggle | Toggle the selection status of the menu item |
| Mouse    | Click  | Toggle | Toggle the selection status of the menu item |

## Accessibiltiy

WIP 🚧

### Focus management

### Specific keyboard behaviors

Address any specific a11y/narration keyboard behaviours that should be considered which might not fit under official specced behaviour

### Narration
