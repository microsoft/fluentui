# DrawerBody

## Overview

The `DrawerBody` component is a part of the Fluent UI library and is intended to be used with the `fluent-drawer` component. It provides consumers with a structured template for the drawer's content, including areas for a header, content, and footer.

## Attributes

This component does not have specific attributes beyond standard HTML attributes.

## Methods

The `DrawerBody` component does not define custom methods beyond those inherited from `FASTElement`.

## Events

The `DrawerBody` component does not emit custom events beyond those standard to HTML elements.

### **Slots**

| Name     | Description                           |
| -------- | ------------------------------------- |
| `title`  | The slot for title                    |
| `close`  | The slot for the close button         |
|          | The default slot for the main content |
| `footer` | The slot for the footer               |

## CSS Parts

| Name      | Description                                    |
| --------- | ---------------------------------------------- |
| `header`  | Styles the header section of the drawer.       |
| `content` | Styles the main content section of the drawer. |
| `footer`  | Styles the footer section of the drawer.       |

## Usage Examples

### Basic Usage

```html
<fluent-drawer>
  <fluent-drawer-body>
    <div slot="title">Drawer Title</div>
    <button slot="close">Close</button>
    <div>Content goes here...</div>
    <div slot="footer">Footer content</div>
  </fluent-drawer-body>
</fluent-drawer>
```
