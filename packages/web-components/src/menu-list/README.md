# MenuList

The MenuList displays a list of MenuItem options.

## Design Spec

[Link to MenuList Design Spec in Figma](https://www.figma.com/file/jFWrkFq61GDdOhPlsz6AtX/Menu?node-id=1528%3A5102&t=XtW4laeEzgVFIl1E-0)

## Engineering Spec

Fluent WC3 MenuList extends from the FAST Menu [FAST Menu](https://explore.fast.design/components/fast-menu) and is intended to be as close to the Fluent UI React 9 MenuList implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

### Inputs

### Outputs

- none

### Events

- none

### Slots

- default slot for items

### CSS Variables

- `colorNeutralBackground1`
- `colorTransparentStroke`
- `borderRadiusMedium`
- `shadow16`

<br />
<hr />
<br />

## Accessibility

<br/>

**ARIA Attributes**
Attribute | Options | Description
--------------|-----------------|------------|
aria-checked | boolean |
aria-disabled | boolean | indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
role | `menuitem` `menuitemcheckbox` `menuitemradio` | an enum representing the menu items' role

<br/>
<hr />
<br/>

## Preparation

<br/>

### **Fluent Web Component v3 v.s Fluent React 9**

Due to the nature of Web Components there will not be 100% parity between component implementation in Fluent UI React v9 and Fluent Web Components v3.
<br />

**Component, Slot, and Attribute Mapping**
Component, Slot, or Attribute | Fluent React v9 | Fluent Web Components v3 |
--------------------------------|--------------------------------| -----------------------------------------------------|
Menu | `<MenuList>` | `<fluent-menu-list>` |
Menu item | `<MenuItem>` | `<fluent-menu-item>` |
Menu item with radio | `<MenuItemRadio>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Menu item with checkbox | `<MenuItemCheckbox>` | `<fluent-menu-item role="menuitemcheckbox">..` |
Icons | `<MenuItem icon={<MyIcon />}>` | `<slot name ="start">..`<br />`<slot name="end">..` |
Aligning Icons | `<Menu hasIcons>` | aligns by default |
Aligning Checkboxes | `<Menu hasCheckmarks>` | aligns by default |
Menu group header | `<MenuGroupHeader>` | `<fluent-menu-item class="header">` |

<br />

**Additional Deltas:**

**Responsiveness**

The WC3 MenuList component does not currently support responsive styling.

**Composure**

Complete FUIR9 Menu composure

```html
<MenuList>
  <menuitem>Item 1</menuitem>
  <menuitem>Item 2</menuitem>
  <menuitem>Item 3</menuitem>
</MenuList>
```

Complete WC3 Menu composure

```html
<fluent-menu-list>
  <fluent-menu-item>Item 1</fluent-menu-item>
  <fluent-menu-item>Item 2</fluent-menu-item>
  <fluent-menu-item>Item 3</fluent-menu-item>
</fluent-menu-list>
```
