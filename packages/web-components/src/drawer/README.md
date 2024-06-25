# Drawer

The `Drawer` component represents a drawer that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](<https://www.figma.com/file/V2sDk36xZfp8tFhb53DfsT/Drawer-(Overlay-%26-Inline)?type=design&viewport=2606%2C1404%2C0.23&t=iNWjZIpDljA1EshA-0>)

## Engineering Spec

The Fluent WC3 Drawer extends `FASTElement`

### Class `Drawer`

### Template

```ts
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <dialog
      class="dialog"
      part="dialog"
      role="${x => (x.type === 'modal' ? 'dialog' : void 0)}"
      aria-modal="${x => (x.type === 'modal' ? 'true' : void 0)}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      size="${x => x.size}"
      position="${x => x.position}"
      type="${x => x.type}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @cancel="${(x, c) => x.hide()}"
      ${ref('dialog')}
    >
      <slot></slot>
    </dialog>
  `;
}
```

### **Variables**

| Name             | Type                            | Description            |
| ---------------- | ------------------------------- | ---------------------- |
| `DrawerPosition` | `start` `end`                   | Positions for Drawer   |
| `DrawerSize`     | `small` `medium` `large` `full` | Sizes for Drawer       |
| `DrawerType`     | `modal` `non-modal` `inline`    | Modal types for Drawer |

### **Attributes**

| Name              | Privacy | Type           | Description                                                                               |
| ----------------- | ------- | -------------- | ----------------------------------------------------------------------------------------- |
| `type`            | public  | DrawerType     | Determines whether the drawer should be displayed as a modal, non-modal or inline drawer. |
| `position`        | public  | DrawerPosition | Sets the position of the drawer (start/end).                                              |
| `size`            | public  | DrawerSize     | Sets the size of the drawer (small/medium/large).                                         |
| `ariaDescribedby` | public  | string         | The ID of the element that describes the drawer.                                          |
| `ariaLabelledby`  | public  | string         | The ID of the element that labels the drawer.                                             |

### **Events**

| Name           | Type          | Description                                  |
| -------------- | ------------- | -------------------------------------------- |
| `toggle`       | `CustomEvent` | Fires after the dialog's open state changes  |
| `beforetoggle` | `CustomEvent` | Fires before the dialog's open state changes |

### **Methods**

| Name               | Privacy | Description                                                     |
| ------------------ | ------- | --------------------------------------------------------------- |
| `show`             | public  | Shows the drawer.                                               |
| `hide`             | public  | Hides the drawer.                                               |
| `emitToggle`       | public  | Method to emit an event after the dialog's open state changes.  |
| `emitBeforeToggle` | public  | Method to emit an event before the dialog's open state changes. |
| `clickHandler`     | public  | Handles click events on the drawer.                             |
| `keydownHandler`   | public  | Handles keydown events on the drawer.                           |

### **Slots**

| Name | Description                           |
| ---- | ------------------------------------- |
|      | The default slot for the main content |

### **CSS Variables**

| Name             | Description                         |
| ---------------- | ----------------------------------- |
| `--drawer-width` | Used to set the width of the drawer |

## **Accessiblity**

### **WAI-ARIA Roles, States, and Properties**

| Name               | Privacy | Type                | Description                                                                  |
| ------------------ | ------- | ------------------- | ---------------------------------------------------------------------------- |
| `role`             | public  | string              | Sets the role of the dialog element to dialog when modal dialog is rendered. |
| `aria-modal`       | public  | string or undefined | Indicates if the drawer is modal.                                            |
| `aria-describedby` | public  | string              | The ID of the element that describes the drawer.                             |
| `aria-labelledby`  | public  | string              | The ID of the element that labels the drawer.                                |
| `aria-label`       | public  | string              | Provides an accessible name for the drawer when aria-labelledby is not used. |

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<DrawerOverlay>` | `type="modal"`          |
| `<DrawerInline>`  | `type="inline"`         |
| `<DrawerBody> `   | `<drawer-body>`         |
