# Card Header

The CardHeader component serves as a versatile content container designed specifically for crafting the header section of a card component. With slots available for customization, it provides a flexible and user-friendly way to tailor the card's header to your specific design and content needs.

## **Design Spec**

[Link to Card in Figma](https://www.figma.com/file/berhUBA6mJV9sCPpjgfKRj/Card?type=design&node-id=6503-13927&mode=design&t=esnGps8mGKqly4I1-0)

<br />

## **Engineering Spec**

Fluent WC3 Card has feature parity with the Fluent UI React 9 Card implementation but not direct parity.

<br />

## Class: `CardHeader`

## Super Class: [`FASTElement`](https://www.fast.design/docs/fast-element/getting-started)

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
