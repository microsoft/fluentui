# Pane

The `Pane` component represents a pane that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Pane Design Spec in Figma: [Link](<https://www.figma.com/file/V2sDk36xZfp8tFhb53DfsT/Pane-(Overlay-%26-Inline)?type=design&viewport=2606%2C1404%2C0.23&t=iNWjZIpDljA1EshA-0>)

## Engineering Spec

The Fluent WC3 Pane extends `FASTElement`

### Class: `Pane`

### Template

```html
<template
  role="${x => (x.modal ? 'dialog' : 'complementary')}"
  ?open="${x => x.open}"
  ?modal="${x => x.modal}"
  control-size="${x => x.controlSize}"
  position="${x => x.position}"
  focus-target="${x => x.focusTarget}"
  aria-disabled="${x => x.ariaDisabled}"
  aria-hidden="${x => (x.open ? 'false' : 'true')}"
  aria-label="${x => x.ariaLabel}"
  ?trap-focus="${x => x.trapFocus}"
  tabindex="${x => (x.open ? '0' : '-1')}"
  aria-modal="${x => (x.modal ? 'true' : 'false')}"
>
  <div
    class="pane"
    part="pane"
    aria-modal="${x => (x.modal ? 'true' : 'false')}"
    aria-describedby="${x => x.ariaDescribedby}"
    aria-labelledby="${x => x.ariaLabelledby}"
    aria-label="${x => x.ariaLabel}"
  >
    <slot></slot>
  </div>
</template>
```

### **Variables**

| Name           | Type                   | Description        |
| -------------- | ---------------------- | ------------------ |
| `PanePosition` | `type of PanePosition` | Positions for Pane |
| `PaneSize`     | `type of PaneSize`     | Sizes for Pane     |

### **Fields**

| Name                     | Privacy | Type           | Default              | Description                                                                     | Inherited From                                                             |
| ------------------------ | ------- | -------------- | -------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --- |
| `_pane`                  | private | `HTMLElement   | undefined`           | `undefined`                                                                     | Private field representing the pane element.                               |     |
| `hasInteracted`          | private | `boolean`      | `false`              | Private field ndicating whether the pane has been interacted with.              |                                                                            |
| `previousActiveElement ` | private | `HTMLElement   | undefined`           | `undefined`                                                                     | Private field storing the previous active element before opening the pane. |     |
| `trapFocus`              |         | `boolean`      | `false`              | Determines whether the focus should be trapped within the pane when it is open. |                                                                            |
| `pane`                   |         | `HTMLElement   | undefined`           | `undefined`                                                                     | The Pane element.                                                          |     |
| `open`                   |         | `boolean`      | `false`              | Indicates whether the pane is open or closed.                                   |                                                                            |
| `modal`                  |         | `boolean`      | `false`              | Determines whether the pane should be displayed as modal or non-modal.          |                                                                            |
| `position`               |         | `PanePosition` | `PanePosition.right` | Sets the position of the pane (left/right).                                     |                                                                            |
| `paneSize`               |         | `PaneSize`     | `PaneSize.medium`    | Sets the control size of the pane (small/medium/large).                         |                                                                            |
| `ariaLabelledby`         |         | `string        | undefined`           | `undefined`                                                                     | Sets the aria-labelledby attribute of the pane.                            |     |
| `ariaDescribedby`        |         | `string        | undefined`           | `undefined`                                                                     | Sets the aria-describedby attribute of the pane.                           |     |
| `toolbar`                |         | `boolean`      | `false`              | Indicates the presence of the toolbar.                                          |                                                                            |
| `focusTarget`            |         | `string        | undefined`           | `undefined`                                                                     | The element to receive focus when the pane opens.                          |     |
| `previousActiveElement`  |         | `HTMLElement   | undefined`           | `undefined`                                                                     | Stores the previous active element before opening the pane.                |     |

### **Properties**

| Name              | Type                              | Default           | Description                                                                     | Inherited From |
| ----------------- | --------------------------------- | ----------------- | ------------------------------------------------------------------------------- | -------------- |
| `hasInteracted`   | `boolean`                         | `false`           | Indicates whether the pane has been interacted with.                            |                |
| `trapFocus`       | `boolean`                         | `false`           | Determines whether the focus should be trapped within the pane when it is open. |                |
| `pane`            | `HTMLElement \| undefined`        | `undefined`       | The pane element.                                                               |                |
| `open`            | `boolean`                         | `false`           | Indicates whether the pane is open or closed.                                   |                |
| `modal`           | `boolean`                         | `false`           | Determines whether the pane should be displayed as modal or non-modal.          |                |
| `position`        | `PanePosition \| undefined`       | `undefined`       | Sets the position of the pane (left/right).                                     |                |
| `controlSize`     | `PaneSize \| number \| undefined` | `PaneSize.medium` | Sets the control size of the pane.                                              |                |
| `ariaLabelledby`  | `string \| undefined`             | `undefined`       | Sets the aria-labelledby attribute of the pane.                                 |                |
| `ariaDescribedby` | `string \| undefined`             | `undefined`       | Sets the aria-describedby attribute of the pane.                                |                |
| `toolbar`         | `boolean`                         | `false`           | Indicates the presence of the toolbar.                                          |                |
| `focusTarget`     | `string \| undefined`             | `undefined`       | The element to receive focus when the pane opens.                               |                |

### **Attributes**

| Name               | Field           |
| ------------------ | --------------- |
| `trap-focus`       | trapFocus       |
| `pane`             | pane            |
| `open`             | open            |
| `modal`            | modal           |
| `position`         | position        |
| `control-size`     | controlSize     |
| `aria-labelledby`  | ariaLabelledby  |
| `aria-describedby` | ariaDescribedby |
| `toolbar`          | toolbar         |
| `focus-target`     | focusTarget     |

### **Events**

| Name   | Type                     | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| `open` | `CustomEvent<OpenEvent>` | Fires when the pane is opened or closed. |

### **Methods**

| Name                         | Privacy | Description                                                                        |
| ---------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `show`                       | public  | Shows the pane.                                                                    |
| `hide`                       | public  | Hides the pane.                                                                    |
| `togglePane`                 | public  | Toggles the state of the pane (open/closed).                                       |
| `openChanged`                | public  | Handles changes to the `open` property.                                            |
| `focusTargetElement`         | private | Focuses the target element within the pane.                                        |
| `setPaneWidth`               | private | Sets the width of the pane based on control size.                                  |
| `findFocusTargetInShadowDom` | private | Finds the focus target element within the Shadow DOM.                              |
| `handleDocumentKeydown`      | private | Handles the keydown event on the document.                                         |
| `handleDocumentFocus`        | private | Handles the focus event on the document.                                           |
| `handleTabKeyDown`           | private | Handles the keydown event when the Tab key is pressed.                             |
| `getTabQueueBounds`          | private | Retrieves the tabbable elements within the pane.                                   |
| `focusFirstElement`          | private | Focuses the first element within the pane.                                         |
| `shouldForceFocus`           | private | Determines whether the current focused element should force focus within the pane. |
| `shouldTrapFocus`            | private | Determines whether the focus should be trapped within the pane.                    |
| `updateTrapFocus`            | private | Updates the trapping focus behavior based on the current state.                    |
| `reduceTabbableItems`        | private | Reduces the tabbable items within an element.                                      |
| `isFocusableFastElement`     | private | Checks if a FAST Element is focusable.                                             |
| `hasTabbableShadow`          | private | Checks if a FAST Element's shadow DOM has any tabbable elements.                   |

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

  - The pane component should have a role of "complementary" to indicate its supplementary content role.

- `aria-disabled`

  - The `aria-disabled` attribute should be set to indicate whether the pane is disabled or enabled. When the pane is disabled, `aria-disabled="true"`, and when enabled, `aria-disabled="false"`.

- `tabindex`

  - The `tabindex` attribute should be set to control the tab order of the pane component. When the pane is open, `tabindex="0"` should be set to make the component focusable, and when closed, `tabindex="-1"` should be set to remove it from the tab order.

- `aria-modal`

  - The `aria-modal` attribute should be set to indicate whether the pane is modal or non-modal. When the pane is modal, `aria-modal="true"`, and when it is non-modal, `aria-modal="false"`.

- `aria-hidden`

  - The `aria-hidden` attribute should be set to indicate whether the pane is hidden or visible. When the pane is hidden, `aria-hidden="true"`, and when visible, `aria-hidden="false"`.

- `aria-describedby`

  - The `aria-describedby` attribute should be used to associate the pane with an element that provides a description of its purpose or content.

- `aria-labelledby`

  - The `aria-labelledby` attribute should be used to associate the pane with an element that serves as its accessible label or title.
