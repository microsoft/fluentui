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

```html
<fluent-card>
  <!-- content -->
</fluent-card>
```

<br />

### **Variables**

| Name             | Description                | Type                                                                                                  |
| ---------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `cardSize`       | Control sizes for the Card | `{ small: "small", medium: "medium", large: "large" }`                                                |
| `cardAppearance` | Appearances for the Card   | `{ filled: "filled", filledAlternative: "filled-alternative", outline: "outline", subtle: "subtle" }` |

<br />

### **Attributes**

| Name         | Type                                          | Default  | Description                                                                      |
| ------------ | --------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `size`       | `small, medium, large`                        | `medium` | Define the minimum size of the card. Smaller sizes only apply to horizontal card |
| `appearance` | `filled, filled-alternative, outline, subtle` | `filled` | Sets the appearance of the card                                                  |

### **Methods**

| Name                                      | Description                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `sizeChanged(prev: string, next: string)` | Triggered when the size of the card changes, updating the computed stylesheet accordingly. |

### **CSS Variables**

| Name               | Description                         |
| ------------------ | ----------------------------------- |
| `--card-width`     | Used to set the width of the card   |
| `--card-height`    | Used to set the height of the card  |
| `--card-elevation` | Used to set the z-index of the card |

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Card>`          | `<fluent-card>`         |

<br />
