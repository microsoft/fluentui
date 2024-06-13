# Menu Item

Menu list item options displayed in a MenuList component. They are invoked when users interact with a button, action, or other control.

<hr />

<br />

**Remaining work items**

1. Create support for menu item "grouping"
2. Split button variation

<br />
<hr />
<br />

## Design Spec

[Link to Menu Item Design Spec in Figma](https://www.figma.com/file/jFWrkFq61GDdOhPlsz6AtX/Menu?node-id=1528%3A5102&t=XtW4laeEzgVFIl1E-0)

<br />
<hr />
<br />

## Engineering Spec

Fluent WC3 Menu extends from the FAST Menu [FAST Menu Item](https://explore.fast.design/components/fast-menu) and is intended to be as close to the Fluent UI React 9 Menu implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

### Inputs

- `role` - an enum representing the menu items' role
  - `menuitem`
  - `menuitemcheckbox`
  - `menuitemradio`
- `disabled` - the menu item is disabled
- `checked` - sets the checked value for menuitemcheckbox or menuitemradio items

### Outputs

- none

### Events

- `click` (event) - event for when the item has been clicked or invoked via keyboard
- `change` (event) - event for when the item has been clicked or invoked via keyboard, and will be prevented if the menu item is disabled
- `expanded-change` (event) - event for when the item has been expanded or collapsed

### Slots

- `before` - slot which precedes content
- `default` - slot for the content (the default slot for the item)
- `after` - slot which comes after content
- `submenu` - the slot used to generate a submenu
- `radio-indicator` - slot for radio item selection indicator
- `checkbox-indicator` - slot for the checkbox selection indicator
- `expand-collapse-glyph` - slot for the expand/collapse glyph for nested menus

### CSS Variables

- `borderRadiusMedium`
- `colorCompoundBrandForeground1Hover`
- `colorCompoundBrandForeground1Pressed`
- `colorNeutralBackground1`
- `colorNeutralBackground1Hover`
- `colorNeutralBackground1Pressed`
- `colorNeutralBackgroundDisabled`
- `colorNeutralForeground2`
- `colorNeutralForeground2Hover`
- `colorNeutralForeground2Pressed`
- `colorNeutralForeground3`
- `colorNeutralForegroundDisabled`
- `colorNeutralStrokeDisabled`
- `fontFamilyBase`
- `fontSizeBase200`
- `fontSizeBase300`
- `fontWeightRegular`
- `fontWeightSemibold`
- `lineHeightBase200`
- `lineHeightBase300`

<br />
<hr />
<br />

## Accessibility

<br />

**ARIA Attributes**

| Attribute     | Options                                             | Description                                                                                         |
| ------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| aria-checked  | boolean                                             |
| aria-disabled | boolean                                             | indicates that the element is perceivable but disabled, so it is not editable or otherwise operable |
| role          | `menuitem` \| `menuitemcheckbox` \| `menuitemradio` | an enum representing the menu items' role                                                           |

<hr />
<br />

## Preparation

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

Due to the nature of Web Components there will not be 100% parity between component implementation in Fluent UI React v9 and Fluent Web Components v3.

<br />

**Component, Slot, and Attribute Mapping**
Component, Slot, or Attribute | Fluent React v9 | Fluent Web Components v3 |
---------------------------------| ---------------------| ---------------------------|
Menu | `<MenuList>` | `<fluent-menu>` |
Menu item |`<MenuItem>` | `<fluent-menu-item>` |
Menu item with radio | `<MenuItemRadio>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Menu item with checkbox | `<MenuItemCheckbox>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Icons | `<MenuItem icon={<MyIcon />}>` | `<slot name ="start">..` <br /> `<slot name="end">..`|
Menu group header | `<MenuGroupHeader>` | `<fluent-menu-item class="header">`|

**Additional Deltas**

In order for icons to render with appropriate styles the `icons` attribute must be present on the Menu.
