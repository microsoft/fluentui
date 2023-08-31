# Drawer

The `Drawer` component represents a drawer that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](<https://www.figma.com/file/V2sDk36xZfp8tFhb53DfsT/Drawer-(Overlay-%26-Inline)?type=design&viewport=2606%2C1404%2C0.23&t=iNWjZIpDljA1EshA-0>)

## Engineering Spec

The Fluent WC3 Drawer extends `FASTElement`

### Class: `Drawer`

### Template

```html
 <template
      ?open="${x => x.open}"
      ?modal="${x => x.modal}"
      control-size="${x => x.controlSize}"
      position="${x => x.position}"
      role="${x => (x.modal ? 'dialog' : 'complementary')}"
      tabindex="${x => (x.open ? '0' : '-1')}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-hidden="${x => (x.open ? 'false' : 'true')}"
      aria-label="${x => x.ariaLabel}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
    >
      <div
        class="overlay"
        part="overlay"
        ?hidden="${x => !x.modal || !x.open}"
        aria-hidden="${x => !x.modal || !x.open}"
        role="presentation"
      ></div>
      <div class="root" part="root">
        <slot name="start"></slot>
        <div class="header-container">
          <div class="buttons" part="buttons">
            <slot name="buttons"></slot>
          </div>
          <div class="header" part="header">
            <slot name="header"></slot>
          </div>
        </div>
        <div class="content" part="content" ${ref('content')}>
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="end"></slot>
      </div>
    </template>
```

### **Variables**

| Name             | Type                     | Description          |
| ---------------- | ------------------------ | -------------------- |
| `DrawerPosition` | `type of DrawerPosition` | Positions for Drawer |
| `DrawerSize`     | `type of DrawerSize`     | Sizes for Drawer     |

### **Properties**

| Name              | Type                                | Default             | Description                                                                       | Inherited From |
| ----------------- | ----------------------------------- | ------------------- | --------------------------------------------------------------------------------- | -------------- |
| `hasInteracted`   | `boolean`                           | `false`             | Indicates whether the drawer has been interacted with.                            |                |
| `trapFocus`       | `boolean`                           | `false`             | Determines whether the focus should be trapped within the drawer when it is open. |                |
| `drawer`          | `HTMLElement \| undefined`          | `undefined`         | The drawer element.                                                               |                |
| `open`            | `boolean`                           | `false`             | Indicates whether the drawer is open or closed.                                   |                |
| `modal`           | `boolean`                           | `false`             | Determines whether the drawer should be displayed as modal or non-modal.          |                |
| `position`        | `DrawerPosition \| undefined`       | `undefined`         | Sets the position of the drawer (left/right).                                     |                |
| `controlSize`     | `DrawerSize \| number \| undefined` | `DrawerSize.medium` | Sets the control size of the drawer.                                              |                |
| `ariaLabelledby`  | `string \| undefined`               | `undefined`         | Sets the aria-labelledby attribute of the drawer.                                 |                |
| `ariaDescribedby` | `string \| undefined`               | `undefined`         | Sets the aria-describedby attribute of the drawer.                                |                |
| `toolbar`         | `boolean`                           | `false`             | Indicates the presence of the toolbar.                                            |                |
| `focusTarget`     | `string \| undefined`               | `undefined`         | The element to receive focus when the drawer opens.                               |                |

### **Attributes**

| Name               | Field           |
| ------------------ | --------------- |
| `open`             | open            |
| `modal`            | modal           |
| `position`         | position        |
| `control-size`     | controlSize     |
| `aria-labelledby`  | ariaLabelledby  |
| `aria-describedby` | ariaDescribedby |

### **Events**

| Name   | Type                     | Description                                |
| ------ | ------------------------ | ------------------------------------------ |
| `open` | `CustomEvent<OpenEvent>` | Fires when the drawer is opened or closed. |

### **Methods**

| Name                         | Privacy | Description                                                                          |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `show`                       | public  | Shows the drawer.                                                                    |
| `hide`                       | public  | Hides the drawer.                                                                    |
| `toggleDrawer`               | public  | Toggles the state of the drawer (open/closed).                                       |
| `openChanged`                | public  | Handles changes to the `open` property.                                              |
| `focusTargetElement`         | private | Focuses the target element within the drawer.                                        |
| `setDrawerWidth`             | private | Sets the width of the drawer based on control size.                                  |
| `findFocusTargetInShadowDom` | private | Finds the focus target element within the Shadow DOM.                                |
| `handleDocumentKeydown`      | private | Handles the keydown event on the document.                                           |
| `handleDocumentFocus`        | private | Handles the focus event on the document.                                             |
| `handleTabKeyDown`           | private | Handles the keydown event when the Tab key is pressed.                               |
| `getTabQueueBounds`          | private | Retrieves the tabbable elements within the drawer.                                   |
| `focusFirstElement`          | private | Focuses the first element within the drawer.                                         |
| `shouldForceFocus`           | private | Determines whether the current focused element should force focus within the drawer. |
| `shouldTrapFocus`            | private | Determines whether the focus should be trapped within the drawer.                    |
| `updateTrapFocus`            | private | Updates the trapping focus behavior based on the current state.                      |
| `reduceTabbableItems`        | private | Reduces the tabbable items within an element.                                        |
| `isFocusableFastElement`     | private | Checks if a FAST Element is focusable.                                               |
| `hasTabbableShadow`          | private | Checks if a FAST Element's shadow DOM has any tabbable elements.                     |

### **Slots**

| Name      | Description                             |
| --------- | --------------------------------------- |
| `toolbar` | The slot for the toolbar content        |
| `header`  | The slot for the header content         |
|           | The default slot for the main content   |
| `actions` | The slot for the actions/content footer |

## **Accessiblity**

### **WAI-ARIA Roles, States, and Properties**

- `role = "complementary"`

  - The drawer component should have a role of "complementary" to indicate its supplementary content role.

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
