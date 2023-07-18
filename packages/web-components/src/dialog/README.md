# Dialog

> Dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

## **Design Spec**

[Link to Dialog in Figma](https://www.figma.com/file/jtF47yOXDxkI00ZkydE999/Dialog?type=design&node-id=2605%3A15263&mode=dev)

## **Engineering Spec**

Fluent WC3 Dialog has feature parity with the Fluent UI React 9 Dialog implementation but not direct parity.

## Class: `Dialog`

<br />

### **Component Name**

`<fluent-dialog></fluent-dialog>`

# **Attributes**

| Name          | Privacy | Type      | Default | Description                                      |
| ------------- | ------- | --------- | ------- | ------------------------------------------------ |
| `modal`       | public  | `boolean` | `false` | Renders dialog as a modal                        |
| `alert`       | public  | `boolean` | `false` | Renders dialog as an alert modal                 |
| `hidden`      | public  | `boolean` | `false` | Sets the visibility of the dialog                |
| `noFocusTrap` | public  | `boolean` | `false` | Indicates that the dialog should not trap focus. |

<br />

### **Methods**

| Name   | Privacy | Description                    | Parameters | Return | Inherited From |
| ------ | ------- | ------------------------------ | ---------- | ------ | -------------- |
| `hide` | public  | The method to hide the dialog. |            | void   | FASTDialog     |
| `show` | public  | The method to show the dialog. |            | void   | FASTDialog     |

<br />

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component, Element, and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3  | Description of difference                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Dialog>`        | `<fluent-dialog>`        | tag name                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `<DialogTrigger>` | methods: `hide() show()` | In the React version of our components, a "DialogTrigger" component is utilized as part of a composite component of Dialog. The DialogTrigger component provides functionality for toggling the visibility of the Dialog component. <br /> In the Web Component version does not include a dialog trigger. Instead, it expects the user to directly access methods on the Dialog class or utilize CSS to control the visibility of the dialog component. |
| `<DialogSurface>` | `.overlay`               | In the React version of our components, the DialogSurface component is used as part of the composite Dialog component to represent the dimmed background of the dialog. <br /> In the Web Component version utilizes an HTML element with a class of ".overlay" as part of the Dialog component to achieve the same effect of a dimmed background for the dialog.                                                                                        |
| `<DialogTitle>`   | `slot: title`            | In the React version of our components, the <DialogTitle> component is used to represent the title of the dialog. <br /> In the Web Component version, the title is provided through a <slot> element with the name attribute set to "title". This allows users to insert their own title content into the dialog component.                                                                                                                             |
| `<DialogActions>` | `slot: actions`          | In the React version of our components, the <DialogActions> component is used to represent the actions or buttons within the dialog. <br /> In the Web Component version, the actions or buttons are provided through a <slot> element with the name attribute set to "actions". This allows users to insert their own actions or buttons into the dialog component.                                                                                     |

<br />

**Property Mapping**

| Fluent UI React 9                              | Fluent Web Components 3            | Description of difference                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `modalType: 'alert' \| 'modal' \| 'non-modal'` | `alert: boolean`, `modal: boolean` | In FUIR9, the modalType prop accepts a string value ('alert', 'modal', or 'non-modal') to specify the modal behavior. In FUIWC3, separate boolean props (alert and modal) are used to indicate whether the component should behave as an alert or a modal.                                                   |
| `onOpenChange`                                 | `onHiddenChange`                   | In FUIR9, the onOpenChange event is emitted when the open prop of a component changes, indicating a change in the component's open state. FUIWC3, the onHiddenChange event is emitted when the hidden property or attribute of a component changes, indicating a change in the component's visibility state. |
