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

Please refer to the `react-popover` spec for more detailled comparison of positionining between v9 and v0.

### Trigger vs target

The v7 `ContextualMenu` has a prop `target` which is intended to be a ref to the DOM element that the positioning logic anchors to. The usage of this prop requires the visibility state of the component to be controlled using React state by the consumer. The same prop exists on the v0 `Popup` component that is intended to perform the same function.

```tsx
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

```tsx
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

```tsx
<Menu items={items} vertical />
```

### Open/Dismiss events

The v7 `ContextualMenu` is intended to be used as a controlled component. The visibiltiy of the menu is controlled using the `hidden` prop whose value should be React state of the cosumer. A separate `onDismiss` prop can also be used that will be invoked during events where the callout tries to close, i.e. click outside the content.

The v0 `Popup` should be compared here, since the v0 `Menu` does not handle open/dismiss events. `Popup` visibility can be controlled using the `open` prop. `Popup` provides a callback prop `onOpenChange` which can be used both to open and dismiss.

As mentioned above, `Popup` implements an autocontrolled pattern which allows both controlled an uncontrolled variants to be used in its API.

```tsx
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

```tsx
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

```tsx
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

```tsx
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

```tsx
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

```tsx
const menuProps = {
  items: [{
    ...
    data: { foo: "bar" }
  }]
}
```

v0 custom rendering through shorthand components is a consistent experience through all shorthand components, but provide a smaller API surface (whether this is simpler or less powerful can be subjective). Custom rendering in the case of the `Menu` component would be done through the use of `children` prop either through the standard React child component API or through shorthand as a callback function.

```tsx
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

```typescript
export type MenuProps = MenuListProps &
  Pick<PositioningProps, '<Positioning props as necessary>'> & {
    /**
     * Explicitly require children
     */

    children: React.ReactNode;
    /**
     * Whether the popup is open
     */
    open?: boolean;

    /**
     * Call back when the component requests to change value
     * The `open` value is used as a hint when directly controlling the component
     */
    onOpenChange?: (e: MenuOpenEvents, data: MenuOpenChangeData) => void;

    /**
     * Whether the popup is open by default
     */
    defaultOpen?: boolean;

    /**
     * Wrapper to style and add events for the popup
     */
    menuPopup?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /*
     * Opens the menu on hover
     */
    openOnHover?: boolean;

    /**
     * Opens the menu on right click (context menu), removes all other menu open interactions
     */
    openOnContext?: boolean;

    /**
     * Root menus are rendered out of DOM order on `document.body`, use this to render the menu in DOM order
     * This option is disregarded for submenus
     */
    inline?: boolean;
  };
```

### MenuTrigger

A non-visual component that wraps its child and configures them to be the trigger that will open a menu. This component should only accept one child

```typescript
export type MenuTriggerProps = {
  /**
   * Explicitly require single child
   */
  children: React.ReactElement;
};
```

### MenuList

This component is used internally by `Menu` and manages the context and layout its items.

`MenuList` can also be used separately as the standalone variant of the `Menu`, since it should not control popup positioning or triggers. It is the only component in the API that can be used standalone. Envisioned to be used with more complex popup or trigger scenarios where the `Menu` component does not provide enough control for these situations.

```typescript
export type MenuListProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Callback when checked items change for value with a name
     *
     * @param name - the name of the value
     * @param checkedItems - the items for this value that are checked
     */
    onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, checkedItems: string[]) => void;

    /**
     * Map of all checked values
     */
    checkedValues?: Record<string, string[]>;

    /**
     * Default values to be checked on mount
     */
    defaultCheckedValues?: Record<string, string[]>;

    /**
     * States that menu items can contain icons and reserve slots for item alignment
     */
    hasIcons?: boolean;

    /**
     * States that menu items can contain selectable items and reserve slots for item alignment
     */
    hasCheckmarks?: boolean;
  };
```

### MenuGroup

Creates a group inside a `MenuList`, setting up header layout and dividers between `MenuItems`.

The MenuGroup is also a useful component to declare different selection groups (checkbox/radio) in a `MenuList`.

> This component only accepts native DOM attributes as props.

### MenuGroupHeader

