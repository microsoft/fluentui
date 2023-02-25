# Menu List

A popup or contextual menu displays a list of options on a temporary surface. They are invoked when users interact with a button, action, or other control.

## Design Spec

[Link to Menu Design Spec in Figma](https://www.figma.com/file/jFWrkFq61GDdOhPlsz6AtX/Menu?node-id=1528%3A5102&t=XtW4laeEzgVFIl1E-0)

## Engineering Spec

Fluent WC3 Menu List extends from the FAST Menu [FAST Menu](https://explore.fast.design/components/fast-menu) and is intended to be as close to the Fluent UI React 9 Menu implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<hr />
<br />

### **Menu List**

### Inputs

- extends HTML Element attributes

### Outputs

- none

### Events

- none

### Slots

- default slot for items

### CSS Variables

<br />
<hr />
<br />

### **Menu Item**

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

<hr />

## Accessibility

**ARIA Attributes**
Attribute | Options | Description
--------------|-----------------|------------|
aria-checked | boolean |
aria-disabled | boolean | indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
role | `menuitem` `menuitemcheckbox` `menuitemradio` | an enum representing the menu items' role

## Preparation

### **Fluent Web Component v3 v.s Fluent React 9**

Due to the nature of Web Components there will not be 100% parity between component implementation in Fluent UI React v9 and Fluent Web Components v3.
<br />

**Component, Slot, and Attribute Mapping**
Component, Slot, or Attribute | Fluent React v9 | Fluent Web Components v3 |
---------------------------------| ---------------------| ---------------------------|
Menu | `<Menu>` | `<fluent-menu>` |
Menu item |`<MenuItem>` | `<fluent-menu-item>` |
Menu item with radio | `<MenuItemRadio>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Menu item with checkbox | `<MenuItemCheckbox>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Icons | `<MenuItem icon={<MyIcon />}>` | `<slot name ="start">..` <br /> `<slot name="end">..`|
Menu group header | `<MenuGroupHeader>` | `<fluent-menu-item class="header">`|
