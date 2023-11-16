# Card

A flexible content container that extends the functionality of FASTCard. It offers additional features such as selectable states and orientation settings. It can be customized further with various appearances and sizes.

## **Design Spec**

[Link to Card in Figma](https://www.figma.com/file/berhUBA6mJV9sCPpjgfKRj/Card?type=design&node-id=6503-13927&mode=design&t=esnGps8mGKqly4I1-0)

<br />

## **Engineering Spec**

Fluent WC3 Card has feature parity with the Fluent UI React 9 Card implementation but not direct parity.

<br />

## Class: `Card`

## Super Class: [`FASTCard`](https://explore.fast.design/components/fast-card)

<br />

### **Component Name**

`<fluent-card></fluent-card>`

### **Implementation**

**Horizontal Card**

```html
<fluent-card orientation="horizontal">
  <fluent-card-preview>
    <fluent-image block shape="square">
      <img />
    </fluent-image>
  </fluent-card-preview>
  <fluent-card-header>
    <fluent-text slot="header">Header Text</fluent-text>
    <fluent-text slot="description">Description Text</fluent-text>
    <fluent-button icon-only slot="action">
      <svg></svg>
    </fluent-button>
  </fluent-card-header>
</fluent-card>
```

**Vertical Card**

```html
<fluent-card orientation="vertical">
  <fluent-card-preview>
    <fluent-image block shape="square">
      <img />
    </fluent-image>
  </fluent-card-preview>
  <fluent-card-header>
    <fluent-image slot="image"><img /></fluent-image>
    <fluent-text slot="header">Header Text</fluent-text>
    <fluent-text slot="description">Description Text</fluent-text>
    <fluent-button slot="action" icon-only><svg></svg></fluent-button>
  </fluent-card-header>
  <fluent-text>More Content</fluent-text>
  <fluent-card-footer>
    <fluent-button appearance="primary">Button</fluent-button>
    <fluent-button>Button</fluent-button>
    <fluent-button slot="action" icon-only><svg></svg></fluent-button>
  </fluent-card-footer>
</fluent-card>
```

```html
<fluent-card orientation="vertical">
  <fluent-card-header>
    <fluent-image slot="image"><img /></fluent-image>
    <fluent-text slot="header">Header Text</fluent-text>
    <fluent-text slot="description">Description Text</fluent-text>
    <fluent-button slot="action" icon-only><svg></svg></fluent-button>
  </fluent-card-header>
  <fluent-card-preview>
    <fluent-image block shape="square">
      <img />
    </fluent-image>
  </fluent-card-preview>
  <fluent-card-footer>
    <fluent-button appearance="primary">Button</fluent-button>
    <fluent-button>Button</fluent-button>
    <fluent-button slot="action" icon-only><svg></svg></fluent-button>
  </fluent-card-footer>
</fluent-card>
```

<br />

### **Variables**

| Name              | Description                | Type                                                                                                  |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `cardSize`        | Control sizes for the Card | `{ small: "small", medium: "medium", large: "large" }`                                                |
| `cardAppearance`  | Appearances for the Card   | `{ filled: "filled", filledAlternative: "filled-alternative", outline: "outline", subtle: "subtle" }` |
| `cardOrientation` | Orientations for the Card  | `{ horizontal: "horizontal", vertical: "vertical" }`                                                  |
| `cardFocusMode`   | focus modes for the Card   | `{ off: "off", noTab: "no-tab", tabExit: "tab-exit", tabOnly: "tab-only" }`                           |

<br />

### **Events**

| Name                | Type | Description                                          | Inherited From |
| ------------------- | ---- | ---------------------------------------------------- | -------------- |
| `onSelectionChange` |      | Emits a custom event when the selected state changes |                |

<br />

### **Attributes**

| Name          | Type                                          | Default    | Description                                                                      |
| ------------- | --------------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| `orientation` | `horizontal, veritcal`                        | `vertical` | Orientation of the card                                                          |
| `size`        | `small, medium, large`                        | `medium`   | Define the minimum size of the card. Smaller sizes only apply to horizontal card |
| `appearance`  | `filled, filled-alternative, outline, subtle` | `filled`   | Sets the appearance of the card                                                  |
| `selected`    | `boolean`                                     | `false`    | Set to `true` if card is selected                                                |
| `disabled`    | `boolean`                                     | `false`    | Determines whether card is disabled                                              |
| `selectable`  | `boolean`                                     | `false`    | Determines whether card is selectable                                            |
| `focus-mode`  | `off, no-tab, tab-exit, tab-only`             | `off`      | Determines focus behavior                                                        |

### **Methods**

| Name                                            | Description                                                                                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `select()`                                      | Selects the card when the selectable.                                                                                                                                  |
| `unselect()`                                    | Unselects the card when the card is selectable.                                                                                                                        |
| `toggleCardSelection(checked?: boolean)`        | Toggles the selection state of the card. If a boolean value is provided, it sets the selection state to that value. Otherwise, it inverts the current selection state. |
| `selectedChanged`                               | Callback called when the card selection changes .                                                                                                                      |
| `sizeChanged(prev: string, next: string)`       | Triggered when the size of the card changes, updating the computed stylesheet accordingly.                                                                             |
| `selectedChanged(prev: boolean, next: boolean)` | Emits an event when the selected state of the card changes.                                                                                                            |

### **Slots**

| Name                 | Description                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `floating-action`    | placeholder for a custom interactive element, such as a checkbox, that can be used to make the card form-connected and provide a more visually prominent interaction point. |
| default content slot | slot for main section of the Card.                                                                                                                                          |

### **CSS Variables**

| Name               | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| `--card-size`      | Set based on the card's size attribute value. Used to set the horizontal, vertical spacing of the card. |
| `--card-width`     | Used to set the width of the card                                                                       |
| `--card-height`    | Used to set the height of the card                                                                      |
| `--card-elevation` | Used to set the z-index of the card                                                                     |

## Proposed Deltas

The main difference between the react-card and the fluent-card implementations is how they determine the interactivity of the card. In the react-card, the interactivity is determined by the presence of certain event props, while in the fluent-card, it's controlled by a boolean attribute.

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Card>`          | `<fluent-card>`         |
| `<CardHeader>`    | `<fluent-card-header>`  |
| `<CardFooter>`    | `<fluent-card-footer>`  |

<br />
