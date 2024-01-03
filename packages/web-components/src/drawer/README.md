# Drawer

The `Drawer` component represents a drawer that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](<https://www.figma.com/file/V2sDk36xZfp8tFhb53DfsT/Drawer-(Overlay-%26-Inline)?type=design&viewport=2606%2C1404%2C0.23&t=iNWjZIpDljA1EshA-0>)

## Engineering Spec

The Fluent WC3 Drawer extends `FASTElement`

### Class `Drawer`

### Template

```html
<dialog
      class="dialog"
      part="dialog"
      role="${x => (x.modalType === DrawerModalType.alert ? 'alertdialog' : void 0)}"
      aria-modal="${x => (x.modalType === 'non-modal' || x.type === 'inline' ? void 0 : 'true')}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      size="${x => x.size}"
      position="${x => x.position}"
      modal-type="${x => x.modalType}"
      type="${x => x.type}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      ${ref('dialog')}
    >
      <div class="drawer" part="drawer">
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </dialog>
```

### **Variables**

| Name              | Type                            | Description            |
| ----------------- | ------------------------------- | ---------------------- |
| `DrawerPosition`  | `start` `end`                   | Positions for Drawer   |
| `DrawerSize`      | `small` `medium` `large` `full` | Sizes for Drawer       |
| `DrawerModalType` | `modal` `non-modal` `alert`     | Modal types for Drawer |
| `DrawerType`      | `overlay` `inline`              | Types for Drawer       |

### **Attributes**

| Name               | Type                                | Default             | Description                                                                      |
| ------------------ | ----------------------------------- | ------------------- | -------------------------------------------------------------------------------- |
| `modal-type`       | `modal` `non-modal` `alert`         | `modal`             | Determines whether the drawer should be displayed as modal, non-modal, or alert. |
| `type`             | `overlay` `inline`                  | `false`             | Determines whether the drawer should be displayed inline or as an overlay        |
| `position`         | `DrawerPosition \| undefined`       | `start`             | Sets the position of the drawer (left/right).                                    |
| `size`             | `DrawerSize \| number \| undefined` | `DrawerSize.medium` | Sets the control size of the drawer.                                             |
| `open`             | `boolean`                           | `false`             | Sets the drawer to be open.                                                      |
| `aria-labelledby`  | `string \| undefined`               | `undefined`         | Sets the aria-labelledby attribute of the drawer.                                |
| `aria-describedby` | `string \| undefined`               | `undefined`         | Sets the aria-describedby attribute of the drawer.                               |
| `aria-label`       | `string \| undefined`               | `undefined`         | Sets the aria-label attribute of the drawer.                                     |

### **Events**

| Name           | Type          | Description                                |
| -------------- | ------------- | ------------------------------------------ |
| `onOpenChange` | `CustomEvent` | Fires when the drawer is opened or closed. |
| `cancel`       | `CustomEvent` | Fires when the drawer is dismissed.        |

### **Methods**

| Name    | Privacy | Description       |
| ------- | ------- | ----------------- |
| `show`  | public  | Shows the drawer. |
| `close` | public  | Hides the drawer. |

### **Slots**

| Name     | Description                           |
| -------- | ------------------------------------- |
| `header` | The slot for header                   |
|          | The default slot for the main content |
| `footer` | The slot for the footer               |

### **CSS Variables**

| Name                       | Description                           |
| -------------------------- | ------------------------------------- |
| `--drawer-overflow-border` | Used to set the overflow border color |
| `--drawer-width`           | Used to set the width of the drawer   |

## **Accessiblity**

### **WAI-ARIA Roles, States, and Properties**

- `role="complementary"`

  - The drawer component should have a role of "complementary" by default to indicate its supplementary content role.

- `role="dialog"`

  - The drawer component should have a role of "dialog" when rendered as a modal.

- `aria-disabled`

  - The `aria-disabled` attribute should be set to indicate whether the drawer is disabled or enabled. When the drawer is disabled, `aria-disabled="true"`, and when enabled, `aria-disabled="false"`.

- `tabindex`

  - The `tabindex` attribute should be set to control the tab order of the drawer component. When the drawer is open, `tabindex="0"` should be set to make the component focusable, and when closed, `tabindex="-1"` should be set to remove it from the tab order.

- `aria-modal`

  - The `aria-modal` attribute should be set to indicate whether the drawer is modal or non-modal. When the drawer is modal, `aria-modal="true"`, and when it is non-modal, `aria-modal="false"`.

- `aria-label`

  - The `aria-label` attribute should be used to label the drawer.

- `aria-describedby`

  - The `aria-describedby` attribute should be used to associate the drawer with an element that provides a description of its purpose or content.

- `aria-labelledby`

  - The `aria-labelledby` attribute should be used to associate the drawer with an element that serves as its accessible label or title.

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9               | Fluent Web Components 3 |
| ------------------------------- | ----------------------- |
| `<DrawerOverlay>`               | `type="overlay"`        |
| `<DrawerInline>`                | `type="inline"`         |
| `<DrawerHeaderTitle>`           | `slot="title"`          |
| `<DrawerHeaderTitle action="">` | `slot="action"`         |
| `<DrawerBody> `                 | `default slot`          |
| `<DrawerHeaderNavigation>`      | `slot="navigation"`     |
| `<DrawerFooter>`                | `slot="footer"`         |
