### Layout

- Use the 24-pixel persona in text fields in read-only mode or in experiences like multi-column lists which need compact persona representations.
- Use the 32-pixel persona in text fields in edit mode.
- Use the 32-pixel, 40-pixel, and 48-pixel persona in menus and list views.
- Use the 72-pixel and 100-pixel persona in profile cards and views.

### Content

- Change the values of the color swatches in high contrast mode.

### Accessibility

#### Color

The presence indicator for small personas of size 32 or less only uses color to indicate the current status. This can result in poor accessibility for anyone who has trouble perceiving color. If you use the presence indicator on small personas, we recommend adding a text alternative as we do in our examples.

#### Tooltips

By default, the Persona truncates text and displays a tooltip with the full text. If a tooltip is not desired (e.g. the Persona is used within a dropdown), the `showOverflowTooltip` property can be set to false.
