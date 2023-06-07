# Drawer

The `Drawer` component represents a drawer that can be opened and closed, typically used for navigation or additional content.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](https://www.figma.com/)

## Engineering Spec

The Fluent WC3 Drawer extends `FASTElement`

### Class: `Drawer`

### Template

```html
    <template
      role="complementary"
      ?open="${x => x.open}"
      position="${x => x.position}"
      focus-target="${x => x.focusTarget}"
      aria-disabled="${x => x.ariaDisabled}"
      aria-hidden="${x => (x.open ? 'false' : 'true')}"
      aria-label="${x => x.ariaLabel}"
      trap-focus="${x => x.trapFocus}"
      tabindex="${x => (x.open ? '0' : '-1')}"
      aria-modal="${x => (x.modal ? 'true' : 'false')}"
    >
      <div class="root" part="root">
        <div
          class="drawer"
          part="drawer"
          aria-modal="${x => (x.modal ? 'true' : 'false')}"
          aria-describedby="${x => x.ariaDescribedby}"
          aria-labelledby="${x => x.ariaLabelledby}"
          aria-label="${x => x.ariaLabel}"
          ${ref('drawer')}
        >
          ${when(
            x => x.toolbar,
            html<T>`
              <div class="toolbar" part="toolbar">
                <slot name="toolbar"></slot>
              </div>
            `
          )}
          <div class="header" part="header">
            <slot name="header"></slot>
          </div>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <div class="actions" part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
        ${when(
          x => x.modal && x.open,
          html<T>`
            <div
              class="overlay"
              part="overlay"
              role="presentation"
            ></div>
          `
        )}
      </div>
    </template>
```

### **Variables**

| Name             | Type                     | Description          |
| ---------------- | ------------------------ | -------------------- |
| `DrawerPosition` | `type of DrawerPosition` | Positions for Drawer |
| `DrawerSize`     | `type of DrawerSize`     | Sizes for Drawer     |

### **Fields**

| Name                     | Privacy | Type             | Default                | Description                                                                       | Inherited From                                                               |
| ------------------------ | ------- | ---------------- | ---------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --- |
| `_drawer`                | private | `HTMLElement     | undefined`             | `undefined`                                                                       | Private field representing the drawer element.                               |     |
| `hasInteracted`          | private | `boolean`        | `false`                | Private field ndicating whether the drawer has been interacted with.              |                                                                              |
| `previousActiveElement ` | private | `HTMLElement     | undefined`             | `undefined`                                                                       | Private field storing the previous active element before opening the drawer. |     |
| `trapFocus`              |         | `boolean`        | `false`                | Determines whether the focus should be trapped within the drawer when it is open. |                                                                              |
| `drawer`                 |         | `HTMLElement     | undefined`             | `undefined`                                                                       | The Drawer element.                                                          |     |
| `open`                   |         | `boolean`        | `false`                | Indicates whether the drawer is open or closed.                                   |                                                                              |
| `modal`                  |         | `boolean`        | `false`                | Determines whether the drawer should be displayed as modal or non-modal.          |                                                                              |
| `position`               |         | `DrawerPosition` | `DrawerPosition.right` | Sets the position of the drawer (left/right).                                     |                                                                              |
| `drawerSize`             |         | `DrawerSize`     | `DrawerSize.medium`    | Sets the control size of the drawer (small/medium/large).                         |                                                                              |
| `ariaLabelledby`         |         | `string          | undefined`             | `undefined`                                                                       | Sets the aria-labelledby attribute of the drawer.                            |     |
| `ariaDescribedby`        |         | `string          | undefined`             | `undefined`                                                                       | Sets the aria-describedby attribute of the drawer.                           |     |
| `toolbar`                |         | `boolean`        | `false`                | Indicates the presence of the toolbar.                                            |                                                                              |
| `focusTarget`            |         | `string          | undefined`             | `undefined`                                                                       | The element to receive focus when the drawer opens.                          |     |
| `previousActiveElement`  |         | `HTMLElement     | undefined`             | `undefined`                                                                       | Stores the previous active element before opening the drawer.                |     |

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
| `trap-focus`       | trapFocus       |
| `drawer`           | drawer          |
| `open`             | open            |
| `modal`            | modal           |
| `position`         | position        |
| `control-size`     | controlSize     |
| `aria-labelledby`  | ariaLabelledby  |
| `aria-describedby` | ariaDescribedby |
| `toolbar`          | toolbar         |
| `focus-target`     | focusTarget     |

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

## Drawer Accessibility Specification

Focus Management: When the drawer is opened, the focus should move to the drawer, making it easier for keyboard and screen reader users to interact with the drawer content immediately. On closing the drawer, the focus should return to the element that opened the drawer.

Keyboard Interaction:

- The drawer should be dismissible via the Escape key, which should close the drawer.
- Tabbing should not move focus outside the opened drawer, implementing a keyboard trap.

State Announcement: The state (open or closed) of the drawer should be indicated with the `aria-expanded` state set on the controlling element (the button that triggers the drawer's opening and closing).

## DrawerToolbar Accessibility Specification

Role: The toolbar should have a role of toolbar to identify the collection of interactive elements.

Labeling: If not evident from the context, the toolbar should have a label associated with it using `aria-label` or `aria-labelledby`.

Keyboard Interaction:

- Interactive elements within the toolbar should be navigable via the Tab key or Arrow keys as per the toolbar design pattern.
- The optional close button should be accessible via keyboard and should close the drawer when activated.

State Announcement: If the visibility of the close button changes, it should be communicated to assistive technology using `aria-hidden`.

Focus Management: If the toolbar is the first element inside the drawer, it will receive focus first when the drawer is opened, which could be the desired behavior.

Semantic Markup: For the slot intended for icon buttons, it's important to advise developers to use buttons with appropriate accessible names. If the names are not visually present, they should use `aria-label` or `aria-labelledby` to label buttons.

These considerations follow WCAG 2.1 and ARIA Authoring Practices 1.1. Each aspect should be tested using both automated accessibility tests and manual testing with various assistive technologies, including keyboard-only navigation, screen readers, and magnification.

Remember that accessibility should always include usability testing with individuals who use these assistive technologies for a truly inclusive design.

# Open Questions

Should the "side bar toggles" use the existing subtle icon only buttons or do we need a custom solution? ( green selected indicator )
inline drawer + overlay drawer
when only one option selected dont show sidebar
No overflow button needed for first iteration.
Pane default width 320px, min width 180px
button slots and container pane
component switcher
When only one pane is active pane switcher isnt there
static v.s dynamic
