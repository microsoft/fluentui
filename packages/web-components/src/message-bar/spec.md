# MessageBar

A MessageBar communicates important information about the state of the entire product or surface—for example, the status of a page, panel, dialog, or card. The information shouldn’t require someone to take immediate action and can never be used to upsell or advertise.

## Design Spec

Link to MessageBar Design Spec in Figma: [Link](https://www.figma.com/file/bKlUyX5FpvpiVelldHdYtI/MessageBar?type=design&node-id=3408-194151&mode=design&t=6FqaliFB9iOrRiaB-0)

## Engineering Spec

The Fluent WC3 MessageBar extends `FASTElement`

### Class `MessageBar`

### Template

```html
<template
  role="status"
  layout="${x => x.layout}"
  shape="${x => x.shape}"
  politeness="${x => x.politeness}"
  intent="${x => x.intent}"
  aria-live="${x => x.politeness}"
  aria-labelledby="${x => x.ariaLabelledby}"
>
  <slot></slot>
  <slot name="actions"></slot>
  <slot name="close"></slot>
</template>
```

### **Variables**

| Name                  | Type                               | Description                               |
| --------------------- | ---------------------------------- | ----------------------------------------- |
| `MessageBarLayout`    | `auto` `multiline` `singleline`    | How text flows within the MessageBar      |
| `MessageBarShape`     | `rounded` `square`                 | Shapes for the MessageBar                 |
| `MessageBarIntent`    | `success` `warning` `error` `info` | Intents for the MessageBar                |
| `MessageBarPolitness` | `assertive` `polite`               | Sets the alert style for aria-live region |

### **Attributes**

| Name         | Type                               | Default   | Description                                                                                                                        |
| ------------ | ---------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `layout`     | `auto` `multiline` `singleline`    | `auto`    | Determines if the MessageBar should opt out of automatic reflow for applications that have an existing responsive design mechanism |
| `shape`      | `square` `rounded`                 | `rounded` | Determines the shape of the corners on the MessageBar                                                                              |
| `intent`     | `success` `warning` `error` `info` | `info`    | Sets the intent type for the MessageBar                                                                                            |
| `politeness` | `assertive` `polite`               | `polite`  | Sets the alert style for aria-live region                                                                                          |

### **Events**

| Name      | Type          | Description                             |
| --------- | ------------- | --------------------------------------- |
| `dismiss` | `CustomEvent` | Fires when the MessageBar is dismissed. |

### **Methods**

| Name      | Privacy | Description           |
| --------- | ------- | --------------------- |
| `dismiss` | public  | Hides the MessageBar. |

### **Slots**

| Name      | Description                           |
| --------- | ------------------------------------- |
|           | The default slot for the main content |
| `actions` | The slot for optional action buttons  |
| `close`   | The slot for a custom close icon      |

## **Accessiblity**

### **WAI-ARIA Roles, States, and Properties**

- `role="status"`

  - The MessageBar component should have a role of "status" to signify that the content is advisory information to the user but not important to justify an alert.

- `aria-live`

  - The `aria-live` attribute should be used to associate the MessageBar with the appropriate `aria-live` value to announce content changes to assistive technology devices. Corresponds to `politeness` attribute.

- `aria-labelledby`

  - The `aria-labelledby` attribute should be used to associate the MessageBar with an element that serves as its accessible label or title, often the title is within the content passed to the default slot.

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9                         | Fluent Web Components 3 |
| ----------------------------------------- | ----------------------- |
| `<MessageBarActions>`                     | `slot="actions"`        |
| `<MessageBarActions> > containerAction()` | `slot="close"`          |
| `<MessageBarBody>`                        | `default slot`          |
| `<MessageBarTitle> `                      | `default slot`          |
