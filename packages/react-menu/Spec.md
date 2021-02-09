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

v0 uses the [OSS Popper.js library](https://popper.js.org/) while v7 uses a component based implementation `CalloutContent`. As a result, the API is very similar in intent and vocabulary as Popper.

Below we provide the results of testing common positioning boundary/edge cases between the two.

#### Configuration consistency

The biggest difference bewteen the two libraries is that v0 provides a purely positioning based API out of the `Popup` react component. v0 Provides no direct prop values that will style the popup container and any adjustments to stlying properties such as (but not limited to) dimensions/margin/padding/layoud are expected to be implmented through the styling system used throughout the library

The `Callout` component has some styling helpers that affect the styling of the contents:

- calloutMaxHeight
- calloutMaxWidth
- calloutWidth
- backgroundColor

The `ContextualMenu` component uses two styling properties not offered by `Callout` (useTargetWidth, useTargetMinWidth) and also duplicates some of `Callout's` own positioning properties while also allowing a shorthand slot for the `Callout`

```typescript
<Contextualmenu
  bounds
  beakWidth
  coverTarget
  directionalHint
  directionalHintFixed
  directionalHintForRTL
  doNotLayer
  gapSpace
  isBeakVisible

  {/* All the above props can also be set here */}
  calloutProps
/>
```

The result being that `ContextualMenu's` positiong and styling risks being abused by developers inexperienced in the library. There is also no documentation on the v7 docsite that states `calloutProps` is actually overriden by props declared directly on `ContextualMenu`

### Position/Alignment hints

Both libraries provide an API that achieves the same end result for positioning and alignment. Below is a table that maps the v7 `DirectionalHint` with the v0 props of `position` and `alignment`

`DirectionalHint` can be passed to both `Callout` (which powers positioning) or directly to `ContextualMenu` (in two different ways). Whereas `position` and `alignment` are props of `Popup` in v0 and not used directly in `Menu` even for the positioning of its submenu.

| DirectionalHint (v7) | position (v0) | align (v0) |
| -------------------- | ------------- | ---------- |
| topLeftEdge          | above         | start      |
| topCenter            | above         | center     |
| topRightEdge         | above         | bottom     |
| topAutoEdge          | above         |            |
| bottomLeftEdge       | above         | start      |
| bottomCenter         | below         | center     |
| bottomRightEdge      | below         | bottom     |
| bottomAutoEdge       | below         |            |
| leftTopEdge          | before        | top        |
| leftCenter           | before        | center     |
| leftBottomEdge       | before        | bottom     |
| rightTopEdge         | after         | before     |
| rightCenter          | after         | center     |
| rightBottomEdge      | after         | bottom     |

First it's necessary to note the difference between the vocabulary used between the two. v7 will use `left` and `right` while v0 uses `before` and `after`. v0 vocabulary here is chosen to convey the appropriate meaning regardless of RTL by using the semantics of the conntent. It's also interesting to note that it's possible to supply an explicit RTL hint to v7 which is a flip by default. v0 will flip by default but requires the consumer to detect RTL scenarios and modify props in these situations

In general the separation of both the position and alignment in v0 results in an API that is easier to use if a consumer only needs to modify one of the two props. However both try to achieve the same result in the end.

It's important to note that if an incorrect pair of `position` and `align` are provided in v0, then `position` takes priority and `align` is set to `center`

#### Offset

```typescript
<ContextualMenu
  // single number value
  gap={100}
/>

<Popup
  offset={[-100, 100]}
/>

// offset can also be a function of raw Popper properties
const offsetFunction = ({
  popper: PopperJs.Rect;
  reference: PopperJs.Rect;
  placement: PopperJs.Placement;
}) => ([popper.width, -popper.height])
```

v7 positioning can only apply a numerical value to the first part position attribute of `DirectionalHint`. v0 uses a much more flexible API that not only supports a function to defer calculation at runtime, but also supports the offset of the `Popup` in both axes.

#### Bounds and overflow

v0 `Popup` API is more consistent in this aspect and provides more control than the v7 `Callout`.

```typescript
<Popup
...
  flipBoundary={htmlElement}
  overflowBoundary={htmlElement}
  mountNode={htmlElement}
/>
```

`Popup` provider 3 different properties to handle bounds and overflow:

- flipBoundary - the bounds to calculate when to flip positioning of the popup
- overflowBoundary - the bounds to shift the popup without overflowing
- mountNode - where the popup is actually rendered in the DOM, by default this is a portal to a div in body

```typescript
<ContextualMenu
  // pixel values for bounding rectangle
  // defaults to target window as default bounding rectangle
  bounds={{height: 0, width: 0, top: 0, left:0 , right: 0, bottom: 0}}
  // callback for bounds
  bounds{(target, targetWindow) => ({/*Same object as above*/})}
  target={htmlElement}

  // renders to a portal node on body
  layerProps={/*ILayerProps*/}

  // every single one of the above can all be declared here too
  calloutProps={{bounds, target}}
/>
```

`ContextualMenu` or `Callout` has no notion of separate boundaries for flip or overflow, and auto behaviour is used for flip and overflow 'pushing'
It should also be noted that `ContextualMenu` allows all of the same props to be passed to its submenus to custom tweak position for each submenu if necessary

#### Submenu positioning

The default positioning for both v0 and v7 submenus is:

- rightTopEdge (v7)
- top-after (v0)

Both will also flip appropriately when the overflow boundary is too small.

The main difference between the two is that v0 submenu's position does not expose any way to customize or override the positioning of the submenu. However v7 allows every single customization as the root menu. It is very possible to do the below:

```typescript
const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    subMenuProps: {
      // Any positioning props of `ContextualMenu` are usable
      directionalHint: DirectionalHint.rightTopEdge,
      // All `Callout` props as also usable
      calloutProps: {...},
      items: [...],
    },
  },
```

#### Events

v7 provides the following positioning event callbacks that might be used and should probably be supported for backwards compatibility:

- onLayerMounted
- onPositioned
- onScroll

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

#### Basic menu

Both the current v7 and v0 versions of this control use the `ul` and `li` combination along with content wrapper elements. This makes style overrides kind of complicated to target and also makes custom rendering difficult since there is the added complexity of targeting stricter DOM structures.

`ul`/`li` combinations are also very strict in markdown and might not play well with newer concepts like virtualization and custom scrollbars where arbitrary `div` elements can be inserted into the DOM.

In terms off A11y and narration there is effectively no difference in having a wrapping element or not. Would useful in the proposed new API to use a simpler DOM structure that provides more flexibility.

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

### Secondary label

An option of a `Menu` component should be able to declare additional secondary label that can provide additional context describing the option or its usage.

For example a secondary label can be a label that shows a keyboard shortcut that will perform an equivalent action of the option of the `Menu` component.

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

### MenuTrigger

A non-visual component that wraps its child and configures them to be the trigger that will open a menu. This component should only accept one child

### MenuList

This component is used internally by `Menu` and manages the context and layout its items.

`MenuList` can also be used separately as the standalone variant of the `Menu`, since it should not control popup positioning or triggers. It is the only component in the API that can be used standalone. Envisioned to be used with more complex popup or trigger scenarios where the `Menu` component does not provide enough control for these situations.

### MenuGroup

Creates a group inside a `MenuList`, setting up header layout and dividers between `MenuItems`.

The MenuGroup is also a useful component to declare different selection groups (checkbox/radio) in a `MenuList`.

| Prop name | Type | Details                                                                     |
| --------- | ---- | --------------------------------------------------------------------------- |
| title     | text | The title of of the section renders a [MenuGroupHeader](#menusectionheader) |

### MenuGroupHeader

Creates a section header element with appropriate styling. Will set correct `aria-labelledby` relationship if it is instantiated within a [MenuGroup](#menugroup)

### MenuDivider

Creates a divider element in the `MenuList` with correct HTML and aria semantics for divider.

This divider is purely a visual cue. To ensure consistent narration experience across all screenreaders [MenuGroup](#menugroup) should be used

### MenuItem

As the name infers

| Prop name      | Type      | Details                                   |
| -------------- | --------- | ----------------------------------------- |
| icon           | ReactNode | Icon that is rendered with the menu item  |
| secondaryLabel | text      | A secondary label i.e. keyboard shortcuts |

### MenuItemCheckbox

A variant of `MenuItem` that allows a multiple selection state based on the value that it represents

| Prop name | Type | Details                                            |
| --------- | ---- | -------------------------------------------------- |
| name      | text | The name of the value that the checkbox represents |
| value     | text | The value of the checkbox                          |

### MenuItemRadio

A variant of `MenuItem` that allows a single selection state based on the value that it represents

| Prop name | Type | Details                                            |
| --------- | ---- | -------------------------------------------------- |
| name      | text | The name of the value that the checkbox represents |
| value     | text | The value of the checkbox                          |

## Sample code

The below samples do not represent the definitive props of the final implemented component, but represent the ideal final implementations. Can be subject to change during the implementation phase.

### Basic Menu

```typescript
const menu = (
  <Menu>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
      <MenuItem>Option 3</MenuItem>
    </MenuList>
  <Menu>
)
```

```html
<!-- expected DOM output  -->
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
```

### Menu items with icons

```typescript
const menu = (
  <Menu>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem icon={<FileIcon />}>Option 1</MenuItem>
      <MenuItem icon={<BellIcon />}>Option 2</MenuItem>
      <MenuItem icon={<LinkIcon />}>Option 3</MenuItem>
    </MenuList>
  <Menu>
)
```

```html
<!-- expected DOM output  -->
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">
    <span role="presentation"><svg>FileIcon</svg></span>
    Option 1
  </div>
  <div role="menuitem" tabindex="0">
    <span role="presentation"><svg>BellIcon</svg></span>
    Option 2
  </div>
  <div role="menuitem" tabindex="0">
    <span role="presentation"><svg>LinkIcon</svg></span>
    Option 3
  </div>
</div>
```

### Sections

```typescript
const menu = (
  <Menu>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <MenuDivider />
      <MenuGroup title="Section title">
        <MenuItem>Section Option 1</MenuItem>
        <MenuItem>Section Option 2</MenuItem>
        <MenuItem>Section Option 3</MenuItem>
      <MenuGroup />
    </MenuList>
  <Menu>
)
```

```html
<!-- expected DOM output  -->
<!-- TODO positioning -->
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="separator" aria-hidden="true"></div>
  <div role="group" aria-labelledby="sectionid">
    <div role="presentation" aria-hidden="true" id="sectionid">Section title</div>
    <div role="menuitem" tabindex="-1">Section Option 1</div>
    <div role="menuitem" tabindex="-1">Section Option 2</div>
    <div role="menuitem" tabindex="-1">Section Option 3</div>
  </div>
  <div role="separator"></div>
</div>
```

Custom section headings can also be used, but must be used within a [MenuGroup](#menugroup) to ensure correct narration experience

```typescript

const menu = (
  <Menu>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <MenuDivider />
      <MenuGroup>
        <MenuGroupHeader>{children}</MenuGroupHeader>
        <MenuItem>Section Option 1</MenuItem>
        <MenuItem>Section Option 2</MenuItem>
        <MenuItem>Section Option 3</MenuItem>
      <MenuGroup />
    </MenuList>
  <Menu>
)
```

```html
<!-- expected DOM output  -->
<!-- TODO positioning -->
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="separator" aria-hidden="true"></div>
  <div role="group" aria-labelledby="sectionid">
    <div role="presentation" aria-hidden="true" id="sectionid">children</div>
    <div role="menuitem" tabindex="-1">Section Option 1</div>
    <div role="menuitem" tabindex="-1">Section Option 2</div>
    <div role="menuitem" tabindex="-1">Section Option 3</div>
  </div>
  <div role="separator"></div>
</div>
```

### Submenus

```typescript
const menu = (
  <Menu>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <Menu>
        <MenuTrigger>
          <MenuItem>Open submenu</MenuItem>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </MenuList>
      </Menu>
    </MenuList>
  <Menu>
)
```

```html
<!-- expected DOM output  -->
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1" aria-haspopup="true" aria-expanded="false" id="submenu-trigger">Open submenu</div>
</div>

<!-- expected DOM output for submenu  -->
<div role="menu" aria-labelledby="submenu-trigger">
  <div role="menuitem" tabindex="-1">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
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

```html
<!-- expected DOM output  -->
<div role="menu">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
```

### Selection

```typescript
const trigger = <button> Open menu </button>
const [selectedItems, setSelectedItems] = React.useState([]);

// basic checkbox example
const menuCheckbox = (
  <Menu
    kind="checkbox"
    selectedItems={selectedItems}
    onSelectionChange={setSeelctedItems}
  >
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItemCheckbox name="checkbox1" value={1}>Option 1</MenuItemCheckbox>
      <MenuItemCheckbox name="checkbox1" value={2}>Option 2</MenuItemCheckbox>
      <MenuItemCheckbox name="checkbox2" value={3}>Option 3</MenuItemCheckbox>
    </MenuList>
  <Menu>
)

// leverage MenuGroup for different selection groups
const menuSelectableSections = (
  <Menu
    selectedItems={selectedItems}
    onSelectionChange={setSeelctedItems}
  >
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuGroup title="Checkbox section">
        <MenuItemCheckbox name="checkbox" value={1}>Option 1</MenuItem>
        <MenuItemCheckbox name="checkbox" value={2}>Option 2</MenuItem>
        <MenuItemCheckbox name="checkbox" value={3}>Option 3</MenuItem>
      </MenuGroup>
      <MenuGroup title="Radio section">
        <MenuItemRadio name="radio" value={1}>Option 1</MenuItemRadio>
        <MenuItemRadio name="radio" value={2}>Option 2</MenuItemRadio>
        <MenuItemRadio name="radio" value={3}>Option 3</MenuItemRadio>
      </MenuGroup>
    </MenuList>
  <Menu>
)
```

```html
<button aria-haspopup="true" aria-expanded="true" id="trigger">Open menu</button>

<!-- expected DOM output for basic checkbox  -->
<div role="menu" aria-labelledby="trigger">
  <div role="menuitemcheckbox" tabindex="0" aria-checked="true">Option 1</div>
  <div role="menuitemcheckbox" tabindex="-1" aria-checked="false">Option 2</div>
  <div role="menuitemcheckbox" tabindex="-1" aria-checked="false">Option 3</div>
</div>

<!-- expected DOM output for different selection groups  -->
<div role="menu" aria-labelledby="trigger">
  <div role="group" aria-label="Checkbox section">
    <div role="presentation" aria-hidden="true">Checkbox section</div>
    <div role="menuitemcheckbox" tabindex="0" aria-checked="true">Option 1</div>
    <div role="menuitemcheckbox" tabindex="-1" aria-checked="false">Option 2</div>
    <div role="menuitemcheckbox" tabindex="-1" aria-checked="false">Option 3</div>
  </div>
  <div role="separator"></div>
  <div role="group" aria-label="Radio section">
    <div role="presentation" aria-hidden="true">Radio section</div>
    <div role="menuitemradio" tabindex="-1" aria-checked="true">Option 1</div>
    <div role="menuitemradio" tabindex="-1" aria-checked="false">Option 2</div>
    <div role="menuitemradio" tabindex="-1" aria-checked="false">Option 3</div>
  </div>
</div>
```

### Split button

```typescript
const trigger = <button> Open menu </button>

// basic checkbox example
const menuSplitbutton= (
  <Menu trigger={trigger}>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <Menu>
        <MenuTrigger>
          <MenuItemSplit></MenuItemSplit>
        </MenuTrigger>
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    <MenuList>
  <Menu>
)
```

```html
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1" aria-haspopup="true" aria-expanded="false" id="submenu-trigger">Open submenu</div>
</div>

<!-- expected DOM output  -->
<div role="menu">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="presentation">
    <div role="menuitem" tabindex="-1">content slot</div>
    <div role="menuitem" tabindex="-1" aria-haspopup="true" aria-expanded="false" id="submenu-trgger">
      <svg>indicator icon</svg>
    </div>
  </div>
</div>

<!-- TODO submenu positioning -->
<div role="menu" aria-labelledby="submenu-trigger">
  <div role="menuitem" tabindex="-1">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
```

## Behaviors

### Useful references

The below references were used to decide n appropriate keyboard interactions from an a11y perspective.

- https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
- https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
- https://www.w3.org/WAI/tutorials/menus/application-menus/

### Menu open/dismiss

A menu can be triggered by the following user interactions on the triggering/anchor element. Not all interactions should be supported at the same time, but the component must be able to support combinations of the below interactions.

As a general rule, once the menu is closed the focus should return to the triggering element once the menu is closed unless the interaction would involve another focusable element.

| Type     | Action     | Result  | Details                                                           | Focus after                                   |
| -------- | ---------- | ------- | ----------------------------------------------------------------- | --------------------------------------------- |
| Mouse    | Click      | Open    | Click on the trigger element                                      | First menuitem                                |
| Mouse    | Hover      | Open    | Hover over the trigger element with delay                         | First menuitem                                |
| Mouse    | LongPress  | Open    | MouseDown with delay, equivalent to right click for touch devices | First menuitem                                |
| Mouse    | Click      | Open    | Right click for contextual menus                                  | First menuitem                                |
| Keyboard | Enter      | Open    | Focus on trigger element and press Enter                          | First menuitem                                |
| Keyboard | Space      | Open    | Focus on trigger element and press Space                          | First menuitem                                |
| Keyboard | Shift+F10  | Open    | Focus on trigger element to open context menu (i.e. right click)  | First menuitem                                |
| Keyboard | ArrowDown  | Open    | Focus on trigger element. Used in menu buttons                    | First menuitem                                |
| Keyboard | ArrowUp    | Open    | Focus on trigger element. Used in menu buttons                    | Last menuitem                                 |
| Mouse    | Click      | Dismiss | Click anywhere outside the component                              | menu trigger                                  |
| Mouse    | Click      | Dismiss | Click on the trigger while the menu is open                       | menu trigger                                  |
| Mouse    | Click      | Dismiss | Click on a menu item                                              | User defined - default menu trigger           |
| Mouse    | MouseLeave | Dismiss | Mouse leaves the component after a delay                          | menu trigger                                  |
| Keyboard | Enter      | Dismiss | Invoked on a menu item                                            | User defined - default menu trigger           |
| Keyboard | Space      | Dismiss | Invoked on a menu item                                            | User defined - default menu trigger           |
| Keyboard | Esc        | Dismiss | Closes the menu                                                   | menu trigger                                  |
| Keyboard | Tab        | Dismiss | Closes the menu and all submenus                                  | next tabbable element after menu trigger      |
| Keyboard | Shift+Tab  | Dismiss | Closes the menu and all submenus                                  | previous tabbable element before menu trigger |

### Submenu trigger/navigation

A submenu can be triggered by the following user interactions on the triggering menu item. Not all interactions should be supported at the same time, but the component must be able to support combinations of the below interactions.

As a general rule, once a submenu is dismissed without dismissing the menu, the focus should revert to the triggering menu item unless the interaction involves another focusable UI component.

| Type     | Action     | Result  | Details                                                          | Focus after                                        |
| -------- | ---------- | ------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| Mouse    | Click      | Open    | Click the menu item that contains a submenu                      | First menuitem in submenu                          |
| Mouse    | Hover      | Open    | Hover over the menu item that contains a submenu with delay      | First menuitem in submenu                          |
| Keyboard | Enter      | Open    | Focus on triggering menu item                                    | First menuitem in submenu                          |
| Keyboard | Space      | Open    | Focus on triggering menu item                                    | Frist menuitem in submenu                          |
| Keyboard | ArrowRight | Open    | Focus on triggering menu item                                    | First menuitem in submenu                          |
| Mouse    | Click      | Dismiss | Click on an item in the submenu                                  |                                                    |
| Keyboard | Space      | Dismiss | Invoked on a submenu item                                        |                                                    |
| Keyboard | Space      | Dismiss | Invoked on a submenu item                                        |                                                    |
| Mouse    | Click      | Dismiss | Click on a UI element that is not the submenu                    | Root menu trigger                                  |
| Mouse    | MouseLeave | Dismiss | Mouse leaves the submenu or its triggering menu item after delay | Root menu trigger                                  |
| Keyboard | ArrowLeft  | Dismiss | Closes the submenu                                               | menu item that contained submenu                   |
| Keyboard | Esc        | Dismiss | Closes the submenu                                               | menu item that contained submenu                   |
| Keyboard | Tab        | Dismiss | Closes the menu and all submenus                                 | Next tabbable element after root menu trigger      |
| Keyboard | Shift+Tab  | Dismiss | Closes the menu and all submenus                                 | Previous tabbable element before root menu trigger |

### Split button MenuItem submenu

All of the above Mouse events in the [previous section](#submenu-trigger/navigation) should apply to the part of the split button that is intended to open a submenu.

```
Keyboard interaction for the split button menu item WIP and requires input from a11y champs
```

Once the the submenu is open, the same behavior as in the [previous section](#submenu-trigger/navigation) apply

### Menu keyboard navigation

Keyboard interactions required to navigate the menu. The alphanumeric match interaction does not need to be supported in all cases, but should be supported as much as possible.

| Type     | Action    | Result            | Details                                                               | Focus after                                |
| -------- | --------- | ----------------- | --------------------------------------------------------------------- | ------------------------------------------ |
| Keyboard | ArrowDown | Next Item         | Roving                                                                | Next item, if on last item then first      |
| Keyboard | ArrowUp   | Previous Item     | Roving                                                                | Previous item, if on first item go to last |
| Keyboard | Home      | First item        |                                                                       | First item                                 |
| Keyboard | End       | Last item         |                                                                       | Last item                                  |
| Keyboard | A-Z, 0-9  | Matched item      | Matches the first item that corresponds alphabetically or numerically | Matched item                               |
| Mouse    | Hover     | Reveals scrollbar | If required, reveals scrollbar after delay                            | Keeps focus on existing item               | ### MenuItem selection |

Below are the interactions that should be supported for all menu items that are required to handle a selection state.

In the event that the selection method is a radio, the previous selected item must be unselected.

| Type     | Action | Result | Details                                      |
| -------- | ------ | ------ | -------------------------------------------- |
| Keyboard | Space  | Toggle | Toggle the selection status of the menu item |
| Keyboard | Enter  | Toggle | Toggle the selection status of the menu item |
| Mouse    | Click  | Toggle | Toggle the selection status of the menu item |

### Positioning

### Placement + alignment

A menu can be placed and aligned in any of the configurations allowed by current v0 and v7:

- Before or after anchor element
- Above or below anchor element
- Aligned at top/bottom/left/right edge of anchor element
- Aligned centered to the anchor element

The above should result in 12 possible position hints in total

#### Flip

A menu should be positioned so that it will flip its positioning on a given axis if the boundary (e.g. viewport) gets to small that it might overflow

#### Nudging

A menu should be positioned so that if its boundary (e.g. viewport) might overflow, the placement of the popup should be 'nudged' closer into the boundary

#### Anchor placement offset

A menu should be positioned so that the distance with respect to the anchor element should be configurable on both axes.

#### Inline vs portal rendering

A menu should be positioned so that it can be rendered either out of order on the DOM (e.g. portal to body) or inline in DOM order.

#### Submenu positioning

The default positioning for a submenu should be the standard seen in both v7 and v0. Submenu should be placed after the menu item trigger and aligned with the top edge.

Although this should not be recommended, for the purposes of compatibility with v7, all positioning aspects should be configurable for submenus.

## Accessibiltiy

Accessibility behaviour is built into the spec as much as possible. This section addresses specific issues that don't fit well with the standard definition of the component.

## Migration

The immediate candidates for adoption for a converged `Menu` component which are hinted at the beginning of the spec are:

- [ContextualMenu](https://developer.microsoft.com/en-us/fluentui#/controls/web/contextualmenu) for v7
- [Menu](https://fluentsite.z22.web.core.windows.net/0.52.0/components/menu/definition) for v0

This component has characteristics that should probably be considered for the following components in terms of future migrations:

- [Toolbar](https://fluentsite.z22.web.core.windows.net/0.52.0/components/toolbar/definition) in v0 which shares a menu component. The component itself also should use similar behaviour and interactions to `Menu`
- [Dropdown](https://fluentsite.z22.web.core.windows.net/0.52.0/components/dropdown/definition) in v0 contains a menu. Dropdown semantics are different to that of standard menus in accessibility, but certain behaviours such as keyboard navigation and selection can be reused for such a component
- [CommandBar](https://developer.microsoft.com/en-us/fluentui#/controls/web/commandbar) in v7 also contains a menu subcomponent as well as behaviour similar to `Menu` semantics
- [Nav](https://developer.microsoft.com/en-us/fluentui#/controls/web/nav) in v7 could reuse certain behaviours in `Menu` such as keyboard navigation, but will use different DOM and aria semantics, this could be achieved through state hook variants or composition
- [OverflowSet](https://developer.microsoft.com/en-us/fluentui#/controls/web/overflowset) in v7 contains a submenu component
- [PivotSet](https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot) could be considered as a component variant of `Menu`
- [Breadcrumb](https://developer.microsoft.com/en-us/fluentui#/controls/web/breadcrumb) in v7 contains a submenu component and could also be considered as a component variant of `Menu

### Creating sections or groups within a menu

⚠️ When using [MenuDivider](#menudivider) without [MenuGroup](#menugroup)

The [MenuDivider](#menudivider) is a purely visual component. The component is only intended to be used as visual 'sugar'. When meaningful partitions [MenuItems](#menuitem) exists, [MenuGroup](#menugroup) should be used to provide the correct experience for narration.

⚠️ When using [MenuSectionHeader](#menudivider)

[MenuGroup](#menugroup) as a parent component ensures that correct `aria-labelledby` relationship is defined between the header and the group.

### Focus management

### Disabled menu items

Disabled menu items should be focusable
