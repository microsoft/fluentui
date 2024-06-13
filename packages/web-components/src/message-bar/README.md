# MessageBar

A MessageBar communicates important information about the state of the entire product or surface—for example, the status of a page, panel, dialog, or card. The information shouldn’t require someone to take immediate action and can never be used to upsell or advertise.

## Design Spec

Link to MessageBar Design Spec in Figma: [Link](https://www.figma.com/file/bKlUyX5FpvpiVelldHdYtI/MessageBar?type=design&node-id=3408-194151&mode=design&t=6FqaliFB9iOrRiaB-0)

## Engineering Spec

The Fabric WC3 MessageBar extends `FASTElement`

### Class `MessageBar`

### Template

```html
<template
  role="status"
  layout="${x => x.layout}"
  shape="${x => x.shape}"
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
| `MessageBarLayout`    | `multiline` `singleline`           | How text flows within the MessageBar      |
| `MessageBarShape`     | `rounded` `square`                 | Shapes for the MessageBar                 |
| `MessageBarIntent`    | `success` `warning` `error` `info` | Intents for the MessageBar                |
| `MessageBarPolitness` | `assertive` `polite`               | Sets the alert style for aria-live region |

### **Attributes**

| Name         | Type                               | Default      | Description                                                                                                                        |
| ------------ | ---------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `layout`     | `multiline` `singleline`           | `singleline` | Determines if the MessageBar should opt out of automatic reflow for applications that have an existing responsive design mechanism |
| `shape`      | `square` `rounded`                 | `rounded`    | Determines the shape of the corners on the MessageBar                                                                              |
| `intent`     | `success` `warning` `error` `info` | `info`       | Sets the intent type for the MessageBar                                                                                            |
| `politeness` | `assertive` `polite`               | `polite`     | Sets the alert style for aria-live region                                                                                          |

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

### **Fabric Web Component vs Fluent React 9**

**Layout Attribute Values and Defaults**

The Fluent React v9 Message Bar includes an option for the layout attribute to be set to auto, singleline, or multiline. It leverages the ResizeObserver API to detect the height of the default slot and adjust the layout based on whether the content wraps or not. While this approach is effective, it introduces complexity and significantly increases the component’s size.

In contrast, the web component version delegates the responsibility of adjusting the layout according to the content to the implementor. By default, the layout attribute is set to singleline. This approach reduces the component’s size, offers greater flexibility, and aligns with the intended design. It acknowledges that the slot content resides in the light DOM, allowing for more efficient management of layout changes.

**Component and Slot Mapping**

| Fluent UI React 9                         | Fluent Web Components 3 |
| ----------------------------------------- | ----------------------- |
| `<MessageBarActions>`                     | `slot="actions"`        |
| `<MessageBarActions> > containerAction()` | `slot="close"`          |
| `<MessageBarBody>`                        | `default slot`          |
| `<MessageBarTitle> `                      | `default slot`          |
