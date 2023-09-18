# Menu

> A Menu component for handling menus and menu items in a user interface.

<br />

## **Design Spec**

There is no design spec for the `Menu` component as the `Menu` has no visual styles. The design spec for the `MenuList` can be found at [Fluent MenuList Spec](https://www.figma.com/file/jFWrkFq61GDdOhPlsz6AtX/Menu?type=design&node-id=2-39&mode=design&t=RQguhK8xTpmR2MFe-0)

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

| Name                 | Privacy | Type            | Default | Description                                                                            |
| -------------------- | ------- | --------------- | ------- | -------------------------------------------------------------------------------------- |
| `menu`               | public  | `HTMLElement[]` |         | The menu element(s) to be displayed                                                    |
| `trigger`            | public  | `HTMLElement[]` |         | The trigger element(s) for opening/closing menu                                        |
| `open`               | public  | `boolean`       | `false` | Specifies if the menu is open or closed                                                |
| `menuContainer`      | public  | `HTMLElement`   |         | The container element for the menu items                                               |
| `openOnHover`        | public  | `boolean`       | `false` | Sets whether the menu opens on hover of menu trigger                                   |
| `openOnContext`      | public  | `boolean`       | `false` | Opens the menu on right click (context menu), removes all other menu open interactions |
| `closeOnScroll`      | public  | `boolean`       | `false` | Close when scroll outside of it                                                        |
| `persistOnItemClick` | public  | `boolean`       | `false` | Determines if the menu open state should persis on click of menu item                  |

<br />

### **Methods**

| Name                        | Privacy   | Description                                                                                | Parameters                             | Return |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------ | -------------------------------------- | ------ |
| `setComponent`              | public    | ets the trigger and menu list elements and adds event listeners.                           |                                        | void   |
| `setPositioning`            | protected | Calculates and applies the positioning of the menu list based on available viewport space. |                                        | void   |
| `toggleMenu`                | public    | Toggles the open state of the menu.                                                        |                                        | void   |
| `closeMenu`                 | public    | Closes the menu.                                                                           |                                        | void   |
| `openMenu`                  | public    | Opens the menu.                                                                            | `e?: Event`                            | void   |
| `focusMenuList`             | public    | Focuses on the menu list.                                                                  |                                        | void   |
| `focusTrigger`              | public    | Focuses on the menu trigger.                                                               |                                        | void   |
| `openChanged`               | public    | Called whenever the open state changes. Emits `onOpenChange` event.                        | `newValue: boolean, oldValue: boolean` | void   |
| `openOnHoverChanged`        | public    | Called whenever the 'openOnHover' property changes.                                        | `newValue: boolean, oldValue: boolean` | void   |
| `persistOnItemClickChanged` | public    | Called whenever the 'persisitOnItem' property changes.                                     | `newValue: boolean, oldValue: boolean` | void   |
| `openOnContextChanged`      | public    | Called whenever the 'openOnContext' property changes.                                      | `newValue: boolean, oldValue: boolean` | void   |
| `handleMenuKeydown`         | public    | Handles keyboard interaction for the menu.                                                 | `e: KeyboardEvent`                     | void   |
| `handleTriggerKeydown`      | public    | Handles keyboard interaction for the menu trigger.                                         | `e: KeyboardEvent`                     | void   |

<br />

### **Events**

| Name           | Type | Description                                                 |
| -------------- | ---- | ----------------------------------------------------------- |
| `onOpenChange` |      | emits custom `onOpenChange` event when opened state changes |

<br />

### **Attributes**

| Name                    | Field              |
| ----------------------- | ------------------ |
| `open`                  | open               |
| `open-on-hover`         | openOnHover        |
| `open-on-context`       | openOnContext      |
| `close-on-scroll`       | closeOnScroll      |
| `persist-on-item-click` | persistOnItemClick |

<br />

### **Slots**

| Name      | Description                      |
| --------- | -------------------------------- |
| `trigger` | The trigger element for the menu |
|           | The menulist element             |

<br />

### **CSS Variables**

| Name           | Description                     |
| -------------- | ------------------------------- |
| `z-index-menu` | Used to set z-index of the Menu |

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
| `hasIcons`        |                       | React implementation requires user to pass the `hasIcons` to align menu items with icons. The web components implementation aligns content by default.           |
| `hasCheckmarks`   |                       | React implementation requires user to pass the `hasCheckmarks` to align menu items with checkmarks. The web components implementation aligns content by default. |
