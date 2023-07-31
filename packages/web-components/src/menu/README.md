# Menu

> A Menu component for handling menus and menu items in a user interface.

<br />

## **Design Spec**

[Link to Menu Design Spec in Figma](https://www.figma.com/file/xyz12345/Menu?node-id=2%3A476)

<br />

## **Engineering Spec**

<br />

The Menu component is responsible for managing menus and their associated menu items. It handles the open/close functionality, focus management, and positioning strategy for showing the menu items.

<br />

### Use Case

Creating a menu component that can be used to display a list of options or actions.

<br />

## Class: `Menu`

<br />

### **Variables**

<br />

### **Fields**

| Name            | Privacy | Type            | Default | Description                                          |
| --------------- | ------- | --------------- | ------- | ---------------------------------------------------- |
| `menu`          | public  | `HTMLElement[]` |         | The menu element(s) to be displayed                  |
| `trigger`       | public  | `HTMLElement[]` |         | The trigger element(s) for opening/closing menu      |
| `open`          | public  | `boolean`       | `false` | Specifies if the menu is open or closed              |
| `menuContainer` | public  | `HTMLElement`   |         | The container element for the menu items             |
| `openOnHover`   | public  | `boolean`       | `false` | Sets whether the menu opens on hover of menu trigger |

<br />

### **Methods**

- `setPositioning()`: Calculates and applies the positioning of the menu list based on available viewport space.
- `focus()`: Focuses the first item in the menu.

<br />

### **Attributes**

| Name            | Field       |
| --------------- | ----------- |
| `open`          | open        |
| `open-on-hover` | openOnHover |

<br />

### **Slots**

| Name      | Description                      |
| --------- | -------------------------------- |
| `trigger` | The trigger element for the menu |
|           | The menulist element             |

<br />

### **Template**

```html
<slot name="trigger" ${slotted({ property: 'trigger', filter: elements() })}></slot>
<span class="menu-list-container" ${ref('menuListContainer')} ?hidden="${(x) => !x.open}">
  <slot ${slotted({ property: 'menu', filter: elements() })}></slot>
</span>
```

## **Accessibility**

**WAI-ARIA Roles, States, and Properties**
<br />

- aria-haspopup
- aria-expanded

<hr />

## **Preparation**

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Menu>`          | `<fluent-menu>`         |
| `<MenuList>`      | `<fluent-menu-list>`    |
| `<MenuItem>`      | `<fluent-menu-item>`    |

<br />

| Fluent UI React 9 | Fluent Web Components | Description of difference                                                                                                                                        |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasIcons`        |                       | React implementation requires user to pass the `hasIcons` to align menu items with icons. The web components implimentation aligns content by default.           |
| `hasCheckmarks`   |                       | React implementation requires user to pass the `hasCheckmarks` to align menu items with checkmarks. The web components implimentation aligns content by default. |
