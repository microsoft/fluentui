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

- none

### Slots

- "start" slot: Used to add content to the start of the top navigation bar.
- "end" slot: Used to add content to the end of the top navigation bar.
- "header" slot: Used to add content to the header section of the drawer.
- Default slot: Used to add content to the main content section of the drawer.
- "actions" slot: Used to add buttons or other actions to the bottom of the drawer.

### Custom Attributes

- none

### Accessibility

The Drawer component should adhere to the following accessibility guidelines:

- Use appropriate ARIA attributes for the close button, header, and other interactive elements.
- Ensure keyboard accessibility for opening and closing the drawer, focusing elements, etc.
- Provide clear instructions or labels for interactive elements to aid screen reader users.
