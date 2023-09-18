# Drawer

The `Drawer` component represents a drawer that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](<https://www.figma.com/file/V2sDk36xZfp8tFhb53DfsT/Drawer-(Overlay-%26-Inline)?type=design&viewport=2606%2C1404%2C0.23&t=iNWjZIpDljA1EshA-0>)

## Engineering Spec

The Fluent WC3 Drawer extends `FASTElement`

### Class: `Drawer`

### Template

```html
   <template ?inert="${x => !x.open}" ?open="${x => x.open}" size="${x => x.size}" position="${x => x.position}">
      ${when(
        x => x.modal,
        html<T>`
          <div
            class="overlay"
            part="overlay"
            role="presentation"
            ?hidden="${x => !x.open}"
            @click="${x => x.hide()}"
          ></div>
        `,
      )}
      <div
        class="drawer"
        part="drawer"
        role="${x => (x.modal ? 'dialog' : 'complementary')}"
        tabindex="${x => (x.open ? '0' : '-1')}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-modal="${x => (x.modal ? 'true' : 'false')}"
        @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
        ${ref('drawer')}
      >
        <div class="header">
          <slot name="navigation"></slot>
          <slot name="header"></slot>
        </div>
        <div class="content" part="content" ${ref('content')}>
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </template>
```

### **Variables**

| Name             | Type                     | Description          |
| ---------------- | ------------------------ | -------------------- |
| `DrawerPosition` | `type of DrawerPosition` | Positions for Drawer |
| `DrawerSize`     | `type of DrawerSize`     | Sizes for Drawer     |

### **Properties**

| Name              | Type                                | Default             | Description                                                                       |
| ----------------- | ----------------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| `trapFocus`       | `boolean`                           | `false`             | Determines whether the focus should be trapped within the drawer when it is open. |
| `drawer`          | `HTMLElement \| undefined`          | `undefined`         | Reference to the drawer element.                                                  |
| `content`         | `HTMLElement \| undefined`          | `undefined`         | Reference to `.content` element                                                   |
| `open`            | `boolean`                           | `false`             | Indicates whether the drawer is open or closed.                                   |
| `modal`           | `boolean`                           | `false`             | Determines whether the drawer should be displayed as modal or non-modal.          |
| `position`        | `DrawerPosition \| undefined`       | `undefined`         | Sets the position of the drawer (left/right).                                     |
| `size`            | `DrawerSize \| number \| undefined` | `DrawerSize.medium` | Sets the control size of the drawer.                                              |
| `ariaLabelledby`  | `string \| undefined`               | `undefined`         | Sets the aria-labelledby attribute of the drawer.                                 |
| `ariaDescribedby` | `string \| undefined`               | `undefined`         | Sets the aria-describedby attribute of the drawer.                                |

### **Attributes**

| Name               | Field           |
| ------------------ | --------------- |
| `open`             | open            |
| `modal`            | modal           |
| `position`         | position        |
| `size`             | size            |
| `trap-focus`       | trapFocus       |
| `aria-labelledby`  | ariaLabelledby  |
| `aria-label`       | ariaLabel       |
| `aria-describedby` | ariaDescribedby |

### **Events**

| Name          | Type                     | Description                                |
| ------------- | ------------------------ | ------------------------------------------ |
| `openChanged` | `CustomEvent<OpenEvent>` | Fires when the drawer is opened or closed. |

### **Methods**

| Name                    | Privacy   | Description                                    |
| ----------------------- | --------- | ---------------------------------------------- |
| `show`                  | public    | Shows the drawer.                              |
| `hide`                  | public    | Hides the drawer.                              |
| `toggleDrawer`          | public    | Toggles the state of the drawer (open/closed). |
| `handleDocumentKeydown` | public    | Handles the keydown event on the document.     |
| `handleKeyDown`         | public    | Handles the keydown event on the drawer.       |
| `openChanged`           | protected | Handles changes to the `open` property.        |
| `noFocusTrapChanged`    | protected | Handles changes to the `noFocusTrap` property. |

### **Slots**

| Name         | Description                            |
| ------------ | -------------------------------------- |
| `navigation` | The slot for header navigation content |
| `header`     | The slot for the header content        |
|              | The default slot for the main content  |
| `footer`     | The slot for the footer                |

### **CSS Variables**

| Name                | Description                           |
| ------------------- | ------------------------------------- |
| `--overflow-border` | Used to set the overflow border color |

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

- `aria-hidden`

  - The `aria-hidden` attribute should be set to indicate whether the drawer is hidden or visible. When the drawer is hidden, `aria-hidden="true"`, and when visible, `aria-hidden="false"`.

- `aria-describedby`

  - The `aria-describedby` attribute should be used to associate the drawer with an element that provides a description of its purpose or content.

- `aria-labelledby`

  - The `aria-labelledby` attribute should be used to associate the drawer with an element that serves as its accessible label or title.
