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

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Dialog>`        | `<fluent-dialog>`       |

<br />

**Property Mapping**

| Fluent UI React 9                                                                                                                                                     | Fluent Web Components 3 | Description of difference                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalType: 'alert'                                                                                                                                                   | 'modal'                 | 'non-modal'`                                                                                                                              | `alert: boolean`, `modal: boolean` | In FUIR9, the modalType prop accepts a string value ('alert', 'modal', or 'non-modal') to specify the modal behavior. In FUIWC3, separate boolean props (alert and modal) are used to indicate whether the component should behave as an alert or a modal. |
| `onOpenChange`                                                                                                                                                        | `onHiddenChange`        | In FUIR9, the onOpenChange event is emitted when the open prop of a component changes, indicating a change in the component's open state. |
| In FUIWC3, the onHiddenChange event is emitted when the hidden property or attribute of a component changes, indicating a change in the component's visibility state. |
