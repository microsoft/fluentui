# Open Questions

Should the "side bar toggles" use the existing subtle icon only buttons or do we need a custom solution? ( green selected indicator )
inline drawer + overlay drawer
when only one option selected dont show sidebar
No overflow button needed for first iteration.
Pane default width 320px, min width 180px
button slots and container pane
component switcher
When only one pane is active pane switcher isnt there
static v.s dynamic

# Drawer

The Drawer component displays a panel that can be opened and closed to reveal additional content. It is designed to mimic the behavior of the drawer in Microsoft Teams' chat feature during a call. The Drawer component is intended to be used as part of the DrawerSwitcher component, which serves as a side navigation bar with buttons to open different drawers.

## Design Spec

Link to Drawer Design Spec in Figma: [Link](https://www.figma.com/)

## Engineering Spec

The Fluent WC3 Drawer extends from the FAST Dialog component and is designed to provide a generic container for displaying content within a panel. The Drawer component supports inline display and pushes the main content over when open.

### Template

```html
<template>
  <div class="root">
    <div class="top-nav">
      <slot name="start"></slot>
      <slot name="end"></slot>
      <button class="close-button" aria-label="Close" @click="${x => x.dismiss()}"></button>
    </div>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content-region">
      <slot></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
```

### Inputs

- none

### Outputs

- none

### Events

- change

### Slots

- "start" slot: Used to add content to the start of the top navigation bar.
- "end" slot: Used to add content to the end of the top navigation bar.
- "header" slot: Used to add content to the header section of the drawer.
- Default slot: Used to add content to the main content section of the drawer.
- "actions" slot: Used to add buttons or other actions to the bottom of the drawer.

### Custom Attributes

- none

### Accessibility

## Drawer Accessibility Specification

Role: complimentary

Labeling: The Drawer must be labeled by setting `aria-label` or `aria-labelledby`.

Focus Management: When the drawer is opened, the focus should move to the drawer, making it easier for keyboard and screen reader users to interact with the drawer content immediately. On closing the drawer, the focus should return to the element that opened the drawer.

Keyboard Interaction:

- The drawer should be dismissible via the Escape key, which should close the drawer.
- Tabbing should not move focus outside the opened drawer, implementing a keyboard trap.

State Announcement: The state (open or closed) of the drawer should be indicated with the `aria-expanded` state set on the controlling element (the button that triggers the drawer's opening and closing).

## DrawerToolbar Accessibility Specification

Role: The toolbar should have a role of toolbar to identify the collection of interactive elements.

Labeling: If not evident from the context, the toolbar should have a label associated with it using `aria-label` or `aria-labelledby`.

Keyboard Interaction:

- Interactive elements within the toolbar should be navigable via the Tab key or Arrow keys as per the toolbar design pattern.
- The optional close button should be accessible via keyboard and should close the drawer when activated.

State Announcement: If the visibility of the close button changes, it should be communicated to assistive technology using `aria-hidden`.

Focus Management: If the toolbar is the first element inside the drawer, it will receive focus first when the drawer is opened, which could be the desired behavior.

Semantic Markup: For the slot intended for icon buttons, it's important to advise developers to use buttons with appropriate accessible names. If the names are not visually present, they should use `aria-label` or `aria-labelledby` to label buttons.

These considerations follow WCAG 2.1 and ARIA Authoring Practices 1.1. Each aspect should be tested using both automated accessibility tests and manual testing with various assistive technologies, including keyboard-only navigation, screen readers, and magnification.

Remember that accessibility should always include usability testing with individuals who use these assistive technologies for a truly inclusive design.
