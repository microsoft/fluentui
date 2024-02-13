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
<fluent-dialog open>
  <!-- Header -->
  <fluent-text slot="title">Dialog</fluent-text>
  <fluent-button slot="title-action"><svg></svg></fluent-button>
  <!-- Default Content -->
  <fluent-text>Default Content</fluent-text>

  <!-- Footer/Actions -->
  <fluent-button slot="action">Do Something</fluent-button>
  <fluent-button slot="action">Close</fluent-button>
</fluent-dialog>
```

### **Attributes**

| Name               | Privacy | Type              | Default                 | Description                                 |
| ------------------ | ------- | ----------------- | ----------------------- | ------------------------------------------- |
| `modal-type`       | public  | `DialogModalType` | `DialogModalType.modal` | Indicates that the type of modal to render. |
| `open`             | public  | `boolean`         | `false`                 | Controls the open state of the dialog       |
| `aria-labelledby`  | public  | `string`          | `undefined`             | optional based on implementation\*\*        |
| `aria-describedby` | public  | `string`          | `undefined`             | optional based on implementation\*\*        |
| `aria-label `      | public  | `string`          | `undefined`             | optional based on implementation\*\*        |

\*\* See the [W3C Specification](https://w3c.github.io/aria-practices/#dialog_roles_states_props) for requirements and details.

<br />

### **Methods**

| Name   | Privacy | Description                    | Parameters | Return | Inherited From |
| ------ | ------- | ------------------------------ | ---------- | ------ | -------------- |
| `hide` | public  | The method to hide the dialog. |            | void   | FASTDialog     |
| `show` | public  | The method to show the dialog. |            | void   | FASTDialog     |

<br />

### **Slots**

| Name           | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `title`        | slot for title content                                             |
| `title-action` | slot for custom action in the title, such as a close button button |
|                | default slot for content rendered between title and footer         |
| `action`       | slot for actions content                                           |

### **Events**

| Name           | Description                                                     | Details                                            |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------- |
| `onOpenChange` | Event fired when the component transitions from its open state. | `{ open: this.dialog.open, dismissed: dismissed }` |

### **Preparation**

## Fluent Web Component v3 v.s Fluent React 9

### Title Action

In the Fluent v9 version of the Dialog, a default close button appears when the modalType is designated as 'non-modal'. This behavior, however, is not replicated in the WC3 version.

For the WC3 version, we've decided to use the `title-action` slot, allowing users to provide their own action. This modification emerged from two main concerns: accessibility (a11y) and performance when working with interactive elements inside the shadowDOM.

#### **Performance Considerations**

Dynamically generating elements can lead to unnecessary reflows and repaints in the browser's rendering mechanism. This becomes even more complex when these elements are inside the shadowDOM due to the encapsulation. By offering users a way to introduce their own custom action via a slot, we circumvent these potential performance setbacks.

#### **Accessibility Considerations**

Interactive elements placed within the shadowDOM can sometimes behave unpredictably with screen readers and other assistive technologies. The encapsulation of the shadowDOM can make it trickier for these technologies to accurately interpret and interact with embedded elements. By allocating a specific slot for interactive elements outside the shadowDOM, we can ensure a more consistent and accessible experience.

### **Component, Element, and Slot Mapping**

| Fluent UI React 9         | Fluent Web Components 3  | Description of difference                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Dialog>`                | `<fluent-dialog>`        | tag name                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `<DialogTrigger>`         | methods: `hide() show()` | In the React version of the dialog, a "DialogTrigger" component is utilized as part of a composite component of Dialog. The DialogTrigger component provides functionality for toggling the visibility of the Dialog component. <br /> In the Web Component version does not include a dialog trigger. Instead, it expects the user to directly access methods on the Dialog class or utilize CSS to control the visibility of the dialog component. |
| `<DialogSurface>`         | `dialog::backdrop`       | In the React version of the dialog, the DialogSurface component is used as part of the composite Dialog component to represent the dimmed background of the dialog. <br /> The Web Component version utilizes the HTML dialog ::backdrop pseudoelement.                                                                                                                                                                                              |
| `<DialogTitle>`           | `slot: title`            | In the React version of the dialog, the <DialogTitle> component is used to implement the title of the dialog. <br /> In the web component version, the title is provided through the title slot.                                                                                                                                                                                                                                                     |
| `<DialogTitle action="">` | `slot: title-action`     | In the React version of the dialog, a close button can be passed through the <DialogTitle> action slot. <br /> In the web component version, a close button can be provided through a dialog's `close` slot.                                                                                                                                                                                                                                         |
| `<DialogActions>`         | `slot: action`           | In the React version of the dialog, the <DialogActions> component is used to implement the actions within the dialog. <br /> In the Web Component version, actions are passsed through the `actions` slot.                                                                                                                                                                                                                                           |
