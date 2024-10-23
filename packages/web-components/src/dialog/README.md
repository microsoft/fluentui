# Dialog

> Dialog is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

## **Design Spec**

[Link to Dialog in Figma](https://www.figma.com/file/jtF47yOXDxkI00ZkydE999/Dialog?type=design&node-id=2605%3A15263&mode=dev)

## **Engineering Spec**

Fluent WC3 Dialog has feature parity with the Fluent UI React 9 Dialog implementation but not direct parity.

## Superclass: [FASTElement](https://www.fast.design/docs/fast-element/defining-elements)

## Class: `Dialog`

<br />

### **Component Name**

`<fluent-dialog></fluent-dialog>`

### **Basic Implemenation**

```html
<fluent-dialog>
  <fluent-dialog-body>
    <!-- Header -->
    <fluent-text slot="title">Dialog</fluent-text>
    <fluent-button slot="title-action"><svg></svg></fluent-button>

    <!-- Default Content -->
    <fluent-text>Default Content</fluent-text>

    <!-- Footer/Actions -->
    <fluent-button slot="action">Do Something</fluent-button>
    <fluent-button slot="action">Close</fluent-button>
  </fluent-dialog-body>
</fluent-dialog>
```

### **Attributes**

| Name               | Privacy | Type         | Default            | Description                                               |
| ------------------ | ------- | ------------ | ------------------ | --------------------------------------------------------- |
| `type`             | public  | `DialogType` | `DialogType.modal` | Indicates that the type of modal to render.               |
| `no-title-action`  | public  | `boolean`    | `false`            | Used to set whether the default title action is rendered. |
| `aria-labelledby`  | public  | `string`     | `undefined`        | optional based on implementation\*\*                      |
| `aria-describedby` | public  | `string`     | `undefined`        | optional based on implementation\*\*                      |
| `aria-label `      | public  | `string`     | `undefined`        | optional based on implementation\*\*                      |

\*\* See the [W3C Specification](https://w3c.github.io/aria-practices/#dialog_roles_states_props) for requirements and details.

<br />

### **Methods**

| Name   | Privacy | Description                    | Parameters | Return | Inherited From |
| ------ | ------- | ------------------------------ | ---------- | ------ | -------------- |
| `hide` | public  | The method to hide the dialog. |            | void   | FASTDialog     |
| `show` | public  | The method to show the dialog. |            | void   | FASTDialog     |

<br />

### **Slots**

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | default slot for content rendered inside the dialog element |

### **Events**

| Name           | Description                                                     | Details                                            |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------- |
| `onOpenChange` | Event fired when the component transitions from its open state. | `{ open: this.dialog.open, dismissed: dismissed }` |

## **Preparation**

### **Fluent Web Component v3 v.s Fluent React 9**

**Component, Element, and Slot Mapping**

| Fluent UI React 9         | Fluent Web Components 3  | Description of difference                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Dialog>`                | `<fluent-dialog>`        | tag name                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `<DialogTrigger>`         | methods: `hide() show()` | In the React version of our components, a "DialogTrigger" component is utilized as part of a composite component of Dialog. The DialogTrigger component provides functionality for toggling the visibility of the Dialog component. <br /> In the Web Component version does not include a dialog trigger. Instead, it expects the user to directly access methods on the Dialog class or utilize CSS to control the visibility of the dialog component. |
| `<DialogSurface>`         | `dialog::backdrop`       | In the React version of our components, the DialogSurface component is used as part of the composite Dialog component to represent the dimmed background of the dialog. <br /> The Web Component version utilizes the HTML dialog ::backdrop pseudoelement.                                                                                                                                                                                              |
| `<DialogTitle>`           | `slot: title`            | In the React version of our components, the <DialogTitle> component is used to implement the title of the dialog. <br /> In the Web Component version, the title is provided through the title slot.                                                                                                                                                                                                                                                     |
| `<DialogTitle action="">` | `slot: title-action`     | In the React version of our components, the <DialogTitle> component the DialogTitles action prop. <br /> In the Web Component version, the title action is provided through the Dialogs title-action slot                                                                                                                                                                                                                                                |
| `<DialogActions>`         | `slot: action`           | In the React version of our components, the <DialogActions> component is used to implement the actions within the dialog. <br /> In the Web Component version, actions are passsed through the `action` slot                                                                                                                                                                                                                                             |
