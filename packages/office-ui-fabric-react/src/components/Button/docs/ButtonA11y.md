Button is accessible if these considerations are followed:

- Use a touch target area of `44px` by `44px`
- For multiple buttons provided on the page that perform the same function, one of the targets should be `44px` by `44px`.
- Buttons should get activated using `Enter` key as well as `SPACE` key.
- For custom buttons made using `<div>`, `<span>`, `<svg>`or `<img>`,
  - `role="button"` must be applied.
  - Tabindex property should be set to "0", so that it could get tab focus.
  - When secondary action is present, use the `aria-describedby` property.
  - Provide tooltips for button icons that don’t have a visible label or hint text about the event it triggers.
  - Provide an accessible label using `aria-label`, and make sure the accessible label string starts with the visible label string
- Consider putting a comma (,) wherever required to break the string, in case of longer description, to make a screen reader take a little pause.
