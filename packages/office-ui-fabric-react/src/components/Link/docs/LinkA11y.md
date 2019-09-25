Link is accessible if these considerations are followed:

- Add tooltips to hyperlinks that indicate where people will be directed. If people are directed to an external site, include the top-level domain name inside the tooltip, and style the text with a secondary font color.
- Use `aria-label` , `aria-labelledby` or `aria-describedby` to provide more context about the link in case visual text isn’t sufficient.
- A link should be accessible by `TAB` key.
- `Enter` key should activate a link. It’s not expected that the `Space` key activates links.

#### For a custom link:

- `role="link"` should be defined so that screen readers could identify it as a link.
- Add `tabindex="0"` so that the link becomes keyboard focusable.
- Add the styling cursor: pointer so that mouse users will recognize the element as a link.
- Don’t use the title attribute on `<a>` elements. If you do use it don’t double up on the accessible name of the link, this can produce unnecessary duplicate announcements to some screen readers.