Creates a section header element with appropriate styling. Will set correct `aria-labelledby` relationship if it is instantiated within a [MenuGroup](#menugroup)

> This component only accepts native DOM attributes as props.

### MenuDivider

Creates a divider element in the `MenuList` with correct HTML and aria semantics for divider.

This divider is purely a visual cue. To ensure consistent narration experience across all screenreaders [MenuGroup](#menugroup) should be used

> This component only accepts native DOM attributes as props.

### MenuItem

```typescript
export type MenuItemProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Icon slot rendered before children content
     */
    icon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /**
     * A helper slot for alignment when a menu item is used with selectable menuitems
     * Avoid using this slot as a replacement for MenuItemCheckbox and MenuItemRadio components
     */
    checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /**
     * Icon slot that shows the indicator for a submenu
     */
    submenuIndicator?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /**
     * Component children are placed in this slot
     * Avoid using the `children` property in this slot in favour of Component children whenever possible
     */
    content?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /**
     * Secondary content rendered opposite the primary content (e.g Shortcut text)
     */
    secondaryContent?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

    /**
     * If the menu item is a trigger for a submenu
     */
    hasSubmenu?: boolean;

    /**
     * Applies disabled styles to menu item but remains focusable
     */
    disabled?: boolean;

    /**
     * Clicking on the menu item will not dismiss an open menu
     */
    persistOnClick?: boolean;
  };
```

### MenuItemCheckbox/Radio

Variants of `MenuItem` that allows a single or multiple selection state based on the value that it represents. API is intended to mirror that of HTML inputs

- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio

```typescript
/**
 * Props for selecatble menu items
 */
export type MenuItemSelectableProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * Follows input convention
   * https://www.w3schools.com/jsref/prop_checkbox_name.asp
   */
  name: string;

  /**
   * Follows input convention
   * https://www.w3schools.com/jsref/prop_checkbox_value.asp
   */
  value: string;

  /**
   * Whether the selectable item is disabled
   */
  disabled?: boolean;
};

export type MenuItemCheckboxProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> &
  MenuItemProps &
  MenuItemSelectableProps & {
    /**
     * Slot for the checkmark indicator
     */
    checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  };

export type MenuItemRadioProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> &
  MenuItemProps &
  MenuItemSelectableProps & {
    checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  };
```

## Sample code

The below samples do not represent the definitive props of the final implemented component, but represent the ideal final implementations. Can be subject to change during the implementation phase.

### Basic Menu

```tsx
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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
```

### Menu items with icons

```tsx
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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>
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

```tsx
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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>
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

```tsx

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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>
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

```tsx
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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>
<div role="menu" aria-labelledby="trigger">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="menuitem" tabindex="-1" aria-haspopup="menu" aria-expanded="false" id="submenu-trigger">Open submenu</div>
</div>

<!-- expected DOM output for submenu  -->
<div role="menu" aria-labelledby="submenu-trigger">
  <div role="menuitem" tabindex="-1">Option 1</div>
  <div role="menuitem" tabindex="-1">Option 2</div>
  <div role="menuitem" tabindex="-1">Option 3</div>
</div>
```

### Standlone

```tsx
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

```tsx
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
<button aria-haspopup="menu" aria-expanded="true" id="trigger">Open menu</button>

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

```tsx
const trigger = <button> Open menu </button>

// basic checkbox example
const menuSplitbutton= (
  <Menu trigger={trigger}>
    <MenuTrigger><button>Opem menu</button></MenuTrigger>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
      <Menu>
        <MenuSplitGroup>
          <MenuItem>Main action</MenuItem>
          <MenuTrigger>
            <MenuItem />
          </MenuTrigger>
        </MenuSplitGroup>
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
  <div role="menuitem" tabindex="-1" aria-haspopup="menu" aria-expanded="false" id="submenu-trigger">Open submenu</div>
</div>

<!-- expected DOM output  -->
<div role="menu">
  <div role="menuitem" tabindex="0">Option 1</div>
  <div role="group">
    <div role="menuitem" tabindex="-1">content slot</div>
    <div role="menuitem" tabindex="-1" aria-haspopup="menu" aria-expanded="false" id="submenu-trgger">
      <svg>indicator icon</svg>
    </div>
  </div>
</div>

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

### Mouse/Keyboard interactions

Below is a set of diagrams that tries to illustrates all the interactions menus and nested menus support in an easily understandable way.

> TODO convert these diagrams to excalidraw or smth that is text format
> TODO add extra descriptions to diagrams

<img src="./etc/images/menu-interactions/Slide1.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide2.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide3.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide4.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide5.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide6.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide7.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide8.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide9.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide10.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide11.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide12.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide13.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide14.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide15.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide16.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide17.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide18.PNG" width="700" />

### Split button MenuItem submenu

All of the above Mouse events seen previously should apply to the part of the split button that is intended to open a submenu.

> TODO convert these diagrams to excalidraw or smth that is text format
> TODO add extra descriptions to diagrams

<img src="./etc/images/menu-interactions/Slide19.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide20.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide21.PNG" width="700" />
<img src="./etc/images/menu-interactions/Slide22.PNG" width="700" />

### MenuItem selection

Below are the interactions that should be supported for all menu items that are required to handle a selection state.

In the event that the selection method is a radio, the previous selected item must be unselected.

| Type     | Action | Result | Details                                      |
| -------- | ------ | ------ | -------------------------------------------- |
| Keyboard | Space  | Toggle | Toggle the selection status of the menu item |
| Keyboard | Enter  | Toggle | Toggle the selection status of the menu item |
| Mouse    | Click  | Toggle | Toggle the selection status of the menu item |

#### Linking keyboard navigation and mouse hover

When a user sets focus on menu items using keyboard navigation, and then switches to mouse hover there should be one unique 'active' state for menu items. There should not be two different indicators at this point for hover and focus. Below is a GIF of the `ContextualMenu` in v7 that also supports this behaviour.

![Linked keyboard and mouse navigation](./etc/images/linked-keyboard-mouse-navigation.gif)

### Positioning

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

### Disabled menu items

Disabled menu items should be focusable

### Linking keyboard navigation and mouse hover

This can be difficult to impleemnt correctly without introducing a11y issues. The mouse should only apply focus if it is certain that the user is actively using the mouse on the page. If a menu is opened with keyboard interaction, and contains the mouse cursor by chance focus should not be applied.
